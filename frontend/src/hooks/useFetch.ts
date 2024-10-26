import { useEffect, useState } from 'react';

interface UseFetchReturn<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

function useFetch<T>(
  url: string,
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const options: RequestInit = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(`http://localhost:1337/api${url}`, options);

        if (!response.ok) {
          throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const { data } = await response.json() as { data: T };

        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erro desconhecido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
}

export default useFetch;