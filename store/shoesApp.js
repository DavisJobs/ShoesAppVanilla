import Toastify from "toastify-js";
import { addCartItem, checkoutItems } from "./itemsCart";
import { swiper, utilities, variables } from "../helpers";

export let cartList = [];
export const modifyCartList = (value) => (cartList = value);

export const getItems = () => {
  const { openCart } = utilities();

  document.addEventListener("DOMContentLoaded", () => {
    cartList = JSON.parse(localStorage.getItem("items")) || [];

    addCartItem();
  });
  openCart();
  checkoutItems();
};

export function renderItem(shoes) {
  const { shoesContainer } = variables();
  const { removeDuplicate } = utilities();
  removeDuplicate(shoesContainer);
  shoes.forEach((shoe) => {
    const {
      id,
      shortby,
      thunbd,
      model,
      category,
      brand,
      colorValue,
      color,
      size,
      price,
    } = shoe;

    const renderHtml = document.createElement("article");
    renderHtml.classList.add("store__shoes-item");
    renderHtml.id = id;

    renderHtml.innerHTML = `
    <figure class="store__shoes-figure">
      <span class="store__shoes-short">${shortby}</span>
      <img src="${thunbd}" alt="" class="store__shoes-img" />
    </figure>
    <div class="store__shoes-item-head">
     <div class="store__shoes-item-group">
     <p class="store__shoes-item-title">
     ${model}
     </p>
     <p class="store__shoes-item-title">
     ${category}
     </p>
     </div>
      <div class="store__shoes-item-group">
      <span class="store__shoes-item-type">${brand}</span>
      <span class="store__shoes-item-color-value"> ${colorValue}
        <span class="store__shoes-item-color" style='background-color:${color}'></span>
      </span>
      </div>
      </div>
      </div>
      <div class="store__shoes-item-group">
      <span class="store__shoes-item-size">size: ${size}</span>
      <span class="store__shoes-item-price">$${price}</span>
      </div>
    </div>
    `;

    shoesContainer.appendChild(renderHtml);
  });

  shoesDetails(shoes);
}

const shoesDetails = (shoes) => {
  const { shoesContainer } = variables();
  shoesContainer.addEventListener("click", (e) => {
    const tagElement = e.target.parentElement.parentElement;

    if (e.target.classList.contains("store__shoes-img")) {
      const details = shoes.filter((shoe) => shoe.id === Number(tagElement.id));

      openDetails(details[0]);
    }
  });
};

const openDetails = (details) => {
  const { shoesContainer } = variables();

  const detailsContent = document.querySelector(".details");
  const detailsDiv = document.createElement("section");

  if (!detailsContent) {
    detailsDiv.classList.add("details");

    detailsDiv.innerHTML = `
  <div class="details__content" id="${details.id}">
  <div class="details__content-group-options">
    <div
      class="details__content-icon details__content-icon-back bx bx-chevron-left"
    ></div>
    <h2 class="details__content-title">Shoes Details</h2>
    
  </div>
  <div class="details__content-item">
    <div class="swiper detailsSwiper details__content-slide">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <figure class="details__content-figure">
            <img
              src="${details.thunbd}"
              alt=""
              class="details__content-img"
            />
          </figure>
        </div>
        <div class="swiper-slide">
          <figure class="details__content-figure">
            <img
              src="${details.thunbd2}"
              alt=""
              class="details__content-img"
            />
          </figure>
        </div>
        <div class="swiper-slide">
          <figure class="details__content-figure">
            <img
              src="${details.thunbd3}"
              alt=""
              class="details__content-img"
            />
          </figure>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="details__content-item-head">
      <div class="details__content-group">
        <h3 class="details__content-item-title">${details.model}</h3>
        <div class="details__content-item-price-group">
          <span>$</span>
          <h3 class="details__content-item-price">${details.price}</h3>
        </div>
      </div>
      <div class="details__content-group">
        <h3 class="details__content-item-brand">${details.brand}</h3>
        <h3 class="details__content-item-serie">${details.serie}</h3>
      </div>
      <div class="details__content-group">
        <div class="details__content-size">
        size:
        <span class="details__content-size-number"
          >${details.size}</span
        >
      </div>
        <div class="details__content-group-color">
        <span class="details__content-color-value">${details.colorValue}</span>
        <span class="store__shoes-item-color" style='background-color:${details.color}'></span>
        </div>
      </div>
    </div>
    <div class="details__content-item-description">
      <p>${details.description}</p>
    </div>
  </div>
  <button class="details__content-item-bag">
    <i class="bx bx-shopping-bag"></i>
    Add to bag
  </button>
</div>
`;
    shoesContainer.appendChild(detailsDiv);
    document.body.style.overflow = "hidden";

    const { swiperDetails } = swiper();
    swiperDetails;
  } else {
    detailsDiv.remove();
  }

  closeDetails(detailsDiv, shoesContainer);
  extractDetails(detailsDiv, cartList);
};

const closeDetails = (detailsDiv, shoesContainer) => {
  const { removeDuplicate } = utilities();
  detailsDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("details__content-icon-back")) {
      removeDuplicate(detailsDiv);
      shoesContainer.removeChild(detailsDiv);
      document.body.style.overflow = "auto";
    }
  });
};

const extractDetails = (detailsDiv) => {
  detailsDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("details__content-item-bag")) {
      extractDetailsItem();
    }
  });
};

const extractDetailsItem = () => {
  const details = {
    id: document.querySelector(".details__content").id,
    img: document.querySelector(".details__content-img").src,
    title: document.querySelector(".details__content-item-title").textContent,
    brand: document.querySelector(".details__content-item-brand").textContent,
    colorValue: document.querySelector(".details__content-color-value")
      .textContent,
    price: Number(
      document.querySelector(".details__content-item-price").textContent
    ),
    size: document.querySelector(".details__content-size-number").textContent,
    serie: document.querySelector(".details__content-item-serie").textContent,
    count: 1,
  };

  const exist = cartList.some((item) => item.id === details.id);

  if (exist) {
    const items = cartList.map((item) => {
      if (item.id === details.id) {
        item.count++;
        return item;
      } else {
        return item;
      }
    });
    cartList = [...items];
  } else {
    cartList.unshift(details);
  }

  Toastify({
    text: `${details.title.toUpperCase()} ADD CART`,
    duration: 1500,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "#2ecc70",
    },
  }).showToast();

  localStorage.setItem("items", JSON.stringify(cartList));
  addCartItem();
};
