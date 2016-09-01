import { parse } from 'path';
import { createFilter } from 'rollup-pluginutils';
import babelCore from 'babel-core';
import component from 'babel-plugin-ko-component';

function plugin() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var filter = createFilter(options.include || ['**/*.js'], options.exclude || 'node_modules/**');

    return {
        transform: function transform(code, id) {
            if (!filter(id)) {
                return null;
            }

            var labelIdentifierName = '__ko_component_label__';
            var styleIdentifierName = '__ko_component_style__';
            var templateIdentifierName = '__ko_component_template__';
            var labelIdentifierValue = '\'' + parse(id).name + '\'';
            var styleIdentifierValue = '\'\'';
            var templateIdentifierValue = '\'\'';

            code = ['const ' + labelIdentifierName + ' = ' + labelIdentifierValue + ';', 'const ' + styleIdentifierName + ' = ' + styleIdentifierValue + ';', 'const ' + templateIdentifierName + ' = ' + templateIdentifierValue + ';', code].join('\n');

            try {
                return {
                    code: babelCore.transform(code, { plugins: component }).code,
                    map: { mappings: '' }
                };
            } catch (error) {
                throw error;
            }
        }
    };
};

export default plugin;