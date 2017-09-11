module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true,
        commonjs: true,
        jest: true,
        jquery: true,
    },
    extends: [
        'airbnb-base',
    ],
    plugins: [
        'import',
    ],
}
