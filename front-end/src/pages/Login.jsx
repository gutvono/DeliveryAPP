import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../service/api';
import Header from '../components/Header';
import blobs from '../images/blobs.svg';
import delivery from '../images/delivery.svg';

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
  const navigate = useNavigate();
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
    const token = await api.post('login', data).catch(({ message, status }) => {
      setMessageErr(message);
      console.log(status, message);
    });
    console.log(token);
    reset();
  }

  return (
    <>
      <Header />

      <main
        className="max-w-[1124px] w-full mt-20
        mx-auto flex justify-between items-center px-10"
      >
        <section className="w-[1/2] ">
          <img
            className="absolute bottom-0 right-0 scale-x-[-1] opacity-80 -z-10"
            src={ blobs }
            alt="bolhas"
            width={ 350 }
            height={ 350 }
          />
          <h1 className="text-3xl font-bold text-gray-200 mb-10">
            O app com a entrega mais rapida
            <br />
            do Brasil
          </h1>
          <img
            src={ delivery }
            width={ 450 }
            height={ 400 }
            alt="um programador sentado em um puf com notebook"
          />
        </section>
        <section className="w-[1/2] ">

          <form
            className="flex flex-col items-center justify-center gap-4 text-gray-200"
            onSubmit={ handleSubmit(handleLogin) }
          >
            <input
              { ...register('email') }
              className="bg-transparent w-full border-[1.4px] border-green-500
               rounded placeholder:text-sm placeholder:text-gray-300 p-2"
              onChange={ ({ target: { value } }) => setEmail(value) }
              type="text"
              placeholder="E-mail"
              data-testid="common_login__input-email"
            />
            <input
              { ...register('password') }
              className="bg-transparent w-full border-[1.4px] border-green-500
               rounded placeholder:text-sm placeholder:text-gray-300 p-2"
              onChange={ ({ target: { value } }) => setPassword(value) }
              type="password"
              placeholder="Senha"
              data-testid="common_login__input-password"
            />
            <button
              className="flex items-center justify-center text-gray-100 gap-4 bg-green-500
               p-2 w-full rounded disabled:bg-green-700  "
              type="submit"
              data-testid="common_login__button-login"
              disabled={ disableBtn }
            >
              Entrar
            </button>
          </form>
          <div className="flex items-center justify-center gap-4 text-gray-200 mt-4">
            <div className="w-14 h-px bg-gray-300" />
            <span className="text-sm">ou</span>
            <div className="w-14 h-px bg-gray-300" />
          </div>
          <button
            className="flex items-center justify-center"
            type="button"
            data-testid="common_login__button-register"
            onClick={ () => navigate('/register') }
          >
            <p
              className="text-center border-[1.4px] border-green-500 p-2 mt-4
             text-gray-200 w-56 rounded hover:bg-green-500 transition-all
               hover:text-gray-100 "
            >
              Cadastrar
            </p>
          </button>
          {messageErr && (
            <p data-testid="common_login__element-invalid-email">{messageErr}</p>
          )}
        </section>
      </main>
    </>
  );
}

Login.propTypes = {
  disableBtn: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  messageErr: PropTypes.string,
}.isRequired;

export default Login;
