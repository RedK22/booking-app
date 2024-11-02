import {useState} from "react";
import axios from "axios";

export default function PhotosUploader({addedPhotos, onChange}) {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(e) {
    e.preventDefault();
    const {data: filename} = await axios.post("/uploadByLink", {
      link: photoLink,
    });
    onChange((prev) => {
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
        onChange((prev) => {
          return [...prev, ...filename];
        });
      });
  }

  return (
    <>
      {" "}
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
      <div className=" grid gap-2 grid-cols-3 lg:grid-cols-5 md:grid-cols-4 mt-2">
        {addedPhotos &&
          addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            // Showing the added photos
            <div className="" key={link}>
              {/* Image of uploaded the photo */}
              <img
                className="rounded-xl "
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
    </>
  );
}
