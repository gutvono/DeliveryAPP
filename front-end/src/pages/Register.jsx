import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../service/api';
import Logo from '../images/logo2.svg';
import Blobs from '../images/blobs.svg';
import RegisterJson from '../images/register.json.json';

const six = 6;
const twelve = 12;
const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(six),
});

function Register() {
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

  function handleRegister(body) {
    api.post('register', body)
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/customer/products');
      })
      .catch(({ response: { data: { message } } }) => {
        setMessageErr(message);
        reset();
      });
  }

  return (
    <>
      <header
        className="max-w-[1100px] flex items-center justify-between mx-auto"
      >
        <div
          className="flex items-center justify-center gap-4 p-8"
        >
          <img
            src={ Logo }
            alt=""
          />
          <h2
            className="text-gray-200 font-semibold text-xl"
          >
            App delivery

          </h2>

        </div>
      </header>
      <main
        className="max-w-[1124px] w-full mt-20
      mx-auto flex justify-between items-center px-10"
      >
        <section>
          <img
            className="absolute bottom-0 right-0 scale-x-[-1] opacity-80 -z-10"
            src={ Blobs }
            alt=""
            width={ 350 }
            height={ 350 }
          />
          <Player
            autoplay
            loop
            src={ RegisterJson }
            style={ { height: '350px', width: '350px' } }
          />
        </section>
        <section className="w-[1/2] ">
          <form
            className="flex flex-col items-center justify-center gap-4 text-gray-200 "
            onSubmit={ handleSubmit(handleRegister) }
          >
            <input
              { ...register('name') }
              className="bg-transparent border-[1.4px] border-green-500 w-[15rem]
                rounded placeholder:text-sm placeholder:text-gray-300 p-2"
              onChange={ ({ target: { value } }) => setName(value) }
              type="text"
              placeholder="Nome completo"
              data-testid="common_register__input-name"
            />
            <input
              { ...register('email') }
              className="bg-transparent border-[1.4px] border-green-500 w-[15rem]
                rounded placeholder:text-sm placeholder:text-gray-300 p-2"
              onChange={ ({ target: { value } }) => setEmail(value) }
              type="text"
              placeholder="E-mail"
              data-testid="common_register__input-email"
            />
            <input
              { ...register('password') }
              className="bg-transparent border-[1.4px] border-green-500 w-[15rem]
                rounded placeholder:text-sm placeholder:text-gray-300 p-2"
              onChange={ ({ target: { value } }) => setPassword(value) }
              type="password"
              placeholder="Senha"
              data-testid="common_register__input-password"
            />
            <button
              className="flex items-center justify-center
                w-full text-gray-100 gap-4 bg-green-500
                p-2 rounded disabled:bg-green-700  "
              type="submit"
              data-testid="common_register__button-register"
              disabled={ disableBtn }
            >
              Cadastrar
            </button>
          </form>
          {messageErr && (
            <p data-testid="common_register__element-invalid_register">{messageErr}</p>
          )}
        </section>
      </main>
    </>
  );
}

Register.propTypes = {
  disableBtn: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  messageErr: PropTypes.string,
}.isRequired;

export default Register;
