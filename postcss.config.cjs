const tailwindPostcss = require('@tailwindcss/postcss')
const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        // новый PostCSS-плагин Tailwind v4
        tailwindPostcss(),
        // автопрефикс
        autoprefixer(),
    ],
}