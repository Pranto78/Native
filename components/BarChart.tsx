import React from "react";
import { Text, View } from "react-native";

interface BarChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  maxValue?: number;
  height?: number;
}

export const BarChart = ({
  data,
  maxValue = 100,
  height = 200,
}: BarChartProps) => {
  const barHeight = height;
  const barWidth = 100 / data.length - 5;

  return (
    <View>
      <View
        style={{ height: barHeight }}
        className="flex-row items-flex-end justify-around px-2 py-4 gap-2"
      >
        {data.map((item, idx) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <View key={idx} className="flex-1 items-center justify-flex-end">
              <View
                style={{
                  height: `${percentage}%`,
                  backgroundColor: item.color,
                }}
                className="w-full rounded-t-lg min-h-4"
              />
              <Text
                numberOfLines={1}
                className="text-xs font-sans-medium text-primary mt-2"
              >
                ${item.value.toFixed(0)}
              </Text>
            </View>
          );
        })}
      </View>
      <View className="flex-row justify-around px-2">
        {data.map((item, idx) => (
          <Text
            key={idx}
            numberOfLines={1}
            className="text-xs font-sans-semibold text-muted-foreground"
            style={{ maxWidth: `${barWidth}%` }}
          >
            {item.label}
          </Text>
        ))}
      </View>
    </View>
  );
};
