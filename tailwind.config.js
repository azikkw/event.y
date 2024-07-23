/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.plugins.{js,ts}',
        './app.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                satoshi: ['Satoshi', 'sans-serif'],
            },
            backgroundColor: {
                'custom-1': '#61A352',
                'custom-2': '#1E1E1E',
                'custom-3': '#2e2e2e',
                'custom-4': '#5A994B'
            },
            colors: {
                'custom-1': '#61A352',
                'custom-2': '#5A994B'
            }
        }
    },
    plugins: [],
}