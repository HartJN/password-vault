import { loginUser } from '@/api';
import { decryptVault, generateVaultKey, hashPassword } from '@/crypto';
import { VaultItem } from '@/pages';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import FormWrapper from './FormWrapper';

function LoginForm({
  setVaultKey,
  setStep,
  setVault,
}: {
  setVaultKey: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<'login' | 'register' | 'vault'>>;
  setVault: Dispatch<SetStateAction<VaultItem[]>>;
}) {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string; hashedPassword: string }>();

  const mutation = useMutation(loginUser, {
    onSuccess: ({ salt, vault }) => {
      const hashedPassword = getValues('hashedPassword');

      const email = getValues('email');

      const vaultKey = generateVaultKey({ hashedPassword, email, salt });

      window.sessionStorage.setItem('vk', vaultKey);

      const decryptedVault = decryptVault({ vault, vaultKey });

      setVaultKey(vaultKey);
      setVault(decryptedVault);

      window.sessionStorage.setItem('vault', JSON.stringify(decryptedVault));

      setStep('vault');
    },
  });

  return (
    <FormWrapper
      onSubmit={handleSubmit(() => {
        const email = getValues('email');
        const password = getValues('password');

        const hashedPassword = hashPassword(password);

        setValue('hashedPassword', hashedPassword);

        mutation.mutate({
          email,
          hashedPassword,
        });
      })}
    >
      <Heading>Login</Heading>
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

      <Button type="submit">{isSubmitting ? 'Loading...' : 'Login'}</Button>
    </FormWrapper>
  );
}

export default LoginForm;
