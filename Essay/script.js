import { FcHome } from "react-icons/fc";
const homebtn = document.getElementById("homeBtn");
// Thêm sự kiện click cho nút đăng nhập
homebtn.addEventListener("click", function () {
    setTimeout(() => {
        window.location.href = "./index1.html";
    }, 100);
});