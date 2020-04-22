import indexHTML from 'rollup-plugin-index-html';
import copy from 'rollup-plugin-copy'


export default {
    input: 'index.html',
    output: {
        dir: 'dist',
        sourcemap: true,
        dynamicImportFunction: 'importShim',
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
    },
    plugins: [
        indexHTML(),
        copy({
            targets: [{ src: 'index.css', dest: 'dist' }]
        })
    ],
};