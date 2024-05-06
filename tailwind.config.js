/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                'main': ['Roboto', 'sans-serif']
            },
            color: {
                'default': '#000000',
                'primary': '#1a6ad0',
                'secondary': '#e3e3e3',
                'done': '#029639',
                'light': '#f0f0f0',
                'gray': '#9e9e9e',
                'danger': '#de1203',
            }
        },
    },
    plugins: [],
}

