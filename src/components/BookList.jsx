import { Divider, Input, List, Typography } from "antd"
import React, { useEffect, useRef, useState } from "react"
import { getAllBook } from "../services/BookServices"
import { BookCard } from "./BookCard"
import BookCarousel from "./BookCarousel"

export default function BookListPage() {
  const allBooks = useRef()
  useEffect(async () => {
    allBooks.current = await getAllBook()

    setBooks(allBooks.current)
  }, [])

  const [books, setBooks] = useState([])
  const [keyWord, setKeyWord] = useState(null)

  const handleChange = (e) => {
    setKeyWord(e.target.value)
  }

  const handlePressEnter = () => {
    const newBooks = allBooks.current.filter((book) => {
      return book.title.search(keyWord) !== -1
    })
    setBooks(newBooks)
  }

  return (
    <div>
      <Input
        placeholder="请输入您想要查询的书籍"
        size="large"
        style={{ marginBottom: 16 }}
        onChange={handleChange}
        onPressEnter={handlePressEnter}
      />
      <BookCarousel />
      <Divider />
      <Typography>
        <Typography.Title level={3}>书籍展区</Typography.Title>
      </Typography>
      <List
        dataSource={books}
        grid={{ gutter: 10, column: 4 }}
        renderItem={(book) => {
          return (
            <List.Item>
              <BookCard book={book} />
            </List.Item>
          )
        }}
      ></List>
    </div>
  )
}
