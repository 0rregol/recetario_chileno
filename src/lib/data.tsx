import { sql } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

interface DatabaseResult {
  rows: Recipe[];
}
export async function fetchLatestRecipes(query: string = '') {
  noStore();
  try {
    const rawData = await sql`
      SELECT * FROM "Recipe"
      WHERE 
        "title" ILIKE ${`%${query}%`} OR
        "category" ILIKE ${`%${query}%`}
      ORDER BY "createdAt" DESC
      LIMIT 9
    `;
    
    const data = rawData as unknown;
    let rows: Recipe[] = [];

    if (Array.isArray(data)) {
      rows = data as Recipe[];
    } else if ((data as DatabaseResult).rows) {
      rows = (data as DatabaseResult).rows;
    }

    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipes.');
  }
}

export async function fetchUserRecipes(userEmail: string) {
  noStore();
  try {
    const rawData = await sql`
      SELECT * FROM "Recipe" 
      WHERE "authorId" = (SELECT id FROM "User" WHERE email = ${userEmail})
      ORDER BY "createdAt" DESC
    `;

    const data = rawData as unknown;
    let rows: Recipe[] = [];

    if (Array.isArray(data)) {
      rows = data as Recipe[];
    } else if ((data as DatabaseResult).rows) {
      rows = (data as DatabaseResult).rows;
    }

    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user recipes.');
  }
}

export async function fetchRecipeById(id: string) {
  noStore();
  try {
    const rawData = await sql`SELECT * FROM "Recipe" WHERE id = ${id}`;

    const data = rawData as unknown;
    let rows: Recipe[] = [];

    if (Array.isArray(data)) {
      rows = data as Recipe[];
    } else if ((data as DatabaseResult).rows) {
      rows = (data as DatabaseResult).rows;
    }

    return rows[0]; 
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipe.');
  }
}
