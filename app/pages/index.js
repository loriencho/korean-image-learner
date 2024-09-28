require('dotenv').config();
import { FileInput } from "./FileInput.tsx";
import callNIKLAPI from "./callNIKLAPI.js";
import translateText from "./translateText.js";

export default function App() {
  async function translate() {
    const translated = await translateText("");
  }
  return (
    <div className="App">
      <h1 onClick={translate}>Custom File Input</h1>
      <FileInput />


      {/* <form action="/api/upload" method="POST" encType="multipart/form-data">
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form> */}

    </div>
  );
}
