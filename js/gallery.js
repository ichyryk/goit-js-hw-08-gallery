import gallery from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  ligthbox: document.querySelector(".js-ligthbox"),
  openImage: document.querySelector(".ligthbox__image"),
  closeBtn: document.querySelector(".ligthbox__button"),
};

const createImage = ({ preview, original, description }, ind) =>
  refs.gallery.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      data-index=${ind}
      alt='${description}'
    />
  </a>
</li>`
  );
  

gallery.map((image, ind) => createImage(image, ind)).join('');

function onGalleryClick(event) {
  event.preventDefault();
  const imageRef = event.target;
  if (imageRef.nodeName !== "IMG") {
    return;
  }
  const openImageURL = imageRef.dataset.source;
  onOpenModal();
  setOpenImage(openImageURL, imageRef.alt);
}

function onOpenModal () {
     window.addEventListener("keydown", onEscPress);
    refs.ligthbox.classList.add("is-open");
}

function onCloseModal() {
   window.removeEventListener("keydown", onEscPress);
    refs.ligthbox.classList.remove("is-open");
    clearImg();
}

function onBackdropClick(event) {
  if (event.target.nodeName !== "IMG") {
    onCloseModal();
  }
}

function onEscPress(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}

function clearImg() { 
    refs.openImage.src = "";
    refs.openImage.alt = "";
};

function setOpenImage(url, alt) {
  refs.openImage.src = url;
  refs.openImage.alt = alt;
}

refs.gallery.addEventListener("click", onGalleryClick);
refs.closeBtn.addEventListener("click", onCloseModal);
refs.ligthbox.addEventListener("click", onBackdropClick);

// function onArrowLeftPress(event) {
//   if (event.code === "ArrowLeft") {
//     activeIndex = activeIndex === 0 ? gallery.length - 1 : activeIndex - 1;
//     refs.openImage.src = gallery[activeIndex].original;
//     refs.openImage.alt = gallery[activeIndex].description;
//   }
// }
// function onArrowRightPress(event) {
//   if (event.code === "ArrowRight") {
//     activeIndex = activeIndex === gallery.length - 1 ? 0 : activeIndex + 1;
//     refs.openImage.src = gallery[activeIndex].original;
//     refs.openImage.alt = gallery[activeIndex].description;
//   }
// }



// function createGallery ({ preview, description, original }, index) { 
//     const elem = document.createElement("li");
//     elem.classList.add("gallery__item");

//     const link = document.querySelector("a");
//     link.classList.add('gallery__link');
//     link.href = original;

//     const img = document.querySelector("img");
//     img.classList.add('gallery__image');
//     img.alt = description;
//     img.src = preview;
//     img.dataset.index = index;
//     img.dataset.source = original;

//     elem.append(link);
//     link.append(img);

//     return elem;
// };

// refs.gallery.append(...gallery.map((image, index) => createGallery(image, index)));