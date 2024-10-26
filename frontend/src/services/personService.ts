import { CreatePerson } from "@/types/person";

export async function createPerson(CreatePerson: CreatePerson) {
  try {
    const response = await fetch("http://localhost:1337/api/pessoas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: { nome: CreatePerson.nome, email: CreatePerson.email },
      }),
    });

    const result = await response.json();

    if (result?.data.documentId) {
      await updatePerson(result.data.documentId, CreatePerson);

      return result;
    }

  } catch (error) {
    console.error("Erro ao criar Pessoa:", error);
  }
}

export async function updatePerson(personId: string, CreatePerson: CreatePerson) {
  try {
    await fetch(
      `http://localhost:1337/api/pessoas/${personId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { estado: CreatePerson.estado, cidade: CreatePerson.cidade },
        }),
      }
    );
  } catch (error) {
    console.error("Erro ao atualizar Pessoa:", error);
  }
}
