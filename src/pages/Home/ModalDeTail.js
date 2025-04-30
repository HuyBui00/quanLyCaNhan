import React from "react";
import { Modal, Form, Input, DatePicker, Select, Checkbox } from "antd";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form"; // hoặc import từ 'antd'

const { Option } = Select;

const AddTaskModal = ({
  visible,
  setVisible,
  setTasks,
  typeModal,
  valueCurrent,
}) => {
  const [form] = useForm();

  React.useEffect(() => {
    form.resetFields();
    if (visible) {
      if (typeModal == 1) {
        form.setFieldsValue(valueCurrent);
      }
    }
  }, [form, typeModal, valueCurrent, visible]);

  const handleAddTask = () => {
    form.validateFields().then((values) => {
      const newTask = {
        ...values,
        date: values.date,
      };

      if (typeModal === 1) {
        // Sửa task
        setTasks((prev) =>
          prev.map((task) =>
            task.id === valueCurrent.id
              ? { ...task, ...newTask, id: task.id }
              : task
          )
        );
        toast.success("Cập nhật thành công");
      } else {
        // Thêm mới task
        const taskWithId = { ...newTask, id: Date.now() };
        setTasks((prev) => [...prev, taskWithId]);
        toast.success("Thêm mới thành công");
      }

      setVisible(false);
      form.resetFields();
    });
  };

  const onFinishFailed = () => {
    toast.error("Chưa điền các trường bắt buộc!");
  };

  return (
    <Modal
      title="Thêm công việc mới"
      style={{ minWidth: "90vw" }}
      open={visible}
      destroyOnClose={true}
      onCancel={() => {
        setVisible(false);
      }}
      onOk={() => form.submit()}
    >
      <Form
        layout="vertical"
        name="basic"
        form={form}
        onFinish={handleAddTask}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name={"title"}
          label="Tiêu đề công việc"
          rules={[
            { required: true, message: "Vui lòng nhập tiêu đề công việc!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
          label="Ngày"
          rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}
        >
          <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày" />
        </Form.Item>

        <Form.Item name="tag" label="Nhắc nhở ngắn">
          <Input />
        </Form.Item>

        <Form.Item name="color" label="Màu thẻ">
          <Select>
            <Option value="blue">
              <span style={{ color: "blue" }}>Xanh dương</span>
            </Option>
            <Option value="green">
              <span style={{ color: "green" }}>Xanh lá</span>
            </Option>
            <Option value="purple">
              <span style={{ color: "purple" }}>Tím</span>
            </Option>
            <Option value="orange">
              <span style={{ color: "orange" }}>Cam</span>
            </Option>
            <Option value="red">
              <span style={{ color: "red" }}>Đỏ</span>
            </Option>
          </Select>
        </Form.Item>

        <Form.Item name="completed" valuePropName="checked">
          <Checkbox>Đã hoàn thành</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskModal;
