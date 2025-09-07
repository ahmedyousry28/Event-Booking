/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito"],
        RobotoSlab: ["RobotoSlab"],
        RobotoSlabSemi: ["RobotoSlabSemi"],
        Nunitosemi: ["Nunitosemi"],
      },
      flex: {
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
    },
    colors: {
      primary: {
        DEFAULT: "#F76C11",
        foreground: "#2D3039",
      },
      secondary: {
        DEFAULT: "#ffffff",
        foreground: "#757575",
      },
      muted: {
        DEFAULT: "#9d9a9a",
      },
      danger: {
        DEFAULT: "#ff473e",
      },
      common: {
        DEFAULT: "#444444",
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      1.5: "1.5px",
      2: "2px",
      3: "3px",
    },
  },
  plugins: [],
};
