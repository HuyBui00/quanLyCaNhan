import { Form, Select } from "antd";
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import JobChart from "./Chart/ThongKeMucDo";

const ThongKeTuan = () => {
  const { Option } = Select;
  const weeks = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];
  const [selectedWeek, setSelectedWeek] = React.useState("Tuần 1");
  const [totalJob, setTotalJob] = React.useState();
  const [jobCompleted, setJobCompelete] = React.useState();
  const [isMdUp, setIsMdUp] = React.useState(window.innerWidth >= 992);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMdUp(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Gọi một lần khi mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    setTotalJob(28);
    setJobCompelete(14);
  }, []);

  const handleChangeWeek = (value) => {
    setSelectedWeek(value);
  };

  return (
    <Container fluid className="p-4">
      <h4
        className="text-white p-3 mb-4"
        style={{
          backgroundColor: "#4CAF50",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        Thống kê hiệu xuất kết quả các hoạt động
      </h4>

      <Row className="mb-4">
        <Col lg={3}>
          <Card
            className="text-center shadow-sm mb-4 mb-lg-0"
            style={{ height: isMdUp ? 515 : 200 }}
          >
            <Card.Body>
              <div>
                <h1 className="text-primary">Khoảng thời gian</h1>
                <Form.Item label="Thời gian">
                  <Select
                    onChange={(value) => handleChangeWeek(value)}
                    placeholder="Select a week"
                    defaultValue={selectedWeek}
                  >
                    {weeks.map((item) => (
                      <Option key={item} value={item}>
                        <span style={{ color: "green" }}>{item}</span>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <p>Thời gian được chọn: {selectedWeek}</p>
              </div>
              <small>
                Đã tạo {totalJob ?? 0} công việc và hoàn thành{" "}
                {jobCompleted ?? 0} / {totalJob ?? 0}
              </small>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          <JobChart />
        </Col>
      </Row>
    </Container>
  );
};

export default ThongKeTuan;
