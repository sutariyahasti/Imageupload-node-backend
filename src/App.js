import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from the server when the component mounts
    axios
      .get("http://localhost:5000/api/images")
      .then((response) => setImages(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post("http://localhost:5000/api/upload", formData)
      .then((response) => {
        setImages([...images, response.data]);
        setFile(null);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <div>
        <h2>Images</h2>
        {images ? images.map((image) => (
          <img
            key={image._id}
            src={`http://localhost:5000/${image.path}`}
            alt={image.originalname}
            style={{ maxWidth: "300px", maxHeight: "300px", margin: "10px" }}
          />
        )) : <h1>NO data found</h1>}
      </div>
    </div>
  );
}

export default App;
