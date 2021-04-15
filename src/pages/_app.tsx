import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import React from 'react'
import { Provider, createClient } from 'urql'

import theme from '../theme'

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions:{credentials: "include"// this will send the cookies to the frontend
},
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
    </Provider>
  )
}

export default MyApp
