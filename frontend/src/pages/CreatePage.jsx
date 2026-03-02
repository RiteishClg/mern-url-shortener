import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const CreatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    originalUrl: "",
    shortCode: "",
    isProtected: false,
    password: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/shortUrl", formData);
      console.log(res);
      toast.success("Created Successfully!");
      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    }
  };

  return (
    <form
      className="flex items-center justify-center min-h-screen bg-base-200"
      onSubmit={handleSubmit}
    >
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-80 p-6 flex flex-col gap-4 border">
        <legend className="fieldset-legend text-xl font-semibold">
          Create ShortUrl
        </legend>
        <button onClick={() => navigate("/")} className="self-end text-xs text-primary">Back to Home</button>

        <label className="label">Url :</label>
        <input
          type="url"
          className="input input-bordered w-full"
          name="originalUrl"
          placeholder="https://example.com"
          onChange={handleChange}
          value={formData.originalUrl}
          required
        />

        <label className="label">ShortCode :</label>
        <input
          type="text"
          name="shortCode"
          className="input input-bordered w-full"
          placeholder="ShortCode"
          onChange={handleChange}
          value={formData.shortCode}
          required
        />

        <div className="flex justify-between items-center">
          <label className="label">Protected :</label>
          <input
            type="checkbox"
            className="toggle toggle-info"
            name="isProtected"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isProtected: e.target.checked,
              }))
            }
            checked={formData.isProtected}
          />
        </div>

        {formData.isProtected ? (
          <>
            {" "}
            <label className="label">Password :</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
            />{" "}
          </>
        ) : (
          ""
        )}

        <button className="btn btn-success mt-4 w-full" type="submit">
          Create
        </button>
      </fieldset>
    </form>
  );
};
