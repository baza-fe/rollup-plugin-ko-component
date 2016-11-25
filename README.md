rollup-plugin-ko-component
=====

<p>
    <a href="LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="Software License" />
    </a>
    <a href="https://github.com/baza-fe/rollup-plugin-ko-component/issues">
        <img src="https://img.shields.io/github/issues/baza-fe/rollup-plugin-ko-component.svg" alt="Issues" />
    </a>
    <a href="http://standardjs.com/">
        <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="JavaScript Style Guide" />
    </a>
    <a href="https://npmjs.org/package/rollup-plugin-ko-component">
        <img src="https://img.shields.io/npm/v/rollup-plugin-ko-component.svg?style=flat-squar" alt="NPM" />
    </a>
    <a href="https://github.com/baza-fe/rollup-plugin-ko-component/releases">
        <img src="https://img.shields.io/github/release/baza-fe/rollup-plugin-ko-component.svg" alt="Latest Version" />
    </a>
    <a href="https://travis-ci.org/baza-fe/rollup-plugin-ko-component">
        <img src="https://travis-ci.org/baza-fe/rollup-plugin-ko-component.svg?branch=master" />
    </a>
</p>


## Usage

```bash
$ npm install rollup rollup-plugin-ko-component -D
```

```js
const rollup = require('rollup');
const component = require('rollup-plugin-ko-component');

rollup.rollup({
    entry: '...',
    plugins: [
        component()
    ]
}).then(bundle => {
    // ...
});
```

## License

MIT &copy; [BinRui.Guan](mailto:differui@gmail.com)