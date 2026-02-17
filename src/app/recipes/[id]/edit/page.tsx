import { updateRecipe } from '@/lib/actions';
import { fetchRecipeById } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. Esperamos a que los params se resuelvan (Requisito de Next.js 15)
  const { id } = await params;

  // 2. Pedimos los datos actuales de la receta
  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    notFound();
  }
  
  const updateRecipeWithId = updateRecipe.bind(null, recipe.id);

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Edit Recipe</h1>
      </div>

      <form action={updateRecipeWithId} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        
        {/* INPUT OCULTO: Guarda la URL actual por si no la cambian */}
        <input type="hidden" name="currentImage" value={recipe.image} />

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
          <input 
            name="title" 
            type="text" 
            defaultValue={recipe.title} 
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B94E48] outline-none" 
          />
        </div>

        {/* IMAGE URL INPUT (CORREGIDO: Tipo Text para pegar enlaces) */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
          <input 
            name="image" 
            type="text" 
            placeholder="https://example.com/photo.jpg"
            defaultValue={recipe.image} 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B94E48] outline-none" 
          />
          <p className="text-xs text-gray-500 mt-1">Paste a link to an image (e.g., from Unsplash or Google Images).</p>
          
          {/* Previsualización pequeña si ya hay imagen */}
          {recipe.image && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Current image:</p>
              <img src={recipe.image} alt="Current" className="w-20 h-20 object-cover rounded border" />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
          <textarea 
            name="description" 
            required 
            rows={4} 
            defaultValue={recipe.description}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B94E48] outline-none" 
          />
        </div>

        {/* Time & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
            <input 
              name="time" 
              type="text" 
              defaultValue={recipe.time} 
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B94E48] outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <select 
              name="category" 
              defaultValue={recipe.category} 
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B94E48] outline-none bg-white"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>
        </div>

        {/* Difficulty */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
          <div className="flex gap-4">
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <label key={level} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="difficulty" 
                  value={level} 
                  defaultChecked={recipe.difficulty === level}
                  required 
                  className="accent-[#B94E48]" 
                /> {level}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/dashboard" className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-bold">
            Cancel
          </Link>
          <button type="submit" className="bg-[#B94E48] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#a1433e]">
            Update Recipe
          </button>
        </div>
      </form>
    </main>
  );
}