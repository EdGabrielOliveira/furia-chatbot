import React from "react";
interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className="m-0 p-0 w-full">{children}</div>;
}
