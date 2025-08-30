import { useEffect, useState } from "react";
import { Testimonial } from "../types";

export function useFetch<T = Testimonial[]>(
  url: string | null,
  options?: RequestInit
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = (await res.json()) as T;
        if (!cancelled) setData(json);
      } catch (err: any) {
        if (!cancelled) setError({ message: err.message });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, options]);

  return { data, loading, error };
}