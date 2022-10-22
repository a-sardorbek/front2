//folders
import Dashboard from "../Pages/dashboard/Dashboard";

import ReceivedInfos from "../Pages/received_infos/ReceivedInfos";
import Infos from "../Pages/infos/Infos";
import NewInfo from "../Pages/new_info/NewInfo";

//icons
import Dashboard_icon from "@mui/icons-material/Dashboard";
import AddCard_icon from "@mui/icons-material/AddCardRounded";
import Card_icon from "@mui/icons-material/AllInboxRounded";
import Received_icon from "@mui/icons-material/InfoTwoTone";

export let admin_routes = [
  {
    id: 1,
    path: "",
    name: "Boshqaruv paneli",
    image: Dashboard_icon,
    Element: Dashboard,
  },
  {
    id: 2,
    path: "malumot_qo'shish",
    name: "Malumot qoshish",
    image: AddCard_icon,
    Element: NewInfo,
  },
  {
    id: 3,
    path: "barcha_malumotlar",
    name: "Barcha malumotlar",
    image: Card_icon,
    Element: Infos,
  },
  {
    id: 4,
    path: "qismli_malumotlar",
    name: "Qismli malumotlar",
    image: Received_icon,
    Element: ReceivedInfos,
  },
];
