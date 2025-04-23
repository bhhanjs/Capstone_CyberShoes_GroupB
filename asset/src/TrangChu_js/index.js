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
let items_Card = document.querySelector("#items_Card");
let productPromise = axios({
  url: "https://shop.cyberlearn.vn/api/Product",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

productPromise
  .then((response) => {
    let products = response.data.content;
    console.log("Product", products);
    products.forEach((product, index) => {
      let content = `
            <div class="card">
              <span class="tag">${product.name}</span>
              <button><i class="fa-solid fa-cart-plus"></i></button>
              <img src="${product.image}" alt="${product.name}" />
              <h3>${product.alias}</h3>
              <div class="price">${product.price} đ</div>
              <p>${product.shortDescription}</p> 
              <small>Size: ${product.size}</small>
            </div>`;
      items_Card.innerHTML += content;
    });
  })
  .catch((err) => {
    console.log("Can't get api: ", alert(err.message));
  });
