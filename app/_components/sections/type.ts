import { HTMLAttributes, ReactNode } from "react";

export type TSectionMainComponent = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  module: string;
};
