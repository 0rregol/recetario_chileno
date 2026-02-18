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
  authorName?: string;
}

interface DatabaseResult {
  rows: Recipe[];
}

interface UserResult {
  rows: { id: string; name: string; email: string }[];
}

export async function fetchLatestRecipes(query: string = '') {
  noStore();
  try {
    const rawData = await sql`
      SELECT "Recipe".*, "User".name as "authorName"
      FROM "Recipe"
      JOIN "User" ON "Recipe"."authorId" = "User".id
      WHERE 
        "Recipe"."title" ILIKE ${`%${query}%`} OR
        "Recipe"."category" ILIKE ${`%${query}%`} OR
        "User"."name" ILIKE ${`%${query}%`}
      ORDER BY "Recipe"."createdAt" DESC
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

export async function fetchAllChefs() {
  noStore();
  try {
    const rawData = await sql`
      SELECT id, name, email FROM "User"
      ORDER BY name ASC
    `;
    
    const data = rawData as unknown;
    let rows: { id: string; name: string; email: string }[] = [];

    if (Array.isArray(data)) {
      rows = data as { id: string; name: string; email: string }[];
    } else if ((data as UserResult).rows) {
      rows = (data as UserResult).rows;
    }

    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch chefs.');
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

export async function fetchUserById(userId: string) {
  noStore();
  try {
    const rawData = await sql`
      SELECT name, email FROM "User" WHERE id = ${userId}
    `;

    const data = rawData as unknown;
    let rows: { name: string; email: string }[] = [];

    if (Array.isArray(data)) {
      rows = data as { name: string; email: string }[];
    } else if ((data as UserResult).rows) {
      rows = (data as UserResult).rows;
    }

    return rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
}

export async function fetchRecipesByUserId(userId: string) {
  noStore();
  try {
    const rawData = await sql`
      SELECT * FROM "Recipe" WHERE "authorId" = ${userId} ORDER BY "createdAt" DESC
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
    return [];
  }
}
export async function fetchReviewsByRecipeId(recipeId: string) {
  noStore();
  try {
    const rawData = await sql`
      SELECT * FROM "Review" 
      WHERE "recipeId" = ${recipeId} 
      ORDER BY "createdAt" DESC
    `;
    
    const data = rawData as unknown;
    
 
    interface Review {
      id: string;
      rating: number;
      comment: string;
      author: string;
      createdAt: Date;
    }

    let rows: Review[] = [];

    if (Array.isArray(data)) {
      rows = data as Review[];
    } else if ((data as any).rows) {
      rows = (data as any).rows;
    }

    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}