const rollup = require('rollup');
const buble = require('rollup-plugin-buble');

rollup.rollup({
    entry: './src/index.js',
    plugins: [
        buble()
    ],
    external: [
        "path",
        "rollup-pluginutils",
        "babel-core",
        "babel-plugin-ko-component",
        "lru-fast"
    ]
}).then((bundle) => {
    bundle.write({
        dest: 'dest/rollup-plugin-ko-component.js',
        format: 'cjs'
    });
}).catch(console.error);
