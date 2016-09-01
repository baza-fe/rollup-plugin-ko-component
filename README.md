rollup-plugin-ko-component
=====

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