// ============================================
// MedVerify Age - Search Screen
// Product search and barcode scanning
// ============================================

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Modal,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  useAppStore,
  useProducts,
  useSearchResults,
  useIsLoading,
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
  SearchBar,
  StatusBadge,
  EvidenceBadge,
  ProductListItem,
  Loading,
  EmptyState,
} from "../../components";

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const products = useProducts();
  const searchResults = useSearchResults();
  const isLoading = useIsLoading();
  const fetchProducts = useAppStore((state) => state.fetchProducts);
  const searchProducts = useAppStore((state) => state.searchProducts);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);
  const setShowScanner = useAppStore((state) => state.setShowScanner);

  const [searchMode, setSearchMode] = useState<"text" | "scan">("text");
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 2) {
      searchProducts(text);
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate("ProductDetail", { productId: product.id });
  };

  const handleScanPress = () => {
    setSearchMode("scan");
    setShowScanner(true);
  };

  const displayedProducts = searchText.length > 2 ? searchResults : products;

  const filteredProducts = displayedProducts.filter((product) => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(product.status);
  });

  const filterOptions = [
    { key: "APPROVED", label: "Approved", color: colors.approved },
    { key: "LIMITED", label: "Limited", color: colors.limited },
    { key: "NOT_APPROVED", label: "Not Approved", color: colors.notApproved },
    { key: "BANNED", label: "Banned", color: colors.banned },
  ];

  const toggleFilter = (filterKey: string) => {
    if (selectedFilters.includes(filterKey)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filterKey));
    } else {
      setSelectedFilters([...selectedFilters, filterKey]);
    }
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchText("");
    setSearchMode("text");
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Products</Text>
        <Text style={styles.headerSubtitle}>
          Find and verify anti-aging products
        </Text>
      </View>

      {/* Search Toggle */}
      <View style={styles.searchToggle}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            searchMode === "text" && styles.toggleButtonActive,
          ]}
          onPress={() => setSearchMode("text")}
        >
          <Ionicons
            name="search"
            size={20}
            color={
              searchMode === "text" ? colors.textWhite : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.toggleButtonText,
              searchMode === "text" && styles.toggleButtonTextActive,
            ]}
          >
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            searchMode === "scan" && styles.toggleButtonActive,
          ]}
          onPress={handleScanPress}
        >
          <Ionicons
            name="barcode-outline"
            size={20}
            color={
              searchMode === "scan" ? colors.textWhite : colors.textSecondary
            }
          />
          <Text
            style={[
              styles.toggleButtonText,
              searchMode === "scan" && styles.toggleButtonTextActive,
            ]}
          >
            Scan
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={handleSearch}
            placeholder="Search products, ingredients, brands..."
            placeholderTextColor={colors.textLight}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilters.length > 0 && styles.filterButtonActive,
          ]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={
              selectedFilters.length > 0
                ? colors.textWhite
                : colors.textSecondary
            }
          />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filtersHeader}>
            <Text style={styles.filtersTitle}>Filter by Status</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterChips}>
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.filterChip,
                  selectedFilters.includes(option.key) && {
                    backgroundColor: option.color,
                  },
                ]}
                onPress={() => toggleFilter(option.key)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedFilters.includes(option.key) && {
                      color: colors.textWhite,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Results Count */}
      {searchText.length > 0 && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredProducts.length} result
            {filteredProducts.length !== 1 ? "s" : ""} found
          </Text>
        </View>
      )}

      {/* Results List */}
      <ScrollView
        style={styles.resultsScroll}
        contentContainerStyle={styles.resultsContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <Loading message="Searching products..." />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon="search"
            title="No Products Found"
            description={
              searchText.length > 0
                ? `No products match "${searchText}". Try a different search term.`
                : "Start typing to search for anti-aging products."
            }
            actionLabel="Clear Search"
            onAction={clearFilters}
          />
        ) : (
          filteredProducts.map((product) => (
            <ProductListItem
              key={product.id}
              name={product.name}
              brand={product.brand}
              manufacturer={product.manufacturer}
              status={product.status}
              evidenceLevel={product.evidenceLevel}
              onPress={() => handleProductPress(product)}
            />
          ))
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Scanner Modal Placeholder */}
      <Modal visible={false} animationType="slide" transparent={true}>
        <View style={styles.scannerModal}>
          <View style={styles.scannerContent}>
            <Text style={styles.scannerTitle}>Barcode Scanner</Text>
            <Text style={styles.scannerSubtitle}>
              Point camera at product barcode
            </Text>
            <TouchableOpacity
              style={styles.closeScannerButton}
              onPress={() => setShowScanner(false)}
            >
              <Ionicons name="close" size={24} color={colors.textWhite} />
              <Text style={styles.closeScannerText}>Close Scanner</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
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
  searchToggle: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  toggleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginHorizontal: spacing.xs,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  toggleButtonTextActive: {
    color: colors.textWhite,
  },
  searchBarContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  searchInputWrapper: {
    flex: 1,
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
  filterButton: {
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    marginLeft: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filtersContainer: {
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  filtersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  clearFiltersText: {
    fontSize: 14,
    color: colors.primary,
  },
  filterChips: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  filterChipText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  resultsHeader: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  resultsScroll: {
    flex: 1,
  },
  resultsContent: {
    paddingHorizontal: spacing.md,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
  scannerModal: {
    flex: 1,
    backgroundColor: colors.textPrimary,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerContent: {
    alignItems: "center",
  },
  scannerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.textWhite,
  },
  scannerSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  closeScannerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.banned,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  closeScannerText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: spacing.sm,
  },
});

export default SearchScreen;
