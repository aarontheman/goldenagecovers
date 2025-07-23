let covers = [];

async function loadCovers() {
  const res = await fetch('covers.json');
  covers = await res.json();
  showRandom();
}

function showRandom() {
  if (!covers.length) return;
  const randomUrl = covers[Math.floor(Math.random() * covers.length)];
  document.getElementById('cover').src = randomUrl;
}

document.getElementById('nextBtn').addEventListener('click', showRandom);
window.onload = loadCovers;
