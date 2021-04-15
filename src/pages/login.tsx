import React from 'react'
import {Field, Form, Formik} from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Box } from '@chakra-ui/react';
import { gql, useMutation } from 'urql';
import { useLoginMutation } from '../generated/graphql';
//import { Response } from 'express';

//import { useRegisterMutation } from './../../../../trading-platform/src/generated/graphql';
//import { errors } from './../../.next/static/chunks/main';
import { toErrorMap } from './../utils/toErrorMap';
import {useRouter} from "next/router";


// const REGISTER_MUT =`mutation Register($username:String!, $password:String!){
//     register(options:{ username: $username password: $password  }){
      
//       errors{
//       field
//       message
//     }
//       user{
       
//         username
//         createdAt
//         updatedAt
        
//       }
      
//     }
//   }`

      
    
  

 const Login: React.FC<{}> = ({}) => {
   const router = useRouter();
    //const [,register] = useMutation(REGISTER_MUT)
    const [,login] = useLoginMutation() ;  
    return (
            <Wrapper variant="small"><Formik
            initialValues={{ username: "", password:"" }}
            onSubmit={async(values, {setErrors}) => {
               // register({username:values.username, password: values.password});
              
              
              // const response = await register(values);

              const response = await login(values);
              if(response.data?.login.errors)
              {
                //creates an utility called toErrorMap that turns an array into an object(map)

                setErrors(toErrorMap(response.data.login.errors))


              }

              else if(response.data?.login.user){

                  router.push("/");
              }
    
             // response.data.register?.user?.id;
              
               //console.log(values);
            //   setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2))
            //     actions.setSubmitting(false)
            //   }, 1000)
            }
        }
          >
            {({isSubmitting}) => (
              <Form>
                
                    <Box><InputField name="username"
                    placeholder="username"
                    label="username"/>
                    </Box>

                    <Box mt={4}><InputField name="password"
                    placeholder="password"
                    label="password"
                    type="password"/>
                    </Box>

                    <Button mt={4} type = "submit" color="teal" isLoading={isSubmitting}> Login</Button>


                
              </Form>
            )}
          </Formik>
          </Wrapper>
        );
}

export default Login;