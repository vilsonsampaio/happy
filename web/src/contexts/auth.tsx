import React, { createContext, useCallback, useEffect, useState } from 'react';  
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
  remember_me: boolean;
}

export interface AuthContextProps {
  authenticated: boolean;
  handleSignIn(credentials: SignInCredentials): Promise<void>;
  handleSignOut(): void;
  loading: boolean;
}

interface User {
  token: string;
}

const TOKEN_KEY = "HAPPY@TOKEN";

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignOut = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);

    setAuthenticated(false);

    api.defaults.headers.authorization = undefined;

    history.push('/sign-in');

    console.log('Saiu!');
  }, [history]);


  // Doing auto Sign In
  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_KEY);

    if (!token) {
      return;
    }
    
    setLoading(true);

    api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;

    api
      .get('/auth')
      .then(response => {
        if (response.data.ok === true) {
          setAuthenticated(true);
        }

        console.log('Login automático bem sucedido!');

        history.push('/dashboard');
      })
      .catch(error => {
        console.error(error);

        if (error.response) {
          if (error.response.data.message === "Token is invalid") {
            toast.error('Token inválido!');
          }

          console.error(error.response.data.message);
        }

        handleSignOut();
      });

      setLoading(false);
  }, [history, handleSignOut]);

  async function handleSignIn(credentials: SignInCredentials) {
    try {
      setLoading(true);
      
      const response = await api.post<User>('sign-in', credentials);

      window.localStorage.setItem(TOKEN_KEY, JSON.stringify(response.data.token));

      api.defaults.headers.authorization = `Bearer ${response.data.token}`;

      setAuthenticated(true);
      
      console.log('Login bem sucedido!');

      history.push('/dashboard');
    } catch (error) {
      setAuthenticated(false);

      console.error(error);

      if (error.response) {
        if (error.response.data.message === "User not found") {
          toast.error('E-mail não cadastrado!');
        }

        if (error.response.data.message === "Password does not match") {
          toast.error('Senha não confere!');
        }

        console.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  }

  
  return (
  <AuthContext.Provider value={{ authenticated, handleSignIn, handleSignOut, loading }}>
    {children}
  </AuthContext.Provider>);
} 