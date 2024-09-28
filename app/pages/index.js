require('dotenv').config();
import { FileInput } from "./FileInput.tsx";
import callNIKLAPI from "./callNIKLAPI.js";

export default function App() {


  return (
    <div className="App">
      <h1 onClick={callNIKLAPI}>Custom File Input</h1>
      <FileInput />


      {/* <form action="/api/upload" method="POST" encType="multipart/form-data">
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form> */}

    </div>
  );
}
