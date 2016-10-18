import { parse } from 'path';
import { createFilter } from 'rollup-pluginutils';
import { transform as transform$1 } from 'babel-core';
import component from 'babel-plugin-ko-component';
import { LRUCache } from 'lru-fast';

var cache = new LRUCache(50);

function plugin() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var filter = createFilter(options.include || ['**/*.js'], options.exclude || 'node_modules/**');

    return {
        transform: function transform(code, id) {
            if (!filter(id)) {
                return null;
            }

            if (cache.find(id)) {
                return cache.get(id);
            }

            var labelIdentifierName = '__ko_component_label__';
            var styleIdentifierName = '__ko_component_style__';
            var templateIdentifierName = '__ko_component_template__';
            var labelIdentifierValue = '\'' + parse(id).name + '\'';
            var styleIdentifierValue = '\'\'';
            var templateIdentifierValue = '\'\'';

            code = ['const ' + labelIdentifierName + ' = ' + labelIdentifierValue + ';', 'const ' + styleIdentifierName + ' = ' + styleIdentifierValue + ';', 'const ' + templateIdentifierName + ' = ' + templateIdentifierValue + ';', code].join('\n');

            try {
                cache.put(id, {
                    code: transform$1(code, { plugins: component }).code,
                    map: { mappings: '' }
                });

                return cache.get(id);
            } catch (error) {
                throw error;
            }
        }
    };
}

export default plugin;
