import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Card from "@mui/material/Card";
import Edit from "@mui/icons-material/EditRounded";
import { format as dateFormat } from "date-fns";
import Delete from "@mui/icons-material/Delete";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import {
  deleteAdmin,
  getAllAdmin,
  blockAdmin,
} from "../../Redux/super_admin/user";
import {
  errorNotification,
  successNotification,
} from "../../Helpers/notification";
import SwitchIcon from "../../Components/switch/SwitchIcon";
import Cookie from "universal-cookie";

export default function RecipeReviewCard({ user }) {
  let cookies = new Cookie();
  let dispatch = useDispatch();

  const handleDelete = (staff_id) => {
    Swal.fire({
      title: "Hodimni ochirmoqchimisz?",
      showDenyButton: true,
      confirmButtonText: "ha",
      denyButtonText: `yo'q`,
      background: "#494a5e",
      color: "white",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAdmin(staff_id))
          .unwrap()
          .then(() => {
            successNotification("bottomRight", "Muvofaqqiyatli ochirildi");
            return dispatch(getAllAdmin());
          })
          .catch((err) => {
            errorNotification("bottomRight", err);
          });
      }
    });
  };

  const handleBlock = (e) => {
    dispatch(blockAdmin({ id: e.id, isActive: e.checked }))
      .unwrap()
      .then(() => {
        successNotification("bottomRight", "Muvofaqqiyatli o'zgardi");
        return dispatch(getAllAdmin());
      })
      .catch((err) => {
        errorNotification("bottomRight", err);
      });
  };

  return (
    <>
      {cookies.get("id") !== user.id.toString() ? (
        <Card sx={{ background: "#d1d2de" }} className="secondary-color">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[700] }} aria-label="recipe">
                {user.firstName[0].toUpperCase()}
              </Avatar>
            }
            title={`${user.firstName} ${user.lastName}`}
            subheader={dateFormat(new Date(user.createdDate), "MMMM do. yyyy")}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Telefon raqami:
              </Typography>
              <Typography sx={{ fontWeight: "500" }}>
                +998 {user.phoneNumber}
              </Typography>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <SwitchIcon
              handleChange={handleBlock}
              id={user.id}
              active={user.active}
            />
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(user.id)}
            >
              <Delete className="text-danger" />
            </IconButton>
          </CardActions>
        </Card>
      ) : null}
    </>
  );
}
