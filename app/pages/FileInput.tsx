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
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
