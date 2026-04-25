import { SUBSCRIPTION_PACKAGES } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function SubscriptionPackageDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const pkg = SUBSCRIPTION_PACKAGES.find((p) => p.id === id);

  if (!pkg) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="text-primary font-sans-semibold">
          Package not found
        </Text>
      </SafeAreaView>
    );
  }

  const handleSelectPlan = (planId: string) => {
    router.push({
      pathname: "/(home)/checkout/[id]",
      params: { id: planId, packageId: pkg.id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-4 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#081126" />
          </Pressable>
          <Text className="text-2xl font-sans-bold text-primary">
            {pkg.name}
          </Text>
          <View className="w-6" />
        </View>

        {/* Package Hero */}
        <View className="px-6 py-4">
          <View className="bg-card rounded-2xl p-4 items-center justify-center">
            <Image source={pkg.icon} className="w-20 h-20 rounded-lg mb-3" />
            <Text className="text-lg font-sans-semibold text-primary mb-1">
              {pkg.name}
            </Text>
            <Text className="text-sm font-sans-medium text-muted-foreground text-center">
              {pkg.description}
            </Text>
          </View>
        </View>

        {/* Plans */}
        <View className="px-6 py-4">
          <Text className="text-xl font-sans-bold text-primary mb-4">
            Available Plans
          </Text>

          {pkg.plans.map((plan) => (
            <Pressable
              key={plan.id}
              onPress={() => handleSelectPlan(plan.id)}
              className="mb-4 bg-card rounded-2xl p-4 border-2 border-border active:border-accent"
            >
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-lg font-sans-bold text-primary">
                    {plan.name}
                  </Text>
                  <View className="flex-row items-baseline mt-1">
                    <Text className="text-2xl font-sans-bold text-primary">
                      ${plan.price.toFixed(2)}
                    </Text>
                    {plan.billing && (
                      <Text className="text-sm font-sans-medium text-muted-foreground ml-2">
                        /{plan.billing}
                      </Text>
                    )}
                  </View>
                </View>
                <View className="bg-accent rounded-full w-8 h-8 items-center justify-center">
                  <Ionicons name="arrow-forward" size={18} color="white" />
                </View>
              </View>

              {/* Features */}
              <View className="gap-2 pt-2 border-t border-border/30">
                {plan.features.map((feature, idx) => (
                  <View key={idx} className="flex-row items-center gap-2">
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color="#16a34a"
                    />
                    <Text className="text-sm font-sans-medium text-primary flex-1">
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
