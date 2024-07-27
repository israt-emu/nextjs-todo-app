"use server";
//we can write database query in .ts file which uses server and also we can create api within app/api folder. The file convention for api route is same as page.

export const createTodo = async (todo: any) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to create todo");
    }
    const newTodo = await response.json();
    return newTodo;
  } catch (error) {
    console.log(error);
  }
};
export const getAllTodo = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/todo`);
    // Ensure to check and parse the response
    if (!response.ok) {
      throw new Error("Failed to get todos");
    }
    const todos = await response.json();
    return todos;
  } catch (error) {
    console.log(error);
  }
};
