const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const babelrc = require('babelrc-rollup').default;

rollup.rollup({
    entry: './src/index.js',
    external: [
        'path',
        'rollup-pluginutils',
        'babel-core',
        'babel-plugin-ko-component'
    ],
    plugins: [
        babel(babelrc())
    ]
}).then((bundle) => {
    bundle.write({
        dest: 'dest/rollup-plugin-ko-component.cjs.js',
        format: 'cjs'
    });
    bundle.write({
        dest: 'dest/rollup-plugin-ko-component.es.js',
        format: 'es'
    });
}).catch(console.error);