import {
  Button,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import MyDivider from "./MyDivider";

const EditableCell = ({ editing, dataIndex, children, select, options }) => {
  const inputNode = select ? (
    <Select defaultValue={<Tag>123</Tag>}>
      {options.map((option) => {
        return (
          <Select.Option key={option.key}>
            <Tag color={option.color}>{option.title}</Tag>
          </Select.Option>
        );
      })}
    </Select>
  ) : (
    <Input />
  );
  return (
    <td>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function EditableTable({
  title,
  dataSource,
  setDataSource,
  columns,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isInserting, setIsInserting] = useState(false);

  const isEditing = (index) => index === editingIndex;

  const handleEdit = (record, index) => {
    form.setFieldsValue(record);
    setEditingIndex(index);
  };

  const handleCancel = () => {
    console.log(123);
    if (isInserting) {
      const newData = [...dataSource];
      newData.pop();
      setDataSource(newData);
      setIsInserting(false);
    }
    setEditingIndex(-1);
  };

  const handleSave = (id, index) => {
    form
      .validateFields()
      .then(() => {
        const editedValue = form.getFieldsValue();
        const newDataSource = [...dataSource];

        if (isInserting) {
          const newData = {
            ...dataSource[dataSource.length - 1],
            ...editedValue,
          };
          console.log(newData);
          onAdd(newData).then((data) => {
            newDataSource.splice(dataSource.length - 1, 1, data);
            setDataSource(newDataSource);
            setIsInserting(false);
          });
        } else {
          const newData = {
            ...dataSource[index],
            ...editedValue,
          };
          console.log(newData);
          newDataSource.splice(index, 1, newData);
          onUpdate(newData);
          setDataSource(newDataSource);
        }
        setEditingIndex(-1);
      })
      .catch(() => {});
  };

  const handleDelete = (id, index) => {
    onDelete(id).then(() => {
      const newDataSource = [...dataSource];
      newDataSource.splice(index, 1);
      setDataSource(newDataSource);
    });
  };

  const handleAddDoctor = () => {
    if (editingIndex !== -1 || isInserting) return;
    const newData = [...dataSource];
    newData.push({});
    setDataSource(newData);
    setEditingIndex(newData.length - 1);
    setIsInserting(true);
  };

  const mergedColumns = columns.map((column) => {
    if (!column.editable) {
      return column;
    }

    return {
      ...column,
      onCell: (user, index) => ({
        record: user,
        dataIndex: column.dataIndex,
        title: column.title,
        editing: isEditing(index),
        select: column.select,
        options: column.options,
      }),
    };
  });

  const operationColumn = {
    title: "操作",
    dataIndex: "operation",
    width: "100px",
    render: (text, user, index) => {
      const editing = isEditing(index);
      return editing ? (
        <Space>
          <Typography.Link onClick={() => handleSave(user.id, index)}>
            保存
          </Typography.Link>
          <Popconfirm
            icon={null}
            title="确定取消吗？"
            onConfirm={handleCancel}
            okText="确定"
            cancelText="取消"
          >
            <a>取消</a>
          </Popconfirm>
        </Space>
      ) : (
        <Space>
          <Typography.Link
            disabled={editingIndex !== -1}
            onClick={() => handleEdit(user, index)}
          >
            编辑
          </Typography.Link>
          <Popconfirm
            title="确认删除"
            icon={null}
            onConfirm={() => handleDelete(user.id, index)}
            okText="确定"
            cancelText="取消"
          >
            <a disabled={editingIndex !== -1}>删除</a>
          </Popconfirm>
        </Space>
      );
    },
  };

  const columnsWithOperation = [operationColumn, ...mergedColumns];

  return (
    <div>
      {!!title && (
        <>
          <Typography.Title level={3}>{title}</Typography.Title>
          <MyDivider />
        </>
      )}
      <Form form={form} component={false}>
        <Table
          scroll={{ x: "max-content" }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={dataSource}
          columns={columnsWithOperation}
          pagination={false}
          rowKey={(row) => row.id}
        />
      </Form>
      <MyDivider />
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button type="primary" size="large" onClick={handleAddDoctor}>
          添加
        </Button>
      </div>
    </div>
  );
}
