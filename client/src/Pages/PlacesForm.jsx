import {useEffect, useState} from "react";
import PhotosUploader from "./PhotosUploader";
import axios from "axios";
import AccountNav from "./AccountNav";
import {Navigate, useParams} from "react-router-dom";

export default function PlacesForm() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get(`/places/${id}`).then((res) => {
      const {data} = res;

      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="mb-1 text-2xl mt-2">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-sm text-gray-500 mb-1">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  function handleCbClick(e) {
    const {checked, name} = e.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks([...perks.filter((selectedName) => selectedName !== name)]);
    }
  }

  async function addNewPlace(e) {
    e.preventDefault();
    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <AccountNav />
      <div>
        <form onSubmit={addNewPlace}>
          {preInput(
            "Title",
            "Title for your place. This will be the name used for advertising your listing."
          )}
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            className="md:w-2/5 px-2 py-1  rounded-lg w-full outline-none border-gray-500 border"
            placeholder="Title"
          />

          {/* /////////////////// */}

          {preInput("Address", "Address for this place.")}

          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            className="md:w-2/5 px-2 py-1 rounded-lg w-full outline-none border-gray-500 border"
            placeholder="Address"
          />

          {/* /////////////////// */}

          {preInput("Photos", "more images = better")}

          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {/* /////////////////// */}

          {preInput("Description", "Description for the place")}

          <textarea
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            className="md:w-2/5 px-2 py-1 rounded-lg w-full h-48 outline-none border-gray-500 border"
            placeholder="Description of the place"
          />

          {/* /////////////////// */}

          {preInput("Perks", "Select all the perks of your place")}

          {/* Perk Labels below */}
          <div className="grid grid-cols-2 mt-2 lg:grid-cols-4 gap-2 md:w-3/4">
            {/*  */}
            {/* Wifi */}
            <label className="flex gap-2 items-center border-2 p-4 rounded-2xl tracking-tight cursor-pointer">
              <input
                type="checkbox"
                onChange={handleCbClick}
                name="wifi"
                id=""
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                />
              </svg>

              <span>Wifi</span>
            </label>

            {/* Parking */}
            <label className="flex gap-2 items-center border-2 p-4 rounded-2xl tracking-tight cursor-pointer">
              <input
                type="checkbox"
                onChange={handleCbClick}
                name="parking"
                id=""
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>

              <span>Free Parking Spot</span>
            </label>

            {/* TV */}
            <label className="flex gap-2 items-center border-2 p-4 rounded-2xl tracking-tight cursor-pointer">
              <input type="checkbox" onChange={handleCbClick} name="tv" id="" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>

              <span>TV</span>
            </label>

            {/* Pets */}
            <label className="flex gap-2 items-center border-2 p-4 rounded-2xl tracking-tight cursor-pointer">
              <input
                type="checkbox"
                onChange={handleCbClick}
                name="pets"
                id=""
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>

              <span>Pets</span>
            </label>

            {/* Pvt Entrance */}
            <label className="flex gap-2 items-center border-2 p-4 rounded-2xl tracking-tight cursor-pointer">
              <input
                type="checkbox"
                onChange={handleCbClick}
                name="entrance"
                id=""
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>

              <span>Private Entrance</span>
            </label>
          </div>

          {/* /////////////////// */}

          {preInput(
            "Additional Information",
            "Provide additional information such as house rules etc."
          )}

          <textarea
            type="text"
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
            className="md:w-2/5 px-2 py-1 rounded-lg w-full h-48 outline-none border-gray-500 border"
            placeholder="Additional Information"
          />

          {/* /////////////////// */}

          {preInput(
            "Check-in & out times",
            "add the check-in&out times, remember to have some time window for cleaning the room between guests"
          )}
          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <h3 className="mt-2 ">Check in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                className="md:w-2/5 px-2 py-1 rounded-lg w-full outline-none border-gray-500 border"
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-2 ">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                className="md:w-2/5 px-2 py-1 rounded-lg w-full outline-none border-gray-500 border"
                placeholder="12:00"
              />
            </div>
            <div>
              <h3 className="mt-2 ">Max number of guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
                className="md:w-2/5 px-2 py-1 rounded-lg w-full outline-none border-gray-500 border"
                placeholder="Example: 5"
              />
            </div>
          </div>

          {/* Save Button */}
          <div>
            <button
              type="submit"
              className="px-4 py-2 mt-5 sm:w-32 w-full font-semibold bg-blue-500 hover:bg-blue-600 hover:shadow-md transition-all text-white rounded-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
