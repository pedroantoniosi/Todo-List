const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTasks(token: string) {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar tarefas");
  }

  return response.json();
}
