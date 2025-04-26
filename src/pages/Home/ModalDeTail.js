import React from 'react';
import { Modal, Form, Input, DatePicker, Select, Checkbox } from 'antd';
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import { useForm } from 'antd/es/form/Form'; // hoặc import từ 'antd'

const { Option } = Select;

const AddTaskModal = ({ visible , setVisible, setTasks, typeModal, valueCurrent }) => {

    const [form] = useForm();

    React.useEffect(() => {
      form.resetFields()
      if (visible) {
        if (typeModal == 1) {
            form.setFieldsValue(valueCurrent);
        }
      }
    }, [form ,typeModal, valueCurrent, visible])

    const handleAddTask = () => {
      form.validateFields().then(values => {
        const newTask = {
          ...values,
          date: values.date
        };
    
        if (typeModal === 1) {
          // Sửa task
          setTasks(prev =>
            prev.map(task =>
              task.id === valueCurrent.id ? { ...task, ...newTask, id: task.id } : task
            )
          );
          toast.success("Cập nhật thành công");
        } else {
          // Thêm mới task
          const taskWithId = { ...newTask, id: Date.now() };
          setTasks(prev => [...prev, taskWithId]);
          toast.success("Thêm mới thành công");
        }
    
        setVisible(false);
        form.resetFields();
      });
       
    };

    const onFinishFailed = () => {
        toast.error("Đã có lỗi xảy ra!")
    }

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
    //   onCancel={() => setVisible(false)}
    //   okText="Thêm"
    //   cancelText="Hủy"
    >
      <Form layout="vertical" 
            name="basic"
            form={form}
            onFinish={handleAddTask}
            onFinishFailed={ onFinishFailed}
            autoComplete="off"
            initialValues={{ remember: true }}
                >
        <Form.Item name={"title"} label="Tiêu đề công việc" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="date" label="Ngày" rules={[{ required: true }]}>
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item name="tag" label="Thẻ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="color" label="Màu thẻ" rules={[{ required: true }]}>
          <Select>
            <Option value="blue">Xanh dương</Option>
            <Option value="green">Xanh lá</Option>
            <Option value="purple">Tím</Option>
            <Option value="orange">Cam</Option>
            <Option value="red">Đỏ</Option>
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
