import { FieldError } from "../generated/graphql";

export const toErrorMap= (errors:FieldError[]) =>{//creates an utility that turns an array into an object(map)


    const errorMap:Record<string,string> ={};

    errors.forEach(({field,message})=>
    {
        errorMap[field] = message;
    });


    return errorMap; 




}