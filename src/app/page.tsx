import { fetchLatestRecipes } from '@/lib/data';
import Footer from '@/components/Footer'; 
import Link from 'next/link';
import Search from '@/components/Search';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {

  const { query } = await searchParams;
  const recipes = await fetchLatestRecipes(query || '');
  const bannerImage = "https://www.recetasnestle.cl/sites/default/files/srh_recipes/44c7532f6cc86a1a506e546eb8e493eb.jpg";

  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col">
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <img src={bannerImage} alt="Chilean Food" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black/80 via-black/50 to-black/60"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto -mt-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight drop-shadow-lg">
            Authentic Flavors of <span className="text-clay-red">Chile</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-md font-light">
            Discover our traditional recipes. Cook, share, and keep our culinary culture alive.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/recipes/create" className="btn-primary">
              + Create Recipe
            </Link>
            <a href="#recipes" className="btn-secondary">
              Explore Recipes
            </a>
          </div>
        </div>
      </div>
      <div id="recipes" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 flex-grow w-full relative z-20">
       
        <div className="max-w-3xl mx-auto -mt-12 mb-16 relative z-30">
          <div className="bg-white p-3 rounded-2xl search-container-shadow flex items-center">
             <div className="flex-grow">
                <Search />
             </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-5">
          <h2 className="text-3xl font-bold text-gray-900">
            {query ? `Results for "${query}"` : 'Latest Recipes'}
          </h2>
          <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full text-sm">
            {recipes.length} recipes
          </span>
        </div>
        
        {recipes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
            <p className="text-gray-500 text-xl font-medium">
              {query ? `No recipes found for "${query}" 🥄` : 'No recipes yet. Be the first to share one!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-[2rem] shadow-sm hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all duration-300 border border-gray-100/50 overflow-hidden flex flex-col h-full group">
                
                <Link href={`/recipes/${recipe.id}`} className="cursor-pointer block relative">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={recipe.image && recipe.image.startsWith('http') ? recipe.image : "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800&auto=format&fit=crop"} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="absolute top-5 left-5">
                        <span className="bg-white/95 backdrop-blur-md text-clay-red text-xs font-extrabold px-4 py-2 rounded-full shadow-sm uppercase tracking-wider">
                          {recipe.category}
                        </span>
                    </div>
                  </div>
                </Link>

                <div className="p-7 flex flex-col flex-grow">
                  <Link href={`/recipes/${recipe.id}`} className="cursor-pointer block">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-clay-red transition leading-tight font-serif">
                      {recipe.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 font-light text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
                    {recipe.description}
                  </p>
                  <div className="flex items-center justify-between text-sm font-medium text-gray-500 pt-5 border-t border-dashed border-gray-100">
                    <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-full">
                       <span>🕒</span> 
                       <span>{recipe.time} mins</span>
                    </div>
                    <span className={`flex items-center gap-1.5 pl-3 pr-4 py-1.5 rounded-full ${
                      recipe.difficulty === 'Easy' ? 'bg-green-50 text-green-700' : 
                      recipe.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ring-2 ring-offset-1 ${
                        recipe.difficulty === 'Easy' ? 'bg-green-500 ring-green-200' : 
                        recipe.difficulty === 'Medium' ? 'bg-yellow-500 ring-yellow-200' : 'bg-red-500 ring-red-200'
                      }`}></span>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}