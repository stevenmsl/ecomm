import { mount as producstMount } from "products/ProductsIndex";
import { mount as cartMount } from "cart/CartShow";
console.log("container!");

producstMount(document.querySelector("#host-products"));
cartMount(document.querySelector("#host-cart"));
