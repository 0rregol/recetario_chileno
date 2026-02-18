import { fetchRecipesByUserId, fetchUserById } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ChefPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chef = await fetchUserById(id);
  const recipes = await fetchRecipesByUserId(id);

  if (!chef) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-16 px-6 text-center">
          <div className="w-24 h-24 bg-clay-red rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 uppercase shadow-lg">
            {chef.name.charAt(0)}
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900">{chef.name}&apos;s Kitchen</h1>
          <p className="text-gray-500 mt-2">Authentic Recipe Collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Published Recipes ({recipes.length})</h2>
        
        {recipes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">This chef hasnt published any recipes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
                <Link href={`/recipes/${recipe.id}`} className="cursor-pointer block relative">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={recipe.image && recipe.image.startsWith('http') ? recipe.image : "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800&auto=format&fit=crop"} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-in-out" 
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur-md text-clay-red text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-gray-100 shadow-sm">
                          {recipe.category}
                        </span>
                    </div>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif line-clamp-1">
                    {recipe.title}
                  </h3>
                  
                  <p className="text-gray-500 font-light text-sm mb-6 line-clamp-2 flex-grow">
                    {recipe.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm font-medium text-gray-500 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-2">
                       🕒 {recipe.time} mins
                    </span>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
                      recipe.difficulty === 'Easy' ? 'bg-green-50 text-green-700' : 
                      recipe.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                    }`}>
                       {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}