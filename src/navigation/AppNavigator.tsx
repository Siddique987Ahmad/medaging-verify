// ============================================
// MedVerify Age - Navigation Setup
// Tab Navigator and Stack Navigator configuration
// ============================================

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { dataService } from "../services/dataService";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppStore } from "../store";
import { colors, spacing, borderRadius } from "../constants/theme";

// Screens
import { HomeScreen } from "../screens/home";
import { SearchScreen } from "../screens/search";
import { EducationScreen } from "../screens/education";
import { AlertsScreen } from "../screens/alerts";
import { ProductDetailScreen } from "../screens/details";
import { ArticleDetailScreen } from "../screens/article";

// Navigation Types
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Education: undefined;
  Alerts: undefined;
};

export type StackParamList = {
  Main: undefined;
  ProductDetail: { productId: string };
  ArticleDetail: { articleId: string };
  ManufacturerDetail: { manufacturerName: string };
};

// Navigator Instances
const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<StackParamList>();

// Custom Tab Bar Icon Component
interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
  iconName: string;
  label: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
  focused,
  color,
  size,
  iconName,
  label,
}) => {
  return (
    <View style={styles.tabIconContainer}>
      <Ionicons name={iconName as any} size={size} color={color} />
      <Text
        style={[
          styles.tabLabel,
          { color: color, fontWeight: focused ? "600" : "400" },
        ]}
      >
        {label}
      </Text>
      {focused && <View style={styles.tabIndicator} />}
    </View>
  );
};

// Manufacturer Detail Screen (Placeholder)
const ManufacturerDetailScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<{ params: { manufacturerName: string } }, "params">>();
  const { manufacturerName } = route.params;

  return (
    <SafeAreaView style={styles.manufacturerContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.manufacturerContent}>
        <Text style={styles.manufacturerTitle}>{manufacturerName}</Text>
        <Text style={styles.manufacturerSubtitle}>
          Manufacturer details coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
};

// Tab Navigator
export const TabNavigator: React.FC = () => {
  const productsWithAlerts = useAppStore((state) => {
    const products = state.products;
    return products.filter(
      (p) => p.status === "BANNED" || p.safetyAlerts.length > 0
    );
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.divider,
          borderTopWidth: 1,
          height: 88,
          paddingBottom: spacing.md,
          paddingTop: spacing.sm,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          display: "none",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              iconName="home-outline"
              label="Home"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              iconName="search"
              label="Search"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Education"
        component={EducationScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              iconName="book-outline"
              label="Learn"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              iconName="alert-circle-outline"
              label="Alerts"
            />
          ),
          tabBarBadge:
            productsWithAlerts.length > 0
              ? productsWithAlerts.length
              : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.banned,
            color: colors.textWhite,
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator with Main Tab Navigator
export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: "slide_from_right",
        animationDuration: 300,
      }}
    >
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          headerTitle: "Product Details",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.textPrimary,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerBackTitle: "",
          gestureEnabled: true,
        }}
      />

      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={{
          headerShown: true,
          headerTitle: "Article",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.textPrimary,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerBackTitle: "",
          gestureEnabled: true,
        }}
      />

      <Stack.Screen
        name="ManufacturerDetail"
        component={ManufacturerDetailScreen}
        options={{
          headerShown: true,
          headerTitle: "Manufacturer",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "600",
            color: colors.textPrimary,
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerBackTitle: "",
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing.xs,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  tabIndicator: {
    position: "absolute",
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  manufacturerContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  manufacturerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  manufacturerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  manufacturerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default AppNavigator;
