// export const API_BASE = (collectionId: string) =>
//   `http://localhost:3000/api/testimonials/${collectionId}`;

export const API_BASE = (collectionId?: string) => {
  if (!collectionId) return null;
  return `https://testimo-love.vercel.app/api/testimonials/${collectionId}`;
};
