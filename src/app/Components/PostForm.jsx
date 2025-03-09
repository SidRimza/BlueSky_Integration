import { useEffect, useRef, useState } from "react";
import { Image, Video, FileImage, Smile } from "lucide-react";

export default function PostCreation({ onSubmit, clear }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImage(file);
    }
  };
  useEffect(() => {
    if (clear) {
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
    }
  }, [clear]);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#1a1a1a",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>
        Create a Post
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "10px",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "10px",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          minHeight: "100px",
        }}
      />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Uploaded Preview"
          style={{ width: "100%", marginBottom: "10px", borderRadius: "4px" }}
        />
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => fileInputRef.current.click()} // Open file picker on click
        >
          <Image style={{ color: "#60a5fa" }} />
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Video style={{ color: "#60a5fa" }} />
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <FileImage style={{ color: "#60a5fa" }} />
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Smile style={{ color: "#60a5fa" }} />
        </button>
      </div>
      <button
        onClick={() => onSubmit({ title, description, image, setLoading })}
        style={{
          width: "100%",
          backgroundColor: "#3b82f6",
          color: "white",
          padding: "10px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          opacity: loading ? 0.7 : 1,
        }}
        disabled={loading}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
