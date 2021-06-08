import { Box, Flex, Link, Button } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link';
import { useMeQuery, useLoginMutation, useLogoutMutation } from './../generated/graphql';
import { isServer } from './../utils/isServer';

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
   const [{fetching: logoutFetching},logout] = useLogoutMutation();
    const [{data,fetching}] = useMeQuery({
      pause: isServer(),
    });
   
   let body = null

   if(fetching){
       //data is loading
       body = null

   }
   else if(!data?.me){
       //user not logged in
      body=(
      <>
      <NextLink href="/login">
      <Link mr={2}>login</Link>
    </NextLink>
    <NextLink href="/register">
      <Link>register</Link>
    </NextLink>
    
    </>) 

   }
   else{
       //user is logged in
       body=(<Flex><Box mr={2} >{data.me.username}</Box>
       <Button onClick={()=> logout()} isLoading={logoutFetching} variant="link">Logout</Button></Flex>)
   }
   return (

            <>
            <Flex zIndex={1} postition ="sticky" top={0} bg="tan" p={4} align="center">
                
            <Box ml={"auto"}>
            
                    {body}
            
            </Box>
            </Flex>
          </>
        );
}