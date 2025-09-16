import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/inter'
import { theme as baseTheme } from '@saas-ui/react'

import components from './components'
import { fontSizes } from './foundations/typography'

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
    colors: {
      primary: {
        50: '#fff5f0',
        100: '#ffe6d9',
        200: '#ffc9b3',
        300: '#ffa580',
        400: '#ff7a4d',
        500: '#ff5722',
        600: '#e64100',
        700: '#cc3700',
        800: '#b32d00',
        900: '#992600',
      },
      orange: {
        50: '#fff5f0',
        100: '#ffe6d9',
        200: '#ffc9b3',
        300: '#ffa580',
        400: '#ff7a4d',
        500: '#ff5722',
        600: '#e64100',
        700: '#cc3700',
        800: '#b32d00',
        900: '#992600',
      },
    },
    styles: {
      global: (props: any) => ({
        body: {
          color: 'gray.900',
          bg: 'white',
          fontSize: 'md',
          _dark: {
            color: 'white',
            bg: 'gray.900',
          },
        },
      }),
    },
    fonts: {
      heading: 'Inter Variable, Inter, sans-serif',
      body: 'Inter Variable, Inter, sans-serif',
    },
    fontSizes,
    components,
  },
  baseTheme,
)
