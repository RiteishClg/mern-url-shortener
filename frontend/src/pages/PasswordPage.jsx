import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { api } from "../lib/api.js";
import { PasswordForm } from "../component/PasswordForm.jsx";

export const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { shortCode, } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(`/r/${shortCode}`, { password });
      if(res.data.success){
        window.location.href = res.data.originalUrl
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    toast("This Url is password protected", {
      style: {
        background: "#facc15",
        color: "#000",
        fontWeight: "500",
      },
    });
  }, []);

  return loading ? (
    <div className="flex flex-col min-h-screen justify-center items-center text-6xl">
      Loading...
    </div>
  ) : error ? (
    <div className="flex flex-col min-h-screen justify-center items-center text-6xl">
      {error}{" "}
      <button
        onClick={() => {
          setError(false);
          setPassword("")
        }}
        className="btn btn-primary m-5"
      >
        Try Again
      </button>
    </div>
  ) : (
    <PasswordForm handleSubmit={handleSubmit} password={password} setPassword={setPassword}/>
  );
};
