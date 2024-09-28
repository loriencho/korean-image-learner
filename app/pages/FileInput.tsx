import { ChangeEvent, useRef, useState } from "react";
import React from "react";

export function FileInput({ accept = "image/*" }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      setImageFile(file);
    }
  };

  return (
    <div className={"container"}>
      <div
        onDragOver={handleDragOver}
        onDrop={handleFileDrop}
        onClick={handleImageUploadClick}
      >
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Uploaded"
          />
        ) : (
          <span>Choose file or drag it here</span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          onChange={updateImage}
        />
      </div>
    </div>
  );
}
