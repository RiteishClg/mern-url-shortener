import { useNavigate } from "react-router-dom";

export const Card = ({url}) => {

  const navigate = useNavigate()

  return (
    <div className="card card-dash bg-base-100 border border-white">
      <div className="card-body">
        <h2 className="card-title text-blue-200 text-2xl">
          Short Code : {url.shortCode}
        </h2>
        <p className="break-words inline-block">
          <span className="text-yellow-200">ShortUrl -</span>
          {url.shortUrl}
        </p>
        <div className="card-actions justify-end my-2">
          <button className={`btn ${url.isProtected ? "btn-warning" : "btn-accent"}`} onClick={()=>navigate(`/url/${url._id}`)}>
            More</button>
        </div>
      </div>
    </div>
  );
};
