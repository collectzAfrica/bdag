/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        axiforma: ["Axiforma", "system-ui"],
        mulish: ["Mulish", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        anglecia: ["Anglecia Pro Display", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        redhat: ["Red Hat Text", "sans-serif"],
        gotham: ["Gotham-9", "sans-serif"],
        sourgummy: ['"Sourgummy"', "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1A1C34",
        secondary: "#368DD9",
      },
    },
  },
  plugins: [],
};
