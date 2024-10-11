import '../styles/globals.css'
import '../styles/App.css'
import '../styles/FileInput.css'
import '../styles/Dictionary.css'


import 'bootstrap/dist/css/bootstrap.min.css';


import { FileInput } from "./FileInput.tsx";
import { Dictionary } from "./Dictionary.tsx"
import callNIKLAPI from "./callNIKLAPI.js";
import translateText from "./translateText.js";

export default function App() {
  async function translate() {
    const translated = await translateText("");
  }
  return (
  <div className="app">
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="card mx-auto m-5 text-center">
            <div className="card-body main-text-color">
              <h1 className="card-title m-3">Learn Korean with OCR</h1>
              <p>Upload an image to extract and translate text.</p>
              <FileInput />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card mx-auto m-5 text-center dictionary">
            <div className="card-body main-text-color">
              <h1 className="card-title m-3">Dictionary</h1>
              <p>Search for word definitions.</p>
              <Dictionary />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


    );
}
