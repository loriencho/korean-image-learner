import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed." });
    }

    const form = formidable({
        multiples: false,
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Error parsing the files", err);
            return res.status(500).json({ error: "File parsing error." });
        }

        const file = files.file[0];
        if (!file) {
            console.error("No file received:", files);
            return res.status(400).json({ error: "No files received." });
        }

        const buffer = await fs.readFile(file.filepath);
        const filename = file.originalFilename.replaceAll(" ", "_");
        const dir = path.join(process.cwd(), "public/imgs/");

        // Ensure the target directory exists
        await fs.mkdir(dir, { recursive: true });

        try {
            const filePath = path.join(dir, filename);
            console.log("Saving file to:", filePath); // Debugging line
            await fs.writeFile(filePath, buffer);
            return res.status(200).json({ success: true });
        } catch (error) {
            console.error("Error occurred while writing file:", error);
            return res.status(500).json({ success: false });
        }
    });
}
