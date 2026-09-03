export const getImagePaths = (gameCategories) => {
  return gameCategories.flatMap(category =>
    category.items.map(item =>
      `${import.meta.env.BASE_URL}assets/categories/${encodeURIComponent(category.title)}/${encodeURIComponent(item.image)}`
    )
  );
}