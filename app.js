async function fetchRandomCover() {
  // Wikimedia Commons: search specifically for image file titles
  const searchEndpoint = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrsearch=prefix:file:golden+age+comic+cover&gsrlimit=50&prop=imageinfo&iiprop=url';

  try {
    const response = await fetch(searchEndpoint);
    const data = await response.json();

    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      const randomPage = pages[Math.floor(Math.random() * pages.length)];
      const imageUrl = randomPage.imageinfo[0].url;

      document.getElementById('cover').src = imageUrl;
      document.getElementById('cover').alt = 'Golden Age Comic Cover';
    } else {
      throw new Error('No image results');
    }
  } catch (error) {
    console.error('Error loading image:', error);
    const cover = document.getElementById('cover');
    cover.src = '';
    cover.alt = 'Failed to load image';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('next').addEventListener('click', fetchRandomCover);
  fetchRandomCover();
});
