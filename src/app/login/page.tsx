'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import Link from 'next/link';

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md">
        
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black text-[#1F2937] tracking-tighter uppercase">
            RECETARIO <span className="text-[#B94E48]">/</span> CHILENO
          </Link>
          <h1 className="text-xl font-bold text-gray-500 mt-4 uppercase tracking-wide">Sign In</h1>
        </div>
        
        <form action={dispatch} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="label-form" htmlFor="email">Email Address</label>
            <input 
              id="email"
              name="email" 
              type="email" 
              className="input-field" 
              placeholder="test@test.com" 
              required 
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="label-form" htmlFor="password">Password</label>
            <input 
              id="password"
              name="password" 
              type="password" 
              className="input-field" 
              placeholder="******" 
              required 
            />
          </div>

          {/* Submit Button */}
          <LoginButton />

          {/* Error Message Display */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2 animate-pulse">
              <span>⚠️</span>
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}

// Sub-componente para manejar el estado de carga del botón
function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`btn-primary w-full ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {pending ? 'Logging in...' : 'Sign In'}
    </button>
  );
}