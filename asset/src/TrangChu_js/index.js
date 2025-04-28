const options = document.querySelectorAll(".option");
const img = document.getElementById("main-image");

options.forEach((option) => {
  option.addEventListener("mouseenter", () => {
    const imgFile = option.getAttribute("data-img");
    if (!imgFile || img.src.includes(imgFile)) return;

    // Thêm animation
    img.classList.remove("animate__animated", "animate__fadeIn"); // reset nếu có
    void img.offsetWidth; // trick để reset animation
    img.src = `../../asset/img/TrangChu_img/${imgFile}`;
    img.classList.add("animate__animated", "animate__fadeIn");
  });
});
///////////////////
// let items_Card = document.querySelector("#items_Card");
// let productPromise = axios({
//   url: "https://shop.cyberlearn.vn/api/Product",
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// productPromise
//   .then((response) => {
//     let products = response.data.content;
//     console.log("Product", products);
//     products.forEach((product, index) => {
//       let content = `
//             <div class="card">
//               <span class="tag">${product.name}</span>
//               <button><i class="fa-solid fa-cart-plus"></i></button>
//                <a href="./detail.html?productID=id" class="slide__img-link">
//               <img src="${product.image}" alt="${product.name}" />
//               </a>
//               <h3>${product.alias}</h3>
//               <div class="price">${product.price} đ</div>
//               <p>${product.shortDescription}</p>
//               <small>Size: ${product.size}</small>
//             </div>`;
//       items_Card.innerHTML += content;
//     });
//   })
//   .catch((err) => {
//     console.log("Can't get api: ", err.message);
//   });

const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn/api",
  timeout: 5000,
});
let items_Card = document.querySelector("#items_Card");

http
  .get("/Product")
  .then((response) => {
    let products = response.data.content;
    console.log("Product", products);
    products.forEach((product, index) => {
      let content = `
        <div class="card">
          <span class="tag">${product.name}</span>
          <button><i class="fa-solid fa-cart-plus"></i></button>
           <a href="/customer/Detail/detail.html?productID=${product.id}" class="slide__img-link">

            <img src="${product.image}" alt="${product.name}" />
          </a>
          <h3>${product.alias}</h3>
          <div class="price">${product.price} đ</div>
          <p>${product.shortDescription}</p> 
          <small>Size: ${product.size}</small>
        </div>`;
      items_Card.innerHTML += content;
    });
  })
  .catch((err) => {
    console.log("Can't get api: ", err.message);
  });

//-----------API paging---------------

let slider = document.querySelector("#slider");
let productPromise2 = axios({
  url: "https://shop.cyberlearn.vn/api/Product/getpaging?pageIndex=1&pageSize=10&keywords=nike",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

productPromise2
  .then((response) => {
    const products = response.data.content.items;
    console.log("ProductPaging", products);
    let content = "";
    products.forEach((product, index) => {
      const fullImageUrl = `https://shop.cyberlearn.vn/images/${product.image}`;
      content += `
          <div class="card">
           <span class="tag">${product.name}</span>
              <button><i class="fa-solid fa-cart-plus"></i></button>
             <a href="/customer/Detail/detail.html?productID=${product.id}">
  <img src="${fullImageUrl}" alt="${product.name}" />
</a>

              <h3>${product.alias}</h3>
              <div class="price">${product.price} đ</div>
              <p>${product.shortDescription}</p> 
              <small>Size: ${product.size}</small>
          </div>
        `;
      // Gán HTML xong mới khởi tạo Slick
      slider.innerHTML = content;
    });
    setTimeout(() => {
      $(".slider")
        .not(".slick-initialized")
        .slick({
          slidesToShow: 5,
          arrows: true,
          dots: true,
          infinite: false,
          prevArrow: `<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-left"></i></button>`,
          nextArrow: `<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>`,
          responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
          ],
        });
    }, 50);
  })
  .catch((error) => {
    console.error("Can't get API:", error.message);
  });
