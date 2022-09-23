import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/BookCard.module.css";

export function BookCard({ book }) {
  return (
    <Link
      to={{
        pathname: "/home/detail",
        search: "id=" + book.id,
      }}
    >
      <Card
        hoverable
        style={{ width: 200, paddingTop: 16 }}
        cover={<img src={book.imgUrl} className={styles["card-cover-img"]} />}
      >
        <Card.Meta
          title={book.title}
          description={
            <div>
              <div>作者：{book.author}</div>
              <div>售价：{book.price}</div>
              <div>ISBN：{book.isbn}</div>
              <div>库存：{book.remaining}</div>
            </div>
          }
        />
      </Card>
    </Link>
  );
}
