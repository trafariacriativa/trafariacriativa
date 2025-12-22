const photographers = [
  { nome: "João Lima", pasta: "JoaoLima", anos: [2024, 2025] },
  { nome: "Hugo Santos", pasta: "HugoSantos", ano: 2025 },
  { nome: "Alexandre Nobre", pasta: "AlexandreNobre", ano: 2024 },
  { nome: "WIP Trafaria Criativa", pasta: "WIPTrafariaCriativa", ano: 2024 }
];

const ext = "webp";
const start = 1;
const max = 140;
const batchSize = 30;

const gallery = document.getElementById("gallery");
const loading = document.getElementById("loading");
if (!gallery) throw new Error("Elemento #gallery não encontrado");

let images = [];

// -----------------------
// LIGHTBOX (igual ao teu)
// -----------------------
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

// -----------------------
// FUNÇÃO PARA CARREGAR IMAGEM
// -----------------------
function loadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// -----------------------
// INICIALIZAÇÃO DA GALERIA
// -----------------------
(async function initGallery() {
  const allImages = [];

  for (const photographer of photographers) {
    const anos = photographer.anos || [photographer.ano];

    for (const ano of anos) {
      for (let startIndex = start; startIndex <= max; startIndex += batchSize) {
        const promises = [];

        for (let i = startIndex; i < startIndex + batchSize && i <= max; i++) {
          const thumb = `/galeria/${photographer.pasta}/${ano}/thumbs/${i}.${ext}`;
          promises.push(loadImage(thumb).then(img => ({ img, i, ano })));
        }

        const results = await Promise.all(promises);

        results.forEach(({ img, i, ano }) => {
          if (!img) return;

          const full = `/galeria/${photographer.pasta}/${ano}/full/${i}.${ext}`;
          img.loading = "lazy";
          img.alt = photographer.nome;
          img.title = `© ${photographer.nome} ${ano}`;
          img.dataset.full = full;

          const orientation =
            img.naturalHeight > img.naturalWidth ? "vertical" : "horizontal";

          const index = images.length;
          images.push(img);
          img.addEventListener("click", () => openLightbox(index));

          const div = document.createElement("div");
          div.className = `gallery-item ${orientation}`;
          div.appendChild(img);

          allImages.push(div);
        });
      }
    }
  }

  allImages.sort(() => Math.random() - 0.5);
  allImages.forEach(div => gallery.appendChild(div));

  // 🔥 ESCONDER LOADING QUANDO TUDO TERMINAR
  if (loading) loading.style.display = "none";
})();
