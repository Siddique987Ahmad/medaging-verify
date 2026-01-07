// ============================================
// MedVerify Age - Product Detail Screen
// Comprehensive product information and verification
// ============================================

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useAppStore } from "../../store";
import { Product, Ingredient } from "../../types";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  commonStyles,
  statusConfig,
} from "../../constants/theme";
import {
  StatusBadge,
  EvidenceBadge,
  SafetyCard,
  ClaimAnalysis,
  RedFlagItem,
  IngredientCard,
  WarningBanner,
  SectionHeader,
} from "../../components";

type ProductDetailRouteParams = {
  productId: string;
};

export const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<{ params: ProductDetailRouteParams }, "params">>();
  const productId = route.params?.productId;

  const fetchProductById = useAppStore((state) => state.fetchProductById);
  const selectProduct = useAppStore((state) => state.selectProduct);

  const [product, setProduct] = useState<Product | null>(null);
  const [expandedIngredients, setExpandedIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
    }
    return () => {
      selectProduct(null);
    };
  }, [productId]);

  const loadProduct = async (id: string) => {
    const loadedProduct = await fetchProductById(id);
    if (loadedProduct) {
      setProduct(loadedProduct);
    }
  };

  const toggleIngredient = (ingredientName: string) => {
    if (expandedIngredients.includes(ingredientName)) {
      setExpandedIngredients(
        expandedIngredients.filter((n) => n !== ingredientName)
      );
    } else {
      setExpandedIngredients([...expandedIngredients, ingredientName]);
    }
  };

  const handleReportProduct = () => {
    // Navigate to report screen or open email
    Linking.openURL(
      "mailto:safety@medantiagingapp.com?subject=Product Report: " +
        (product?.name || "")
    );
  };

  const handleVerifyManufacturer = () => {
    if (product) {
      navigation.navigate("ManufacturerDetail", {
        manufacturerName: product.manufacturer,
      });
    }
  };

  if (!product) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.loadingContainer}>
          <Ionicons name="refresh" size={48} color={colors.primary} />
          <Text style={styles.loadingText}>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Product Details
        </Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Status Banner */}
        <View
          style={[
            styles.statusBanner,
            { backgroundColor: statusConfig[product.status].backgroundColor },
          ]}
        >
          <View style={styles.statusIconContainer}>
            <Ionicons
              name={statusConfig[product.status].icon as any}
              size={40}
              color={statusConfig[product.status].color}
            />
          </View>
          <Text
            style={[
              styles.statusLabel,
              { color: statusConfig[product.status].color },
            ]}
          >
            {statusConfig[product.status].label.toUpperCase()}
          </Text>
          <Text style={styles.statusDescription}>
            {statusConfig[product.status].description}
          </Text>
        </View>

        {/* Product Basic Info */}
        <View style={styles.productInfoCard}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productBrand}>{product.brand}</Text>
          <View style={styles.manufacturerRow}>
            <Ionicons
              name="business-outline"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={styles.manufacturerText}>{product.manufacturer}</Text>
            <TouchableOpacity onPress={handleVerifyManufacturer}>
              <Text style={styles.verifyLink}>Verify</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.manufacturerCountry}>
            {product.manufacturerCountry}
          </Text>

          <View style={styles.badgesRow}>
            <EvidenceBadge level={product.evidenceLevel} />
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{product.category}</Text>
            </View>
          </View>
        </View>

        {/* Safety Alerts */}
        {product.status === "BANNED" && (
          <WarningBanner
            title="BANNED PRODUCT"
            description="This product has been banned by regulatory authorities and should not be used."
          />
        )}

        {product.safetyAlerts.length > 0 && product.status !== "BANNED" && (
          <View style={styles.safetySection}>
            <SectionHeader title="Safety Alerts" />
            {product.safetyAlerts.map((alert) => (
              <SafetyCard
                key={alert.id}
                title={alert.title}
                message={alert.message}
                severity={alert.severity}
              />
            ))}
          </View>
        )}

        {/* Warnings */}
        {product.warnings.length > 0 && (
          <View style={styles.warningsSection}>
            <SectionHeader title="Important Warnings" />
            {product.warnings.map((warning, index) => (
              <View key={index} style={styles.warningItem}>
                <Ionicons
                  name="warning-outline"
                  size={18}
                  color={colors.limited}
                />
                <Text style={styles.warningText}>{warning}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Red Flags */}
        {product.redFlags.length > 0 && (
          <View style={styles.redFlagsSection}>
            <SectionHeader title="Red Flags" />
            {product.redFlags.map((redFlag, index) => (
              <RedFlagItem
                key={index}
                type={redFlag.type}
                description={redFlag.description}
                severity={redFlag.severity}
              />
            ))}
          </View>
        )}

        {/* Description */}
        <View style={styles.descriptionSection}>
          <SectionHeader title="Description" />
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>

        {/* Ingredients */}
        <View style={styles.ingredientsSection}>
          <SectionHeader title="Active Ingredients" />
          {product.activeIngredients.map((ingredient, index) => (
            <IngredientCard
              key={index}
              name={ingredient.name}
              concentration={ingredient.concentration}
              description={ingredient.description}
              sideEffects={ingredient.sideEffects}
              isExpanded={expandedIngredients.includes(ingredient.name)}
              onToggle={() => toggleIngredient(ingredient.name)}
            />
          ))}
        </View>

        {/* Claims Analysis */}
        <View style={styles.claimsSection}>
          <SectionHeader title="Claims Analysis" />
          {product.claims.map((claim, index) => (
            <ClaimAnalysis
              key={index}
              claim={claim.marketingClaim}
              verdict={claim.scientificVerdict}
              verdictType={claim.verdictType}
            />
          ))}
        </View>

        {/* Report Button */}
        <TouchableOpacity
          style={styles.reportButton}
          onPress={handleReportProduct}
        >
          <Ionicons name="flag-outline" size={20} color={colors.banned} />
          <Text style={styles.reportButtonText}>Report This Product</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
  shareButton: {
    padding: spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.textSecondary,
  },
  statusBanner: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: "center",
    marginBottom: spacing.md,
  },
  statusIconContainer: {
    marginBottom: spacing.sm,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  statusDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  productInfoCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  productName: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  manufacturerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  manufacturerText: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  verifyLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },
  manufacturerCountry: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: spacing.md,
    paddingLeft: 24,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.primary,
  },
  safetySection: {
    marginBottom: spacing.md,
  },
  warningsSection: {
    marginBottom: spacing.md,
  },
  warningItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
    lineHeight: 20,
  },
  redFlagsSection: {
    marginBottom: spacing.md,
  },
  descriptionSection: {
    marginBottom: spacing.md,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  ingredientsSection: {
    marginBottom: spacing.md,
  },
  claimsSection: {
    marginBottom: spacing.md,
  },
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.banned,
  },
  reportButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.banned,
    marginLeft: spacing.sm,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});

export default ProductDetailScreen;
