async function fetchRandomCover() {
  const searchEndpoint = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=file:golden+age+comic+cover&srlimit=50';

  try {
    const response = await fetch(searchEndpoint);
    const data = await response.json();

    if (data.query && data.query.search.length > 0) {
      const randomResult = data.query.search[Math.floor(Math.random() * data.query.search.length)];
      const title = randomResult.title;

      const imageInfoEndpoint = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url`;

      const imageInfoResponse = await fetch(imageInfoEndpoint);
      const imageInfoData = await imageInfoResponse.json();

      const pages = imageInfoData.query.pages;
      const page = Object.values(pages)[0];

      if (page.imageinfo && page.imageinfo[0].url) {
        const imageUrl = page.imageinfo[0].url;
        document.getElementById('cover').src = imageUrl;
      } else {
        throw new Error('Image info not available');
      }
    } else {
      throw new Error('No search results');
    }
  } catch (error) {
    console.error('Error loading image:', error);
    document.getElementById('cover').alt = 'Failed to load image';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('next').addEventListener('click', fetchRandomCover);
  fetchRandomCover(); // Load one initially
});
