export async function getStates() {
  const res = await fetch(`http://127.0.0.1:1337/api/estados?populate=*`, {
    headers: { "Content-Type": "application/json" },
    cache: 'no-store',
  });

  const states = await res.json();

  return states.data;
}
