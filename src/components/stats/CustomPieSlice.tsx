import { Sector } from "recharts";

export function ViewedPieSlice(props: any) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } =
    props;

  const color =
    payload.name === "Viewed" ? "oklch(39.1% 0.09 240.876)" : "#EF4444";

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={color}
    />
  );
}

export function BoostedPieSlice(props: any) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } =
    props;

  const color =
    payload.name === "Boosted" ? "oklch(39.1% 0.09 240.876)" : "#EF4444";

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={color}
    />
  );
}
