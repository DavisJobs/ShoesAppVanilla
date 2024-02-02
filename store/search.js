import { variables } from "../helpers";
import { renderItem } from "./shoesApp";

export const search = (shoes) => {
  const { inputSearch, inputCleanValue, shoesContainer } = variables();
  inputSearch.addEventListener("keyup", (e) => {
    inputSearch.value.length >= 1
      ? inputCleanValue.classList.add("activeclean")
      : inputCleanValue.classList.remove("activeclean");

    const searchString = e.target.value.toLowerCase();
    const filterShoe = shoes.filter((shoe) => {
      return (
        shoe.brand.toLowerCase().includes(searchString) ||
        shoe.model.toLowerCase().includes(searchString)
      );
    });

    if (filterShoe == "") {
      return (shoesContainer.innerHTML = `<h1>search not found</h1>`);
    }

    renderItem(filterShoe);
  });

  inputCleanValue.addEventListener("click", () => {
    inputSearch.value = "";
    inputCleanValue.classList.remove("activeclean");
    renderItem(shoes);
  });
};
