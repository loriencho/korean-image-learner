import { createWorker } from 'tesseract.js'

import path from 'path';

// Creates Tesseract worker to extract Korean from images
// JSON is returned where each file name is mapped to extracted text

export const getTextFromImages = async (res) => {
    const dir = path.join(process.cwd(), "imgs/");

    try {
        const files = res.files;
        const imageFiles = files.filter(file => /\.(bmp|jpg|png|pbm|webp)$/i.test(file));

        const worker = await createWorker('kor');
        const results = {};

        for (const file of imageFiles) {
            const filePath = path.join(dir, file);
            const { data: { text } } = await worker.recognize(filePath);
            results[file] = text;
        }

        await worker.terminate();
        return res.status(200).json({ results });
    } catch (error) {
        console.error('Error while processing images:', error);
        return res.status(500).json({ error: 'Failed to process images' });
    }
};


export const getTextFromImage = async (req, res) => {
    const dir = path.join(process.cwd(), "public/imgs/");
    const file = req.body.filename;

    try {
        const worker = await createWorker('kor');

        const filePath = path.join(dir, file);
        const words = await worker.recognize(filePath);

        await worker.terminate();
        return res.status(200).json({ text: words.data.text });
    } catch (error) {
        console.error('Error while processing image:', error);
        return res.status(500).json({ message: 'Error while processing image' });
    }
};


export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            if (req.body.files) {
                return await getTextFromImages(req, res);
            } else if (req.body.filename) {
                return await getTextFromImage(req, res);
            } else {
                return res.status(400).json({ message: 'Bad Request: No valid input provided.' });
            }
        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}
