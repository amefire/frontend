import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql';
import { NavBar } from '../components/NavBar'
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from './../utils/createUrqlClient';


const Index = () =>{

const [{data}] =usePostsQuery();

return(
  <>
  <NavBar/>
  <div>hello world</div>

  {!data ?<div>loading...</div> : data.posts.map(p => <div key ={p._id}>{p.title}</div>)}

  </>
)
}

export default withUrqlClient(createUrqlClient)(Index);
