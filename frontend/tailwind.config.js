/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    700: '#1E293B',
                    800: '#0F172A',
                    900: '#020617',
                    950: '#010409',
                },
                gold: {
                    100: '#F9F1D8',
                    200: '#F0E0AA',
                    300: '#E6CC7A',
                    400: '#D4AF37',
                    500: '#AA8C2C',
                    600: '#806921',
                },
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                serif: ['Cormorant Garamond', 'serif'],
            },
            animation: {
                'fade-in': 'fade-in 1s ease-out forwards',
                'slide-up': 'slide-up 0.8s ease-out forwards',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'glow': {
                    '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)' },
                },
            },
        },
    },
    plugins: [],
}
