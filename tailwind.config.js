/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,vue}"],
    theme: {
        extend: {
            fontFamily: {
                'main': ['Roboto', 'sans-serif']
            },
            colors: {
                'default': '#000000',
                'primary': '#1a6ad0',
                'secondary': '#e3e3e3',
                'done': '#029639',
                'done-light': '#14b24a',
                'light': '#f0f0f0',
                'gray': '#9e9e9e',
                'danger': '#de1203',
                'lightgray': '#ccc'
            },
            gridTemplateColumns: {
                'todo': 'auto 1fr auto'
            }
        },
    },
    plugins: [
        plugin(function ({addVariant}) {
            addVariant('not-last-child', '&:not(:last-child)');
            addVariant('before-active', '&:has(+ .button_primary)');
            addVariant('after-active', '&.button_primary + button');
        })
    ],
}

