import { galleryItems } from './gallery-items.js';

// выводим gallery
const galeryComponentRef = document.querySelector(".gallery");
const addedGalleryCard = galleryCardsCreator(galleryItems);

// lightboxSettings
const lightboxSettings = {
  captions: true,
  captionsData: "alt",
  captionDelay: 250,
};
// создаем в памяти список изображений с атрибутами, полученные из galleryItems
function galleryCardsCreator(gallery) {
  return gallery
    .map(({ preview, description, original }) => {
      return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
  </a>`;
    })
    .join("");
}
// выводим галлерею на страницу
galeryComponentRef.innerHTML = addedGalleryCard;

// lightbox
const lightbox = new SimpleLightbox(".gallery a", lightboxSettings);