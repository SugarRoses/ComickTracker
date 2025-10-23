export default {
  name: "ComickTracker",
  version: "1.1.0",
  icon: "https://comick.io/favicon.ico",
  author: "Sarah",
  description: "Track Comick.dev titles in Paperback, with hidden list support.",
  contentType: "manga",
  sourceLanguage: "en",
  async search(query) {
    const hiddenRes = await fetch("https://raw.githubusercontent.com/SugarRoses/ComickTracker/main/hidden.json");
    const hiddenTitles = await hiddenRes.json();

    const res = await fetch(`https://comick.io/search?q=${encodeURIComponent(query)}`);
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const items = [...doc.querySelectorAll(".group")];

    return items
      .map(item => {
        const title = item.querySelector(".title")?.textContent?.trim();
        const img = item.querySelector("img")?.src;
        const link = item.querySelector("a")?.href;
        return {
          title,
          cover: img,
          url: `https://comick.io${link}`,
        };
      })
      .filter(item => title && !hiddenTitles.includes(item.title));
  },
};
