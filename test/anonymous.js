import test from 'ava';
import component from '../';
import { rollup } from 'rollup';

global.ko = {};

test('should use file name', t => {
    rollup({
        entry: './fixtures/anonymous/index.js',
        plugins: [
            component()
        ]
    }).then(bundle => {
        const code = bundle.generate().code;

        ko.components = {
            register(component) {
                t.is(component.name, 'anonymous');
            }
        };

        new Function(code)();
    });
});