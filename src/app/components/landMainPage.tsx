"use client";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIco from "@mui/icons-material/Home";
import LessIco from "@mui/icons-material/PlayLesson";
import PersonIco from "@mui/icons-material/Person";
import PaymentIco from "@mui/icons-material/Payment";
import ReportIco from "@mui/icons-material/Report";
import SettIco from "@mui/icons-material/Settings";
import LogoutSharp from "@mui/icons-material/Logout";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
interface Props {
  window?: () => Window;
  children: any;
}

export default function LandMainPage(props: Props) {
  const { window } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const drawerWidth = 240;
  const router=useRouter();
  const handleListItemClick: any = (
    index: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setSelectedIndex(index);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const icons = [
    {
      icon: <HomeIco />,
    },
    {
      icon: <LessIco />,
    },
    {
      icon: <PersonIco />,
    },
    {
      icon: <PaymentIco />,
    },
    {
      icon: <ReportIco />,
    },
    {
      icon: <SettIco />,
    },
  ];
  const drawer = (
    <div className="flex flex-col justify-between items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="flex mb-10">
          <div className="w-1 bg-yellow-400 mr-1"></div>
          <span className="font-sans text-2xl  uppercase antialiased hover:subpixel-antialiased">
            Manage Courses
          </span>
        </div>
        <Avatar
          sx={{
            width: "196px",
            height: "196px",
          }}
          alt="Remy Sharp"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
        />
        <span className="font-sans text-sm  uppercase antialiased hover:subpixel-antialiased">
          Julia Doe
        </span>
      </div>
      <div>
        <List>
          <Link
            href={{
              pathname: `/home`,
            }}
          >
            <ListItem key={"home"} disablePadding>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={handleListItemClick.bind({}, 1)}
              >
                <ListItemIcon>{icons[0].icon}</ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
          </Link>
          {["Course", "Students", "Payment", "Report", "Settings"].map(
            (text, index) => {
              
              let theIcon=icons[index+1].icon;
              return index === 1 ? (
                <Link
                  href={{
                    pathname: `/${text.toLowerCase()}`,
                    query: {
                      pq: 1,
                      ppsq: 10,
                    },
                  }}
                >
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      selected={selectedIndex === index + 2}
                      onClick={handleListItemClick.bind({}, index + 2)}
                    >
                      <ListItemIcon>{theIcon}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ) : (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    selected={selectedIndex === index + 2}
                    onClick={handleListItemClick.bind({}, index + 2)}
                  >
                    <ListItemIcon>{theIcon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );;
            }
          )}
        </List>
      </div>
      <div>
        <List>
          <ListItem key={"logout"} disablePadding onClick={()=>{
            router.push('http://localhost:3000/login')
          }}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutSharp />
              </ListItemIcon>
              <ListItemText primary={"Log Out"} />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </div>
  );

  return (
    <div id="home-page" className="flex w-full h-screen bg-white flex-row">
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: "50px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          ></IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="persistent"
          container={container}
          open={true}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            color: "black",
          }}
          sx={{
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
            width: 219,
            height: "100vh",
            backgroundColor: "#F8D442",
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "90vh",
          marginTop: "30px",
        }}
      >
        {props.children}
      </Box>
    </div>
  );
}
