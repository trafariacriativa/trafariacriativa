// js/galeria.js

function loadImage(url) {
  // Loads the image and resolves with the Image object (or null if missing)
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

(async function initGallery() {
  const folder = "galeria";
  const ext = "jpg";
  const start = 1;
  const max = 5000;
  const stopAfterMisses = 10;

  const container = document.getElementById("gallery");
  if (!container) return;

  let misses = 0;

  for (let i = start; i <= max; i++) {
    const src = `${folder}/${i}.${ext}`;

    const img = await loadImage(src);
    if (!img) {
      misses++;
      if (misses >= stopAfterMisses) break;
      continue;
    }
    misses = 0;

    // 🔍 Determine orientation
    const orientation =
      img.naturalHeight > img.naturalWidth
        ? "vertical"
        : "horizontal";

    const div = document.createElement("div");
    div.className = `gallery-item ${orientation}`;

    // Reuse the already-loaded image
    img.alt = `Image ${i}`;
    img.loading = "lazy";
    img.decoding = "async";

    div.appendChild(img);
    container.appendChild(div);
  }
})();
