import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditClientDetails from "./EditClientDetails";
import Welcome from "./Welcome";
import natwestLogo from "../assets/navlogo.ico";
import Transaction from "./Transaction/Transaction";
import { useNavigate } from "react-router-dom";
import Logout from "./LogOut";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import {
  CreditCard,
  Person,
  ExitToApp,
  HowToReg,
  MoneyOffCsred,
  Balance,
  Receipt,
} from "@mui/icons-material";
import BalanceDisplay from "./ViewBalance";
import Button from "@mui/material/Button"; // Import Button component
import ViewTransaction from "./Transaction/ViewTransaction";
import ViewAccount from "./ViewAccount";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeButton, setActiveButton] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    navigate("/");
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleButtonClick = (buttonName) => {
    if (buttonName === "LogOut") {
      navigate("/");
    }

    setActiveButton(buttonName);
  };

  const renderActiveComponent = () => {
    switch (activeButton) {
      case "Check Balance":
        return <BalanceDisplay />;
      case "My Profile":
        return <EditClientDetails />;
      case "Credit":
        return <Transaction transactionType="credit" />;
      case "Debit":
        return <Transaction transactionType="debit" />;
      case "View Transaction":
        return <ViewTransaction />;
      case "LogOut":
        return <Logout />;
      case "Account Details":
        return <ViewAccount />;
      case "My Transactions":
        return <ViewTransaction />;
      default:
        return <Welcome />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ background: "#3c0c54" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              background: `url(${natwestLogo})`,
              backgroundSize: "contain",
              height: "30px",
              width: "auto",
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: "bold", flexGrow: 1 }}
          >
            NatWest Banking
          </Typography>
          <Button
            variant="contained"
            onClick={handleLogout}
            style={{ backgroundColor: "#8f52d1", color: "#fff" }}
          >
            <Typography
              variant="button"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Logout
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: "Check Balance", icon: <Balance /> },
            { text: "Credit", icon: <CreditCard /> },
            { text: "Debit", icon: <MoneyOffCsred /> },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => handleButtonClick(item.text)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            { text: "My Profile", icon: <Person /> },
            { text: "Account Details", icon: <AccountBalanceWalletIcon /> },
            { text: "My Transactions", icon: <ReceiptLongIcon /> },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => handleButtonClick(item.text)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {renderActiveComponent()}
      </Box>
    </Box>
  );
}
