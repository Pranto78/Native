import "@/globals.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-accent">
        Welcome to Nativewind!
      </Text>

      <Link className="mt-4 bg-primary p-5 rounded-2xl text-white" href={"/onboarding"}>Go to Onboarding</Link>
      <Link className="mt-4 bg-primary p-5 rounded-2xl text-white" href={"/(auth)/sign_in"}>Sign In</Link>
      <Link className="mt-4 bg-primary p-5 rounded-2xl text-white" href={"/(auth)/sign_up"}>Sign Up</Link>
    
      <Link href={{
        pathname:"/subscription/[id]",
        params:{id:"claude"},
      }}> Claude Subscription</Link>
    

    </View>
  );
}