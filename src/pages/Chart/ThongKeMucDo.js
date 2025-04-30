import React from "react";
import ReactECharts from "echarts-for-react";
import { Card, Col } from "react-bootstrap";

const JobChart = () => {
  // ==== DỮ LIỆU TÁCH RIÊNG ====
  const days = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];
  const plannedJobs = [2, 3, 4, 4, 5, 5, 4]; // Kế hoạch
  const completedJobs = [1, 2, 3, 4, 5, 6, 7]; // Thực tế

  // ==== CẤU HÌNH ECHARTS ====
  const options = {
    title: {
      text: "Biểu đồ công việc đã làm trong tuần",
      left: "center",
      top: 10,
      textStyle: {
        fontSize: 16,
        fontFamily: "Arial",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      top: 40,
      data: ["Kế hoạch", "Thực tế"],
    },
    xAxis: {
      type: "category",
      data: days,
    },
    yAxis: {
      type: "value",
      min: 0,
    },
    series: [
      {
        name: "Kế hoạch",
        type: "bar",
        data: plannedJobs,
        itemStyle: {
          color: "#91cc75",
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: "30%",
      },
      {
        name: "Thực tế",
        type: "bar",
        data: completedJobs,
        itemStyle: {
          color: "#5470C6",
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: "30%",
      },
    ],
  };

  return (
    <Col md={12}>
      <Card className="shadow-sm">
        <Card.Body>
          <ReactECharts option={options} style={{ height: 480 }} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default JobChart;
