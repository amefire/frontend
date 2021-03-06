import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &{
    label: string;
    placeholder: string;
    
    name: string;
    textarea?: boolean; //optional
}
// '' => false
// 'error message' => true

export const InputField: React.FC<InputFieldProps> = ({label, textarea,size, ...props}) => {// passing only 'label' from props
    let InputOrTextarea = Input;
    if(textarea)
    {
        InputOrTextarea=Textarea;
    }
    const [field, {error,}] = useField(props);    
    return (
        <FormControl isInvalid={!!error}> 
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea {...field} {...props} id={field.name} placeholder={props.placeholder} />
           {error ? <FormErrorMessage>{error}</FormErrorMessage>: null}
          </FormControl>
          );
}