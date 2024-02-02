export const variables = () => {
  const shoesContainer = document.querySelector(".store__shoes-container");
  const cartContentItems = document.querySelector(".cart__content-items");
  const cartTotal = document.querySelector(".cart__total");
  const iconCart = document.querySelector(".header__icon-cart");
  const iconCartCount = document.querySelectorAll(".header__icon-cart-count");
  const cartClose = document.querySelector(".cart__content-close");
  const cart = document.querySelector(".cart");
  const inputSearch = document.querySelector(".store__filters-search-input");
  const inputCleanValue = document.querySelector(".store__filters-icon-clean");
  const filterShoe = document.querySelector(".store__filters-filter");
  const filterModal = document.querySelector(".filter__content");
  const totalPrice = document.querySelector(".cart__content-total-items");
  const totalItems = document.querySelectorAll(
    ".cart__content-group-head-items-span"
  );
  const checkoutBtn = document.querySelectorAll(".cart__content-total-btn");

  return {
    shoesContainer,
    cartContentItems,
    cartTotal,
    iconCart,
    cartClose,
    cart,
    iconCartCount,
    inputSearch,
    inputCleanValue,
    filterShoe,
    filterModal,
    totalPrice,
    totalItems,
    checkoutBtn,
  };
};
