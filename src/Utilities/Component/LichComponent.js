import React from 'react';
import { Calendar, Card, ConfigProvider, Select } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

dayjs.locale('vi');

const LichComponent = () => {
  return (
    <Card className="calendar-card" title="Lịch">
      <ConfigProvider locale={viVN}>
        <Calendar
          fullscreen={false}
          headerRender={({ value, onChange, onTypeChange }) => {
            const start = 0;
            const end = 12;
            const monthOptions = [];

            const months = [];

            for (let i = 1; i < 13; i++) {
              months.push("Tháng " + i);
            }

            for (let i = start; i < end; i++) {
              monthOptions.push(
                <Select.Option key={i} value={i}>
                  {months[i]}
                </Select.Option>,
              );
            }

            const year = value.year();
            const month = value.month();
            const years = [];
            for (let i = year - 10; i < year + 10; i += 1) {
              years.push(
                <Select.Option key={i} value={i}>
                  {i}
                </Select.Option>,
              );
            }

            return (
              <div style={{ padding: 8 }}>
                <Select
                  size="small"
                  dropdownMatchSelectWidth={false}
                  className="my-year-select"
                  value={year}
                  onChange={(newYear) => {
                    const now = value.clone().year(newYear);
                    onChange(now);
                  }}
                  style={{ marginRight: 8 }}
                >
                  {years}
                </Select>
                <Select
                  size="small"
                  dropdownMatchSelectWidth={false}
                  value={month}
                  onChange={(newMonth) => {
                    const now = value.clone().month(newMonth);
                    onChange(now);
                  }}
                >
                  {monthOptions}
                </Select>
                <Select
                  size="small"
                  style={{ marginLeft: 8 }}
                  defaultValue="month"
                  onChange={(val) => onTypeChange(val)}
                >
                  <Select.Option value="month">Tháng</Select.Option>
                  <Select.Option value="year">Năm</Select.Option>
                </Select>
              </div>
            );
          }}
        />
      </ConfigProvider>
    </Card>
  );
};

export default LichComponent;
