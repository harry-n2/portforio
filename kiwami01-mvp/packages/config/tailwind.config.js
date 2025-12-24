/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "../../packages/ui/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: '#050a14',
                    light: '#0a0f1a',
                },
                gold: {
                    DEFAULT: '#c5a059',
                    light: '#e0c080',
                },
                slate: {
                    DEFAULT: '#8892b0',
                }
            },
            fontFamily: {
                serif: ['Cormorant Garamond', 'serif'],
                sans: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
