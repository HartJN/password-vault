import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import FormWrapper from './FormWrapper';

function RegisterForm() {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string; hashedPassword: string }>();

  return (
    <FormWrapper
      onSubmit={handleSubmit(() => {
        const email = getValues('email');
        const password = getValues('password');
      })}
    >
      <Heading>Register</Heading>
      <FormControl mt="4">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            minLength: {
              value: 4,
              message: 'Email must be at least 4 characters',
            },
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mt="4">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
    </FormWrapper>
  );
}

export default RegisterForm;
