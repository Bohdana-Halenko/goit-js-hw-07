import { galleryItems } from "./gallery-items.js";

// выводим gallery
const galeryComponentRef = document.querySelector(".gallery");
const addedGalleryCard = galleryCardsCreator(galleryItems);
let instance = {};

// functionCreator - создаем список изображений с элементами, полученных из galleryItems
function galleryCardsCreator(gallery) {
  return gallery
    .map(({ preview, description, original }) => {
      return `<div class="gallery__item">
  <a class="gallery__link"  href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}
// выводим галлерею на страницу

galeryComponentRef.insertAdjacentHTML("beforeend", addedGalleryCard);
// functionClick

function onGalleryCardClick(e) {

  //блокировка действия браузера по умолчанию при клике, переход по ссылке не произойдет
  e.preventDefault();

  // выход из функции, если это элемент на который не содержит класс "gallery__image", выполняем основной кода если есть
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  openModalWindow(e.target.dataset.source);
}
galeryComponentRef.addEventListener("click", onGalleryCardClick);

// functionCreateModal
function createModalImg(pic) {
  return basicLightbox.create(`
    <img src="${pic}" width="800" height="600">
`);
}

// функция открытия модального окна basicLightbox
function openModalWindow(pic) {
  instance = createModalImg(pic);
  instance.show();
  document.addEventListener("keyup", pressEscapeInModal);
  // document.addEventListener("click", klickInModal);
}

// закрытие модального окна по нажатию клавиши Escape
function pressEscapeInModal(e) {
  if (e.code !== "Escape") {
    return;
  }
  instance.close();
  document.removeEventListener("keyup", pressEscapeInModal);
}