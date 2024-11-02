import {Link} from "react-router-dom";
import AccountNav from "./AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";

export default function AccountPlace() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({data}) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="bg-blue-500 inline-flex gap-1 items-center text-white py-2 px-4 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Place
        </Link>
      </div>
      <div className="mt-5 flex gap-2 flex-col items-center justify-center">
        {places.length > 0 &&
          places.map((place) => (
            // Putting Every Place Here
            <Link
              to={"/account/places/" + place._id}
              className="border-2 mb-4 border-blue-500 bg-gray-100 flex gap-4 w-[60%] rounded-xl px-4 py-2"
              key={place.title}
            >
              {/* Images */}
              <div className="w-32 h-32  bg-gray-200 rounded-xl">
                {place.photos.length > 0 && (
                  <img src={place.photos[0]} alt="a" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-semibold">{place.title}</h2>
                <p className="text-sm tracking-tight">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
