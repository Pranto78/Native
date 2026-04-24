import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for auth to load
  if (!isLoaded) {
    return <Stack screenOptions={{ headerShown: false }} />;
  }

  // Route based on auth state
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign_in" />;
  }

  return <Redirect href="/(tabs)" />;
}
