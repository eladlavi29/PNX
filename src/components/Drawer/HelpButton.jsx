import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Typography } from "@mui/material";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
  minHeight: "0", // Adjust this line to prevent extra space
}));

export default function renderHistory() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <List>
        <ListItem key={"Settings"} disablePadding>
          <ListItemButton onClick={handleDrawerOpen}>
            <ListItemIcon>
              <InfoRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>

          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                height: "100%", // Ensures the drawer takes full height
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start", // Aligns content to the top
                alignItems: "flex-start", // Aligns content to the left
                padding: 2, // Adds padding around the content
              },
              position: "absolute",
              left: 0,
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, padding: 2, textAlign: "left" }}
            >
              About
            </Typography>
            <Divider />
            <Typography
              variant="body1"
              component="div"
              sx={{ padding: 2, textAlign: "left" }}
            >
              This is an annual project in the ICST lab, CS faculty at Technion.{" "}
              <br />
              Supervised by Yaron Hay, Etay Davran, Opal Maman, and Avichai
              Sabag.
              <br /> Students: Omer Daube, Nizan Kafman Raz, Mayan Rousso, Elad
              Lavi, Erez Koifman, and Amir Bourvine. <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </Typography>
          </Drawer>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}
