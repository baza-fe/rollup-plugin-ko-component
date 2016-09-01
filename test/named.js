import test from 'ava';
import component from '../';
import { rollup } from 'rollup';

global.ko = {};

test('should use default name', t => {
    rollup({
        entry: './fixtures/named/index.js',
        plugins: [
            component()
        ]
    }).then(bundle => {
        const code = bundle.generate().code;

        ko.components = {
            register(name, component) {
                t.is(name, 'component');
                t.is(name, component.name);
            }
        };

        new Function(code)();
    });
});