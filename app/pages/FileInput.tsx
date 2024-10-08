import { ChangeEvent, useRef, useState } from "react";


interface FileInputProps {
    accept?: string;
}

export function FileInput({ accept = "image/*" }: FileInputProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileNames, setFileNames] = useState([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const names = Array.from(files).map(file => file.name.replaceAll(" ", "_"));

            setFileNames(names);
            setImageFile(files[0]);
        }
    };

    const uploadImage = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (!uploadRes.ok) {

        } else {
            const textRes = await fetch('/api/imageTextConvert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: fileNames[0] })

            })

            const data = await textRes.json();
            const words = data.text;
            console.log(words);
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
                <button type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" 
                  width="16" height="16" fill="currentColor" 
                  className="bi bi-upload" 
                  viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                  </svg>
                </button>
            </form>
        </div>
    );
}
