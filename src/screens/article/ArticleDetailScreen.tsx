// ============================================
// MedVerify Age - Article Detail Screen
// Full article content with references
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
import { Article } from "../../types";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  commonStyles,
} from "../../constants/theme";
import { EvidenceBadge, SectionHeader } from "../../components";

type ArticleDetailRouteParams = {
  articleId: string;
};

export const ArticleDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<{ params: ArticleDetailRouteParams }, "params">>();
  const articleId = route.params?.articleId;

  const fetchArticleById = useAppStore((state) => state.fetchArticleById);
  const selectArticle = useAppStore((state) => state.selectArticle);

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (articleId) {
      loadArticle(articleId);
    }
    return () => {
      selectArticle(null);
    };
  }, [articleId]);

  const loadArticle = async (id: string) => {
    const articles = await import("../../services/dataService").then(
      (m) => m.articles
    );
    const found = articles.find((a) => a.id === id);
    if (found) {
      setArticle(found);
    }
  };

  const handleOpenReference = (url?: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  if (!article) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={styles.loadingContainer}>
          <Ionicons name="refresh" size={48} color={colors.primary} />
          <Text style={styles.loadingText}>Loading article...</Text>
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
          Article
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
        {/* Article Header */}
        <View style={styles.articleHeader}>
          <View style={styles.badgesRow}>
            <EvidenceBadge level={article.evidenceLevel} />
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryBadgeText}>{article.category}</Text>
            </View>
          </View>

          <Text style={styles.articleTitle}>{article.title}</Text>
          <Text style={styles.articleSummary}>{article.summary}</Text>

          <View style={styles.articleMeta}>
            <View style={styles.metaItem}>
              <Ionicons
                name="person-outline"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.metaText}>{article.author}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.metaText}>{article.publishedAt}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons
                name="time-outline"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.metaText}>{article.readTime} min read</Text>
            </View>
          </View>
        </View>

        {/* Article Content */}
        <View style={styles.articleContent}>
          {article.content.split("\n").map((line, index) => {
            if (line.startsWith("# ")) {
              return (
                <Text key={index} style={styles.h1}>
                  {line.replace("# ", "")}
                </Text>
              );
            } else if (line.startsWith("## ")) {
              return (
                <Text key={index} style={styles.h2}>
                  {line.replace("## ", "")}
                </Text>
              );
            } else if (line.startsWith("### ")) {
              return (
                <Text key={index} style={styles.h3}>
                  {line.replace("### ", "")}
                </Text>
              );
            } else if (line.startsWith("- ")) {
              return (
                <View key={index} style={styles.bulletPoint}>
                  <View style={styles.bullet} />
                  <Text style={styles.bulletText}>
                    {line.replace("- ", "")}
                  </Text>
                </View>
              );
            } else if (line.startsWith("✓")) {
              return (
                <View key={index} style={styles.checkPoint}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={colors.approved}
                  />
                  <Text style={styles.checkPointText}>
                    {line.substring(1).trim()}
                  </Text>
                </View>
              );
            } else if (line.startsWith("❌")) {
              return (
                <View key={index} style={styles.crossPoint}>
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color={colors.banned}
                  />
                  <Text style={styles.crossPointText}>
                    {line.substring(1).trim()}
                  </Text>
                </View>
              );
            } else if (line.startsWith("|")) {
              return null; // Skip table rows for now
            } else if (line.trim() === "") {
              return <View key={index} style={styles.paragraphSpacing} />;
            } else {
              return (
                <Text key={index} style={styles.paragraph}>
                  {line}
                </Text>
              );
            }
          })}
        </View>

        {/* References */}
        <View style={styles.referencesSection}>
          <SectionHeader title="Scientific References" />
          {article.references.map((ref, index) => (
            <TouchableOpacity
              key={index}
              style={styles.referenceCard}
              onPress={() => handleOpenReference(ref.url)}
            >
              <View style={styles.referenceNumber}>
                <Text style={styles.referenceNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.referenceContent}>
                <Text style={styles.referenceTitle}>{ref.title}</Text>
                <Text style={styles.referenceAuthors}>{ref.authors}</Text>
                <Text style={styles.referenceJournal}>
                  {ref.journal}, {ref.year}
                </Text>
              </View>
              {ref.url && (
                <Ionicons
                  name="open-outline"
                  size={20}
                  color={colors.primary}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Related Products */}
        {article.relatedProductIds.length > 0 && (
          <View style={styles.relatedSection}>
            <SectionHeader title="Related Products" />
            <Text style={styles.relatedDescription}>
              Products mentioned in this article that are in our database:
            </Text>
            <TouchableOpacity
              style={styles.relatedProductCard}
              onPress={() =>
                navigation.navigate("ProductDetail", {
                  productId: article.relatedProductIds[0],
                })
              }
            >
              <Text style={styles.relatedProductText}>
                View Product Details
              </Text>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        )}

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={colors.textLight}
          />
          <Text style={styles.disclaimerText}>
            This article is for educational purposes only and does not
            constitute medical advice. Always consult with a qualified
            healthcare provider before starting any supplement or treatment.
          </Text>
        </View>

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
  articleHeader: {
    marginBottom: spacing.lg,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.md,
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
  articleTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 32,
    marginBottom: spacing.sm,
  },
  articleSummary: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  articleMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.md,
    marginBottom: spacing.xs,
  },
  metaText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  articleContent: {
    marginBottom: spacing.lg,
  },
  h1: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  h3: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  paragraph: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 26,
    marginBottom: spacing.sm,
  },
  paragraphSpacing: {
    height: spacing.md,
  },
  bulletPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: spacing.sm,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 26,
  },
  checkPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },
  checkPointText: {
    flex: 1,
    fontSize: 16,
    color: colors.approved,
    lineHeight: 26,
    marginLeft: spacing.sm,
  },
  crossPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },
  crossPointText: {
    flex: 1,
    fontSize: 16,
    color: colors.banned,
    lineHeight: 26,
    marginLeft: spacing.sm,
  },
  referencesSection: {
    marginBottom: spacing.lg,
  },
  referenceCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  referenceNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  referenceNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  referenceContent: {
    flex: 1,
  },
  referenceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 2,
  },
  referenceAuthors: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  referenceJournal: {
    fontSize: 12,
    color: colors.textLight,
  },
  relatedSection: {
    marginBottom: spacing.lg,
  },
  relatedDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  relatedProductCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  relatedProductText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: colors.textLight,
    lineHeight: 18,
    marginLeft: spacing.sm,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});

export default ArticleDetailScreen;
