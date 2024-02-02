import { variables } from "../helpers";
import { renderItem } from "./shoesApp";

export const filterRenderUi = () => {
  const { shoesContainer, filterShoe } = variables();
  const filterUI = (shoes) => {
    const filterDiv = document.createElement("div");
    let order = [
      ...new Set(
        shoes
          .map((item) => item.size)
          .sort((a, b) => {
            return a - b;
          })
      ),
    ];

    filterDiv.classList.add("filter");
    filterDiv.innerHTML = `
   
      <form class="filter__content">
        
          <div class="filter__range">
            <h4 class="filter__title">Price Range</h4>
            <div class="filter__range-group">
            <input class="filter__input-range" name="price" type="range" min="100" max="500" value="500" />
            <span class="filter__range-value">0</span>
            </div>
          </div>
        
        
          <div class="">
            <h4 class="filter__title">Colors</h4>
            <select class="filter__select" name="color">
            <option value="">---</option>
            ${[
              ...new Set(
                shoes.map(
                  (item) =>
                    `<option  name="${item.colorValue}">${item.colorValue}</option>`
                )
              ),
            ].join("")}
            </select>
          </div>
   
         
          <div class="filter__size">
            <h4 class="filter__title">Size</h4>
              <select class="filter__select" name="sizes">
                <option value="">---</option>
                ${order.map(
                  (orde) => `<option value="${orde}">${orde}</option>`
                )}
              </select>
          </div>
    
       
          <div class="filter__category">
            <h4 class="filter__title">Category</h4>
            <select class="filter__select" name="category">
              <option value="">---</option>
              ${[
                ...new Set(
                  shoes.map(
                    (item) =>
                      `<option name="${item.category}">${item.category}</option>`
                  )
                ),
              ].join("")}
            </select>
          </div>
      
         
          <div class="filter__short">
            <h4 class="filter__title">Short By</h4>
              <select class="filter__select" name="short">
                <option value="">---</option>
                ${[
                  ...new Set(
                    shoes.map(
                      (item) =>
                        `<option name="${item.shortby}">${item.shortby}</option>`
                    )
                  ),
                ].join("")}
              </select>
          </div>
       
          <div class="filter__brand">
            <h4 class="filter__title">Brand</h4>
            <select class="filter__select" name="brand">
            <option value="">---</option>
            ${[
              ...new Set(
                shoes.map(
                  (item) =>
                    `<option value="${item.brand}">${item.brand}</option>`
                )
              ),
            ].join("")}
            </select>
          </div>
    
  
        <div class="filter__content-group-btn">
          <button class="filter__btn">Apply</button>
        </div>
      </form>
      `;

    openFilter(filterDiv);
    filterShoes(filterDiv, shoes);
  };

  const filterShoes = (filterDiv, shoes = []) => {
    let rangeSpan = filterDiv.querySelector(".filter__range-value");
    let rangeInputValue = filterDiv.querySelector(".filter__input-range");
    rangeSpan.innerHTML = `$${rangeInputValue.value}`;

    rangeInputValue.addEventListener("input", (e) => {
      rangeSpan.innerHTML = `$${e.target.value}`;
    });

    filterDiv.addEventListener("submit", (e) => {
      e.preventDefault();
      let valueFilter = e.target.elements;

      const filterItem = shoes.filter((shoe) => {
        if (valueFilter.price.value != "") {
          if (shoe.price >= valueFilter.price.value) {
            return false;
          }
        }

        if (valueFilter.color.value != "") {
          if (shoe.colorValue != valueFilter.color.value) {
            return false;
          }
        }

        if (valueFilter.sizes.value != "") {
          if (shoe.size != valueFilter.sizes.value) {
            return false;
          }
        }

        if (valueFilter.category.value != "") {
          if (shoe.category != valueFilter.category.value) {
            return false;
          }
        }

        if (valueFilter.short.value != "") {
          if (shoe.shortby != valueFilter.short.value) {
            return false;
          }
        }

        if (valueFilter.brand.value != "") {
          if (shoe.brand != valueFilter.brand.value) {
            return false;
          }
        }

        return true;
      });

      filterItem.length >= 1
        ? renderItem(filterItem)
        : (shoesContainer.innerHTML = `<h2>Filters Not Found</h2>`);
      document.body.style.overflow = "auto";
    });
  };

  const openFilter = (filterDiv) => {
    filterShoe.addEventListener("click", () => {
      shoesContainer.appendChild(filterDiv);
      document.body.style.overflow = "hidden";
    });
  };

  return {
    filterUI,
  };
};
