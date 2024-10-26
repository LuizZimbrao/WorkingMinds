"use client";

import { useRouter, useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { PersonData } from "@/types/person";
import useFetch from "@/hooks/useFetch";

export default function PersonDetail() {
  const { documentId } = useParams();
  const router = useRouter();

  const {
    data: person,
    error,
    loading,
  } = useFetch<PersonData>(`/pessoas/${documentId}?populate=*`);

  if (loading) {
    return (
      <div className="p-6 h-96 w-full max-w-xs mx-auto bg-white rounded-md shadow-md">
        <div className="h-full flex flex-col items-center justify-evenly">
          <Skeleton className="h-8 w-4/5 rounded-lg bg-gray-300 animate-pulse" />
          <Skeleton className="h-6 w-4/5 rounded-lg bg-gray-300 animate-pulse" />
          <Skeleton className="h-6 w-4/5 rounded-lg bg-gray-300 animate-pulse" />
          <Skeleton className="h-6 w-4/5 rounded-lg bg-gray-300 animate-pulse" />
          <Skeleton className="h-6 w-4/5 rounded-lg bg-gray-300 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Ocorreu um erro ao carregar as informações da pessoa.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Informações da Pessoa
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-600">Nome:</h3>
          <p className="text-gray-500">{person?.nome}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-600">E-mail:</h3>
          <p className="text-gray-500">{person?.email}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-600">Estado:</h3>
          <p className="text-gray-500">
            {person?.estado?.nome || "Não especificado"}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-600">Cidade:</h3>
          <p className="text-gray-500">
            {person?.cidade?.nome || "Não especificado"}
          </p>
        </div>
      </div>
      <button
        onClick={() => router.back()}
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Voltar
      </button>
    </div>
  );
}
