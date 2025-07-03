const { defineConfig } = require('tailwindcss')

module.exports = defineConfig({
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,css}',
    ],
    darkMode: 'class',
    theme: { extend: {} },
    plugins: [],
})