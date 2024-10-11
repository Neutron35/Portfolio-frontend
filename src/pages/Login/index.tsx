import axios from 'axios';
import { useCallback, useMemo, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiLogin, apiUrl } from '../../env';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/authProvider';

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
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="exemple@cocorico.fr" {...field} className="dark:text-text-light-500" />
            </FormControl>
            {/*
            <FormDescription>Saisissez votre adresse email.</FormDescription>
            <FormMessage />
            */}
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
                <Input type="password" placeholder="Votremotdepasse" {...field} className="dark:text-text-light-500" />
              </div>
            </FormControl>
            {/*
            <FormDescription>Saisissez votre mot de passe.</FormDescription>
            <FormMessage />
            */}
          </FormItem>
        )}
      />
    );
  }, [form.control]);

  return (
    <Form {...form}>
      <form
        className="w-4/12 pt-4 pb-12 px-12 flex flex-col mx-auto items-center rounded-2xl gap-8 text-lg bg-secondary-light-500 dark:bg-secondary-dark-500"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <p className="text-2xl font-bold w-max mx-auto">Connexion</p>
        {renderEmailField}
        {renderPasswordField}
        <Button type="submit" className="bg-primary-dark-500 dark:bg-primary-dark-500 text-text-light-500">
          Se connecter
        </Button>
      </form>
    </Form>
  );
}

export default Login;
