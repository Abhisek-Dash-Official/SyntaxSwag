"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "../components/loadingPage";
import Card from "../components/card";

export default function Search() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);

  const loadData = async (searchTerm) => {
    try {
      const res = await fetch(`/api/search?searchTerm=${searchTerm}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        console.log("Error while searching");
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };
  useEffect(() => {
    const searchTerm = searchParams.get("searchTerm");
    loadData(searchTerm);
  }, []);

  if (data === null) return <LoadingPage />;
  if (data.length === 0) return <p>No results found.</p>;
  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Search Results
      </h2>

      <div className="m-auto max-w-7xl flex flex-wrap justify-center items-center gap-6">
        {data.map((item) => (
          <Card product={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}
