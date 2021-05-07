import React from 'react'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from './../utils/createUrqlClient';
import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import router from 'next/router';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { toErrorMap } from '../utils/toErrorMap';
import login from './login';
import { useForgotPasswordMutation } from '../generated/graphql';
import { useState } from 'react';

// import {
//   useChangePasswordMutation,
//   useForgotPasswordMutation,
//   MeDocument,
//   MeQuery,
// } from "./../generated/graphql";



 const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [,forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword({email:values.email});
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              if an account with that email exists, we sent you can email
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>) 
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);