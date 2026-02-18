import Link from 'next/link';
import { auth } from '@/../auth'; 
import { signOut } from '@/../auth';

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-clay-red text-white shadow-md">
      {/* LADO IZQUIERDO: SOLO EL LOGO */}
      <div className="flex items-center">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase flex items-center group">
          RECETARIO <span className="mx-1 text-2xl font-light group-hover:text-gray-200 transition">|</span> CHILENO
        </Link>
      </div>
      
      {/* LADO DERECHO: BOTONES */}
      <div className="flex items-center gap-4">
        
        {/* BOTÓN PÚBLICO: SIEMPRE VISIBLE AHORA A LA DERECHA */}
        <Link 
          href="/chef" 
          className="text-sm font-bold bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition hidden sm:block"
        >
          MEET OUR CHEFS
        </Link>

        {session ? (
          <div className="flex items-center gap-4">
            {/* BOTONES SOLO PARA USUARIOS LOGUEADOS */}
            <Link href="/dashboard" className="text-sm font-bold bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition whitespace-nowrap">
              MY DASHBOARD
            </Link>
            
            <Link href="/recipes/create" className="text-sm font-bold hover:underline whitespace-nowrap hidden md:block">
              + CREATE RECIPE
            </Link>

            <form action={async () => {
              "use server";
              await signOut();
            }}>
              <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition shadow-sm border border-gray-700 whitespace-nowrap">
                SIGN OUT
              </button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-4">
             {/* BOTONES PARA NO LOGUEADOS */}
             <Link href="/login" className="bg-white text-clay-red px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition shadow-sm whitespace-nowrap">
               Sign In
             </Link>
          </div>
        )}
      </div>
    </nav>
  );
}