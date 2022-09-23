import { Form, Image, Input, Tag, Typography } from "antd"
import React, { useEffect, useState } from "react"
import { deleteBookById, getAllBook, saveBook } from "../services/BookServices"
import EditableTable from "./EditableTable"
import moment from "moment"
import MyDivider from "./MyDivider"
import { useForm } from "antd/es/form/Form"

export default function BookManage() {
  const [books, setBooks] = useState([])
  const [form] = useForm()

  useEffect(() => {
    getAllBook().then((data) => {
      setBooks(data)
    })
  }, [])

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "书名",
      dataIndex: "title",
      key: "title",
      editable: true
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      editable: true
    },
    {
      title: "出版时间",
      dataIndex: "publishTime",
      key: "publishTime",
      editable: true,
      render: (time) => {
        return new moment(time).format("YYYY-MM-DD")
      }
    },
    {
      title: "封面",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (url) => {
        return (
          <div style={{ textAlign: "center" }}>
            <Image src={url} alt={"not found"} height={150} />
          </div>
        )
      },
      editable: true
    },
    {
      title: "语言",
      dataIndex: "language",
      key: "language",
      editable: true,
      select: true,
      render: (language) => {
        return <Tag>{language}</Tag>
      },
      options: [{ title: "zn-ch", key: "zn-ch" }]
    },
    {
      title: "ISBN编号",
      dataIndex: "isbn",
      key: "isbn",
      editable: true
    },
    {
      title: "库存",
      dataIndex: "remaining",
      key: "remaining",
      editable: true
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      editable: true
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      editable: true,
      width: "300px"
    }
  ]

  const handleFilter = () => {
    const title = form.getFieldValue("title")

    getAllBook().then((data) => {
      const newBooks = data.filter((book) => {
        return book.title.search(title) !== -1
      })
      setBooks(newBooks)
    })
  }

  return (
    <div>
      <Typography.Title level={3}>书籍管理</Typography.Title>
      <MyDivider />
      <Typography.Title level={4}>搜索</Typography.Title>
      <Form form={form}>
        <Form.Item label="书名" name="title">
          <Input placeholder="请输入书名" onPressEnter={handleFilter} />
        </Form.Item>
      </Form>
      <MyDivider />
      <EditableTable
        columns={columns}
        dataSource={books}
        setDataSource={setBooks}
        onAdd={saveBook}
        onUpdate={saveBook}
        onDelete={deleteBookById}
      />
    </div>
  )
}
