export const PasswordForm = ({handleSubmit,password,setPassword}) => {
  return (
    <form
      className="flex items-center justify-center min-h-screen bg-base-200"
      onSubmit={handleSubmit}
    >
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-80 p-6 flex flex-col gap-4 border">
        <legend className="fieldset-legend text-xl font-semibold">
          Enter Password
        </legend>

        <label className="label">Password</label>
        <input
          type="password"
          className="input input-bordered w-full"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Url Password"
          required
        />

        <button className="btn btn-success mt-4 w-full" type="submit">
          Submit
        </button>
      </fieldset>
    </form>
  );
};
