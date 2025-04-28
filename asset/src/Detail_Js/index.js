// Axios instance
const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn/api",
  timeout: 5000,
});
console.log(http);

// Render Product Carousel
const renderProductCarousel = function (products) {
  let content = products
    .map((product) => {
      console.log(product);
      let { name, id, price, image, shortDescription } = product;
      return `
      <div class="swiper-slide">
        <div class="slide__title">
          <!-- slide__title__img  -->
          <div class="slide__title__img">
            <a href="/customer/Detail/detail.html?productID=${product.id}" class="slide__img-link">
              <img
                src=${image}
                alt=""
                class="title__img title__img-default"
              />
              <img
                src="../../asset/img/Detai_img/extra_products/A11168C_D_08X1.jpg"
                alt=""
                class="title__img title__img-hover"
              />
            </a>
          </div>
          <div class="slide__title__action">
            <a href="#" class=""
              >Quick Shop
              <span class=""
                ><i class="fa-solid fa-cart-shopping"></i></span
            ></a>
          </div>
        </div>
        <!-- slide__content  -->
        <div class="slide__content">
          <h6 class="slide__content__title">${name}</h6>
          <p class="slide__content__price">${price}€</p>
          <p>${shortDescription}</p>
        </div>
      </div>
    `;
    })
    .join("");

  // console.log(content);

  swiper.wrapperEl.innerHTML = content;
  swiper.update();
};

// render product details
const renderProductDetails = function (product) {
  console.log(product);
  let { name, id, price, image, shortDescription, description, alias, size } =
    product;

  let sizes = size
    .map((size) => {
      return `<option>${size}</option>`;
    })
    .join("");

  let mainContainer = document.querySelector(".main__container ");
  let content = `
    <div class="main__row row">

      <!-- col left -->
      <div
        class="main__col__left col-12 col-md-6 col-lg-8 flex flex-column"
      >
        <!-- product image -->
        <div class="product__image flex-fill d-flex flex-column">
          <div class="product__image__primary">
            <img
              src=${image}
              alt=""
              class="w-100 h-auto"
            />
          </div>
          <div class="product__image__subs d-flex flex-wrap">
            <div class="subImage">
              <img
                src="../../asset/img/Detai_img/A16168C_C_08X1.webp"
                alt=""
              />
            </div>
            <div class="subImage">
              <img
                src="../../asset/img/Detai_img/A16168C_E_08X1.jpg"
                alt=""
              />
            </div>
            <div class="subImage">
              <img
                src="../../asset/img/Detai_img/A16168C_F_08X1.webp"
                alt=""
              />
            </div>
            <div class="subImage">
              <img
                src="../../asset/img/Detai_img/A16168C_G_08X1.webp"
                alt=""
              />
            </div>
            <div class="subImage">
              <img
                src="../../asset/img/Detai_img/A16168C_B_08X1.webp"
                alt=""
              />
            </div>
            <div class="subImage">
              <img
                src="../../asset/img/Detai_img/A16168C_D_08X1.webp"
                alt=""
              />
            </div>
          </div>
        </div>

        <!-- product details -->
        <div class="product__details flex-fill p-3 mt-5">
          <div class="product__details__container w-75">
            <h2 class="fw-light">OLD-SCHOOL LOOK. NEW-SCHOOL FEEL.</h2>
            <p class="my-4">
              ${shortDescription}
            </p>
            <h6 class="fw-bold mb-3">Product Details</h6>
            <ul class="">
              <li>
                Mesh upper with suede hits inspired by styles from the '80s
              </li>
              <li>
                Converse Comfort sockliner helps provide optimal comfort/li>
              </li>
              <li>
                A lightweight EVA midsole helps provide optimal comfort
                without the bulk
              </li>
              <li>Pops of color express your style</li>
              <li>
                Star Chevron reps the Converse legacy of sport and street
                style
              </li>
              <li>SKU: A16168C</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- col right -->
      <div class="main__col__right col-12 col-md-6 col-lg-4">
        <!-- product info -->
        <div class="product__info p-5 pt-2 position-sticky top-0">
          <!-- info basic -->
          <div
            class="info__basic d-flex flex-column align-items-start justify-content-center"
          >
            <h4 class="text-capitalize">${name}</h4>
            <p class="price">${price}€</p>
            <p class="sub__title">Unisex Low Top Shoe</p>
            <p>
              Sport-inspired. Lasting style. New color combos.
              <a href="#">More Info</a>
            </p>
          </div>
          <hr />
          <!-- info color -->
          <div class="info__color pt-3 pb-2">
            <p>
              <span class="text-black fw-medium">Color:</span> Vintage
              White/Vaporous Gray
            </p>
            <img
              src=${image}
              alt=""
            />
          </div>
          <hr />
          <!-- info size -->
          <div class="info__size d-flex flex-column gap-4 py-3">
            <div
              class="info__size__guide d-flex justify-content-between align-items-center"
            >
              <div>
                <i class="fa-solid fa-pen-ruler"></i
                ><span>This style runs true to size.</span>
              </div>

              <a href="#">Size Guide</a>
            </div>
            <select
              class="info__size__select form-select"
              aria-label="Default select example"
            >
              <option selected>Select a size</option>
              ${sizes}
            </select>
          </div>

          <!-- info cart -->
          <div class="info__cart d-flex w-100 py-3">
            <button class="info__cart__button w__85 py-3">
              Add to Cart
            </button>
            <button class="info__cart__button w__15 py-3 flex-grow-1">
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>

          <!-- info share -->
          <div
            class="info__share py-4 d-flex flex-column justify-content-center align-items-start gap-4"
          >
            <div class="info__share__socials">
              <a href="#">Share</a>
            </div>
            <div class="info__share__signup py-3 px-4">
              <p class="mb-0">
                Be the first to hear about product launches, collaborations,
                and more. <span><a href="#">Sign up</a></span>
              </p>
            </div>
          </div>
        </div>
      </div>
     </div>
  `;

  return (mainContainer.innerHTML = content);
};

http
  .get("/Product")
  .then((res) => {
    // console.log(res);
    // console.log(res.data);
    // console.log(res.data.content);
    let products = res.data.content;
    let productsCarousel = products.slice(0, 6);
    console.log(productsCarousel);

    renderProductCarousel(productsCarousel);
  })
  .catch((err) => {
    console.log(err);
  });

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("productID");
  console.log(myParam);

  // call api
  if (myParam) {
    http
      .get(`/Product/getbyid?id=${myParam}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        let product = res.data.content;

        renderProductDetails(product);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// `
//   alias
// :
// "vans-black-black"
// categories
// :
// "[{\"id\": \"VANS_CONVERSE\",\"category\":\"VANS_CONVERSE\"}]"
// deleted
// :
// false
// description
// :
// "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
// feature
// :
// true
// id
// :
// 1
// image
// :
// "https://shop.cyberlearn.vn/images/vans-black-black.png"
// name
// :
// "vans black"
// price
// :
// 200
// quantity
// :
// 100
// relatedProducts
// :
// "[2,3,1]"
// shortDescription
// :
// "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
// size
// :
// "[32,33,34,35]"
//   `;
