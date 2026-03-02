import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const fetchUrl = async (
  setUrls,
  setLoading,
  setError,
  id,
  setOriginalUrl,
  setShortCode,
  setIsProtected,
) => {
  try {
    const res = await api.get(`/api/shortUrl/${id}`);
    setUrls(res.data.data);
    setOriginalUrl(res.data.data.originalUrl);
    setShortCode(res.data.data.shortCode);
    setIsProtected(res.data.data.isProtected);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

export const EditPage = () => {
  const [url, setUrl] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [password, setPassword] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      originalUrl,
      shortCode,
      password,
      newPassword,
      isProtected,
    };
    try {
      const res = await api.put(`/api/shortUrl/${id}`, formData);
      if (res.data.success) {
        toast.success("Edited Successfully!");
        navigate("/");
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      setError(msg);
    }
  };

  useEffect(() => {
    fetchUrl(
      setUrl,
      setLoading,
      setError,
      id,
      setOriginalUrl,
      setShortCode,
      setIsProtected,
    );
  }, [id]);

  return loading ? (
    <div className="flex flex-col min-h-screen justify-center items-center text-6xl">
      Loading...
    </div>
  ) : error ? (
    <div className="flex flex-col min-h-screen justify-center items-center text-6xl">
      {error}{" "}
      <button onClick={() => navigate("/")} className="btn btn-primary m-5">
        Back to Home
      </button>
    </div>
  ) : (
    <form
      className="flex items-center justify-center min-h-screen bg-base-200"
      onSubmit={handleSubmit}
    >
      <fieldset className="fieldset mx-5 flex-col bg-base-200 border-accent rounded-box w-md border p-4 justify-center flex">
        <legend className="fieldset-legend">Edit Url</legend>

        <label className="label">Url:</label>
        <input
          type="url"
          className="input"
          placeholder="Url"
          name="originalUrl"
          onChange={(e) => {
            setOriginalUrl(e.target.value);
          }}
          value={originalUrl}
          required
        />

        <label className="label">ShortCode:</label>
        <input
          type="text"
          className="input"
          placeholder="my-awesome-page"
          name="shortCode"
          onChange={(e) => {
            setShortCode(e.target.value);
          }}
          value={shortCode}
          required
        />
        <div className="flex justify-between items-center">
          <label className="label">Protected :</label>
          <input
            type="checkbox"
            className="toggle toggle-info"
            name="isProtected"
            onChange={(e) => setIsProtected(e.target.checked)}
            checked={isProtected}
          />
        </div>

        {url.isProtected ? (
          <>
            <p className="my-5">
              This Url is Protected -:{" "}
              <span className="text-error">Password required</span>
            </p>
            <label className="label">Current Password:</label>
            <input
              type="password"
              className="input"
              placeholder="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />

            {isProtected ? (
              <>
                <label className="label">New Password:</label>
                <input
                  type="password"
                  className="input"
                  placeholder="(optional)"
                  name="newPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        {!url.isProtected ? (
          isProtected ? (
            <>
              <label className="label">Password:</label>
              <input
                type="password"
                className="input"
                placeholder="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <button className="btn btn-primary self-center m-5 w-full">Edit</button>
      </fieldset>
    </form>
  );
};
