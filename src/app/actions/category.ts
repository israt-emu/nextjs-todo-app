export const getAllCategory = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/category`);
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to get categories");
    }
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
};
