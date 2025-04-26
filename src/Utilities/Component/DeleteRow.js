import { Modal } from 'antd';
import { ExclamationCircleOutlined  } from '@ant-design/icons'
import { toast } from 'react-toastify';

export const deleteRow = (oid, dataChiTiet, setDataChiTiet) => {
    console.log("hello")
    Modal.confirm({
        title: "Xác nhận xóa",
        icon: <ExclamationCircleOutlined />,
        centered: true,
        content: "Bạn có muốn xóa công việc này không?",
        okText: "Xác nhận",
        cancelText: "Thoát",
        okButtonProps: {
            type: 'primary',
        },
        onOk() {
            const updatedData = dataChiTiet.filter(item => item.id !== oid);
            setDataChiTiet(updatedData);
            toast.success('Xóa thành công');
        },
        onCancel() {
        }
    });
};