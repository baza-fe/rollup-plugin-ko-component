'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = require('path');
var rollupPluginutils = require('rollup-pluginutils');
var babelCore = require('babel-core');
var component = _interopDefault(require('babel-plugin-ko-component'));

function plugin() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var filter = rollupPluginutils.createFilter(options.include || ['**/*.js'], options.exclude || 'node_modules/**');

    return {
        transform: function transform(code, id) {
            if (!filter(id)) {
                return null;
            }

            var labelIdentifierName = '__ko_component_label__';
            var styleIdentifierName = '__ko_component_style__';
            var templateIdentifierName = '__ko_component_template__';
            var labelIdentifierValue = '\'' + path.parse(id).name + '\'';
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
}

module.exports = plugin;
