// js/galeria.js

function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

// Array com fotógrafos e suas pastas
const photographers = [
  { nome: "Hugo Santos", pasta: "HugoSantos" },
  { nome: "João Lima", pasta: "JoaoLima" },
  { nome: "Alexandre Nobre", pasta: "AlexandreNobre" }
];

// Função para embaralhar arrays
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

(async function initGallery() {
  const ext = "jpg";
  const start = 1;
  const max = 5000;
  const stopAfterMisses = 10;

  const container = document.getElementById("gallery");
  if (!container) return;

  // Array para armazenar todas as imagens antes de adicionar ao container
  const allImages = [];

  for (const photographer of photographers) {
    let misses = 0;

    for (let i = start; i <= max; i++) {
      const src = `galeria/${photographer.pasta}/${i}.${ext}`;
      console.log("Tentando carregar:", src); // depuração

      const img = await loadImage(src);
      if (!img) {
        misses++;
        if (misses >= stopAfterMisses) break;
        continue;
      }
      misses = 0;

      const orientation = img.naturalHeight > img.naturalWidth ? "vertical" : "horizontal";

      const div = document.createElement("div");
      div.className = `gallery-item ${orientation}`;

      img.alt = ` ${photographer.nome}`;
      img.title = ` ©${photographer.nome}`; // tooltip
      img.loading = "lazy";
      img.decoding = "async";

      div.appendChild(img);

      // Adiciona ao array, não diretamente ao container
      allImages.push(div);
    }
  }

  // Embaralhar todas as imagens
  shuffleArray(allImages);

  // Adicionar ao container em ordem random
  allImages.forEach(div => container.appendChild(div));
})();
