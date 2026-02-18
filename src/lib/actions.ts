'use server';

import { signIn, signOut } from '../../auth';
import { auth } from '@/../auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// --- DEFINICIÓN DE TIPOS ---
interface DatabaseResponse {
  rows?: { id: string }[];
}

// --- AUTENTICACIÓN ---

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/' });
}

// --- CRUD DE RECETAS ---

export async function createRecipe(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('User not authenticated');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const time = formData.get('time') as string;
  const difficulty = formData.get('difficulty') as string;
  const category = formData.get('category') as string;
  
  // AHORA ES SIMPLE: Leemos la URL directamente como texto
  // Si viene vacío, ponemos una imagen por defecto
  const image = (formData.get('image') as string) || '/file.svg';

  try {
    const rawData = await sql`
      SELECT id FROM "User" WHERE email = ${session.user.email}
    `;

    const data = rawData as unknown as DatabaseResponse;
    const usersList = Array.isArray(rawData) ? rawData : (data.rows ? data.rows : []);

    if (!usersList || usersList.length === 0) {
      throw new Error('User not found in database');
    }

    const authorId = usersList[0].id;

    await sql`
      INSERT INTO "Recipe" (
        "title", 
        "description", 
        "image", 
        "time", 
        "difficulty", 
        "category", 
        "authorId", 
        "createdAt", 
        "updatedAt"
      )
      VALUES (
        ${title}, 
        ${description}, 
        ${image}, 
        ${time}, 
        ${difficulty}, 
        ${category}, 
        ${authorId}, 
        NOW(), 
        NOW()
      )
    `;

    revalidatePath('/dashboard');

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create recipe');
  }

  redirect('/dashboard');
}

export async function updateRecipe(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('User not authenticated');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const time = formData.get('time') as string;
  const difficulty = formData.get('difficulty') as string;
  const category = formData.get('category') as string;
  
  // 1. Intentamos leer la nueva URL que el usuario escribió
  let image = formData.get('image') as string;

  // 2. Si el usuario dejó el campo vacío, usamos la imagen que ya tenía (currentImage)
  if (!image || image.trim() === '') {
    image = formData.get('currentImage') as string;
  }

  try {
    await sql`
      UPDATE "Recipe"
      SET 
        title = ${title},
        description = ${description},
        image = ${image},
        time = ${time},
        difficulty = ${difficulty},
        category = ${category},
        "updatedAt" = NOW()
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update recipe');
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteRecipe(id: string) {
  try {
    await sql`DELETE FROM "Recipe" WHERE id = ${id}`;
    revalidatePath('/dashboard');
    return { message: 'Deleted Recipe.' };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database Error: Failed to Delete Recipe.' };
  }
}
export async function createReview(formData: FormData) {
  const recipeId = formData.get('recipeId') as string;
  const author = formData.get('author') as string;
  const comment = formData.get('comment') as string;
  const rating = formData.get('rating') as string;

  if (!recipeId || !author || !comment || !rating) {
    return;
  }

  try {
    await sql`
      INSERT INTO "Review" (rating, comment, author, "recipeId", "createdAt")
      VALUES (${Number(rating)}, ${comment}, ${author}, ${recipeId}, NOW())
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create review.');
  }

  revalidatePath(`/recipes/${recipeId}`);
  redirect(`/recipes/${recipeId}`);
}