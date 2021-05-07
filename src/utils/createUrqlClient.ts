import { dedupExchange, fetchExchange } from "urql";

import { cacheExchange, query } from '@urql/exchange-graphcache';//This is a urql package that will help updates the caches on the browser
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, RegisterMutation } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";


export const createUrqlClient = (ssrExchange:any) =>({
    url: 'http://localhost:4000/graphql',
    fetchOptions:{credentials: "include" as const// this will send the cookies to the frontend
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
    
  },},}), ssrExchange, fetchExchange,],
} );