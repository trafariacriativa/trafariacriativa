// galeria - js/galeria.js

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

(async function initGallery() {
  const ext = "jpg";
  const start = 1;
  const max = 5000;
  const stopAfterMisses = 10;

  const container = document.getElementById("gallery");
  if (!container) return;

  for (const photographer of photographers) {
    let misses = 0;

    for (let i = start; i <= max; i++) {
      // Caminho completo incluindo a pasta "galeria"
      const src = `galeria/${photographer.pasta}/${i}.${ext}`;
      console.log("Tentando carregar:", src); // para depuração

      const img = await loadImage(src);
      if (!img) {
        misses++;
        if (misses >= stopAfterMisses) break;
        continue;
      }
      misses = 0;

      // Determinar orientação
      const orientation = img.naturalHeight > img.naturalWidth ? "vertical" : "horizontal";

      const div = document.createElement("div");
      div.className = `gallery-item ${orientation}`;

      // Configurar imagem
      img.alt = ` ${photographer.nome}`;
      img.title = ` ${photographer.nome}`; // tooltip ao passar o mouse
      img.loading = "lazy";
      img.decoding = "async";

      div.appendChild(img);
      container.appendChild(div);
    }
  }
})();
