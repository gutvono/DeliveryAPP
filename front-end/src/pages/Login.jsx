import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import api from '../service/api';

const six = 6;
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(six),
});

function Login() {
  const [disableBtn, setDisableBtn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageErr, setMessageErr] = useState('');
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const rgx = /\S+@\S+\.\S+/;
    if (rgx.test(email) && password.length >= six) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [email, password]);

  async function handleLogin(data) {
    await api.post('/login', data)
      .then((token) => {
        console.log(token);
      })
      .catch(({ message, status }) => {
        console.log(status);
        setMessageErr(message);
      });
    reset();
  }
  return (
    <main>
      <form onSubmit={ handleSubmit(handleLogin) }>
        <input
          { ...register('email') }
          onChange={ ({ target: { value } }) => setEmail(value) }
          type="text"
          placeholder="email"
          data-testid="common_login__input-email"
        />
        <input
          { ...register('password') }
          onChange={ ({ target: { value } }) => setPassword(value) }
          type="password"
          placeholder="password"
          data-testid="common_login__input-password"
        />
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ disableBtn }
        >
          Entrar
        </button>
      </form>
      <button
        type="button"
        data-testid="common_login__button-register"
      >
        Ainda não tenho conta
      </button>
      {messageErr && (
        <p data-testid="common_login__element-invalid-email">{messageErr}</p>
      )}
    </main>
  );
}
export default Login;
