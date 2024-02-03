import Toastify from "toastify-js";
import { cartList, modifyCartList } from "./shoesApp";
import { utilities, variables } from "../helpers";

let totalCart = 0;

export function addCartItem() {
  const { removeDuplicate, closeCart } = utilities();
  const { cartTotal, cartContentItems } = variables();
  removeDuplicate(cartContentItems);

  cartList.forEach((shoe) => {
    const { id, img, title, price, brand, serie, size, count, colorValue } =
      shoe;

    const item = document.createElement("article");

    item.classList.add("cart__content-item");
    item.id = id;

    const figure = document.createElement("figure");
    figure.classList.add("cart__content-item-figure");
    const image = document.createElement("img");
    image.classList.add("cart__content-item-img");
    image.src = img;

    const detailsItem = document.createElement("div");
    detailsItem.classList.add("cart__content-details-item");

    const divGroupItemHead = document.createElement("div");
    divGroupItemHead.classList.add("cart__content-details-item-group-head");
    const itemHeadTitle = document.createElement("h5");
    const itemHeadPrice = document.createElement("h5");

    itemHeadTitle.classList.add("cart__content-details-item-title");
    itemHeadPrice.classList.add("cart__content-details-item-price");
    itemHeadTitle.textContent = title;
    itemHeadPrice.textContent = `$${price}`;

    const divGroupItemBrands = document.createElement("div");
    divGroupItemBrands.classList.add("cart__content-details-item-group-brands");
    const itemHeadBrand = document.createElement("h5");
    const itemHeadSerie = document.createElement("h5");

    itemHeadBrand.classList.add("cart__content-details-item-brand");
    itemHeadSerie.classList.add("cart__content-details-item-serie");
    itemHeadBrand.textContent = brand;
    itemHeadSerie.textContent = serie;

    const divGroupItemCount = document.createElement("div");
    divGroupItemCount.classList.add("cart__content-details-item-group-count");

    const divGroupSize = document.createElement("div");
    divGroupSize.classList.add("cart__content-details-size");
    divGroupSize.innerHTML = `size: <span>${size}</span>`;

    const divGroupCount = document.createElement("div");
    divGroupCount.classList.add("cart__content-details-count");
    const itemHeadCountDecrease = document.createElement("button");
    const countSpan = document.createElement("span");
    const itemHeadCountIncrease = document.createElement("button");

    itemHeadCountDecrease.classList.add("cart__content-details-count-decrease");
    countSpan.classList.add("count");
    itemHeadCountIncrease.classList.add("cart__content-details-count-increase");
    itemHeadCountIncrease.onclick = (e) => increaseCount(e, id);
    itemHeadCountDecrease.textContent = `-`;
    itemHeadCountDecrease.onclick = (e) => decreaseCount(e, id);
    countSpan.textContent = count;
    itemHeadCountIncrease.textContent = `+`;

    const divGroupItemDelete = document.createElement("div");
    divGroupItemDelete.classList.add("cart__content-details-item-group-delete");
    const itemHeadColor = document.createElement("div");
    const itemHeadDelete = document.createElement("div");

    itemHeadColor.classList.add("cart__content-details-item-color");
    itemHeadColor.textContent = colorValue;
    itemHeadDelete.classList.add(
      "cart__content-details-delete",
      "bx",
      "bx-trash-alt"
    );
    itemHeadDelete.id = id;
    itemHeadDelete.onclick = () => removeItem(title, id);

    item.appendChild(figure);
    item.appendChild(detailsItem);

    figure.append(image);

    detailsItem.appendChild(divGroupItemHead);
    detailsItem.appendChild(divGroupItemBrands);
    detailsItem.appendChild(divGroupItemCount);
    detailsItem.appendChild(divGroupItemDelete);

    divGroupItemHead.append(itemHeadTitle);
    divGroupItemHead.append(itemHeadPrice);

    divGroupItemBrands.append(itemHeadBrand);
    divGroupItemBrands.append(itemHeadSerie);

    divGroupItemCount.append(divGroupSize);
    divGroupItemCount.appendChild(divGroupCount);

    divGroupCount.append(itemHeadCountDecrease);
    divGroupCount.append(countSpan);
    divGroupCount.append(itemHeadCountIncrease);

    divGroupItemDelete.append(itemHeadColor);
    divGroupItemDelete.append(itemHeadDelete);

    cartContentItems.appendChild(item);
  });

  cartList.length === 0
    ? cartTotal.classList.remove("activeTotal")
    : cartTotal.classList.add("activeTotal");
  cartList.length === 0
    ? (cartContentItems.innerHTML = `<div class="cart__content-empty"><h2>Empty Cart</h2></div>`)
    : cartContentItems;

  totalMountCart();
  cartCountItems();
  closeCart();
}

const decreaseCount = (e, id) => {
  let countSpan = e.target.parentElement.getElementsByClassName("count")[0];
  let products = cartList.find((prod) => prod.id === id);

  products.count === 1
    ? products.count === 1
    : (countSpan.textContent = products.count -= 1);
  localStorage.setItem("items", JSON.stringify(cartList));
  totalMountCart();
  cartCountItems();
};

const increaseCount = (e, id) => {
  let countSpan = e.target.parentElement.getElementsByClassName("count")[0];
  let products = cartList.find((prod) => prod.id === id);

  let increaseBtn = (countSpan.textContent = products.count += 1);
  totalCart = increaseBtn;
  localStorage.setItem("items", JSON.stringify(cartList));
  totalMountCart();
  cartCountItems();
};

const totalMountCart = () => {
  const { totalPrice } = variables();
  let cartTotal = cartList.reduce((acc, item) => {
    return (acc += item.price * item.count);
  }, 0);

  totalCart = cartTotal;

  totalPrice.textContent = `$${cartTotal.toFixed(2)}`;
  localStorage.setItem("total", JSON.stringify(cartTotal));
};

const cartCountItems = () => {
  const { iconCartCount, totalItems } = variables();
  const countCart = cartList.reduce((acc, item) => {
    return (acc += item.count);
  }, 0);
  const totalItemsLeng = cartList.length;
  totalItems.forEach((icon) => {
    icon.textContent = countCart;
  });
  iconCartCount.forEach((items) => {
    items.textContent = totalItemsLeng;
  });
};

const removeItem = (title, id) => {
  modifyCartList(cartList.filter((item) => item.id !== id));
  addCartItem();

  localStorage.setItem("items", JSON.stringify(cartList));

  Toastify({
    text: `${title.toUpperCase()} ADD CART`,
    duration: 1500,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "#ff4d4d",
    },
  }).showToast();
};

export const checkoutItems = () => {
  const { checkoutBtn, cart } = variables();

  checkoutBtn.forEach((el) => {
    el.addEventListener("click", () => {
      while (cartList.length > 0) {
        cartList.pop();
      }
      localStorage.removeItem("items");
      addCartItem();

      cart.classList.remove("showCart");
      document.body.style.overflow = "auto";

      Toastify({
        text: `Thanks for buying`,
        duration: 2500,
        close: true,
        gravity: "top",
        position: "center",
        /*   stopOnFocus: true, */
        style: {
          fontSize: "2rem",
          background: "#2ecc70",
        },
      }).showToast();
    });
  });
};
