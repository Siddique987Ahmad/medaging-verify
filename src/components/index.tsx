// ============================================
// MedVerify Age - UI Components
// ============================================

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ApprovalStatus } from "../types";
import {
  colors,
  statusConfig,
  spacing,
  borderRadius,
  typography,
} from "../constants/theme";

// Props Interface
interface StatusBadgeProps {
  status: ApprovalStatus;
  size?: "small" | "medium" | "large";
  showIcon?: boolean;
  customLabel?: string;
}

// Status Badge Component
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "medium",
  showIcon = true,
  customLabel,
}) => {
  const config = statusConfig[status];

  const sizeStyles = {
    small: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      iconSize: 12,
      fontSize: 11,
    },
    medium: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      iconSize: 14,
      fontSize: 12,
    },
    large: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      iconSize: 18,
      fontSize: 14,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <View
      style={[
        styles.badgeContainer,
        {
          backgroundColor: config.backgroundColor,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
        },
      ]}
    >
      {showIcon && (
        <Ionicons
          name={config.icon as any}
          size={currentSize.iconSize}
          color={config.color}
          style={styles.badgeIcon}
        />
      )}
      <Text
        style={[
          styles.badgeText,
          {
            color: config.color,
            fontSize: currentSize.fontSize,
          },
        ]}
      >
        {customLabel || config.label}
      </Text>
    </View>
  );
};

// Evidence Level Badge
interface EvidenceBadgeProps {
  level: "HIGH" | "MODERATE" | "LOW" | "NONE";
  size?: "small" | "medium";
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  level,
  size = "medium",
}) => {
  const labels = {
    HIGH: "Strong Evidence",
    MODERATE: "Moderate Evidence",
    LOW: "Limited Evidence",
    NONE: "No Evidence",
  };

  const colors_map = {
    HIGH: colors.approved,
    MODERATE: colors.limited,
    LOW: colors.notApproved,
    NONE: colors.banned,
  };

  const backgrounds = {
    HIGH: colors.approvedLight,
    MODERATE: colors.limitedLight,
    LOW: colors.notApprovedLight,
    NONE: colors.bannedLight,
  };

  const sizeStyles =
    size === "small"
      ? { paddingVertical: 4, paddingHorizontal: 8, fontSize: 11 }
      : { paddingVertical: 6, paddingHorizontal: 12, fontSize: 12 };

  return (
    <View
      style={[
        styles.badgeContainer,
        {
          backgroundColor: backgrounds[level],
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
        },
      ]}
    >
      <Ionicons
        name="flask"
        size={14}
        color={colors_map[level]}
        style={styles.badgeIcon}
      />
      <Text
        style={[
          styles.badgeText,
          {
            color: colors_map[level],
            fontSize: sizeStyles.fontSize,
          },
        ]}
      >
        {labels[level]}
      </Text>
    </View>
  );
};

// Safety Card Component
interface SafetyCardProps {
  title: string;
  message: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  onPress?: () => void;
}

