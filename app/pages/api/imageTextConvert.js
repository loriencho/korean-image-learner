import { createWorker } from 'tesseract.js'

// Creates Tesseract worker to extract Korean from images

export const getTextFromImage = async (address) => {
    const worker = await createWorker('kor');

    const ret = await worker.recognize(address);
    console.log(ret.data.text);
    await worker.terminate();
};
