export async function callNIKLAPI(query) {
    try {
        const res = await fetch(
            `https://krdict.korean.go.kr/api/search?key=${process.env.apiKey}&translated=y&trans_lang=1&type_search=search&part=word&q=${query}&sort=dict&_csrf=52221ad7-50b3-41f7-ba6c-7eae7475a69b`
        );
        const data = await res.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");

        const elements = xmlDoc.getElementsByTagName("trans_word");
        const words = [];

        const regex = /<!\[CDATA\[(.*?)\]\]>/
        for (var i = 0; i < elements.length; i++) {
            words[i] = elements[i].innerHTML.match(regex)[1];
        }
        return words;
    } catch (err) {
        console.log(err);
    }
}