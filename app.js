async function fetchRandomCover() {
  const endpoint = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrsearch=golden+age+comic+cover&gsrlimit=50&prop=imageinfo&iiprop=url';

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      const randomPage = pages[Math.floor(Math.random() * pages.length)];
      const imageUrl = randomPage.imageinfo[0].url;

      document.getElementById('cover').src = imageUrl;
    } else {
      throw new Error('No image results');
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
