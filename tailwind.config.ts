import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'red-and-black': "url('/images/uploads/bg-rouge-noir.webp')",
        "red-background": "url('/images/uploads/fond-rouge.webp')",
        'logo-solo': "url('/images/uploads/pochette_badge.webp')",
        'black-background': "url('/images/uploads/jwb-fond_noir.webp')",
        'pic-band':"url('/images/uploads/Jenn+With+The+Band%C2%A9Laurent+FRANZI__FRA8970.webp')",
        'rouge': "url('/images/uploads/fond-rouge.webp')",
        'banner': "url('/images/uploads/bann-grey.webp')",
        'album': "url('/images/uploads/illu-album.webp')",
      },
      colors: {
        'purple': '#6C428E',
        'blue-duck': '#498587',
        'green-clear': '#94AF65',
        'red-logo': '#e05168',
        'white-logo': '#ebe9db',
      },
      fontFamily: {
        'display': ['Horbse-Textured'],
        'body': ['PermanentMarker-Regular'],
        'para': ['PowellAntique-Bold']
      },
      boxShadow: {
        inner: 'inset 0 10px 10px 0 rgba(0, 0, 0, 0.4)'
      }
    },
  },
  plugins: [],
};
export default config;
