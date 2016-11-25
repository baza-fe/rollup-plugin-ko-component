'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = require('path');
var rollupPluginutils = require('rollup-pluginutils');
var babelCore = require('babel-core');
var component = _interopDefault(require('babel-plugin-ko-component'));
var lruFast = require('lru-fast');

var cache = new lruFast.LRUCache(50);

function plugin(options) {
    if ( options === void 0 ) options = {};

    var filter = rollupPluginutils.createFilter(options.include || [ '**/*.js' ], options.exclude || 'node_modules/**');

    return {
        transform: function transform$1(code, id) {
            if (!filter(id)) {
                return null;
            }

            if (cache.find(id)) {
                return cache.get(id);
            }

            var labelIdentifierName = '__ko_component_label__';
            var styleIdentifierName = '__ko_component_style__';
            var templateIdentifierName = '__ko_component_template__';
            var labelIdentifierValue = "'" + (path.parse(id).name) + "'";
            var styleIdentifierValue = "''";
            var templateIdentifierValue = "''";

            code = [
                ("const " + labelIdentifierName + " = " + labelIdentifierValue + ";"),
                ("const " + styleIdentifierName + " = " + styleIdentifierValue + ";"),
                ("const " + templateIdentifierName + " = " + templateIdentifierValue + ";"),
                code
            ].join('\n');

            try {
                cache.put(id, {
                    code: babelCore.transform(code, { plugins: component }).code,
                    map: { mappings: '' }
                });

                return cache.get(id);
            } catch (error) {
                throw error;
            }
        }
    };
}

module.exports = plugin;
