// ============================================
// MedVerify Age - Alerts Screen
// Safety alerts and banned products
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
  useProductsWithAlerts,
  useBannedProducts,
} from "../../store";
import { Product } from "../../types";
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
  SectionHeader,
  WarningBanner,
  EmptyState,
} from "../../components";

export const AlertsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const fetchProducts = useAppStore((state) => state.fetchProducts);
  const productsWithAlerts = useProductsWithAlerts();
  const bannedProducts = useBannedProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const highPriorityAlerts = productsWithAlerts.filter(
    (p) =>
      p.status === "BANNED" || p.safetyAlerts.some((a) => a.severity === "HIGH")
  );

  const mediumPriorityAlerts = productsWithAlerts.filter(
    (p) =>
      p.status !== "BANNED" &&
      !p.safetyAlerts.some((a) => a.severity === "HIGH")
  );

  const handleProductPress = (product: Product) => {
    navigation.navigate("ProductDetail", { productId: product.id });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Safety Alerts</Text>
          <Text style={styles.headerSubtitle}>
            Stay informed about risky products
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Alert Summary */}
        <View style={styles.alertSummary}>
          <View style={styles.summaryCard}>
            <View
              style={[
                styles.summaryIcon,
                { backgroundColor: colors.bannedLight },
              ]}
            >
              <Ionicons name="warning" size={24} color={colors.banned} />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryNumber}>{bannedProducts.length}</Text>
              <Text style={styles.summaryLabel}>Banned Products</Text>
            </View>
          </View>
          <View style={styles.summaryCard}>
            <View
              style={[
                styles.summaryIcon,
                { backgroundColor: colors.limitedLight },
              ]}
            >
              <Ionicons name="alert-circle" size={24} color={colors.limited} />
            </View>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryNumber}>
                {mediumPriorityAlerts.length}
              </Text>
              <Text style={styles.summaryLabel}>Safety Warnings</Text>
            </View>
          </View>
        </View>

        {/* Global Warning */}
        <WarningBanner
          title="Consumer Protection Notice"
          description="Always verify products before purchase. When in doubt, consult a healthcare professional."
        />

        {/* High Priority Alerts */}
        {highPriorityAlerts.length > 0 && (
          <>
            <SectionHeader title="High Priority" />
            {highPriorityAlerts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.alertCard}
                onPress={() => handleProductPress(product)}
              >
                <View style={styles.alertCardHeader}>
                  <View
                    style={[
                      styles.alertSeverity,
                      { backgroundColor: colors.bannedLight },
                    ]}
                  >
                    <Ionicons name="warning" size={16} color={colors.banned} />
                    <Text
                      style={[
                        styles.alertSeverityText,
                        { color: colors.banned },
                      ]}
                    >
                      HIGH RISK
                    </Text>
                  </View>
                  <StatusBadge status={product.status} size="small" />
                </View>
                <Text style={styles.alertProductName}>{product.name}</Text>
                <Text style={styles.alertBrand}>{product.brand}</Text>

                {product.status === "BANNED" ? (
                  <View style={styles.alertDetail}>
                    <Text style={styles.alertDetailText}>
                      Product banned by regulatory authorities
                    </Text>
                  </View>
                ) : (
                  product.safetyAlerts
                    .filter((a) => a.severity === "HIGH")
                    .map((alert) => (
                      <View key={alert.id} style={styles.alertDetail}>
                        <Ionicons
                          name="information-circle"
                          size={16}
                          color={colors.banned}
                        />
                        <Text style={styles.alertDetailText}>
                          {alert.title}: {alert.message}
                        </Text>
                      </View>
                    ))
                )}

                <View style={styles.alertCardFooter}>
                  <Text style={styles.alertAction}>View Details</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={colors.primary}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Medium Priority Alerts */}
        {mediumPriorityAlerts.length > 0 && (
          <>
            <SectionHeader title="Safety Warnings" />
            {mediumPriorityAlerts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.warningCard}
                onPress={() => handleProductPress(product)}
              >
                <View style={styles.warningCardHeader}>
                  <StatusBadge status={product.status} size="small" />
                </View>
                <Text style={styles.warningProductName}>{product.name}</Text>
                <Text style={styles.warningBrand}>{product.brand}</Text>

                <SafetyCard
                  title={product.safetyAlerts[0]?.title || "Safety Review"}
                  message={
                    product.safetyAlerts[0]?.message ||
                    "This product has been flagged for review."
                  }
                  severity="MEDIUM"
                />

                <View style={styles.warningCardFooter}>
                  <Text style={styles.warningAction}>View Details</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={colors.primary}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Empty State */}
        {productsWithAlerts.length === 0 && (
          <EmptyState
            icon="shield-checkmark"
            title="No Active Alerts"
            description="Great news! There are no current safety alerts or banned products in our database."
          />
        )}

        {/* How to Report */}
        <View style={styles.reportSection}>
          <SectionHeader title="Report a Product" />
          <View style={styles.reportCard}>
            <View style={styles.reportIcon}>
              <Ionicons name="flag" size={24} color={colors.primary} />
            </View>
            <Text style={styles.reportTitle}>Found a suspicious product?</Text>
            <Text style={styles.reportDescription}>
              Help protect others by reporting suspicious anti-aging products,
              side effects, or deceptive marketing.
            </Text>
            <TouchableOpacity style={styles.reportButton}>
              <Text style={styles.reportButtonText}>Submit Report</Text>
              <Ionicons
                name="arrow-forward"
                size={16}
                color={colors.textWhite}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Educational Resources */}
        <View style={styles.resourcesSection}>
          <SectionHeader title="Stay Safe" />
          <View style={styles.resourceCard}>
            <Ionicons name="book" size={24} color={colors.primary} />
            <Text style={styles.resourceTitle}>
              Learn to Identify Fake Products
            </Text>
            <Text style={styles.resourceDescription}>
              Read our guide on spotting red flags in anti-aging product
              marketing.
            </Text>
            <TouchableOpacity
              style={styles.resourceButton}
              onPress={() => navigation.navigate("Education")}
            >
              <Text style={styles.resourceButtonText}>Read Guide</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
  alertSummary: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  summaryCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  alertCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.banned,
  },
  alertCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  alertSeverity: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  alertSeverityText: {
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 4,
  },
  alertProductName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  alertBrand: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  alertDetail: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },
  alertDetailText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
    lineHeight: 20,
  },
  alertCardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  alertAction: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  warningCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  warningCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  warningProductName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  warningBrand: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  warningCardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  warningAction: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  reportSection: {
    marginTop: spacing.md,
  },
  reportCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: "center",
  },
  reportIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  reportDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  reportButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: "600",
    marginRight: spacing.sm,
  },
  resourcesSection: {
    marginTop: spacing.md,
  },
  resourceCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  resourceDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  resourceButton: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.sm,
  },
  resourceButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});

export default AlertsScreen;
