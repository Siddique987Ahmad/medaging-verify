// ============================================
// MedVerify Age - Home Screen
// Dashboard with quick actions and alerts
// ============================================

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  useAppStore,
  useProducts,
  useDailyInsight,
  useProductsWithAlerts,
  useArticles,
} from "../../store";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  commonStyles,
} from "../../constants/theme";
import {
  StatusBadge,
  SafetyCard,
  QuickActionCard,
  SectionHeader,
  WarningBanner,
} from "../../components";

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const products = useProducts();
  const dailyInsight = useDailyInsight();
  const productsWithAlerts = useProductsWithAlerts();
  const articles = useArticles();
  const fetchDailyInsight = useAppStore((state) => state.fetchDailyInsight);

  useEffect(() => {
    fetchDailyInsight();
  }, [fetchDailyInsight]);

  const bannedProducts = products.filter((p) => p.status === "BANNED");
  const recentAlerts = productsWithAlerts.slice(0, 3);

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>MedVerify Age</Text>
          <Text style={styles.headerSubtitle}>Verify before you consume</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroIconContainer}>
            <Ionicons
              name="shield-checkmark"
              size={48}
              color={colors.primary}
            />
          </View>
          <Text style={styles.heroTitle}>Anti-Aging Medicine Verification</Text>
          <Text style={styles.heroSubtitle}>
            Check approval status, verify manufacturers, and learn the science
            behind anti-aging products.
          </Text>
          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => navigation.navigate("Search")}
          >
            <Text style={styles.heroButtonText}>Start Verification</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.textWhite} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <SectionHeader title="Quick Actions" />
        <View style={styles.quickActionsGrid}>
          <QuickActionCard
            icon="barcode-outline"
            title="Scan Product"
            subtitle="Use camera to scan"
            onPress={() => navigation.navigate("Search")}
            color={colors.primary}
          />
          <QuickActionCard
            icon="search"
            title="Search"
            subtitle="Find products"
            onPress={() => navigation.navigate("Search")}
            color={colors.approved}
          />
          <QuickActionCard
            icon="book-outline"
            title="Learn"
            subtitle="Read articles"
            onPress={() => navigation.navigate("Education")}
            color={colors.limited}
          />
          <QuickActionCard
            icon="alert-circle-outline"
            title="Alerts"
            subtitle="Safety warnings"
            onPress={() => navigation.navigate("Alerts")}
            color={colors.banned}
          />
        </View>

        {/* Daily Insight */}
        {dailyInsight && (
          <>
            <SectionHeader title="Today's Insight" />
            <View style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <Ionicons
                  name="bulb-outline"
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.insightCategory}>
                  {dailyInsight.category}
                </Text>
              </View>
              <Text style={styles.insightTitle}>{dailyInsight.title}</Text>
              <Text style={styles.insightContent}>{dailyInsight.content}</Text>
            </View>
          </>
        )}

        {/* Recent Alerts */}
        {recentAlerts.length > 0 && (
          <>
            <SectionHeader
              title="Recent Alerts"
              action="View All"
              onActionPress={() => navigation.navigate("Alerts")}
            />
            <View style={styles.alertsSection}>
              {recentAlerts.map((product) => (
                <SafetyCard
                  key={product.id}
                  title={product.name}
                  message={
                    product.status === "BANNED"
                      ? "This product has been banned and should not be used."
                      : `Safety alert: ${
                          product.safetyAlerts[0]?.message || "Review required."
                        }`
                  }
                  severity={product.status === "BANNED" ? "HIGH" : "MEDIUM"}
                  onPress={() =>
                    navigation.navigate("ProductDetail", {
                      productId: product.id,
                    })
                  }
                />
              ))}
            </View>
          </>
        )}

        {/* Warning Banner */}
        {bannedProducts.length > 0 && (
          <WarningBanner
            title={`${bannedProducts.length} Banned Product(s) Detected`}
            description="Some products in our database have been flagged as unsafe or fraudulent. Avoid these products."
            onPress={() => navigation.navigate("Alerts")}
          />
        )}

        {/* Stats Section */}
        <SectionHeader title="Database Status" />
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{products.length}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{bannedProducts.length}</Text>
            <Text style={styles.statLabel}>Banned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{articles.length || 0}</Text>
            <Text style={styles.statLabel}>Articles</Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  settingsButton: {
    padding: spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
  heroBanner: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: "center",
    marginVertical: spacing.md,
  },
  heroIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
    ...commonStyles.shadow,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  heroButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  heroButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: "600",
    marginRight: spacing.sm,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  insightCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  insightHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  insightCategory: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
    marginLeft: spacing.sm,
    textTransform: "uppercase",
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  insightContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  alertsSection: {
    marginBottom: spacing.sm,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: "center",
    marginHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});

export default HomeScreen;
