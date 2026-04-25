import { SUBSCRIPTION_PACKAGES } from "@/constants/data";
import { useSubscriptionStore } from "@/lib/subscriptionStore";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function CheckoutPage() {
  const { id: planId, packageId } = useLocalSearchParams<{
    id: string;
    packageId: string;
  }>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { purchaseSubscription } = useSubscriptionStore();

  const pkg = SUBSCRIPTION_PACKAGES.find((p) => p.id === packageId);
  const plan = pkg?.plans.find((p) => p.id === planId);

  if (!pkg || !plan) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background">
        <Text className="text-primary font-sans-semibold">Plan not found</Text>
      </SafeAreaView>
    );
  }

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create new subscription
      const newSubscription: Subscription = {
        id: `${packageId}-${Date.now()}`,
        icon: pkg.icon,
        name: pkg.name,
        plan: plan.name,
        category: plan.name,
        paymentMethod: "Visa ending in 8530",
        status: "active",
        startDate: new Date().toISOString(),
        price: plan.price,
        currency: plan.currency || "USD",
        billing: plan.billing || "Monthly",
        renewalDate: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        color: pkg.color,
      };

      // Add to store
      purchaseSubscription(newSubscription);

      // Show success message and navigate
      Alert.alert(
        "Purchase Successful",
        `${pkg.name} - ${plan.name} plan has been added to your subscriptions!`,
        [
          {
            text: "View Subscription",
            onPress: () => router.replace("/(home)/subscriptions"),
          },
        ],
      );
    } catch (error) {
      Alert.alert("Error", "Failed to process purchase. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const taxAmount = (plan.price * 0.1).toFixed(2);
  const totalAmount = (plan.price + parseFloat(taxAmount)).toFixed(2);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-4 flex-row items-center justify-between">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#081126" />
          </Pressable>
          <Text className="text-2xl font-sans-bold text-primary">Checkout</Text>
          <View className="w-6" />
        </View>

        {/* Order Summary */}
        <View className="px-6 py-4">
          <Text className="text-lg font-sans-bold text-primary mb-4">
            Order Summary
          </Text>

          <View className="bg-card rounded-2xl p-4 mb-4">
            <View className="flex-row items-center mb-4">
              <Image source={pkg.icon} className="w-12 h-12 rounded-lg mr-3" />
              <View className="flex-1">
                <Text className="text-lg font-sans-bold text-primary">
                  {pkg.name}
                </Text>
                <Text className="text-sm font-sans-medium text-muted-foreground">
                  {plan.name} Plan
                </Text>
              </View>
            </View>

            <View className="border-t border-border/30 pt-4 gap-3">
              {/* Price */}
              <View className="flex-row justify-between">
                <Text className="font-sans-medium text-primary">
                  Plan Price
                </Text>
                <Text className="font-sans-semibold text-primary">
                  ${plan.price.toFixed(2)}
                </Text>
              </View>

              {/* Billing Period */}
              {plan.billing && (
                <View className="flex-row justify-between">
                  <Text className="font-sans-medium text-primary">Billing</Text>
                  <Text className="font-sans-semibold text-primary">
                    {plan.billing}
                  </Text>
                </View>
              )}

              {/* Tax */}
              <View className="flex-row justify-between">
                <Text className="font-sans-medium text-primary">Tax (10%)</Text>
                <Text className="font-sans-semibold text-primary">
                  ${taxAmount}
                </Text>
              </View>

              {/* Total */}
              <View className="border-t border-border/30 pt-3 flex-row justify-between">
                <Text className="text-lg font-sans-bold text-primary">
                  Total
                </Text>
                <Text className="text-lg font-sans-bold text-accent">
                  ${totalAmount}
                </Text>
              </View>
            </View>
          </View>

          {/* Features */}
          <Text className="text-lg font-sans-bold text-primary mb-3">
            What's Included
          </Text>
          <View className="bg-card rounded-2xl p-4 mb-6">
            {plan.features.map((feature, idx) => (
              <View key={idx} className="flex-row items-center gap-3 py-2">
                <Ionicons name="checkmark-circle" size={18} color="#16a34a" />
                <Text className="text-sm font-sans-medium text-primary flex-1">
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          {/* Payment Method */}
          <Text className="text-lg font-sans-bold text-primary mb-3">
            Payment Method
          </Text>
          <View className="bg-card rounded-2xl p-4 mb-6 flex-row items-center">
            <View className="bg-accent rounded-lg w-12 h-12 items-center justify-center mr-3">
              <Ionicons name="card" size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="font-sans-semibold text-primary">Visa Card</Text>
              <Text className="text-sm font-sans-medium text-muted-foreground">
                ending in 8530
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Purchase Button */}
      <View className="px-6 py-4 border-t border-border/30">
        <Pressable
          onPress={handlePurchase}
          disabled={isLoading}
          className={`w-full py-4 rounded-xl items-center justify-center ${
            isLoading ? "bg-muted" : "bg-accent"
          }`}
        >
          <Text className="text-lg font-sans-bold text-white">
            {isLoading ? "Processing..." : "Complete Purchase"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.back()}
          disabled={isLoading}
          className="w-full py-4 rounded-xl items-center justify-center border border-border"
        >
          <Text className="text-lg font-sans-semibold text-primary">
            Cancel
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
