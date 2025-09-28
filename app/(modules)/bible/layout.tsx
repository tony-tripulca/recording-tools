import { SectionMain } from "@/app/_components/sections";
import { Box } from "@mui/material";
import React from "react";
import "./layout.scss";
import { NavBottom } from "@/app/_components/navs";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className="box-content">
      <SectionMain module="bible">{children}</SectionMain>
      <NavBottom/>
    </Box>
  );
}
