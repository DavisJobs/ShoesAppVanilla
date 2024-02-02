import { filterRenderUi } from "../store/filterRenderUi";
import { search } from "../store/search";
import { renderItem } from "../store/shoesApp";

export const getShoes = async () => {
  const { filterUI } = filterRenderUi();
  try {
    const res = await fetch("../../data/data.json");
    const data = await res.json();

    renderItem(data);
    search(data);
    filterUI(data);
  } catch (error) {
    console.log(error);
  }
};
