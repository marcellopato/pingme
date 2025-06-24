import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User } from '@/types';

interface LoginFormProps {
  onLogin: (user: User) => void;
  onShowRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      const user: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        username: email.split('@')[0],
        isPrivate: false
      };
      onLogin(user);
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    const user: User = {
      id: '1',
      name: 'Usuário Google',
      email: 'user@gmail.com',
      username: 'user_google',
      isPrivate: false
    };
    onLogin(user);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Entrar</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            Entrar com Google
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full mt-4"
            onClick={onShowRegister}
          >
            Não tem uma conta? Cadastre-se
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;