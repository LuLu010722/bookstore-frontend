import { Avatar, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  addUserByAdmin,
  deleteUserById,
  getAllUsers,
  updateUserByAdmin,
} from "../services/UserServices";

import EditableTable from "./EditableTable";
import { UserOutlined } from "@ant-design/icons";

export default function UserManage() {
  const [users, setUsers] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "50px",
    },
    {
      title: "头像",
      dataIndex: "avatarImgUrl",
      key: "avatarImgUrl",
      width: "70px",
      align: "center",
      editable: true,
      render: (url) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {!!url ? <Avatar src={url} /> : <UserOutlined />}
        </div>
      ),
    },
    {
      title: "姓名",
      dataIndex: "username",
      width: "150px",
      editable: true,
    },
    {
      title: "昵称",
      dataIndex: "nickname",
      key: "nickname",
      width: "150px",
      editable: true,
    },
    {
      title: "用户状态",
      dataIndex: "userType",
      width: "100px",
      editable: true,
      render: (status) => {
        return status === "CUSTOMER" ? (
          <Tag color="green">用户</Tag>
        ) : status === "ADMIN" ? (
          <Tag color="blue">管理员</Tag>
        ) : (
          <Tag color="red">禁用</Tag>
        );
      },
      select: true,
      options: [
        { title: "用户", key: "CUSTOMER", color: "green" },
        { title: "管理员", key: "ADMIN", color: "blue" },
        { title: "禁用", key: "FORBIDDEN", color: "red" },
      ],
    },
    {
      title: "邮箱",
      dataIndex: "email",
      width: "250px",
      editable: true,
    },
    {
      title: "地址",
      dataIndex: "address",
      width: "200px",
      editable: true,
    },
    {
      title: "手机号",
      dataIndex: "phone",
      editable: true,
      width: "150px",
    },
  ];

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div>
      <EditableTable
        title={"用户管理"}
        columns={columns}
        dataSource={users}
        setDataSource={setUsers}
        onAdd={addUserByAdmin}
        onUpdate={updateUserByAdmin}
        onDelete={deleteUserById}
      />
    </div>
  );
}