export const SafetyCard: React.FC<SafetyCardProps> = ({
  title,
  message,
  severity = "MEDIUM",
  onPress,
}) => {
  const severityColors = {
    HIGH: {
      bg: colors.bannedLight,
      border: colors.banned,
      icon: "dangerous",
      iconColor: colors.banned,
    },
    MEDIUM: {
      bg: colors.limitedLight,
      border: colors.limited,
      icon: "warning",
      iconColor: colors.limited,
    },
    LOW: {
      bg: colors.primaryLight,
      border: colors.primary,
      icon: "information-circle",
      iconColor: colors.primary,
    },
  };

  const config = severityColors[severity];
  const content = (
    <View
      style={[
        styles.safetyCard,
        {
          backgroundColor: config.bg,
          borderLeftColor: config.border,
          borderLeftWidth: 4,
        },
      ]}
    >
      <View style={styles.safetyCardHeader}>
        <Ionicons
          name={config.icon as any}
          size={24}
          color={config.iconColor}
        />
        <Text style={[styles.safetyCardTitle, { color: config.border }]}>
          {title}
        </Text>
      </View>
      <Text style={styles.safetyCardMessage}>{message}</Text>
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
};

// Product List Item Component
interface ProductListItemProps {
  name: string;
  brand: string;
  manufacturer: string;
  status: ApprovalStatus;
  evidenceLevel: string;
  onPress: () => void;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({
  name,
  brand,
  manufacturer,
  status,
  evidenceLevel,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.productListItem} onPress={onPress}>
      <View style={styles.productListContent}>
        <View style={styles.productListHeader}>
          <Text style={styles.productName} numberOfLines={2}>
            {name}
          </Text>
          <StatusBadge status={status} size="small" />
        </View>
        <Text style={styles.productBrand}>{brand}</Text>
        <Text style={styles.productManufacturer}>{manufacturer}</Text>
        <View style={styles.productListFooter}>
          <EvidenceBadge level={evidenceLevel as any} size="small" />
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );
};

// Warning Banner Component
interface WarningBannerProps {
  title: string;
  description: string;
  onDismiss?: () => void;
  onPress?: () => void;
}

export const WarningBanner: React.FC<WarningBannerProps> = ({
  title,
  description,
  onDismiss,
  onPress,
}) => {
  const content = (
    <View style={styles.warningBanner}>
      <View style={styles.warningBannerHeader}>
        <Ionicons name="warning" size={20} color={colors.banned} />
        <Text style={styles.warningBannerTitle}>{title}</Text>
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss}>
            <Ionicons name="close" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.warningBannerDescription}>{description}</Text>
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return content;
};

// Claim Analysis Component
interface ClaimAnalysisProps {
  claim: string;
  verdict: string;
  verdictType: "TRUE" | "FALSE" | "MISLEADING" | "UNVERIFIED";
}

export const ClaimAnalysis: React.FC<ClaimAnalysisProps> = ({
  claim,
  verdict,
  verdictType,
}) => {
  const verdictConfig = {
    TRUE: {
      color: colors.approved,
      icon: "checkmark-circle",
      label: "VERIFIED",
    },
    FALSE: { color: colors.banned, icon: "close-circle", label: "FALSE" },
    MISLEADING: {
      color: colors.notApproved,
      icon: "warning",
      label: "MISLEADING",
    },
    UNVERIFIED: {
      color: colors.limited,
      icon: "help-circle",
      label: "UNVERIFIED",
    },
  };

  const config = verdictConfig[verdictType];

  return (
    <View style={styles.claimAnalysis}>
      <View style={styles.claimHeader}>
        <Ionicons name={config.icon as any} size={24} color={config.color} />
        <View style={[styles.verdictBadge, { backgroundColor: config.color }]}>
          <Text style={styles.verdictBadgeText}>{config.label}</Text>
        </View>
      </View>
      <View style={styles.claimContent}>
        <Text style={styles.claimMarketing}>"{claim}"</Text>
        <Text style={styles.claimVerdict}>{verdict}</Text>
      </View>
    </View>
  );
};

// Red Flag Item Component
interface RedFlagItemProps {
  type: string;
  description: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
}

export const RedFlagItem: React.FC<RedFlagItemProps> = ({
  type,
  description,
  severity,
}) => {
  const severityColors = {
    HIGH: colors.banned,
    MEDIUM: colors.notApproved,
    LOW: colors.limited,
  };

  return (
    <View style={styles.redFlagItem}>
      <View style={styles.redFlagHeader}>
        <Ionicons name="flag" size={18} color={severityColors[severity]} />
        <Text style={[styles.redFlagType, { color: severityColors[severity] }]}>
          {type.replace(/_/g, " ")}
        </Text>
      </View>
      <Text style={styles.redFlagDescription}>{description}</Text>
    </View>
  );
};

