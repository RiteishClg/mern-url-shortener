import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import toast from "react-hot-toast";
import { PasswordForm } from "../component/PasswordForm";
import { Trash, Pencil } from "lucide-react";

const fetchUrl = async (setUrls, setLoading, setError, id) => {
  try {
    const res = await api.get(`/api/shortUrl/${id}`);
    setUrls(res.data.data);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

export const UrlDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(`/r/${url.shortCode}`, { password });
      if (res.data.success) {
        setIsVerified(true);
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/api/shortUrl/${url._id}`);

      if (res.data.success) {
        toast.success("Successfully deleted");
        navigate("/");
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchUrl(setUrl, setLoading, setError, id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen justify-center items-center text-6xl">
        Loading...
      </div>
    );
  }

  if (error) {
    <div className="flex flex-col min-h-screen justify-center items-center text-6xl">
      {error}{" "}
      <button onClick={() => navigate("/")} className="btn btn-primary m-5">
        Back to Home
      </button>
    </div>;
  }

  if (url.isProtected && !isVerified) {
    return (
      <PasswordForm
        handleSubmit={handleSubmit}
        password={password}
        setPassword={setPassword}
      />
    );
  }

  <div className="min-h-screen flex justify-center items-center px-4">
    <div className="w-full max-w-2xl bg-base-300 m-10 shadow-xl rounded-2xl p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-primary">
        URL Details
      </h1>

      <button onClick={() => navigate("/")} className="btn btn-primary">
        Back to Home
      </button>

      <div className="space-y-4 text-lg">
        <div>
          <span className="font-semibold text-success">Original URL:</span>
          <p
            className="break-words relative after:content-['Copy'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:bg-primary after:text-white after:font-semibold after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-300 p-5 bg-base-100 m-5 rounded-2xl hover:bg-base-200 border border-transparent after:rounded-2xl"
            onClick={() => {
              toast.success("Copied to Clipboard");
              navigator.clipboard.writeText(url.originalUrl);
            }}
          >
            {url.originalUrl}
          </p>
        </div>

        <div>
          <span className="font-semibold text-primary">Short Code:</span>
          <p>{url.shortCode}</p>
        </div>

        <div>
          <span className="font-semibold text-primary">Short URL:</span>
          <p
            className="break-words relative after:content-['Copy'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:bg-primary after:text-white after:font-semibold after:opacity-0 hover:after:opacity-100 after:transition-all after:duration-300 p-5 bg-base-100 m-5 rounded-2xl hover:bg-base-200 border border-transparent after:rounded-2xl"
            onClick={() => {
              toast.success("Copied to Clipboard");
              navigator.clipboard.writeText(url.shortUrl);
            }}
          >
            {url.shortUrl}
          </p>
        </div>

        <div>
          <span className="font-semibold text-primary">Protected:</span>
          <p>{url.isProtected ? "Yes" : "No"}</p>
        </div>

        <div>
          <span className="font-semibold text-primary">Total Clicks:</span>
          <p>{url.clicks}</p>
        </div>

        <div>
          <span className="font-semibold text-accent">Created At:</span>
          <p>{new Date(url.createdAt).toLocaleString()}</p>
        </div>

        <div>
          <span className="font-semibold text-accent">Last Updated At:</span>
          <p>
            {url.updatedAt
              ? new Date(url.updatedAt).toLocaleString()
              : "Not Updated Yet"}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <button
          className="btn btn-warning px-6"
          onClick={() => navigate(`/edit/${id}`)}
        >
          <Pencil />
        </button>

        <button
          className="btn btn-error px-6"
          onClick={() => setOpenConfirm(true)}
        >
          <Trash />
        </button>

        {openConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-base-100 p-6 rounded-2xl shadow-2xl w-80 space-y-4 animate-scale-in">
              <h2 className="text-xl font-bold text-error">Confirm Delete</h2>

              <p className="text-sm text-gray-500">
                Are you sure you want to delete this URL? This action cannot be
                undone.
              </p>

              <div className="flex justify-end gap-3 pt-4">
                <button className="btn" onClick={() => setOpenConfirm(false)}>
                  Cancel
                </button>

                <button
                  className="btn btn-error"
                  onClick={() => {
                    setOpenConfirm(false);
                    handleDelete();
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>;
};
