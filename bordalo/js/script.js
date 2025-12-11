// ============== Masonry Grid (auto span) ==============
function resizeAllGridItems() {
  const gallery = document.querySelector('.gallery');
  const allItems = document.querySelectorAll('.item');

  allItems.forEach(item => {
    const img = item.querySelector('img, video');

    // Executa quando a imagem/video carregar
    img.onload = imgLoaded;
    if (img.complete) {
      imgLoaded.call(img);
    }

    function imgLoaded() {
      const rowHeight = parseInt(window.getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(window.getComputedStyle(gallery).getPropertyValue('gap'));
      const span = Math.ceil((img.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
      item.style.gridRowEnd = "span " + span;
    }
  });
}

window.addEventListener('load', resizeAllGridItems);
window.addEventListener('resize', resizeAllGridItems);

// ================= Modal/Lightbox =================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalVideo = document.getElementById("modal-video");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".open-media").forEach(media => {
  media.addEventListener("click", () => {
    modal.style.display = "block";
    if (media.tagName === "IMG") {
      modalVideo.style.display = "none";
      modalImg.style.display = "block";
      modalImg.src = media.src;
    }
    if (media.tagName === "VIDEO") {
      modalImg.style.display = "none";
      modalVideo.style.display = "block";
      modalVideo.src = media.querySelector("source").src;
      modalVideo.play();
    }
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
  modalVideo.pause();
};

let mediaItems = Array.from(document.querySelectorAll('.open-media'));
let currentIndex = 0;

function showMedia(index) {
  const media = mediaItems[index];
  if (media.tagName === 'IMG') {
    modalVideo.style.display = 'none';
    modalImg.style.display = 'block';
    modalImg.src = media.src;
  } else if (media.tagName === 'VIDEO') {
    modalImg.style.display = 'none';
    modalVideo.style.display = 'block';
    modalVideo.src = media.querySelector('source').src;
    modalVideo.play();
  }
  currentIndex = index;
}

mediaItems.forEach((media, i) => {
  media.addEventListener('click', () => {
    modal.style.display = 'block';
    showMedia(i);
  });
});

document.querySelector('.prev').addEventListener('click', () => {
  showMedia((currentIndex - 1 + mediaItems.length) % mediaItems.length);
});

document.querySelector('.next').addEventListener('click', () => {
  showMedia((currentIndex + 1) % mediaItems.length);
});

closeBtn.onclick = () => {
  modal.style.display = 'none';
  modalVideo.pause();
};
