import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

//поиск div gallery
const galleryEl = document.querySelector("div.gallery");

//из полученных galleryItems создается в памяти список изображений с атрибутами
const listEl = galleryItems.map(({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`).join("");
  
//вывод галереи на страницу
galleryEl.insertAdjacentHTML("afterbegin", listEl);
galleryEl.addEventListener("click", replacementLinkImg);

//заменa preview на original (функция)
function replacementLinkImg(event) {

  //блокировка действия браузера по умолчанию при клике - переход по ссылке не произойдет
    
    event.preventDefault();
    
  // элемент, на который не содержится класс "gallery__image", выходит из функции,
  // если содержится - продолжаем выполнять основной код
    
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
    
  // ссылка на оригинал картинки
    
    const currentImageUrl = event.target.dataset.source;
    
  // вызов функции открытия модального окна
    
  onOpenModal(currentImageUrl);
}

// функция открытия модального окна basicLightbox

function onOpenModal(currentImageUrl) {
  const createModal = basicLightbox.create(`<img
      class="modal__image"
      src="${currentImageUrl}"/>`);
    createModal.show();
    
  // вкл слушателя
  window.addEventListener("keydown", escKeyCloseModal);
}

function escKeyCloseModal(event) {

  // поиск модального окна
    
  const modal = document.querySelector("div.basicLightbox");

  if (event.code === "Escape") {
      modal.remove();
      
    // выкл слушателя
      
    window.removeEventListener("keydown", escKeyCloseModal);
  }
}