/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark", "night"],
  },
  theme: {
    extend: {
      colors: {
        "primary-blue": "#3abff7",
      },
      backgroundColor: {
        "dark-gray": "#191d24",
        "primary-gray": "#2A303C",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  plugins: [require("daisyui")],
};
