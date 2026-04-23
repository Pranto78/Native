import { Tabs } from "expo-router";
import { ImageSourcePropType, View } from "react-native";
import { Image } from "react-native";
import clsx from "clsx";
import { Key } from "react";
import { tabs } from "@/constants/data";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { components,colors } from "@/constants/theme";

const tabBar = components.tabBar;
const TabLayout = () => {
    const insets = useSafeAreaInsets();
  const TabIcon = ({ focused, icon }: TabIconProps) => {
    return (
      <View className="tabs-icon">
        <View className={clsx("tabs-pill", focused && "tabs-active")}>
          <Image source={icon} resizeMode="contain" className="tabs-glyph" />
        </View>
      </View>
    );
  };

  return (
    <Tabs screenOptions={{ 
        
        headerShown: false, 
        tabBarShowLabel: false,
        tabBarStyle:{
            position: "absolute",
            bottom: Math.max(insets.bottom, tabBar.horizontalInset),
            height: tabBar.height,
            marginHorizontal: tabBar.horizontalInset,
            borderRadius: tabBar.radius,
            backgroundColor: colors.primary,
            borderTopWidth: 0,
            elevation: 0,   
        },
        tabBarItemStyle:{
            paddingVertical: tabBar.height/2 - tabBar.iconFrame/1.6,
        },
        tabBarIconStyle:{
            width: tabBar.iconFrame,
            height: tabBar.iconFrame,
            alignItems: "center",
        }
        }}>
      {tabs.map((tab: { name: Key | null | undefined; title: any; icon: ImageSourcePropType; }) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name ? String(tab.name) : undefined}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;