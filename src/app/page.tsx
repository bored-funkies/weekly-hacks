'use client';
import { authUser } from './database';
import { useEffect, useState } from 'react';
import { getFromLocalStorage, setToLocalStorage } from './utils/localStorageUtils';
import { useRouter } from 'next/navigation';

export default function Login() {

  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage && getFromLocalStorage('isLoggedIn') == "true") {
      setIsLoggedIn(true);
    }
  }, [])

  const authenticate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      if (isLoggedIn) {
        router.push('/dashboard');
      } else {
        const result = await authUser(mobile);
        setMobile(''); // reset input field
        if (localStorage) {
          setToLocalStorage('isLoggedIn', true);
          setToLocalStorage('mobile', mobile);
        }
        console.log('Login successful', result);
        //redirect to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      console.log('Login failed', error);
    }
  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Weekly Hacks</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Nothing will change unless you change
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
              Mobile Number
            </label>
            <div className="mt-2.5">
              <input
                type="tel"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            onClick={authenticate}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
