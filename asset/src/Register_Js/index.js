const REGEX_NAME = /^[A-Za-zÀ-Ỹà-ỹ\s]+$/;
const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGEX_PASSWORD = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}:;<>,.?/~\\-])/;
const REGEX_PHONE = /^[0-9]{9,11}$/;

// Axios instance
const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn/api",
  timeout: 5000,
});
console.log(http);

// toastify
const displayConfirm = function (text) {
  Toastify({
    text,
    duration: 3000,
    // destination: "https://github.com/apvarun/toastify-js",
    // newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "black",
    },
    // onClick: function(){} // Callback after click
  }).showToast();
};

// Validation Empty
const notEmpty = function (value) {
  console.log(value);
  if (value.trim() === "") {
    return false;
  } else {
    return true;
  }
};

// Validation Value Input
const validInPut = function (value, divErr, errMsg, regex) {
  if (regex.test(value)) {
    divErr.innerHTML = "";
    return true;
  } else {
    divErr.innerHTML = errMsg;
    divErr.classList.add("text-danger");
    return false;
  }
};

// Check confirmPassword
const samePassword = function (password1, password2, divErr, errMsg) {
  if (password1 !== password2) {
    divErr.innerHTML = errMsg;
    return false;
  } else if (password1 === password2) {
    divErr.innerHTML = "";
    return true;
  }
};

// SUBMIT
document.querySelector(".register__form").onsubmit = function (event) {
  event.preventDefault();
  console.log(event.target);

  // get dataa from form
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  console.log(data);

  // validation
  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let phoneError = document.getElementById("phoneError");
  let passwordError = document.getElementById("passwordError");
  let confirmPasswordError = document.getElementById("confirmPasswordError");
  let genderError = document.getElementById("genderError");
  let valid; // flag variable

  // check empty
  let empty =
    notEmpty(data.name, nameError) &
    notEmpty(data.email, emailError) &
    notEmpty(data.phone, phoneError) &
    notEmpty(data.password, passwordError) &
    notEmpty(data.confirmPassword, confirmPasswordError) &
    notEmpty(data.gender, genderError);

  console.log(empty);
  valid = empty === 1 ? true : false;
  console.log(valid);
  if (!valid) return;

  // multiple check
  const multipleCheck = function () {
    let valids =
      validInPut(data.name, nameError, "Tên phải là chữ", REGEX_NAME) &
      validInPut(
        data.email,
        emailError,
        "Email phải đúng định dạng",
        REGEX_EMAIL
      ) &
      validInPut(
        data.password,
        passwordError,
        "mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)",
        REGEX_PASSWORD
      ) &
      validInPut(
        data.phone,
        phoneError,
        "Phone number phải đúng định dạng",
        REGEX_PHONE
      ) &
      samePassword(
        data.password,
        data.confirmPassword,
        confirmPasswordError,
        "Password không trùng khớp"
      );

    console.log(valids);
    return valids === 1 ? true : false;
  };

  valid = multipleCheck();
  console.log(valid);

  if (!valid) return;

  let newAccount = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    gender: data.gender === "male" ? true : false,
  };

  http
    .post("/Users/signup", newAccount)
    .then((res) => {
      console.log(res);
      console.log(res.data);

      event.target.reset();
      displayConfirm(res.data.message);
    })
    .catch((err) => {
      console.log(err);
    });


};
