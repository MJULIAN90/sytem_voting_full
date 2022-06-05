import Swal from "sweetalert2";
import { colors } from "../Assets";

const useAlerts = () => {
  const alert = (message, type) => {
    Swal.fire({
      title: type.toUpperCase(), text: message, icon: type, confirmButtonColor: colors.alertColor,
    });
  };

  const votingUser = (name, resumen, image, action, isExistWinner) => {
    Swal.fire({
      title: name,
      text: resumen,
      imageUrl: image,
      imageWidth: 200,
      imageHeight: 240,
      imageAlt: 'Custom image',
      width: 300,
      confirmButtonText: !isExistWinner ? "Votar" : "Cerrar",
      confirmButtonColor: colors.alertColor,
      
    }).then(result => {
      if (result.isConfirmed && !isExistWinner) {
        action(name)
      }
    })
  }

  return {
    alert,
    votingUser
  };
};

export default useAlerts;
