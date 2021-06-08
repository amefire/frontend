import {
  // Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
  Link,
} from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { NavBar } from '../components/NavBar'
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from './../utils/createUrqlClient';
import { Layout } from "../components/Layout";
//import Link from 'next/link';

import NextLink from 'next/link';

const Index = () =>{

const [{data}] =usePostsQuery();

return(
  <Layout>
    <NextLink href="/create-post">

    <Link>

    create post
    </Link>

    </NextLink>

    

    
  {/* <NavBar/> */}
  {/* <div>hello world</div> */}
  <br/>

  {!data ?<div>loading...</div> : data.posts.map(p => <div key ={p.id}>{p.title}</div>)}

  </Layout>
)
}

export default withUrqlClient(createUrqlClient,{ssr: true})(Index);
