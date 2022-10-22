import Swal from "sweetalert2";
import "animate.css";

export const addAdmin = ({ handleDispatch }) => {
  return Swal.fire({
    title: "Xodim qo'shish",
    html: `<input type="text" id="firstName" class="swal2-input" placeholder="Ismi">
      <input type="text" id="lastName" class="swal2-input" placeholder="Familyasi">
      <input type="number" id="phoneNumber" class="swal2-input" placeholder="Telefon raqami">
      <input type="password"  id="password1" class="swal2-input" placeholder="Maxfiy kalit so'zi">
      <br/>
      <div style="margin-top:10px"><label style = "color:red" for = "check">Super admin qo'shish:</label>
      <input type="checkbox" id="check" class="swal2-input" style="height:13px;margin:0; margin-right:190px"></div>`,
    confirmButtonText: `Qo'shish`,
    cancelButtonText: "Rad etish",
    focusConfirm: false,
    background: "#494a5e",
    color: "white",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",

    inputAttributes: {
      autocapitalize: "off",
    },
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    showCancelButton: true,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const firstName = Swal.getPopup().querySelector("#firstName").value;
      const lastName = Swal.getPopup().querySelector("#lastName").value;
      const phoneNumber = Swal.getPopup().querySelector("#phoneNumber").value;
      const password = Swal.getPopup().querySelector("#password1").value;
      const isSuperAdmin = Swal.getPopup().querySelector("#check").checked;

      if (!firstName || !lastName || !phoneNumber.length) {
        return Swal.showValidationMessage(`Barcha malumotlarni kiriting`);
      } else if (phoneNumber.length !== 9) {
        return Swal.showValidationMessage(
          `Telefon raqami 9 xonali son bo'lishi zarur`
        );
      }

      return handleDispatch({
        firstName,
        lastName,
        phoneNumber,
        password,
        isSuperAdmin,
      });
    },
  });
};

export const editProfile = ({
  firstName,
  lastName,
  phoneNumber,
  id,
  handleDispatch,
}) => {
  return Swal.fire({
    title: "Shaxsiy ma'lumotni o'zgartirish",
    html: `<input type="text" value = ${firstName}  id="firstName" class="swal2-input" placeholder="ismingizni kiriting" >
       <input type="text" value = ${lastName} id="lastName" class="swal2-input" placeholder="familyangizni kiriting" >
       <input type="number" value = ${phoneNumber}  id="phoneNumber"  class="swal2-input" placeholder="Telefon raqamingiz" >`,
    backdrop: true,
    confirmButtonText: `O'zgartirish`,
    cancelButtonText: "Rad etish",
    focusConfirm: false,
    background: "#494a5e",
    color: "white",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",

    inputAttributes: {
      autocapitalize: "off",
    },
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    showCancelButton: true,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const firstName = Swal.getPopup().querySelector("#firstName").value;
      const lastName = Swal.getPopup().querySelector("#lastName").value;
      const phoneNumber = Swal.getPopup().querySelector("#phoneNumber").value;

      if (!firstName || !lastName || !phoneNumber.length) {
        return Swal.showValidationMessage(`Barcha malumotlarni kiriting`);
      } else if (phoneNumber.length !== 9) {
        return Swal.showValidationMessage(
          `Telefon raqami 9 xonali son bo'lishi zarur`
        );
      }

      return handleDispatch({ firstName, lastName, phoneNumber, id });
    },
  });
};

export const editPassword = ({ handlePassword }) => {
  return Swal.fire({
    title: "Maxfiy kalit so'zni o'zgartirish",
    html: `<input type="password"  id="password"  class="swal2-input" placeholder="yangi maxfiy kalit" >`,
    backdrop: true,
    confirmButtonText: `O'zgartirish`,
    cancelButtonText: "Rad etish",
    focusConfirm: false,
    background: "#494a5e",
    color: "white",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",

    inputAttributes: {
      autocapitalize: "off",
    },
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    showCancelButton: true,
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const password = Swal.getPopup().querySelector("#password").value;

      if (!password.length) {
        return Swal.showValidationMessage(`Maxfiy kalit so'zni kiriting`);
      } else if (password.length < 6) {
        return Swal.showValidationMessage(
          `Maxfiy kalit so'z eng kami 6 xonali son bo'lishi zarur`
        );
      }
      return handlePassword({ password });
    },
  });
};
