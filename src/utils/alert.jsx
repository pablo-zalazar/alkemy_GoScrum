import Swal from "sweetalert2";

function alert(title, message) {
  Swal.fire({
    title: title,
    text: message,
    confirmButtonText: "Aceptar",
    width: "400",
    timer: 5000,
    timerProgressBar: true,
  });
}

export default alert;
