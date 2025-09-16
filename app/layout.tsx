import { ColorModeScript, theme } from '@chakra-ui/react'

import { Provider } from './provider'

export const metadata = {
  title: 'DataConvert Pro',
  description: 'Professional data conversion platform',
}

export default function Layout(props: { children: React.ReactNode }) {
  const colorMode = theme.config.initialColorMode

  return (
    <html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
      <body className={`chakra-ui-${colorMode}`}>
        <ColorModeScript initialColorMode={colorMode} />
        <Provider>{props.children}</Provider>
      </body>
    </html>
  )
}
