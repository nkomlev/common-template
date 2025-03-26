
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/auth/admin/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/@premieroctet/next-admin/dist/**/*.{js,ts,jsx,tsx}",
    "./nextAdminOptions.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {},
  presets: [require("@premieroctet/next-admin/preset")],
};
  