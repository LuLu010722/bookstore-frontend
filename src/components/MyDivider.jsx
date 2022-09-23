import React from "react";

export default function MyDivider({ size = "medium" }) {
  const height = size === "small" ? 8 : size === "medium" ? 16 : 24;

  return <div style={{ height: height }}></div>;
}
