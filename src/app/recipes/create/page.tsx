import { createRecipe } from '@/lib/actions';
import Link from 'next/link';
import { auth } from '@/../auth';
import { redirect } from 'next/navigation';

export default async function CreateRecipePage() {
  // 1. Verificamos si el usuario está logueado
  const session = await auth();

  // Si no hay sesión, lo mandamos al login
  if (!session) {
    redirect('/login');
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Create New Recipe</h1>
        <p className="text-gray-500">Add a new dish to your collection.</p>
      </div>

      <form action={createRecipe} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
          <input 
            name="title" 
            type="text" 
            required 
            placeholder="Ex: Pastel de Choclo"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B94E48] outline-none" 
          />
        </div>

        {/* IMAGE URL INPUT (Igual que en Editar) */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
          <input 
            name="image" 
            type="text" 
            placeholder="https://example.com/photo.jpg"
            required 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B94E48] outline-none" 
          />
          <p className="text-xs text-gray-500 mt-1">Paste a link to an image (e.g., from Unsplash or Google Images).</p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
          <textarea 
            name="description" 
            required 
            rows={4} 
            placeholder="Tell us about the recipe..."
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
              required 
              placeholder="e.g. 45 mins"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B94E48] outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <select 
              name="category" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B94E48] outline-none bg-white"
            >
              <option value="" disabled selected>Select a category</option>
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
                  required 
                  className="accent-[#B94E48]" 
                /> {level}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard" className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-bold">
            Cancel
          </Link>
          <button type="submit" className="bg-[#B94E48] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#a1433e]">
            Save Recipe
          </button>
        </div>
      </form>
    </main>
  );
}