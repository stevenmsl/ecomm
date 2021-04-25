import faker from "faker";

let products = "";

/*
  Why defines the mount function
  - when developing products in isolation the 
    team has control where to render the app
  - when in production where the products  
    app is hosted by the container the team 
    can't assume the element with certain id 
    exists     
*/
const mount = (el) => {
  for (let i = 0; i < 5; i++) {
    const name = faker.commerce.productName();
    products += `<div>${name}</div>`;
  }
  el.innerHTML = products;
};

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-products");
  if (el) {
    /*
      - the team is developing in isolation
      - the assumption is that the container
        will not have an element with an id 
        dev-products 
    */
    mount(el);
  }
}

export { mount };
