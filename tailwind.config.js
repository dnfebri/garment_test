const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        container: {
            center: true,
        },
        extend: {
            fontFamily: {
                sans: ["Nunito", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "secondary-1": "#FFD600",
            },
        },
        fontFamily: {
            Poppins: ["Poppins", "sans-serif"],
            "sans-serif": ["sans-serif"],
        },
    },

    plugins: [
        require("@tailwindcss/forms"),
        require("flowbite/plugin"),
        // add custom variant for expanding sidebar
        plugin(({ addVariant, e }) => {
            addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
                modifySelectors(
                    ({ className }) =>
                        `.sidebar-expanded .${e(
                            `sidebar-expanded${separator}${className}`
                        )}`
                );
            });
        }),
    ],
};
