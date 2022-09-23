import { Layout, Menu, Space } from "antd";
import { createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import BookManage from "../components/BookManage";
import MyFooter from "../components/MyFooter";
import MyHeader from "../components/MyHeader";
import OrderManage from "../components/OrderManage";
import Statistics from "../components/Statistics";
import UserManage from "../components/UserManage";
import styles from "../css/HomeView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCartArrowDown,
  faDatabase,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const { Item } = Menu;
const { Content, Footer, Sider } = Layout;
export const AppContext = createContext({});

export default function HomeView(props) {
  const navigate = useNavigate();

  const handleSiderClick = (event) => {
    const path = event.key;
    navigate("/admin/" + path);
  };

  return (
    <Layout className={styles["total-layout"]}>
      <MyHeader mode="admin" />
      <Content className={styles["middle-content"]}>
        <Layout
          className={`${styles["site-layout-background"]} ${styles["middle-layout"]}`}
        >
          <Sider
            className={`${styles["site-layout-background"]} ${styles["sider"]}`}
            width={120}
          >
            <Menu
              mode="inline"
              style={{ height: "100%" }}
              defaultSelectedKeys={["shudan"]}
            >
              <Item key="user" onClick={handleSiderClick}>
                <Space>
                  <FontAwesomeIcon icon={faUser} />
                  用户管理
                </Space>
              </Item>
              <Item key="book" onClick={handleSiderClick}>
                <Space>
                  <FontAwesomeIcon icon={faBook} />
                  书籍管理
                </Space>
              </Item>
              <Item key="order" onClick={handleSiderClick}>
                <Space>
                  <FontAwesomeIcon icon={faCartArrowDown} />
                  订单管理
                </Space>
              </Item>
              <Item key="statistics" onClick={handleSiderClick}>
                <Space>
                  <FontAwesomeIcon icon={faDatabase} />
                  后台统计
                </Space>
              </Item>
            </Menu>
          </Sider>
          <Content className={styles["main-content"]}>
            <Routes>
              <Route path="/user" element={<UserManage />} />
              <Route path="/book" element={<BookManage />} />
              <Route path="/order" element={<OrderManage />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <MyFooter />
    </Layout>
  );
}
