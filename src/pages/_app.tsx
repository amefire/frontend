import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { cacheExchange, QueryInput,Cache, query } from '@urql/exchange-graphcache';//This is a urql package that will help updates the caches on the browser
import React from 'react'
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql'
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';

import theme from '../theme'
import Login from './login';
// import { Query } from 'type-graphql';
// import { Query } from 'type-graphql';

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi:QueryInput,
  result:any,
  fn: (r:Result, q:Query) => Query
){
  return cache.updateQuery(qi, data=>fn(result,data as any) as any)
}

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions:{credentials: "include"// this will send the cookies to the frontend
},
exchanges:[dedupExchange, cacheExchange({updates: {
  Mutation: {
    logout:(_result, args, cache, info)=>
    {
      betterUpdateQuery<LogoutMutation,MeQuery>(
        cache, {query:MeDocument},
        _result,
        (result,query)=>({me:null})
      )

    },
    login: (_result, args, cache, info) => {
     // cache.updateQuery({query:MeDocument}, (data:MeQuery)=>{
        betterUpdateQuery<LoginMutation,MeQuery>(
          cache,
          {query:MeDocument}, 
          _result, 
          (result, query)=>{
          if(result.login.errors){
            return query;
          }else{
            return{me: result.login.user,};
          }
        });
    
    
  },
  register: (_result, args, cache, info) => {
    // cache.updateQuery({query:MeDocument}, (data:MeQuery)=>{
       betterUpdateQuery<RegisterMutation,MeQuery>(
         cache,
         {query: MeDocument}, 
         _result, 
         (result, query)=>{
         if(result.register.errors){
           return query;
         }else{
           return{me: result.register.user,};
         }
       });
   
   
 },
  
},},}), fetchExchange,],
});

function MyApp({ Component, pageProps }:any) {
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
