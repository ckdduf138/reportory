module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'slide-up': 'slide-up 0.2s ease-out',
        'slide-down': 'slide-down 0.2s ease-out',
        'slide-toast': 'slide-down 0.2s ease-out, slide-up 0.3s ease-in 1.8s'
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};