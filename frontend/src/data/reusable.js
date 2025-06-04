import { format, isSameDay } from "date-fns";
export const time = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const sameDay = isSameDay(start, end);
  const timeRange = sameDay
    ? ` ${format(start, "EEEE, MMM d")}, ${format(start, "HH:mm")} - ${format(
        end,
        "HH:mm"
      )}`
    : ` ${format(start, "EEEE, MMM d")}, ${format(start, "HH:mm")}\n- ${format(
        end,
        "EEEE, MMM d"
      )},  ${format(end, "HH:mm")}`;
  return timeRange;
};

export const categoryColors = {
  food: "#EF4444",
  tech: "#0EA5E9",
  wellness: "#10B981",
  market: "#F59E0B",
  music: "#8B5CF6",
  nature: "#166534",
  art: "#EC4899",
  fitness: "#6366F1",
  games: "#F97316",
};
