import { CityData } from "./city";
import { StateData } from "./state";

export type PersonData = {
  documentId: string;
  nome: string;
  email: string;
  estado: StateData;
  cidade: CityData;
}

export type CreatePerson = {
  nome: string;
  email: string;
  estado: string;
  cidade: string;
}