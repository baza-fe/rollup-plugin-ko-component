import { parse } from 'path';
import { createFilter } from 'rollup-pluginutils';
import { transform } from 'babel-core';
import component from 'babel-plugin-ko-component';
import { LRUCache } from 'lru-fast';

const cache = new LRUCache(50);

export default function plugin(options = {}) {
    const filter = createFilter(options.include || [ '**/*.js' ], options.exclude || 'node_modules/**');

    return {
        transform(code, id) {
            if (!filter(id)) {
                return null;
            }

            if (cache.find(id)) {
                return cache.get(id);
            }

            const labelIdentifierName = '__ko_component_label__';
            const styleIdentifierName = '__ko_component_style__';
            const templateIdentifierName = '__ko_component_template__';
            const labelIdentifierValue = `'${parse(id).name}'`;
            const styleIdentifierValue = `''`;
            const templateIdentifierValue = `''`;

            code = [
                `const ${labelIdentifierName} = ${labelIdentifierValue};`,
                `const ${styleIdentifierName} = ${styleIdentifierValue};`,
                `const ${templateIdentifierName} = ${templateIdentifierValue};`,
                code
            ].join('\n');

            try {
                cache.put(id, {
                    code: transform(code, { plugins: component }).code,
                    map: { mappings: '' }
                });

                return cache.get(id);
            } catch (error) {
                throw error;
            }
        }
    };
};
