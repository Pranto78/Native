import "@/globals.css";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function HomeLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign_in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
