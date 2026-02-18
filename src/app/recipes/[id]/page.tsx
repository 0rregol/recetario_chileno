import { fetchRecipeById, fetchReviewsByRecipeId, fetchUserById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Reviews from '@/components/Reviews';
function Badge({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold bg-${color}-100 text-${color}-700 border border-${color}-200`}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await fetchRecipeById(id);
  if (!recipe) {
    notFound();
  }
  const reviews = await fetchReviewsByRecipeId(id);
  const author = await fetchUserById(recipe.authorId);
  const bgImage = recipe.image && recipe.image.startsWith('http') 
    ? recipe.image 
    : "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1200&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="relative h-[40vh] w-full bg-gray-900">
        <img 
          src={bgImage} 
          alt={recipe.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <span className="bg-[#B94E48] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4 inline-block">
              {recipe.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 shadow-sm">
              {recipe.title}
            </h1>
            {author && (
              <p className="text-white/90 text-lg font-medium">By {author.name}</p>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-12 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-100 pb-6">
            <Badge icon="🕒" text={recipe.time} color="blue" />
            <Badge 
              icon="🔥" 
              text={recipe.difficulty} 
              color={recipe.difficulty === 'Easy' ? 'green' : recipe.difficulty === 'Medium' ? 'yellow' : 'red'} 
            />
            <span className="text-gray-400 text-sm ml-auto self-center">
              Published: {new Date(recipe.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Preparation</h3>
            {recipe.description}
          </div>
          <div className="flex gap-4 pt-8 border-t border-gray-100">
            <Link 
              href="/"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition"
            >
              ← Back to Home
            </Link>
            
            <Link 
              href={`/recipes/${recipe.id}/edit`}
              className="px-6 py-3 border-2 border-[#B94E48] text-[#B94E48] font-bold rounded-lg hover:bg-[#B94E48] hover:text-white transition"
            >
              Edit Recipe
            </Link>
          </div>
        </div>
         <Reviews recipeId={recipe.id} reviews={reviews} />

      </div>
    </main>
  );
}