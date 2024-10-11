import { ChangeEvent, useRef, useState } from "react";
import { callNIKLAPI } from "./callNIKLAPI.js";

export function Dictionary() {
    const [dictionaryResults, setDictionaryResults] = useState("");

    const searchDictionary = async (event) => {
        console.log("Searched");
        event.preventDefault();
        const formData = new FormData(event.target);


        console.log("TEXT " + formData.get("text"));
        const results = await callNIKLAPI(formData.get("text"));

        console.log(results);
        setDictionaryResults(results.toString());

    }

    return (
        <div className={"container"}>
            <form onSubmit={searchDictionary}
            encType="multipart/form-data">
                <div className="input-group">

                    <input type="text" className="input form-control" name="text"></input>

                    <button className="btn btn-primary input-group-append" type="submit">
                        <span>Search</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-2 bi bi-arrow-right-square" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                        </svg>
                    </button>
                </div>
            </form>      
            <hr></hr>
            <div className="definition">
                <h5 className="mt34">Definition</h5>
                <div id="border-box" className="border border-primary rounded p-4 main-text-color">
                    <p className="m-2">
                        {dictionaryResults}   
                    </p>  
                </div>
            </div>
        </div>
    );
}