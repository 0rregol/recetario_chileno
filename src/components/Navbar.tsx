import Link from 'next/link';
import { auth } from '../../auth'; 
import { logout } from '@/lib/actions';

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center px-10 py-3 bg-clay-red text-white shadow-md">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase flex items-center">
          RECETARIO <span className="mx-1 text-2xl">/</span> CHILENO
        </Link>
      </div>
      
      <div>
        {session ? (
          <div className="flex items-center gap-6">
            <Link href="/recipes/create" className="text-sm font-bold hover:underline">+ CREATE RECIPE</Link>
            <form action={logout}>
              <button className="bg-white/20 px-4 py-1.5 rounded text-xs font-bold hover:bg-white/30 transition-all border border-white/40">
                SIGN OUT
              </button>
            </form>
          </div>
        ) : (
          <Link href="/login" className="bg-white/20 px-6 py-2 rounded text-sm font-bold hover:bg-white/30 transition-all border border-white/40">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}