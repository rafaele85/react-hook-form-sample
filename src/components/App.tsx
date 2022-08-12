import React from "react";
import {Resolver, ResolverResult, useForm} from "react-hook-form";
import {UseFormProps} from "react-hook-form/dist/types";
import styled from "styled-components";

type MyFormValues = {
    firstName: string;
    lastName: string;
}

type Context = {
    ccc: number
}

const resolver: Resolver<MyFormValues> = (values) => {
    const resolverResult: ResolverResult<MyFormValues> = {
        values: values.firstName && values.lastName ? values: {},
        errors: {
            firstName: values.firstName ? undefined : {
                type: 'required',
                message: 'First name is required',
            },
            lastName: values.lastName ? undefined : {
                type: 'required',
                message: 'Last name is required',
            }
        }
    }
    return resolverResult
}

const formProps: UseFormProps<MyFormValues, Context> = {
    resolver,
    context: { ccc: 1},
    defaultValues: {firstName: '', lastName: ''},
    criteriaMode: 'firstError',
    mode: 'onTouched',
    delayError: 1,
    reValidateMode: 'onBlur',
    shouldFocusError: true,
    shouldUnregister: true,
    shouldUseNativeValidation: true,
}

export const App: React.FC = () => {
    const {register, formState: { errors }, handleSubmit} = useForm<MyFormValues>(formProps)

    console.log('---errors=', errors)

    const onSubmit = handleSubmit(
        (data: MyFormValues) => {
            console.log(data)
        }
    )

    const firstNameProps = register('firstName')
    const lastNameProps = register('lastName')

    return (
        <div>
            App
            <StyledForm onSubmit={onSubmit}>
                <FormControl>
                    <input
                        name={firstNameProps.name}
                        min={firstNameProps.min}
                        max={firstNameProps.max}
                        minLength={firstNameProps.minLength}
                        maxLength={firstNameProps.maxLength}
                        onChange={firstNameProps.onChange}
                        onBlur={firstNameProps.onBlur}
                        pattern={firstNameProps.pattern}
                        required={firstNameProps.required}
                        disabled={firstNameProps.disabled}
                        ref={firstNameProps.ref}

                        placeholder={'First name'}
                    />
                    {errors.firstName && <Error>{errors.firstName?.message}</Error>}
                </FormControl>

                <FormControl>
                    <input
                        name={lastNameProps.name}
                        min={lastNameProps.min}
                        max={lastNameProps.max}
                        minLength={lastNameProps.minLength}
                        maxLength={lastNameProps.maxLength}
                        onChange={lastNameProps.onChange}
                        onBlur={lastNameProps.onBlur}
                        pattern={lastNameProps.pattern}
                        required={lastNameProps.required}
                        disabled={lastNameProps.disabled}
                        ref={lastNameProps.ref}

                        placeholder={'Last name'}
                    />
                    {errors.lastName && <Error>{errors.lastName?.message}</Error>}
                </FormControl>

                <input type={'submit'} />
            </StyledForm>
        </div>
    )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;   
`

const Error = styled.span`
  color: red;    
`