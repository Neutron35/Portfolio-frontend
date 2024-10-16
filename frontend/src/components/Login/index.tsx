import { DialogDescription, DialogHeader } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { apiLogin, apiUrl } from '../../env';

import { Button } from '@/components/ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useAuth } from '@/lib/authProvider';
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

function Login() {
  const { setToken } = useAuth();
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
      const response = await axios.post(`${apiUrl}${apiLogin}`, {
        email,
        password,
      });
      setToken(response.data.token);
      navigate('/', { replace: true });
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
          <FormItem className="mt-6">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="exemple@cocorico.fr" {...field} />
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
          <FormItem className="mt-4">
            <FormLabel>Mot de passe</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Votremotdepasse" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  }, [form.control]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-9/12 flex-col p-3 font-display text-lg dark:text-foreground"
      >
        <DialogHeader>
          <DialogTitle>Connexion</DialogTitle>
          <DialogDescription>
            Saisissez votre adresse mail et votre mot de passe afin de vous connecter.
          </DialogDescription>
        </DialogHeader>
        {renderEmailField}
        {renderPasswordField}
        <Button className="mt-8" type="submit">
          Se connecter
        </Button>
      </form>
    </Form>
  );
}

export default Login;
