import { ListHeading } from "@/components/ListHeading";
import { SUBSCRIPTION_PACKAGES } from "@/constants/data";
import { useSubscriptionStore } from "@/lib/subscriptionStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const subscriptions = () => {
  const router = useRouter();
  const { subscriptions } = useSubscriptionStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(
    null,
  );

  const handleViewPackage = (packageId: string) => {
    router.push({
      pathname: "/(home)/subscription-packages/[id]",
      params: { id: packageId },
    });
  };

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const togglePackageExpanded = (id: string) => {
    setExpandedPackageId(expandedPackageId === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-2">
          <ListHeading title="Subscriptions" />
        </View>

        {/* Active Subscriptions Section */}
        <View className="px-6 py-4">
          <Text className="text-lg font-sans-bold text-primary mb-4">
            Active Subscriptions ({subscriptions.length})
          </Text>

          {subscriptions.length > 0 ? (
            <View className="gap-3">
              {subscriptions.map((subscription) => (
                <Pressable
                  key={subscription.id}
                  onPress={() => toggleExpanded(subscription.id)}
                  className={`rounded-2xl p-4 border ${
                    expandedId === subscription.id
                      ? "bg-subscription border-accent"
                      : "bg-card border-border"
                  }`}
                  style={
                    expandedId !== subscription.id && subscription.color
                      ? { backgroundColor: subscription.color }
                      : undefined
                  }
                >
                  {/* Header */}
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center flex-1">
                      <Image
                        source={subscription.icon}
                        className="w-12 h-12 rounded-lg mr-3"
                      />
                      <View className="flex-1">
                        <Text className="text-base font-sans-bold text-primary">
                          {subscription.name}
                        </Text>
                        <Text className="text-xs font-sans-medium text-muted-foreground">
                          {subscription.category || subscription.plan}
                        </Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text className="text-base font-sans-bold text-primary">
                        ${subscription.price.toFixed(2)}
                      </Text>
                      <Text className="text-xs font-sans-medium text-muted-foreground">
                        {subscription.billing}
                      </Text>
                    </View>
                  </View>

                  {/* Expanded Content */}
                  {expandedId === subscription.id && (
                    <>
                      <View className="border-t border-white/20 pt-3 mt-3 gap-2">
                        <View className="flex-row justify-between">
                          <Text className="text-sm font-sans-medium text-primary">
                            Plan:
                          </Text>
                          <Text className="text-sm font-sans-semibold text-primary">
                            {subscription.plan}
                          </Text>
                        </View>
                        <View className="flex-row justify-between">
                          <Text className="text-sm font-sans-medium text-primary">
                            Payment:
                          </Text>
                          <Text
                            numberOfLines={1}
                            className="text-sm font-sans-semibold text-primary flex-1 text-right ml-2"
                          >
                            {subscription.paymentMethod}
                          </Text>
                        </View>
                        {subscription.renewalDate && (
                          <View className="flex-row justify-between">
                            <Text className="text-sm font-sans-medium text-primary">
                              Renewal:
                            </Text>
                            <Text className="text-sm font-sans-semibold text-primary">
                              {new Date(
                                subscription.renewalDate,
                              ).toLocaleDateString()}
                            </Text>
                          </View>
                        )}
                      </View>
                      <Pressable className="mt-3 bg-white/20 rounded-lg py-2 px-3 items-center">
                        <Text className="text-sm font-sans-semibold text-primary">
                          Manage Subscription
                        </Text>
                      </Pressable>
                    </>
                  )}
                </Pressable>
              ))}
            </View>
          ) : (
            <View className="bg-card rounded-2xl p-6 items-center">
              <Ionicons name="briefcase-outline" size={40} color="#081126" />
              <Text className="text-base font-sans-semibold text-primary mt-3">
                No active subscriptions
              </Text>
              <Text className="text-sm font-sans-medium text-muted-foreground mt-1">
                Explore available plans below
              </Text>
            </View>
          )}
        </View>

        {/* Available Packages Section */}
        <View className="px-6 py-4">
          <Text className="text-lg font-sans-bold text-primary mb-4">
            Available Packages
          </Text>

          <View className="gap-3">
            {SUBSCRIPTION_PACKAGES.map((pkg) => (
              <Pressable
                key={pkg.id}
                onPress={() => togglePackageExpanded(pkg.id)}
                className={`rounded-2xl p-4 border ${
                  expandedPackageId === pkg.id
                    ? "bg-subscription border-accent"
                    : "bg-card border-border"
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <Image
                      source={pkg.icon}
                      className="w-12 h-12 rounded-lg mr-3"
                    />
                    <View className="flex-1">
                      <Text className="text-base font-sans-bold text-primary">
                        {pkg.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        className="text-xs font-sans-medium text-muted-foreground"
                      >
                        {pkg.description}
                      </Text>
                    </View>
                  </View>
                  <View className="bg-accent rounded-full w-8 h-8 items-center justify-center ml-2">
                    <Ionicons
                      name={
                        expandedPackageId === pkg.id
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={16}
                      color="white"
                    />
                  </View>
                </View>

                {/* Expanded Content */}
                {expandedPackageId === pkg.id && (
                  <>
                    <View className="border-t border-white/20 pt-3 mt-3 gap-2">
                      <Text className="text-sm font-sans-semibold text-primary mb-2">
                        Available Plans:
                      </Text>
                      {pkg.plans.map((plan, idx) => (
                        <View
                          key={plan.id}
                          className="flex-row justify-between items-center py-1"
                        >
                          <View className="flex-1">
                            <Text className="text-sm font-sans-semibold text-primary">
                              {plan.name}
                            </Text>
                            <Text className="text-xs font-sans-medium text-muted-foreground">
                              ${plan.price.toFixed(2)}
                              {plan.billing ? ` / ${plan.billing}` : ""}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                    <Pressable
                      onPress={() => handleViewPackage(pkg.id)}
                      className="mt-3 bg-accent rounded-lg py-3 px-4 items-center"
                    >
                      <Text className="text-sm font-sans-bold text-white">
                        View & Purchase
                      </Text>
                    </Pressable>
                  </>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Info Section */}
        <View className="px-6 py-4 pb-10">
          <View className="bg-muted rounded-2xl p-4 flex-row gap-3">
            <Ionicons name="information-circle" size={24} color="#081126" />
            <View className="flex-1">
              <Text className="text-sm font-sans-bold text-primary mb-1">
                Tip
              </Text>
              <Text className="text-xs font-sans-medium text-muted-foreground">
                Expand any package to see all available plans, then click "View
                & Purchase" to select and buy a plan.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default subscriptions;
