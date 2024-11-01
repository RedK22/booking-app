import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function AccountPlace() {
  const {action} = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

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

  async function addPhotoByLink(e) {
    e.preventDefault();
    const {data: filename} = await axios.post("/uploadByLink", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  async function uploadPhoto(e) {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: {"Content-Type": "multipart/form-data"},
      })
      .then((response) => {
        const {data: filename} = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filename];
        });
      });
  }

  return (
    <div>
      {action !== "new" && (
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
      )}
      {action === "new" && (
        <div>
          <form>
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

            <div className="flex gap-2">
              {/* Upload by Link! */}
              <input
                type="text"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                className="md:w-2/5 px-2 py-1 rounded-lg w-full outline-none border-gray-500 border"
                placeholder="Add using a link... jpg"
              />
              <button
                onClick={addPhotoByLink}
                className="px-2 py-2 rounded-lg font-semibold bg-blue-500 text-white text-xs uppercas hover:bg-blue-600 transition-all"
              >
                Add Photo
              </button>
            </div>

            <div className=" grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4 mt-2">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  // Showing the added photos
                  <div className="">
                    {/* Image of uploaded the photo */}
                    <img
                      className="rounded-xl"
                      src={"http://localhost:4000/" + link}
                      alt="Image uploaded by the user"
                    />
                  </div>
                ))}
              {/* ////////////// */}

              <label className="h-32 w-48 flex md:w-96 items-center justify-center flex-col bg-transparent text-sm text-gray-600 border-2 rounded-xl border-gray-300 hover:border-blue-500 transition-all p-8 hover:cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept=".jpg, .jpeg, .png"
                  onChange={uploadPhoto}
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
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload from your device
              </label>
            </div>

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

            {/* Labels below */}
            <div className="grid grid-cols-2 mt-2 lg:grid-cols-4 gap-2 md:w-3/4">
              {/*  */}
              {/* Wifi */}
              <label className="flex gap-2 items-center border-2 p-4 rounded-2xl tracking-tight cursor-pointer">
                <input type="checkbox" name="" id="" />
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
                <input type="checkbox" name="" id="" />
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
                <input type="checkbox" name="" id="" />
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
                <input type="checkbox" name="" id="" />
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
                <input type="checkbox" name="" id="" />
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
              <button className="px-4 py-2 mt-5 sm:w-32 w-full font-semibold bg-blue-500 hover:bg-blue-600 hover:shadow-md transition-all text-white rounded-full">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AccountPlace;
