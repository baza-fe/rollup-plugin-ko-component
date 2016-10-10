import { parse } from 'path';
import { createFilter } from 'rollup-pluginutils';
import { transform } from 'babel-core';
import component from 'babel-plugin-ko-component';

export default function plugin(options = {}) {
    const filter = createFilter(options.include || [ '**/*.js' ], options.exclude || 'node_modules/**');

    return {
        transform(code, id) {
            if (!filter(id)) {
                return null;
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
                return {
                    code: transform(code, { plugins: component }).code,
                    map: { mappings: '' }
                };
            } catch (error) {
                throw error;
            }
        }
    };
};