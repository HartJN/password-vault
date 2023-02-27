import { VaultItem } from '@/pages';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFieldArray, useForm } from 'react-hook-form';
import FormWrapper from './FormWrapper';

function Vault({
  vault = [],
  vaultKey = '',
}: {
  vault: VaultItem[];
  vaultKey: string;
}) {
  const { control, register, handleSubmit } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vault',
  });
  return (
    <FormWrapper
      onSubmit={handleSubmit(({ vault }) => {
        console.log({ vault });
      })}
    >
      {fields.map((field, index) => {
        return (
          <Box
            display="flex"
            alignItems="flex-end"
            mt="4"
            mb="4"
            key={field.id}
          >
            <FormControl>
              <FormLabel htmlFor="website">Website</FormLabel>
              <Input
                type="url"
                id="website"
                placeholder="website"
                {...register(`vault.${index}.website`, {
                  required: 'Website is required',
                })}
              />
            </FormControl>

            <FormControl ml="2">
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                placeholder="username"
                {...register(`vault.${index}.username`, {
                  required: 'Username is required',
                })}
              />
            </FormControl>

            <FormControl ml="2">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="password"
                {...register(`vault.${index}.password`, {
                  required: 'Password is required',
                })}
              />
            </FormControl>

            <Button
              type="button"
              bg="red.500"
              color="white"
              fontSize="2xl"
              ml="2"
              onClick={() => remove(index)}
            >
              -
            </Button>
          </Box>
        );
      })}

      <Button
        onClick={() => append({ website: '', username: '', password: '' })}
      >
        Add
      </Button>

      <Button color="teal" ml="8" type="submit">
        Save Vault
      </Button>
    </FormWrapper>
  );
}

export default Vault;
