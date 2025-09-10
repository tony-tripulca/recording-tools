import { GridCol, GridRow } from "@/app/_components/grids";
import { NavSide } from "@/app/_components/navs";
import { SectionMain } from "@/app/_components/sections";
import React from "react";
import "./layout.scss";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GridRow>
      <GridCol size={{ xs: 12, xl: 9 }}>
        <SectionMain module="search">{children}</SectionMain>
      </GridCol>
      <GridCol size={{ xs: 12, xl: 3 }}>
        <NavSide />
      </GridCol>
    </GridRow>
  );
}
