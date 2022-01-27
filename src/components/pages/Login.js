import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { userLogin } from '../../redux/actions/user';
import { Loading } from '../atoms';

export default function Login({ history }) {
  const dispatch = useDispatch();
  const [didMount, setDidMount] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const redirect = localStorage.getItem('redirect');

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handlerForm = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handlerLogin = async (event) => {
    event.preventDefault();

    if (form.username.length > 1 && form.password.length > 1) {
      setIsSubmit(true);
      try {
        const result = await dispatch(userLogin(form));
        if (result.status === 200) {
          setIsSubmit(false);
          swal('Success!', 'Login Successfull!', 'success');
          history.push(redirect || '/');
        } else {
          setIsSubmit(false);

          swal('Something Happened!', result.message, 'error');
        }
      } catch (error) {
        setIsSubmit(false);

        swal('Something Happened!', 'Login Gagal', 'error');
      }
    } else {
      swal(
        'Something Happened!',
        'Username dan Password tidak boleh kosong!',
        'error',
      );
    }
  };

  useEffect(() => {
    setDidMount(true);
    return () => {
      setDidMount(false);
    };
  }, [dispatch]);

  if (!didMount) {
    return null;
  }
  return (
    <motion.div className="relative bg-white lg:bg-zinc-50 flex items-center justify-center inset-x-0 h-auto min-h-screen xl:h-full mx-auto">
      <motion.div className="flex flex-col w-full xl:w-lg p-8 gap-4 items-start bg-white xl:rounded-lg xl:shadow-lg">
        {/* Logo and Heading Dekstop */}
        <div className="xl:flex justify-between w-full hidden">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/pins.png`}
            loading="lazy"
            alt="logo"
            className="transition-all duration-500 ease-in-out h-10"
          />
        </div>
        {/* Logo and Heading Mobile */}
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/pins.png`}
          loading="lazy"
          alt="logo"
          className="transition-all duration-500 ease-in-out h-10 absolute top-4 right-4 xl:hidden"
        />

        {/* Heading Login */}
        <div className="relative inset-x-0 xl:mt-16 mt-8">
          <h1 className="text-xl xl:text-2xl font-semibold text-zinc-900">
            Login.
          </h1>
          <h2 className="text-sm font-normal mt-1 text-zinc-700">
            Happy to see you, please login to continue.
          </h2>
        </div>

        <form className="flex flex-col w-full mt-2" onSubmit={handlerLogin}>
          <div className="relative mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-normal text-opacity-70 text-zinc-600">
              Username
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="username"
                value={form.username ?? ''}
                onChange={handlerForm}
                className="text-zinc-800 focus:ring-blue-600 focus:border-sky-500 block w-full sm:text-sm border-gray-200 rounded-md py-3 placeholder-opacity-50 placeholder-gray-500"
                placeholder="your username"
              />
            </div>
          </div>

          <div className="relative mb-8">
            <label
              htmlFor="password"
              className="block text-sm font-normal text-opacity-70 text-zinc-600">
              Password
            </label>
            <div className="mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password ?? ''}
                onChange={handlerForm}
                placeholder="your password"
                name="password"
                className="text-zinc-800 focus:ring-blue-600 focus:border-sky-500 block w-full sm:text-sm border-gray-200 rounded-md py-3 placeholder-opacity-50 placeholder-gray-500"
              />
              <button
                type="button"
                className="absolute right-4 top-10 "
                style={{
                  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                }}
                onClick={() => setshowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOffIcon className="text-zinc-400 h-6 cursor-pointer" />
                ) : (
                  <EyeIcon className="text-zinc-400 h-6 cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <button
            disabled={isSubmit}
            type="submit"
            className={[
              'bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out py-3 rounded-md text-white font-semibold mt-4 w-full flex justify-center items-center disabled:opacity-40',
              isSubmit && 'bg-opacity-20',
            ].join(' ')}>
            {isSubmit && <Loading color="white" height={6} />}
            Login
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
