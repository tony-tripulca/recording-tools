import { HTMLAttributes, ReactNode } from "react";

export type TSectionMainComponent = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  module: string;
  sx?: Record<string, string | unknown>;
};
