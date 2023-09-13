/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            inter: ["Inter", "sans-serif"],
            openSans: ["Open Sans", "sans-serif"],
        },
        colors: {
            darkerblue: "#163172",
            skyblue: "#D6E4F0",
            darkblue: "#1E56A0",
            darkgray: "#333333",
            pinkred: "#e7195a",
            pinkwhite: "#ffefef",
        },
        extend: {},
    },
    plugins: [],
}

