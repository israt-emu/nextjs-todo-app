export const getAllColor = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/color`);
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to get colors");
    }
    const colors = await response.json();
    return colors;
  } catch (error) {
    console.log(error);
  }
};
