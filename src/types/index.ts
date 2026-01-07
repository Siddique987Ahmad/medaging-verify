// ============================================
// MedVerify Age - TypeScript Type Definitions
// ============================================

// Approval Status Types
export type ApprovalStatus = 
  | 'APPROVED'      // Officially approved for medical use
  | 'LIMITED'       // Limited or experimental approval
  | 'NOT_APPROVED'  // Not approved, marketing only
  | 'BANNED';       // Banned or recalled product

// Evidence Level Types
export type EvidenceLevel = 
  | 'HIGH'          // Strong clinical evidence
  | 'MODERATE'      // Some research, not conclusive
  | 'LOW'           // Preliminary or animal studies
  | 'NONE';         // No scientific evidence

// Alert Severity Types
export type AlertSeverity = 'HIGH' | 'MEDIUM' | 'LOW';

// Product Interface
export interface Product {
  id: string;
  barcode?: string;
  name: string;
  brand: string;
  manufacturer: string;
  manufacturerCountry: string;
  status: ApprovalStatus;
  evidenceLevel: EvidenceLevel;
  activeIngredients: Ingredient[];
  category: ProductCategory;
  description: string;
  claims: ProductClaim[];
  redFlags: RedFlag[];
  safetyAlerts: SafetyAlert[];
  warnings: string[];
  createdAt: string;
  updatedAt: string;
}

// Ingredient Interface
export interface Ingredient {
  name: string;
  concentration: string;
  description: string;
  sideEffects: string[];
  interactions: string[];
}

// Product Claim Analysis
export interface ProductClaim {
  marketingClaim: string;
  scientificVerdict: string;
  verdictType: 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED';
  explanation: string;
}

// Red Flag for fake products
export interface RedFlag {
  type: 'EXAGGERATED_CLAIM' | 'HIDDEN_INGREDIENT' | 'UNVERIFIED_MANUFACTURER' | 'FAKE_REVIEWS' | 'UNREALISTIC_PROMISE';
  description: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

// Safety Alert
export interface SafetyAlert {
  id: string;
  date: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  source: string;
}

// Product Categories
export type ProductCategory = 
  | 'SUPPLEMENT'       // Oral supplements (pills, powders)
  | 'TOPICAL'          // Creams, serums, skincare
  | 'HORMONE'          // Hormone therapies
  | 'INJECTION'        // Injectable treatments
  | 'DEVICE'           // Anti-aging devices
  | 'FOOD'             // Functional foods/beverages';

// Educational Article Interface
export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: ProductCategory | 'GENERAL';
  evidenceLevel: EvidenceLevel;
  readTime: number;
  publishedAt: string;
  author: string;
  references: Reference[];
  relatedProductIds: string[];
}

// Scientific Reference
export interface Reference {
  title: string;
  authors: string;
  journal: string;
  year: number;
  url?: string;
}

// Search Filters
export interface SearchFilters {
  status?: ApprovalStatus[];
  evidenceLevel?: EvidenceLevel[];
  category?: ProductCategory[];
  searchQuery: string;
}

// Daily Insight
export interface DailyInsight {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
}

// Manufacturer Verification
export interface ManufacturerInfo {
  name: string;
  registrationNumber: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  verified: boolean;
  lastVerified: string;
}

// User Report
export interface UserReport {
  id: string;
  productId: string;
  reportType: 'SIDE_EFFECT' | 'COUNTERFEIT' | 'MISLEADING_CLAIM' | 'OTHER';
  description: string;
  images: string[];
  status: 'PENDING' | 'INVESTIGATED' | 'RESOLVED';
  createdAt: string;
}
