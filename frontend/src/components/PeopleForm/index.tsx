"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CreatePerson } from "@/types/person";
import { StateData } from "@/types/state";
import { CityData } from "@/types/city";
import { createPerson } from "@/services/personService";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório").max(250, {
    message: "Nome não pode conter mais de 250 caracteres",
  }),
  email: z
    .string()
    .nonempty("E-mail é obrigatório")
    .email("Formato de email inválido"),
  estado: z.string().nonempty("Estado é obrigatório"),
  cidade: z.string().nonempty("Cidade é obrigatória"),
});

export default function PeopleFormComponent({ states }: { states: StateData[] }) {
  const router = useRouter();
  const form = useForm<CreatePerson>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      estado: "",
      cidade: "",
    },
  });

  const { handleSubmit, setValue, watch, formState: { errors } } = form;
  const [cities, setCities] = useState<CityData[]>([]);
  const selectedState = watch("estado");

  useEffect(() => {
    const state = states.find((e) => e.documentId === selectedState);
    setCities(state ? state.cidades : []);
    setValue("cidade", "");
  }, [states, selectedState, setValue]);

  async function onSubmit(values: CreatePerson) {
    const result = await createPerson(values);

    if (result?.data.documentId) {
      router.push(`/pessoa/${result.data.documentId}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-6 max-w-xl bg-white px-8 py-6 rounded-md shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Cadastro de Pessoa
        </h2>

        <FormField
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Seu nome"
                  className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </FormControl>
              {errors.nome && (
                <FormMessage className="text-sm text-red-500">
                  {errors.nome.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600">E-mail</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="email@gmail.com"
                  className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </FormControl>
              {errors.email && (
                <FormMessage className="text-sm text-red-500">
                  {errors.email.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="estado"
          render={() => (
            <FormItem>
              <FormLabel className="text-gray-600">Estado</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value: string) => setValue("estado", value)}
                  value={selectedState || ""}
                >
                  <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                    {states.find(
                      (state) => state.documentId === watch("estado")
                    )?.nome || "Selecione o estado"}
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {states.map((estado) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={estado.documentId}
                        value={estado.documentId}
                      >
                        {estado.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {errors.estado && (
                <FormMessage className="text-sm text-red-500">
                  {errors.estado.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="cidade"
          render={() => (
            <FormItem>
              <FormLabel className="text-gray-600">Cidade</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value: string) => setValue("cidade", value)}
                  value={watch("cidade") || ""}
                  disabled={!selectedState}
                >
                  <SelectTrigger
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={!selectedState}
                  >
                    {cities.find(
                      (cidade) => cidade.documentId === watch("cidade")
                    )?.nome || "Selecione a cidade"}
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {cities.map((cidade) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={cidade.documentId}
                        value={cidade.documentId}
                      >
                        {cidade.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {errors.cidade && (
                <FormMessage className="text-sm text-red-500">
                  {errors.cidade.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Cadastrar
        </Button>
      </form>
    </Form>
  );
}