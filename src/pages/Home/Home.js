import React, { useEffect } from 'react';
import { Card, Input, Progress, List, Tag, Button, Tooltip } from 'antd';
import { PlusOutlined, SaveOutlined, DeleteOutlined, EditOutlined  } from '@ant-design/icons'
import './Home.css';
import LichComponent from '../../Utilities/Component/LichComponent';
import AddTaskModal from './ModalDeTail';
// import { toast } from "react-toastify";
import { deleteRow } from '../../Utilities/Component/DeleteRow';
import dayjs from 'dayjs';

const Home = () => {
  const [total, setTotal] = React.useState(0);
  const [completed, setCompleted] = React.useState(0);
  const [tasks, setTasks] = React.useState([])
  const [visible, setVisible] = React.useState(false)
  const [typeModal, setTypeModal] = React.useState(-1);
  const [valueCurrent, setValueCurrent] = React.useState([]);

  useEffect(()=>{
    setTasks([
      { id: 0, title: 'Tập thể dục', date: dayjs(), tag: 'Tập thể dục', color: 'blue', completed: true },
      { id: 1, title: 'Chuẩn bị bài thuyết trình', date: dayjs('2025-04-25'), tag: 'Chuẩn bị', color: 'purple', completed: true },
      { id: 2, title: 'Gặp khách hàng', date: dayjs('2025-04-27'), tag: 'Khách hàng', color: 'green', completed: true },
      { id: 3, title: 'Gọi thợ sửa ống nước', date: dayjs('2025-04-30'), tag: 'Gọi thợ sửa ống nước', color: 'orange', completed: true },
      { id: 4, title: 'Tập thể dục', date: dayjs(), tag: 'Tập thể dục', color: 'blue', completed: true },
      { id: 5, title: 'Chuẩn bị bài thuyết trình', date: dayjs('2025-04-25'), tag: 'Chuẩn bị', color: 'purple', completed: true },
      { id: 6, title: 'Gặp khách hàng', date: dayjs('2025-04-27'), tag: 'Khách hàng', color: 'green', completed: true },
      { id: 7, title: 'Gọi thợ sửa ống nước', date: dayjs('2025-04-30'), tag: 'Gọi thợ sửa ống nước', color: 'orange', completed: true },
    ]);
  }, [])

  useEffect(() => {
    if (!Array.isArray(tasks)) return;
    setTotal(tasks.length);
    setCompleted(tasks.filter(s => s.completed === true).length);
  }, [tasks])

  const handleCheckboxChange = (id) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        console.log("DA CHAY VAO DAYY");
        setVisible(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown, true);  // useCapture set true
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true); // remove với useCapture
    };
  }, []);
  
  const handleEdit = (value) => {

    setValueCurrent(value);
    setTypeModal(1)
    setVisible(true)
  };

  return (<>
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">Công việc hôm nay</h2>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Left column */}
        <div className="left-column">
          <Card className="progress-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{fontSize: '20px', marginTop: '15px'}}><b>Công việc trong ngày - {total}</b></div>
              <div style={{ textAlign: 'center' }}>
                <Progress type="circle" percent={Math.round((completed / total) * 100)} />
                <p className="mt-3">Tỷ lệ hoàn thành</p>
              </div>
            </div>
          </Card>

          <Card className="task-list-card"
              title="Danh sách công việc"
              extra={
                <Tooltip title="Thêm công việc"> 
                  <Button 
                    type="link"
                    onClick={ () => {
                      setVisible(true)
                      setTypeModal(0)
                    }}
                    icon={<PlusOutlined />
                    
                  }>Thêm công việc</Button>
                </Tooltip>
              }>
          <div style={{minHeight: '290px', maxHeight: '260px', overflowY: 'auto' }}>
            <List
              itemLayout="horizontal"
              dataSource={tasks}
              renderItem={item => (
                  <List.Item
                    actions={[
                      <Button type="link" danger onClick={() => handleEdit(item)}>
                        <EditOutlined style={{ color: "#1890ff" }} />
                      </Button>,
          
                      <Button type="link" danger onClick={() => deleteRow(item.id, tasks, setTasks)}>
                         <DeleteOutlined style={{ color: "red" }} />
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <span>
                          <input
                            type="checkbox"
                            className="me-3"
                            checked={item.completed}
                            onChange={() => handleCheckboxChange(item.id)}
                          />
                          {item.title}
                        </span>
                      }
                      description={String(item.date)}
                    />
                    <Tag color={item.color}>{item.tag}</Tag>
                  </List.Item>
              )}
            />
          </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="right-column">

          <LichComponent />

          <Card className="note-card"
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Ghi chú</span>
                <Tooltip title="Lưu lại">
                  <Button
                      type="primary"
                      icon={<SaveOutlined  style={{ color: 'gold' }} />}
                      size="middle"
                      style={{ borderRadius: '8px', backgroundColor: '#1890ff', border: 'none' }}
                    >
                      Lưu lại
                  </Button>
                </Tooltip>
              </div>
            }>
            <Input.TextArea placeholder="Viết ghi chú tại đây ..." autoSize={{ minRows: 3, maxRows: 5 }} />
          </Card>
        </div>
      </div>
    </div>
    <AddTaskModal
      visible={visible}
      setVisible={setVisible}
      setTasks={setTasks}
      typeModal={typeModal}
      valueCurrent={valueCurrent}
    />
  </>
  );
};

export default Home;
