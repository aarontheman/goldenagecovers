function getShownImages() {
  const data = localStorage.getItem('shownImages');
  return data ? JSON.parse(data) : {};
}

function saveShownImage(url) {
  const shown = getShownImages();
  shown[url] = Date.now();
  localStorage.setItem('shownImages', JSON.stringify(shown));
}

function isImageRecentlyShown(url) {
  const shown = getShownImages();
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
  return shown[url] && (Date.now() - shown[url] < TWENTY_FOUR_HOURS);
}

async function fetchRandomCover() {
  const searchEndpoint =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrsearch=prefix:file:golden+age+comic+cover&gsrlimit=50&prop=imageinfo&iiprop=url';

  try {
    const response = await fetch(searchEndpoint);
    const data = await response.json();

    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages);
      const unseenPages = pages.filter(
        (page) => page.imageinfo && !isImageRecentlyShown(page.imageinfo[0].url)
      );

      if (unseenPages.length === 0) {
        throw new Error('All 50 covers have been shown in the past 24 hours.');
      }

      const randomPage = unseenPages[Math.floor(Math.random() * unseenPages.length)];
      const imageUrl = randomPage.imageinfo[0].url;

      document.getElementById('cover').src = imageUrl;
      document.getElementById('cover').alt = 'Golden Age Comic Cover';

      saveShownImage(imageUrl);
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
