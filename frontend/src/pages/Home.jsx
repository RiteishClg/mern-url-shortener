import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Card } from "../component/Card";

const fetchUrls = async (setUrls, setLoading, setError) => {
  try {
    const res = await api.get("/api/shortUrl");
    setUrls(res.data.data);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

export const Home = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const getFinalUrls = () => {
    let temp = [...urls];

    if (search.trim() !== "") {
      temp = temp.filter((url) =>
        url.shortCode.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (filterOption === "asc") {
      temp.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (filterOption === "desc") {
      temp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (filterOption === "protected") {
      temp = temp.filter((url) => url.isProtected === true);
    }

    if (filterOption === "unprotected") {
      temp = temp.filter((url) => url.isProtected === false);
    }

    return temp;
  };

  const finalUrl = getFinalUrls()

  useEffect(() => {
    fetchUrls(setUrls, setLoading, setError);
  }, []);

  return loading ? (
    <div className="flex flex-col min-h-screen justify-center items-center text-6xl">
      Loading...
    </div>
  ) : error ? (
    <div className="flex flex-col min-h-screen justify-center items-center text-6xl">
      {error.message}
    </div>
  ) : (
    <main className="px-5 md:px-20 min-h-screen">
      <div className="my-10 flex flex-col md:flex-row gap-5 md:justify-between md:items-center">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search short code..."
            className="input input-primary w-full pr-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="select select-success w-full md:w-auto"
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option disabled value="">
            Filter By
          </option>
          <option value="asc">createdAt (asc)</option>
          <option value="desc">createdAt (desc)</option>
          <option value="protected">Protected</option>
          <option value="unprotected">UnProtected</option>
        </select>
      </div>
      <div className="py-10 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {finalUrl.length === 0 ? <div className="text-2xl">No Urls Found</div> : 
        (finalUrl.map((url) => {
          return <Card url={url} key={url._id} />;
        }))}
      </div>
    </main>
  );
};
