"use client";

import useFetch from "@/hooks/useFetch";
import { PersonData } from "@/types/person";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function PersonList() {
  const router = useRouter();
  const { data: people, loading, error } = useFetch<PersonData[]>("/pessoas?populate=*");

  if (loading) {
    return (
      <div className="flex items-center w-full flex-col space-y-4 p-6">
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            className="h-28 w-full max-w-sm rounded-lg bg-gray-300 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Ocorreu um erro ao carregar a lista de pessoas.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lista de Pessoas</h2>
        <button
          onClick={() => router.push("/pessoa/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Adicionar
        </button>
      </div>
      <ul className="space-y-4">
        {people?.map((person) => (
          <li
            key={person.documentId}
            className="p-4 cursor-pointer border rounded-lg shadow-sm hover:shadow-md transition duration-300"
            onClick={() => router.push(`/pessoa/${person.documentId}`)}
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {person.nome}
            </h3>
            <p className="text-gray-500">{person.email}</p>
            <p className="text-gray-400">
              Estado: {person.estado?.nome || "Não especificado"} - Cidade:{" "}
              {person.cidade?.nome || "Não especificado"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
