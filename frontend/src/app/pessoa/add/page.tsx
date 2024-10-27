import PeopleForm from "@/components/PeopleForm";
import { getStates } from "@/services/getStates";
import { StateData } from "@/types/state";

export default async function AddPessoa() {
  const states: StateData[] = await getStates();

  return <PeopleForm states={states} />;
}
