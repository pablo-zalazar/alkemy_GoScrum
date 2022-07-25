import Swal from "sweetalert2";

function alert(title, message, icon) {
  Swal.fire({
    icon,
    confirmButtonColor: "#5dade2",
    title: title,
    text: message,
    confirmButtonText: "Aceptar",
    width: "400",
    timer: 5000,
    timerProgressBar: true,
  });
}

export default alert;
