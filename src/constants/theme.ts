// ============================================
// MedVerify Age - Theme Constants
// ============================================

import { StyleSheet } from 'react-native';

// Color Palette - Trust & Medical Safety Theme
export const colors = {
  primary: '#008080',      // Teal - Medical Trust
  primaryLight: '#E0F7FA', // Light Cyan - Backgrounds
  primaryDark: '#006666',  // Darker Teal - Headers
  
  // Status Colors
  approved: '#2E7D32',     // Green - Approved/Safe
  approvedLight: '#E8F5E9',
  limited: '#F9A825',      // Amber - Limited Evidence
  limitedLight: '#FFF8E1',
  notApproved: '#EF6C00',  // Orange - Not Approved
  notApprovedLight: '#FFF3E0',
  banned: '#C62828',       // Red - Banned/Dangerous
  bannedLight: '#FFEBEE',
  
  // Text Colors
  textPrimary: '#101828',  // Dark Gray - Primary Text
  textSecondary: '#475467', // Medium Gray - Secondary Text
  textLight: '#98A2B3',    // Light Gray - Disabled Text
  textWhite: '#FFFFFF',
  
  // UI Colors
  background: '#F9FAFB',   // Off-white Background
  cardBackground: '#FFFFFF',
  borderColor: '#E4E7EC',
  divider: '#EAECF0',
  
  // Accent Colors
  warning: '#FFB800',      // Warning Yellow
  info: '#2196F3',         // Info Blue
  success: '#22C55E',      // Success Green
  error: '#DC2626',        // Error Red
  
  // Shadow
  shadowColor: '#000000',
};

// Status Configurations
export const statusConfig = {
  APPROVED: {
    color: colors.approved,
    backgroundColor: colors.approvedLight,
    icon: 'check-circle',
    label: 'Approved',
    description: 'Officially approved for medical use or recognized as safe supplement',
  },
  LIMITED: {
    color: colors.limited,
    backgroundColor: colors.limitedLight,
    icon: 'info',
    label: 'Limited Approval',
    description: 'Limited or experimental approval - consult healthcare provider',
  },
  NOT_APPROVED: {
    color: colors.notApproved,
    backgroundColor: colors.notApprovedLight,
    icon: 'alert-triangle',
    label: 'Not Approved',
    description: 'Not officially approved - marketed without regulatory clearance',
  },
  BANNED: {
    color: colors.banned,
    backgroundColor: colors.bannedLight,
    icon: 'x-circle',
    label: 'Banned',
    description: 'Product banned or recalled - do not use',
  },
};

// Evidence Configurations
export const evidenceConfig = {
  HIGH: {
    color: colors.approved,
    label: 'Strong Evidence',
  },
  MODERATE: {
    color: colors.limited,
    label: 'Moderate Evidence',
  },
  LOW: {
    color: colors.notApproved,
    label: 'Limited Evidence',
  },
  NONE: {
    color: colors.banned,
    label: 'No Evidence',
  },
};

// Spacing System
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Typography
export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 34,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 24,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    lineHeight: 16,
  },
};

// Default Styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
  },
  shadow: {
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});
