export default {
  name: "ComickTracker",
  version: "1.0.0",
  icon: "https://comick.io/favicon.ico",
  author: "Sarah",
  description: "Basic Comick.dev search for Paperback.",
  contentType: "manga",
  sourceLanguage: "en",
  async search(query) {
    const res = await fetch(`https://comick.io/search?q=${encodeURIComponent(query)}`);
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const items = [...doc.querySelectorAll(".group")];

    return items.map(item => {
      const title = item.querySelector(".title")?.textContent?.trim();
      const img = item.querySelector("img")?.src;
      const link = item.querySelector("a")?.href;
      return {
        title,
        cover: img,
        url: `https://comick.io${link}`,
      };
    });
  },
};
