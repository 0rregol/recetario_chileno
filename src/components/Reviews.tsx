'use client';

import { useState } from 'react';
import { createReview } from '@/lib/actions';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export default function Reviews({ recipeId, reviews }: { recipeId: string, reviews: Review[] }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold font-serif text-gray-900 mb-8">Reviews & Ratings</h2>

        <div className="space-y-6 mb-12">
        {reviews.length === 0 ? (
          <div className="text-center py-10 bg-zinc-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 italic">No reviews yet. Be the first to rate this recipe! 👇</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-clay-red/10 rounded-full flex items-center justify-center text-clay-red font-bold text-xs">
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-gray-900">{review.author}</span>
                </div>
                <span className="text-yellow-500 text-sm tracking-widest">
                  {'★'.repeat(review.rating)}
                  <span className="text-gray-200">{'★'.repeat(5 - review.rating)}</span>
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed ml-10">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-2 ml-10">
                {new Date(review.createdAt).toLocaleDateString('es-CL')}
              </p>
            </div>
          ))
        )}
      </div>
     <div className="bg-zinc-50 p-6 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Leave your opinion</h3>
        <form action={createReview} className="space-y-4">
          <input type="hidden" name="recipeId" value={recipeId} />
          <input type="hidden" name="rating" value={rating} />

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Rating</label>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={`text-3xl transition-colors ${
                      starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    ★
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Your Name</label>
            <input
              name="author"
              required
              placeholder="e.g. Maria Gonzalez"
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-clay-red focus:ring-1 focus:ring-clay-red bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Comment</label>
            <textarea
              name="comment"
              required
              rows={3}
              placeholder="What did you think about this recipe?"
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:border-clay-red focus:ring-1 focus:ring-clay-red bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className="w-full sm:w-auto bg-clay-red text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-[#a03e39] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            Post Review
          </button>
        </form>
      </div>
    </div>
  );
}