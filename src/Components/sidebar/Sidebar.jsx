import React from "react";
import logo from "../../Assets/Global/main_logo.png";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { NavLink } from "react-router-dom";

const Sidebar = ({ routes }) => {
  const [selectedIndex, setSelectedIndex] = React.useState("");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <Toolbar>
        <NavLink to="/tizimli">
          <img src={logo} alt="" className="img-fluid" />
        </NavLink>
      </Toolbar>
      <Divider />
      <List>
        {routes.map((route, index) => (
          <NavLink
            to={"/tizimli/" + route.path}
            className="text-dark no_hover"
            key={route.id}
          >
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                <route.image />
              </ListItemIcon>

              <ListItemText primary={route.name}></ListItemText>
            </ListItemButton>
          </NavLink>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
