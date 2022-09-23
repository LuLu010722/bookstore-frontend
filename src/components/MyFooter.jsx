import { Footer } from "antd/lib/layout/layout";
import React from "react";
import styles from "../css/HomeView.module.css";

export default function MyFooter() {
  return (
    <Footer className={styles["footer"]}>
      powered by{" "}
      <a href="https://react.docschina.org/" target={"_blank"}>
        React
      </a>{" "}
      &{" "}
      <a href="https://ant.design/" target={"_blank"}>
        Ant Design
      </a>
    </Footer>
  );
}
