const baseUrl = process.env.NEXT_SERVER_API_URL ?? 'http://127.0.0.1:1337'

export async function getStates() {
  const res = await fetch(`${baseUrl}/api/estados?populate=*`, {
    headers: { "Content-Type": "application/json" },
    cache: 'no-store',
  });

  const states = await res.json();

  return states.data;
}
