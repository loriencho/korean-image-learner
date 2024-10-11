import { ChangeEvent, useRef, useState } from "react";
import { translateText } from "./translateText.js";
import { callNIKLAPI } from "./callNIKLAPI.js";

interface FileInputProps {
    accept?: string;
}

export function FileInput({ accept = "image/*" }: FileInputProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileNames, setFileNames] = useState([]);
    const [OCR, setOCR] = useState("");
    const [translation, setTranslation] = useState("");
    const [dictionaryResults, setDictionaryResults] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const names = Array.from(files).map(file => file.name.replaceAll(" ", "_"));

            setFileNames(names);
            setImageFile(files[0]);
        }
    };

    const searchDictionary = async (event) => {
        console.log("Searched");
        event.preventDefault();
        const formData = new FormData(event.target);

        const results = await callNIKLAPI(formData.get("text"));

        console.log(results);
        setDictionaryResults(results.toString());

    }

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
            console.log("OCR: ");
            console.log(words);
            setOCR(words);
            const translated = await translateText(words);
            setTranslation(translated);
        }

    }



    return (
        <div className={"container"}>
            <form onSubmit={uploadImage}
                encType="multipart/form-data">
                <div id="border-box" className="border border-primary rounded p-4 text-center main-text-color">
                    {imageFile ? (
                    <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Uploaded"
                        className="uploaded-image mt-3 mb-3"
                    />) : (
                        <p id="information-text">An image preview will be shown here.</p>
                    )}
                    <input type="file" name="file"
                        onChange={handleChange}
                        accept={accept}
                        className="form-control main-text-color"
                        id="fileInput"/>
                </div>
                <button type="submit" className="btn btn-primary m-3 translate-button">
                    <span>Translate</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ml-2 bi bi-translate ms-2" viewBox="0 0 16 16">
                        <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
                        <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
                    </svg>
                </button>
            </form>
        <hr></hr>

            <div className="textbox">
                <h5 className="output-heading">Extracted text:</h5>
                <div id="border-box" className="border border-primary rounded p-4 text-center main-text-color">
                    {OCR ? (<p>{OCR}</p>): (<p className="m-0" id="information-text">Extracted text will be shown here.</p>)}
                </div>

                <h5 className="output-heading mt-3">Translated text:</h5>
                <div id="border-box" className="border border-primary rounded p-4 text-center main-text-color">
                    {OCR ? (<p>{translation}</p>): (<p className="m-0" id="information-text">Translated text will be shown here.</p>)}
                </div>    
            </div>
        </div>
        
    );
}
