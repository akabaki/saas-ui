'use client'

import { AuthProvider } from '@saas-ui/auth'
import { SaasProvider } from '@saas-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '#theme'

export function Provider(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <SaasProvider theme={theme}>
        <AuthProvider>{props.children}</AuthProvider>
      </SaasProvider>
    </ChakraProvider>
  )
}
