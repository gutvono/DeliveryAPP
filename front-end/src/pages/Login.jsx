import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../service/api';

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

function Login() {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  async function handleLogin(data) {
    await api.post('/login', data);
    reset();
  }
  return (
    <main>
      <form onSubmit={ handleSubmit(handleLogin) }>
        <input
          { ...register('email') }
          type="text"
          placeholder="email"
        />
        <input
          { ...register('password') }
          type="text"
          placeholder="password"
        />
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
export default Login;
