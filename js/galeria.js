const photographers = [
  { nome: "João Lima", pasta: "JoaoLima", ano: 2025 },
  { nome: "Hugo Santos", pasta: "HugoSantos", ano: 2025 },
  { nome: "Alexandre Nobre", pasta: "AlexandreNobre", ano: 2024 }
];

const ext = "webp";
const start = 1;
const max = 200; // número alto suficiente
const stopAfterMisses = 5;

const gallery = document.getElementById("gallery");
if (!gallery) throw new Error("Elemento #gallery não encontrado");

let images = [];

// LIGHTBOX
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.className = "hidden";
lightbox.innerHTML = `
  <button class="prev">‹</button>
  <img>
  <button class="next">›</button>
  <button class="close">×</button>
`;
document.body.appendChild(lightbox);

const lbImg = lightbox.querySelector("img");
const btnPrev = lightbox.querySelector(".prev");
const btnNext = lightbox.querySelector(".next");
const btnClose = lightbox.querySelector(".close");
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lbImg.src = images[currentIndex].dataset.full;
  lightbox.classList.remove("hidden");
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  lbImg.src = "";
}

btnNext.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  lbImg.src = images[currentIndex].dataset.full;
};
btnPrev.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lbImg.src = images[currentIndex].dataset.full;
};
btnClose.onclick = closeLightbox;

document.addEventListener("keydown", e => {
  if (lightbox.classList.contains("hidden")) return;
  if (e.key === "ArrowRight") btnNext.onclick();
  if (e.key === "ArrowLeft") btnPrev.onclick();
  if (e.key === "Escape") closeLightbox();
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

// FUNÇÃO PARA CARREGAR IMAGEM
function loadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// GALERIA
(async function initGallery() {
  const allImages = [];

  for (const photographer of photographers) {
    let misses = 0;
    for (let i = start; i <= max; i++) {
      const thumb = `/galeria/${photographer.pasta}/${photographer.ano}/thumbs/${i}.${ext}`;
      const full = `/galeria/${photographer.pasta}/${photographer.ano}/full/${i}.${ext}`;

      const img = await loadImage(thumb);
      if (!img) {
        misses++;
        if (misses >= stopAfterMisses) break;
        continue;
      }
      misses = 0;

      img.loading = "lazy";
      img.alt = photographer.nome;
      img.title = `© ${photographer.nome} ${photographer.ano}`;
      img.dataset.full = full;

      const orientation = img.naturalHeight > img.naturalWidth ? "vertical" : "horizontal";

      img.addEventListener("click", () => openLightbox(images.indexOf(img)));

      const div = document.createElement("div");
      div.className = `gallery-item ${orientation}`;
      div.appendChild(img);

      images.push(img);
      allImages.push(div);
    }
  }

  // Embaralhar
  allImages.sort(() => Math.random() - 0.5);

  // Inserir no DOM
  allImages.forEach(div => gallery.appendChild(div));
})();
