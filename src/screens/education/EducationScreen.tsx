// ============================================
// MedVerify Age - Education Screen
// Articles and educational content about anti-aging
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppStore, useArticles } from "../../store";
import { Article } from "../../types";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  commonStyles,
} from "../../constants/theme";
import { EvidenceBadge, SectionHeader, EmptyState } from "../../components";

export const EducationScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const articles = useArticles();
  const fetchArticles = useAppStore((state) => state.fetchArticles);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const categories = [
    { key: "SUPPLEMENT", label: "Supplements", icon: "medical" },
    { key: "TOPICAL", label: "Skincare", icon: "water" },
    { key: "HORMONE", label: "Hormones", icon: "fitness" },
    { key: "GENERAL", label: "General", icon: "book" },
  ];

  const filteredArticles = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;

  const handleArticlePress = (articleId: string) => {
    setExpandedArticle(expandedArticle === articleId ? null : articleId);
  };

  const handleReadMore = (article: Article) => {
    navigation.navigate("ArticleDetail", { articleId: article.id });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learn</Text>
        <Text style={styles.headerSubtitle}>
          Evidence-based anti-aging education
        </Text>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            !selectedCategory && styles.categoryButtonActive,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text
            style={[
              styles.categoryButtonText,
              !selectedCategory && styles.categoryButtonTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryButton,
              selectedCategory === category.key && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <Ionicons
              name={category.icon as any}
              size={16}
              color={
                selectedCategory === category.key
                  ? colors.textWhite
                  : colors.textSecondary
              }
              style={styles.categoryIcon}
            />
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category.key &&
                  styles.categoryButtonTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Article */}
      {articles.length > 0 && !selectedCategory && (
        <View style={styles.featuredSection}>
          <SectionHeader title="Featured" />
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() => handleReadMore(articles[0])}
          >
            <View style={styles.featuredBadge}>
              <EvidenceBadge level={articles[0].evidenceLevel} size="small" />
            </View>
            <Text style={styles.featuredTitle}>{articles[0].title}</Text>
            <Text style={styles.featuredSummary} numberOfLines={3}>
              {articles[0].summary}
            </Text>
            <View style={styles.featuredFooter}>
              <View style={styles.featuredMeta}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={colors.textSecondary}
                />
                <Text style={styles.featuredMetaText}>
                  {articles[0].readTime} min read
                </Text>
              </View>
              <View style={styles.featuredMeta}>
                <Ionicons
                  name="person-outline"
                  size={14}
                  color={colors.textSecondary}
                />
                <Text style={styles.featuredMetaText}>
                  {articles[0].author}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Articles List */}
      <ScrollView
        style={styles.articlesScroll}
        contentContainerStyle={styles.articlesContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredArticles.length === 0 ? (
          <EmptyState
            icon="book-outline"
            title="No Articles Found"
            description="No articles in this category yet."
          />
        ) : (
          filteredArticles.map((article) => (
            <TouchableOpacity
              key={article.id}
              style={styles.articleCard}
              onPress={() => handleArticlePress(article.id)}
            >
              <View style={styles.articleHeader}>
                <View style={styles.articleCategory}>
                  <Ionicons
                    name={
                      (categories.find((c) => c.key === article.category)
                        ?.icon as any) || "book"
                    }
                    size={16}
                    color={colors.primary}
                  />
                  <Text style={styles.articleCategoryText}>
                    {article.category}
                  </Text>
                </View>
                <EvidenceBadge level={article.evidenceLevel} size="small" />
              </View>

              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text
                style={styles.articleSummary}
                numberOfLines={expandedArticle === article.id ? undefined : 2}
              >
                {article.summary}
              </Text>

              <View style={styles.articleFooter}>
                <View style={styles.articleMeta}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={colors.textSecondary}
                  />
                  <Text style={styles.articleMetaText}>
                    {article.readTime} min
                  </Text>
                </View>
                <View style={styles.articleMeta}>
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    color={colors.textSecondary}
                  />
                  <Text style={styles.articleMetaText}>
                    {article.publishedAt}
                  </Text>
                </View>
              </View>

              {expandedArticle === article.id && (
                <View style={styles.articleExpanded}>
                  <View style={styles.articleReferences}>
                    <Text style={styles.articleReferencesTitle}>
                      References:
                    </Text>
                    {article.references.slice(0, 2).map((ref, index) => (
                      <Text key={index} style={styles.referenceText}>
                        • {ref.authors} ({ref.year})
                      </Text>
                    ))}
                  </View>
                  <TouchableOpacity
                    style={styles.readMoreButton}
                    onPress={() => handleReadMore(article)}
                  >
                    <Text style={styles.readMoreButtonText}>
                      Read Full Article
                    </Text>
                    <Ionicons
                      name="arrow-forward"
                      size={16}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))
        )}

        {/* Myth Buster Section */}
        <View style={styles.mythBusterSection}>
          <SectionHeader title="Myth Buster" />
          <View style={styles.mythCard}>
            <View style={styles.mythHeader}>
              <Ionicons name="bulb" size={24} color={colors.limited} />
              <Text style={styles.mythTitle}>
                Common Myths About Anti-Aging
              </Text>
            </View>
            <View style={styles.mythList}>
              <View style={styles.mythItem}>
                <Ionicons name="close-circle" size={18} color={colors.banned} />
                <Text style={styles.mythItemText}>
                  "Reverse aging in 30 days"
                </Text>
              </View>
              <View style={styles.mythItem}>
                <Ionicons name="close-circle" size={18} color={colors.banned} />
                <Text style={styles.mythItemText}>
                  "One pill solves everything"
                </Text>
              </View>
              <View style={styles.mythItem}>
                <Ionicons name="close-circle" size={18} color={colors.banned} />
                <Text style={styles.mythItemText}>
                  "Celebrity secrets work for everyone"
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() =>
                handleReadMore(
                  articles.find((a) => a.category === "GENERAL") || articles[0]
                )
              }
            >
              <Text style={styles.learnMoreButtonText}>Learn the Truth</Text>
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
  categoryScroll: {
    marginBottom: spacing.md,
  },
  categoryContent: {
    paddingHorizontal: spacing.md,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginRight: spacing.sm,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  categoryButtonTextActive: {
    color: colors.textWhite,
  },
  categoryIcon: {
    marginRight: 6,
  },
  featuredSection: {
    marginBottom: spacing.md,
  },
  featuredCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
  },
  featuredBadge: {
    marginBottom: spacing.sm,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  featuredSummary: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  featuredFooter: {
    flexDirection: "row",
  },
  featuredMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.md,
  },
  featuredMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  articlesScroll: {
    flex: 1,
  },
  articlesContent: {
    paddingHorizontal: spacing.md,
  },
  articleCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  articleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  articleCategory: {
    flexDirection: "row",
    alignItems: "center",
  },
  articleCategoryText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.primary,
    marginLeft: 4,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  articleSummary: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  articleFooter: {
    flexDirection: "row",
  },
  articleMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.md,
  },
  articleMetaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  articleExpanded: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  articleReferences: {
    marginBottom: spacing.sm,
  },
  articleReferencesTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  referenceText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  readMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  readMoreButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
    marginRight: 4,
  },
  mythBusterSection: {
    marginTop: spacing.md,
  },
  mythCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  mythHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  mythTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  mythList: {
    marginBottom: spacing.md,
  },
  mythItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  mythItemText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  learnMoreButton: {
    alignSelf: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
  },
  learnMoreButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});

export default EducationScreen;
