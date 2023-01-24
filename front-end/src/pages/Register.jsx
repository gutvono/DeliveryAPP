/* eslint-disable max-len */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import Header from '../components/Header';

const six = 6;
const twelve = 12;
const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(six),
});

export default function Register() {
  const [disableBtn, setDisableBtn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageErr, setMessageErr] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const rgx = /\S+@\S+\.\S+/;
    if (rgx.test(email) && password.length >= six && name.length >= twelve) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) localStorage.removeItem('user');
  }, [name, email, password]);

  async function handleRegister(data) {
    await api.post('register', data).catch(({ message, status }) => {
      setMessageErr(message);
      console.log(status, message);
      if (!messageErr) navigate('/customer/products');
      reset();
    });
  }

  return (
    <>
      <Header />

      <main className="max-w-[1124px] w-full mt-20  mx-auto flex justify-between items-center px-10">

        <section className="w-[1/2] ">

          <form
            className="flex flex-col items-center justify-center gap-4 text-gray-200"
            onSubmit={ handleSubmit(handleRegister) }
          >
            <input
              { ...register('name') }
              className="bg-transparent w-full border-[1.4px] border-green-500 rounded placeholder:text-sm placeholder:text-gray-300 p-2"
              onChange={ ({ target: { value } }) => setName(value) }
              type="text"
              placeholder="Nome completo"
              data-testid="common_register__input-name"
            />
            <input
              { ...register('email') }
              className="bg-transparent w-full border-[1.4px] border-green-500 rounded placeholder:text-sm placeholder:text-gray-300 p-2"
              onChange={ ({ target: { value } }) => setEmail(value) }
              type="text"
              placeholder="E-mail"
              data-testid="common_register__input-email"
            />
            <input
              { ...register('password') }
              className="bg-transparent border-[1.4px] w-full border-green-500 rounded placeholder:text-sm placeholder:text-gray-300 p-2"
              onChange={ ({ target: { value } }) => setPassword(value) }
              type="password"
              placeholder="Senha"
              data-testid="common_register__input-password"
            />
            <button
              className="flex items-center justify-center text-gray-100 gap-4 bg-green-500 p-2 w-full rounded disabled:bg-green-700  "
              type="submit"
              data-testid="common_register__button-register"
              disabled={ disableBtn }
            >
              Cadastrar
            </button>
          </form>
          {messageErr && (
            <p data-testid="common_register__element-invalid-register">{messageErr}</p>
          )}
        </section>
      </main>
    </>
  );
}
