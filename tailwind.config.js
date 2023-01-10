module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    {
      pattern: /.*/,
    }
  ],
  theme: {
    colors: {
      primary: '#5A7DFC',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      secondary: '#8F90A6',
      success: '#39D98A',
      danger: '#FF5C5C',
      warning: '#FDDD48',
      red: { 0: '#E63535', 1: '#FF3B3B', 2: '#FF5C5C', 3: '#FF8080', 4: '#FFE6E6', ol: '#FF3B3B' },
      green: { 0: '#05A660', 1: '#06C270', 2: '#39D98A', 3: '#57EBA1', 4: '#E3FFF1', ol: '#06C270' },
      blue: { 0: '#004FC4', 1: '#0063F7', 2: '#5B8DEF', 3: '#9DBFF9', 4: '#E5F0FF', ol: '#0063F7' },
      yellow: { 0: '#E6B800', 1: '#FFCC00', 2: '#FDDD48', 3: '#FDED72', 4: '#FFFEE6', ol: '#FFCC00' },
      orange: { 0: '#E67A00', 1: '#FF9000', 2: '#FDAC42', 3: '#FCCC75', 4: '#FFF8E6', ol: '#FF8800' },
      darkBlue: {0: '#1D2D5F'},
      dark: { 0: '#1C1C28', 1: '#28293D', 2: '#555770', 3: '#8F90A6', 4: '#C7C9D9', ol: '#8F90A6' },
      light: { 0: '#E4E4EB', 1: '#EBEBF0', 2: '#F2F2F5', 3: '#FAFAFC', 4: '#FFFFFF', ol: '#E4E4EB' },
    },
    extend: {
      fontSize: {
        'md': '16px',
      }
    },
  },
  plugins: [],
}
