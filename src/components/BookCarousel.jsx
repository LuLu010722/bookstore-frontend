import { Carousel } from "antd";
import React from "react";

export default function BookCarousel() {
  const a = require.context;
  return (
    <div style={{ padding: "0 5%" }}>
      <Carousel autoplay dotPosition="bottom">
        <img src="/imgs/carousel/book1.jpg" alt="can't find" />
        <img src="/imgs/carousel/book2.jpg" alt="can't find" />
        <img src="/imgs/carousel/book3.jpg" alt="can't find" />
        <img src="/imgs/carousel/book4.jpg" alt="can't find" />
      </Carousel>
    </div>
  );
}
