import { ChangeEvent, useRef, useState } from "react";

interface FileInputProps {
    accept?: string;
}

export function FileInput({ accept = "image/*" }: FileInputProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImageFile(files[0]);
        }
    };

    const uploadImage = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            // handle somehow
        }

    }



    return (
        <div className={"container"}>
            {imageFile ? (
                <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Uploaded"
                />
            ) : (
                <span>Choose file or drag it here</span>
            )}

            <form onSubmit={uploadImage}
                encType="multipart/form-data">
                <input type="file" name="file"
                    onChange={handleChange}
                    accept={accept} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
