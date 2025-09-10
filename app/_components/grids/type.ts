import { HTMLAttributes, ReactNode } from "react";

export type TGridColComponent = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  size?: Record<string, string | object | unknown>;
  sx?: Record<string, string | object | unknown>;
};

export type TGridRowComponent = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  spacing?: number;
  sx?: Record<string, string | object | unknown>;
};
