import Link from 'next/link';
import { auth } from '@/../auth';
import { redirect } from 'next/navigation';
import { fetchUserRecipes } from '@/lib/data';
import { deleteRecipe } from '@/lib/actions';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }
  const recipes = await fetchUserRecipes(session.user.email);
  return (
    <main className="max-w-7xl mx-auto py-12 px-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">My Recipes</h1>
          <p className="text-gray-500">Manage your shared flavors</p>
        </div>
        <Link href="/recipes/create" className="bg-[#B94E48] text-white px-6 py-2 rounded-lg font-bold">
          + Add New Recipe
        </Link>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-100">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-50 text-[#1F2937] uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
           {recipes.map((recipe) => (
              <tr key={recipe.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold uppercase text-sm">{recipe.title}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                   {new Date(recipe.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <Link href={`/recipes/${recipe.id}/edit`}className="text-blue-500 hover:text-blue-700 font-bold text-sm uppercase">Edit</Link>
                  <form action={async () => {
                      'use server';
                      await deleteRecipe(recipe.id);
             }}>
              <button type="submit" className="text-red-500 hover:text-red-700 font-bold text-sm uppercase">Delete</button>
                </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {recipes.length === 0 && (
          <div className="p-20 text-center text-gray-400">
            No recipes found. Start creating!
          </div>
        )}
      </div>
    </main>
  );
}