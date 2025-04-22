const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// Lấy các phần tử
const loginbut = document.getElementById("loginBtn");
const userInput = document.getElementById("username");
const passInput = document.getElementById("pass");

const correctUser = "PhamVanSu.sv03@gmail.com";
const correctPassword = "Laptrinhamthanh";

// Thêm sự kiện click cho nút đăng nhập
loginbut.addEventListener("click", function (e) {
    e.preventDefault();
    const user = userInput.value.trim();
    const password = passInput.value.trim();

    if (!user || !password) {
        // Kiểm tra nếu bất kỳ trường nào trống
        alert("Vui lòng nhập đủ thông tin");
    } else if (user === correctUser && password === correctPassword) {
        // Kiểm tra nếu user và mật khẩu đúng
        alert("Đăng nhập thành công");
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 1000);
    } else {
        // Thông báo khi sai tài khoản hoặc mật khẩu
        alert("Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại");
    }
});


const nameInput= document.getElementById("regName");
const emailInput = document.getElementById("regEmail");
const passwInput = document.getElementById("regPass");
const regBtn = document.getElementById("regBtn");
// Thêm sự kiện click cho nút đăng nhập
regBtn.addEventListener("click", function () {
    const name= nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwInput.value.trim();
    // const checkword= checkInput.value.trim();
    // if(password!=checkword){
    //   alert("Mật khẩu không trùng khớp, vui lòng kiểm tra lại");
    //   return;
    // }
    // Kiểm tra nếu cả hai ô đều được điền
    if (name!=="" &&email !== "" && password !== "") {
      alert("Bạn không có quyền hạn đăng kí, vui lòng đăng nhập theo tài khoản mật khẩu được cấp phép");
    } else {
      alert("Vui lòng điền đủ thông tin");
    }
  });