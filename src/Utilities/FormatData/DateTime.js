import dayjs from "dayjs";

export const formatVietnameseDate = (date) => {
  const d = dayjs(date);
  return `Ngày ${d.format("DD")} tháng ${d.format("MM")} năm ${d.format(
    "YYYY"
  )}`;
};
