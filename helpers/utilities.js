import { variables } from "./variables";

export const utilities = () => {
  const removeDuplicate = (container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };
  const openCart = () => {
    const { cart, iconCart } = variables();
    iconCart.addEventListener("click", () => {
      cart.classList.add("showCart");
      document.body.style.overflow = "hidden";
    });
  };

  const closeCart = () => {
    const { cart, cartClose } = variables();
    cartClose.addEventListener("click", () => {
      cart.classList.remove("showCart");
      document.body.style.overflow = "auto";
    });
  };

  return {
    removeDuplicate,
    openCart,
    closeCart,
  };
};
