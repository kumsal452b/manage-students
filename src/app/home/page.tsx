"use client";
import { Grid, Paper, styled } from "@mui/material";
import React from "react";
import Schole from "@mui/icons-material/School";
import Course from "@mui/icons-material/AccountBalance";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
export default function Home() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const items = [
    {
      name: "Students",
      color: "#F0F9FF",
      value: 240,
      icon: <Schole fontSize="large" sx={{color:"rgba(116, 193, 237, 1)"}}/>,
    },
    {
      name: "Course",
      color: "#FEF6FB",
      value: 100,
      icon: <Course fontSize="large" sx={{color:"rgba(238, 149, 197, 1)"}}/>,
    },
    {
      name: "Payments",
      color: "#FEFBEC",
      value: "556,000",
      icon: <PaymentOutlinedIcon fontSize="large" sx={{color:"rgba(246, 199, 98, 1)"}}/>,
    },
    {
      name: "Users",
      color: "rgba(254, 175, 0, 1)",
      value: "3",
      icon: <PermIdentityOutlinedIcon fontSize="large" sx={{color:"white"}}/>,
    },
  ];
  return (
    <div id="home-page" className="bg-c-white">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        columnSpacing={1}
      >
        {items.map((el) => {
          return (
            <Grid item xs={3} >
              <Item sx={{ height: 150 }} style={{backgroundColor:el.color}}>
                <div className="flex flex-col justify-between items-start h-full" style={{backgroundColor:el.color}}>
                  <div className="flex flex-col justify-center items-start">
                    <div className="flex flex-col justify-center items-center">
                      {el.icon}
                      <span>{el.name}</span>
                    </div>
                  </div>
                  <div className="flex items-end w-full justify-end">
                    <span className="text-3xl">{el.value}</span>
                  </div>
                </div>
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
