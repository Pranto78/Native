import React from "react";
import { Text, View } from "react-native";

interface PieChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  size?: number;
}

export const PieChart = ({ data, size = 200 }: PieChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2 - 20;

  // Calculate angles and positions
  let currentAngle = -90;
  const segments = data.map((item) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;
    return {
      ...item,
      startAngle,
      endAngle,
      percentage: (item.value / total) * 100,
    };
  });

  return (
    <View className="items-center">
      {/* Pie Chart Representation */}
      <View
        style={{ width: size, height: size }}
        className="items-center justify-center relative bg-background rounded-full"
      >
        {/* Simplified representation using stacked circles */}
        <View className="flex-row gap-1 flex-wrap justify-center px-4">
          {segments.map((segment, idx) => {
            const width = (segment.percentage / 100) * 120;
            return (
              <View
                key={idx}
                style={{
                  width,
                  height: 10,
                  backgroundColor: segment.color,
                }}
                className="rounded"
              />
            );
          })}
        </View>
      </View>

      {/* Legend */}
      <View className="mt-6 gap-2 w-full">
        {segments.map((segment, idx) => (
          <View
            key={idx}
            className="flex-row items-center justify-between px-4"
          >
            <View className="flex-row items-center flex-1">
              <View
                style={{ backgroundColor: segment.color }}
                className="w-3 h-3 rounded-full mr-2"
              />
              <Text className="text-sm font-sans-medium text-primary flex-1">
                {segment.label}
              </Text>
            </View>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-sm font-sans-bold text-primary">
                ${segment.value.toFixed(2)}
              </Text>
              <Text className="text-xs font-sans-semibold text-muted-foreground">
                ({segment.percentage.toFixed(1)}%)
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Total */}
      <View className="mt-4 pt-4 border-t border-border w-full">
        <View className="flex-row justify-between px-4">
          <Text className="text-base font-sans-bold text-primary">
            Total Monthly Spend
          </Text>
          <Text className="text-base font-sans-bold text-accent">
            ${total.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};
