import translate from "translate";

export default async function translateText(text) {
    translate.engine = "google";
    const translated = await translate(text, { from: "ko", to: "en" });
    
    return translated;

}

