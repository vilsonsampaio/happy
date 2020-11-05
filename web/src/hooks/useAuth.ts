import { useContext } from 'react';

import {  AuthContextProps, AuthContext } from '../contexts/auth';

export default function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);
  
  return context
}