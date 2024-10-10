import '../styles/globals.css'

import { FileInput } from "./FileInput.tsx";
import callNIKLAPI from "./callNIKLAPI.js";
import translateText from "./translateText.js";

export default function App() {
  async function translate() {
    const translated = await translateText("");
  }
  return (
    <div>
      <div className="app text-center 
                      position-absolute top-0
                      start-0 rounded p-3">
        <h2 onClick={translate}>Upload Image File</h2>
        <FileInput />
      </div>

    </div>

    );
}
