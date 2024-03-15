import useSWR from "swr";

export default function Home() {
  const { data, isLoading } = useSWR("/hello");

  return <div>{data}</div>;
}
