import Swal from "sweetalert2";

export const avisoError = async (avisoTexto) => {
  await Swal.fire({
    icon: "error",
    title: "Error",
    text: avisoTexto,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#d33",
  });
};

export const avisoExito = async (avisoTexto) => {
  await Swal.fire({
    icon: "success",
    title: "Éxito",
    timer: 9000,
    text: avisoTexto,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#46c200",
  });
};

export const avisoFalta = async (avisoTitulo, avisoTexto) => {
  await Swal.fire({
    icon: "warning",
    title: avisoTitulo,
    text: avisoTexto,
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#1e3c70",
  });
};

export const avisoLoading = async (avisoTexto) => {
  await Swal.fire({
    title: "Procesando pedido",
    html: "Puede tardar unos instantes",
    text: avisoTexto,
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });
};

export const cerrarLoading = async () => {
  Swal.close();
};