// Search Bar Component
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onScannerPress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search products, ingredients...",
  onScannerPress,
}) => {
  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color={colors.textSecondary} />
      <TextInput
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
      />
      {onScannerPress && (
        <TouchableOpacity style={styles.scannerButton} onPress={onScannerPress}>
          <Ionicons name="barcode-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Add TextInput import
import { TextInput } from "react-native";

// Section Header Component
interface SectionHeaderProps {
  title: string;
  action?: string;
  onActionPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  action,
  onActionPress,
}) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && onActionPress && (
        <TouchableOpacity onPress={onActionPress}>
          <Text style={styles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Empty State Component
interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.emptyState}>
      <Ionicons name={icon as any} size={64} color={colors.textLight} />
      <Text style={styles.emptyStateTitle}>{title}</Text>
      <Text style={styles.emptyStateDescription}>{description}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity style={styles.emptyStateAction} onPress={onAction}>
          <Text style={styles.emptyStateActionText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Loading Component
export const Loading: React.FC<{ message?: string }> = ({
  message = "Loading...",
}) => {
  return (
    <View style={styles.loadingContainer}>
      <Ionicons name="refresh" size={48} color={colors.primary} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

// Error Component
interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  onRetry,
}) => {
  return (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle" size={48} color={colors.banned} />
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Ingredient Card Component
interface IngredientCardProps {
  name: string;
  concentration: string;
  description: string;
  sideEffects: string[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const IngredientCard: React.FC<IngredientCardProps> = ({
  name,
  concentration,
  description,
  sideEffects,
  isExpanded = false,
  onToggle,
}) => {
  return (
    <TouchableOpacity style={styles.ingredientCard} onPress={onToggle}>
      <View style={styles.ingredientHeader}>
        <View style={styles.ingredientInfo}>
          <Text style={styles.ingredientName}>{name}</Text>
          <Text style={styles.ingredientConcentration}>{concentration}</Text>
        </View>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.textSecondary}
        />
      </View>
      {isExpanded && (
        <View style={styles.ingredientDetails}>
          <Text style={styles.ingredientDescription}>{description}</Text>
          <Text style={styles.ingredientSectionTitle}>
            Potential Side Effects:
          </Text>
          {sideEffects.map((effect, index) => (
            <Text key={index} style={styles.ingredientSideEffect}>
              • {effect}
            </Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

// Quick Action Card Component
interface QuickActionCardProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  color?: string;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  color = colors.primary,
}) => {
  return (
    <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon as any} size={28} color={color} />
      </View>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  // Badge Styles
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: borderRadius.full,
    alignSelf: "flex-start",
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontWeight: "600",
  },

  // Safety Card Styles
  safetyCard: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  safetyCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  safetyCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: spacing.sm,
  },
  safetyCardMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 32,
  },

  // Product List Item Styles
  productListItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  productListContent: {
    flex: 1,
  },
  productListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  productBrand: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  productManufacturer: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  productListFooter: {
    flexDirection: "row",
  },

  // Warning Banner Styles
  warningBanner: {
    backgroundColor: colors.bannedLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.banned,
  },
  warningBannerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  warningBannerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.banned,
    marginLeft: spacing.sm,
    flex: 1,
  },
  warningBannerDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 28,
  },

  // Claim Analysis Styles
  claimAnalysis: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  claimHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  verdictBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  verdictBadgeText: {
    color: colors.textWhite,
    fontSize: 11,
    fontWeight: "700",
  },
  claimContent: {
    paddingLeft: 32,
  },
  claimMarketing: {
    fontSize: 16,
    fontStyle: "italic",
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  claimVerdict: {
    fontSize: 14,
    color: colors.textPrimary,
  },

  // Red Flag Styles
  redFlagItem: {
    backgroundColor: colors.bannedLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.banned,
  },
  redFlagHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  redFlagType: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: spacing.sm,
    textTransform: "uppercase",
  },
  redFlagDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    paddingLeft: 28,
  },

  // Search Bar Styles
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 52,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: 16,
    color: colors.textPrimary,
  },
  scannerButton: {
    padding: spacing.xs,
  },

  // Section Header Styles
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  sectionAction: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },

  // Empty State Styles
  emptyState: {
    alignItems: "center",
    padding: spacing.xl,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: spacing.md,
    textAlign: "center",
  },
  emptyStateDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  emptyStateAction: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  emptyStateActionText: {
    color: colors.textWhite,
    fontWeight: "600",
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.textSecondary,
  },

  // Error Styles
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  errorText: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
  },
  retryButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  retryButtonText: {
    color: colors.textWhite,
    fontWeight: "600",
  },

  // Ingredient Card Styles
  ingredientCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  ingredientHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  ingredientConcentration: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 2,
  },
  ingredientDetails: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  ingredientDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  ingredientSectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  ingredientSideEffect: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },

  // Quick Action Card Styles
  quickActionCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 2,
  },
});
