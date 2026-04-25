import { BarChart } from "@/components/BarChart";
import { PieChart } from "@/components/PieChart";
import { useSubscriptionStore } from "@/lib/subscriptionStore";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import React, { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const insights = () => {
  const { subscriptions } = useSubscriptionStore();

  // Calculate statistics
  const stats = useMemo(() => {
    const totalMonthly = subscriptions
      .filter((sub) => sub.billing === "Monthly")
      .reduce((sum, sub) => sum + sub.price, 0);

    const totalYearly = subscriptions
      .filter((sub) => sub.billing === "Yearly")
      .reduce((sum, sub) => sum + sub.price, 0);

    const totalSpend = totalMonthly + totalYearly / 12;
    const avgPrice =
      subscriptions.length > 0 ? totalSpend / subscriptions.length : 0;

    return {
      totalMonthly,
      totalYearly,
      totalSpend,
      avgPrice,
      count: subscriptions.length,
    };
  }, [subscriptions]);

  // Prepare data for bar chart (top subscriptions by price)
  const barChartData = subscriptions
    .sort((a, b) => b.price - a.price)
    .slice(0, 5)
    .map((sub) => ({
      label: sub.name.substring(0, 8),
      value: sub.price,
      color: sub.color || "#ea7a53",
    }));

  // Prepare data for pie chart (subscription distribution)
  const pieChartData = subscriptions.map((sub) => ({
    label: sub.name,
    value: sub.price,
    color: sub.color || "#ea7a53",
  }));

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <Text className="text-2xl font-sans-bold text-primary mb-1">
            Insights
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground">
            Monitor your subscriptions spending
          </Text>
        </View>

        {/* Stats Cards */}
        <View className="px-6 py-4 gap-3">
          {/* Total Monthly */}
          <View className="bg-card rounded-2xl p-4 border border-border">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm font-sans-medium text-muted-foreground mb-1">
                  Monthly Spend
                </Text>
                <Text className="text-2xl font-sans-bold text-primary">
                  ${stats.totalMonthly.toFixed(2)}
                </Text>
              </View>
              <View className="bg-accent/20 rounded-full w-12 h-12 items-center justify-center">
                <Ionicons name="trending-down" size={24} color="#ea7a53" />
              </View>
            </View>
          </View>

          {/* Total Yearly */}
          <View className="bg-card rounded-2xl p-4 border border-border">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm font-sans-medium text-muted-foreground mb-1">
                  Yearly Spend
                </Text>
                <Text className="text-2xl font-sans-bold text-primary">
                  ${stats.totalYearly.toFixed(2)}
                </Text>
              </View>
              <View className="bg-subscription/20 rounded-full w-12 h-12 items-center justify-center">
                <Ionicons name="calendar" size={24} color="#8fd1bd" />
              </View>
            </View>
          </View>

          {/* Average Price */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-card rounded-2xl p-4 border border-border">
              <View>
                <Text className="text-sm font-sans-medium text-muted-foreground mb-1">
                  Average Price
                </Text>
                <Text className="text-xl font-sans-bold text-primary">
                  ${stats.avgPrice.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="flex-1 bg-card rounded-2xl p-4 border border-border">
              <View>
                <Text className="text-sm font-sans-medium text-muted-foreground mb-1">
                  Active Subs
                </Text>
                <Text className="text-xl font-sans-bold text-primary">
                  {stats.count}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Charts Section */}
        {subscriptions.length > 0 ? (
          <>
            {/* Top Subscriptions Bar Chart */}
            <View className="px-6 py-4">
              <Text className="text-lg font-sans-bold text-primary mb-4">
                Top Subscriptions by Price
              </Text>
              <View className="bg-card rounded-2xl p-4 border border-border">
                {barChartData.length > 0 ? (
                  <BarChart
                    data={barChartData}
                    maxValue={Math.max(...barChartData.map((d) => d.value))}
                    height={200}
                  />
                ) : (
                  <View className="h-40 items-center justify-center">
                    <Text className="text-sm font-sans-medium text-muted-foreground">
                      No data available
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Subscription Distribution Pie Chart */}
            <View className="px-6 py-4">
              <Text className="text-lg font-sans-bold text-primary mb-4">
                Spending Distribution
              </Text>
              <View className="bg-card rounded-2xl p-4 border border-border">
                {pieChartData.length > 0 ? (
                  <PieChart data={pieChartData} />
                ) : (
                  <View className="h-40 items-center justify-center">
                    <Text className="text-sm font-sans-medium text-muted-foreground">
                      No subscriptions yet
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Monthly Breakdown */}
            <View className="px-6 py-4">
              <Text className="text-lg font-sans-bold text-primary mb-4">
                Subscriptions Breakdown
              </Text>
              <View className="bg-card rounded-2xl border border-border overflow-hidden">
                {subscriptions.map((sub, idx) => (
                  <View
                    key={sub.id}
                    className={`px-4 py-3 flex-row items-center justify-between ${
                      idx !== subscriptions.length - 1
                        ? "border-b border-border/30"
                        : ""
                    }`}
                  >
                    <View className="flex-row items-center flex-1 gap-3">
                      <View
                        style={{ backgroundColor: sub.color || "#ea7a53" }}
                        className="w-2 h-2 rounded-full"
                      />
                      <View className="flex-1">
                        <Text className="text-sm font-sans-semibold text-primary">
                          {sub.name}
                        </Text>
                        <Text className="text-xs font-sans-medium text-muted-foreground">
                          {sub.billing}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-sm font-sans-bold text-primary">
                      ${sub.price.toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <View className="px-6 py-12 items-center">
            <Ionicons name="analytics-outline" size={48} color="#081126" />
            <Text className="text-lg font-sans-bold text-primary mt-4">
              No Data Yet
            </Text>
            <Text className="text-sm font-sans-medium text-muted-foreground mt-2 text-center">
              Add subscriptions to see your spending insights and analytics
            </Text>
          </View>
        )}

        {/* Tips */}
        <View className="px-6 py-4 pb-10">
          <View className="bg-muted rounded-2xl p-4">
            <View className="flex-row gap-3">
              <Ionicons name="lightbulb" size={24} color="#081126" />
              <View className="flex-1">
                <Text className="text-sm font-sans-bold text-primary mb-1">
                  Money Saving Tips
                </Text>
                <Text className="text-xs font-sans-medium text-muted-foreground">
                  Review unused subscriptions monthly to reduce spending.
                  Consider annual plans for frequent services to save up to 20%.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default insights;
