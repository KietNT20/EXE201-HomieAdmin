import {JobPostStatus} from "@/types/types.utils";

export const getStatusConfig = (status: JobPostStatus) => {
  switch (status) {
    case "Done":
      return {
        color: "success" as "success",
        icon: "✓",
        label: "Hoàn thành",
      };
    case "Cancel":
      return {
        color: "error" as "error",
        icon: "✕",
        label: "Đã hủy",
      };
    case "Application":
      return {
        color: "info" as "info",
        icon: "⧗",
        label: "Đã nhận",
      };
    default:
      return {
        color: "default" as "default",
        icon: "",
        label: "Đang chờ",
      };
  }
};
