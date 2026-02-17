import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-[#B94E48] text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
      
      <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Taste of Chile 🇨🇱
        </h1>
        <p className="text-xl md:text-2xl mb-10 font-light text-red-100 max-w-2xl mx-auto">
          Discover the authentic flavors of our tradition. Share your own recipes and keep our culture alive.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/recipes/create" 
              className="bg-white text-[#B94E48] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-xl transform hover:-translate-y-1"
            >
              Share Your Recipe
            </Link>
            <Link 
              href="#recipes" 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition"
            >
              Browse Recipes
            </Link>
        </div>
      </div>
    </div>
  );
}