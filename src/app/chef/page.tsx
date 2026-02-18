import { fetchAllChefs } from '@/lib/data';
import Link from 'next/link';

export default async function ChefsPage() {
  const chefs = await fetchAllChefs();

  return (
    <main className="min-h-screen bg-zinc-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Community Chefs</h1>
          <p className="text-gray-500 text-lg">Meet the talented creators behind our recipes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {chefs.map((chef) => (
            <Link 
              key={chef.id} 
              href={`/chef/${chef.id}`}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-clay-red/30 transition-all group flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-clay-red text-2xl font-bold mb-4 group-hover:scale-110 transition-transform">
                {chef.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-clay-red transition">
                {chef.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                View Kitchen &rarr;
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}