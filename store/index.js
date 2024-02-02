import { getShoes, swiper } from "../helpers";
import { getItems } from "./shoesApp";

import "../scss/main.scss";
import "toastify-js/src/toastify.css";

const { swiperSlider } = swiper();

getItems();
getShoes();
swiperSlider;
