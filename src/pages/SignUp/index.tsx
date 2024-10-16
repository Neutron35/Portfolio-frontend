import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { apiSignup, apiUrl } from '../../env';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z
    .string()
    .min(6, { message: "Format de l'adresse mail incorrect." })
    .email({ message: "Format de l'adresse mail incorrect." }),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères.',
  }),
});

function SignUp() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const email = values.email;
    const password = values.password;
    try {
      await axios.post(`${apiUrl}${apiSignup}`, {
        email,
        password,
      });
      navigate('/');
      alert('Compte créé !');
    } catch (error) {
      console.log(error);
    }
  }

  const renderEmailField = useMemo(() => {
    return (
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input className="border border-input dark:border-input" placeholder="exemple@cocorico.fr" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  }, [form.control]);

  const renderPasswordField = useMemo(() => {
    return (
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  className="border border-input dark:border-input"
                  type="password"
                  placeholder="Votremotdepasse"
                  {...field}
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    );
  }, [form.control]);

  return (
    <Form {...form}>
      <form
        className="mx-auto flex w-4/12 flex-col items-center gap-8 rounded-2xl border border-solid border-border px-12 pb-12 pt-4 text-lg"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="mx-auto w-max text-2xl font-bold">Inscription</p>
        {renderEmailField}
        {renderPasswordField}
        <Button type="submit">S'inscrire</Button>
      </form>
    </Form>
  );
}

export default SignUp;
