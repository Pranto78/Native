import React, { useEffect, useState } from "react";
import { Animated, Text, View } from "react-native";

const AnimatedView = Animated.createAnimatedComponent(View);

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  visible?: boolean;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const show = (
    message: string,
    type: "success" | "error" | "info" = "success",
    duration: number = 3000,
  ) => {
    setToast({ message, type, duration, visible: true });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return { show, toast };
};

export const Toast = ({
  message,
  type = "success",
  duration = 3000,
  visible,
}: ToastProps) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration - 600),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, opacity, duration]);

  if (!visible) return null;

  const bgColor =
    type === "success"
      ? "bg-success"
      : type === "error"
        ? "bg-destructive"
        : "bg-primary";
  const textColor = "text-white";

  return (
    <AnimatedView
      style={{ opacity }}
      className={`absolute bottom-8 left-4 right-4 ${bgColor} rounded-lg px-4 py-3 shadow-lg`}
    >
      <Text className={`${textColor} font-sans-semibold`}>{message}</Text>
    </AnimatedView>
  );
};
