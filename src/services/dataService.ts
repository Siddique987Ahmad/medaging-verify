// ============================================
// MedVerify Age - Mock Data Service
// Provides sample anti-aging products and articles
// ============================================

import {
  Product,
  Article,
  DailyInsight,
  ManufacturerInfo,
  ApprovalStatus,
  EvidenceLevel
} from '../types';

// Sample Products Database
export const products: Product[] = [
  {
    id: 'prod_001',
    barcode: '123456789012',
    name: 'NMN Vitality Complex',
    brand: 'LifeExtension Pro',
    manufacturer: 'BioVital Sciences Inc.',
    manufacturerCountry: 'United States',
    status: 'LIMITED',
    evidenceLevel: 'MODERATE',
    category: 'SUPPLEMENT',
    description: 'A nicotinamide mononucleotide (NMN) supplement designed to support cellular energy metabolism and potentially promote healthy aging.',
    activeIngredients: [
      {
        name: 'Nicotinamide Mononucleotide (NMN)',
        concentration: '250mg per capsule',
        description: 'A precursor to NAD+, a molecule essential for cellular energy production and DNA repair.',
        sideEffects: ['Nausea', 'Headache', 'Digestive discomfort', 'Flushing'],
        interactions: ['Blood pressure medications', 'Diabetes medications']
      },
      {
        name: 'Trans-Resveratrol',
        concentration: '100mg per capsule',
        description: 'A polyphenolic compound found in red wine, studied for potential cardiovascular and anti-aging benefits.',
        sideEffects: ['Digestive issues', 'Joint pain', 'Kidney problems at high doses'],
        interactions: ['Blood thinners', 'Cytochrome P450 substrates']
      }
    ],
    claims: [
      {
        marketingClaim: 'Reverses aging by 10 years',
        scientificVerdict: 'FALSE - No clinical evidence supports age reversal claims.',
        verdictType: 'FALSE',
        explanation: 'While NMN shows promise in animal studies for supporting cellular health, there is no scientific evidence that it can reverse human aging by any specific number of years.'
      },
      {
        marketingClaim: 'Increases NAD+ levels by 300%',
        scientificVerdict: 'UNVERIFIED - Claims lack robust clinical validation.',
        verdictType: 'UNVERIFIED',
        explanation: 'Some studies show NMN can increase NAD+ levels, but the percentage increase varies significantly between individuals and studies have not consistently shown 300% increases.'
      },
      {
        marketingClaim: 'Supports healthy cellular aging',
        scientificVerdict: 'TRUE - Supported by preliminary research.',
        verdictType: 'TRUE',
        explanation: 'NAD+ decline with age is well-documented, and NMN supplementation may help maintain NAD+ levels, potentially supporting cellular functions associated with healthy aging.'
      }
    ],
    redFlags: [
      {
        type: 'EXAGGERATED_CLAIM',
        description: 'The product marketing makes unrealistic age reversal claims that are not supported by scientific evidence.',
        severity: 'HIGH'
      }
    ],
    safetyAlerts: [],
    warnings: [
      'Not FDA-approved for treating or preventing any disease.',
      'Long-term safety data is limited.',
      'Consult healthcare provider before use, especially if taking medications.'
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z'
  },
  {
    id: 'prod_002',
    barcode: '234567890123',
    name: 'Collagen Peptide Pure',
    brand: 'DermaAge',
    manufacturer: 'PureCollagen Laboratories',
    manufacturerCountry: 'Germany',
    status: 'NOT_APPROVED',
    evidenceLevel: 'MODERATE',
    category: 'SUPPLEMENT',
    description: 'Hydrolyzed collagen peptide supplement marketed for skin elasticity, joint health, and anti-aging benefits.',
    activeIngredients: [
      {
        name: 'Hydrolyzed Collagen Type I & III',
        concentration: '10g per serving',
        description: 'Collagen peptides derived from bovine sources, processed for enhanced absorption.',
        sideEffects: ['Digestive discomfort', 'Unpleasant taste', 'Heartburn'],
        interactions: ['Calcium supplements', 'Protein medications']
      }
    ],
    claims: [
      {
        marketingClaim: 'Erases wrinkles in 14 days',
        scientificVerdict: 'FALSE - Exaggerated and misleading claim.',
        verdictType: 'FALSE',
        explanation: 'While collagen supplementation may improve skin hydration and elasticity over time, no supplement can erase wrinkles in 14 days. Results vary significantly and typically require 8-12 weeks of consistent use.'
      },
      {
        marketingClaim: 'Clinically proven to reduce wrinkles',
        scientificVerdict: 'MISLEADING - Studies show modest results at best.',
        verdictType: 'MISLEADING',
        explanation: 'Some studies show modest improvements in skin hydration and elasticity, but the evidence for significant wrinkle reduction is limited and results are typically modest.'
      }
    ],
    redFlags: [
      {
        type: 'EXAGGERATED_CLAIM',
        description: 'The "erases wrinkles in 14 days" claim is scientifically impossible and highly misleading.',
        severity: 'HIGH'
      },
      {
        type: 'UNREALISTIC_PROMISE',
        description: 'Marketing promises results that no topical or oral supplement can realistically deliver.',
        severity: 'MEDIUM'
      }
    ],
    safetyAlerts: [],
    warnings: [
      'Collagen supplements are classified as dietary supplements, not drugs.',
      'Quality and source of collagen varies significantly between products.',
      'Allergy warning: derived from bovine sources.'
    ],
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-03-15T11:20:00Z'
  },
  {
    id: 'prod_003',
    barcode: '345678901234',
    name: 'Metformin Age Defense',
    brand: 'GlycoMed',
    manufacturer: 'PharmaCare International',
    manufacturerCountry: 'India',
    status: 'LIMITED',
    evidenceLevel: 'HIGH',
    category: 'SUPPLEMENT',
    description: 'Metformin hydrochloride supplement being studied for potential anti-aging applications beyond its approved use for type 2 diabetes.',
    activeIngredients: [
      {
        name: 'Metformin Hydrochloride',
        concentration: '500mg per tablet',
        description: 'A prescription medication approved for type 2 diabetes, now being studied for potential anti-aging effects.',
        sideEffects: ['Nausea', 'Diarrhea', 'Abdominal pain', 'Vitamin B12 deficiency', 'Lactic acidosis (rare)'],
        interactions: ['Alcohol', 'Contrast dyes', 'Many prescription medications']
      }
    ],
    claims: [
      {
        marketingClaim: 'Extends human lifespan by 10-30%',
        scientificVerdict: 'UNVERIFIED - Research is preliminary.',
        verdictType: 'UNVERIFIED',
        explanation: 'While animal studies show lifespan extension, human studies are ongoing. Current evidence does not support specific lifespan extension percentages in humans.'
      },
      {
        marketingClaim: 'FDA-approved for anti-aging',
        scientificVerdict: 'FALSE - Metformin is not FDA-approved for anti-aging.',
        verdictType: 'FALSE',
        explanation: 'Metformin is FDA-approved only for type 2 diabetes treatment. Using it for anti-aging is an off-label, experimental use that lacks regulatory approval.'
      },
      {
        marketingClaim: 'Activates longevity pathways',
        scientificVerdict: 'TRUE - Supported by ongoing research.',
        verdictType: 'TRUE',
        explanation: 'Metformin has been shown to activate AMPK and other pathways associated with cellular longevity in both animal and some human studies.'
      }
    ],
    redFlags: [
      {
        type: 'EXAGGERATED_CLAIM',
        description: 'Specific lifespan extension percentages are not supported by current human research.',
        severity: 'MEDIUM'
      }
    ],
    safetyAlerts: [
      {
        id: 'alert_001',
        date: '2024-02-15',
        title: 'Study Update',
        message: 'The TAME (Targeting Aging with Metformin) trial results are pending. Consult healthcare provider before considering off-label use.',
        severity: 'MEDIUM',
        source: 'FDA'
      }
    ],
    warnings: [
      'Prescription medication - requires medical supervision.',
      'Not approved for anti-aging use.',
      'Contraindicated in people with kidney problems.',
      'Must be prescribed by a licensed healthcare provider.',
      'Serious side effects possible, including lactic acidosis.'
    ],
    createdAt: '2024-01-20T12:00:00Z',
    updatedAt: '2024-03-10T09:45:00Z'
  },
  {
    id: 'prod_004',
    barcode: '456789012345',
    name: 'Youth Serum Ultimate',
    brand: 'AgeZero',
    manufacturer: 'Unknown Manufacturer',
    manufacturerCountry: 'Unknown',
    status: 'BANNED',
    evidenceLevel: 'NONE',
    category: 'TOPICAL',
    description: 'A topical anti-aging serum making bold claims about reversing aging signs. Manufacturer details cannot be verified.',
    activeIngredients: [
      {
        name: 'Undefined "Youth Complex"',
        concentration: 'Unknown',
        description: 'Proprietary blend with undisclosed ingredients.',
        sideEffects: ['Skin irritation', 'Allergic reactions', 'Unknown long-term effects'],
        interactions: ['Unknown - ingredients not disclosed']
      }
    ],
    claims: [
      {
        marketingClaim: 'Turns back the clock 20 years',
        scientificVerdict: 'FALSE - Scientifically impossible claim.',
        verdictType: 'FALSE',
        explanation: 'No skincare product can reverse aging by 20 years. Such claims are physically impossible and represent clear deceptive marketing.'
      },
      {
        marketingClaim: 'Stem cell technology regenerates skin',
        scientificVerdict: 'FALSE - No stem cells in product.',
        verdictType: 'FALSE',
        explanation: 'Laboratory testing confirmed no stem cell derivatives in this product. The claim is completely fabricated.'
      }
    ],
    redFlags: [
      {
        type: 'EXAGGERATED_CLAIM',
        description: 'The "turns back the clock 20 years" claim is scientifically impossible.',
        severity: 'HIGH'
      },
      {
        type: 'UNVERIFIED_MANUFACTURER',
        description: 'Manufacturer cannot be traced or verified. Product origins are suspicious.',
        severity: 'HIGH'
      },
      {
        type: 'HIDDEN_INGREDIENT',
        description: 'Ingredients are not fully disclosed, raising safety concerns.',
        severity: 'HIGH'
      },
      {
        type: 'FAKE_REVIEWS',
        description: 'Online reviews show patterns consistent with manufactured/fake reviews.',
        severity: 'MEDIUM'
      }
    ],
    safetyAlerts: [
      {
        id: 'alert_002',
        date: '2024-03-01',
        title: 'Product Ban Notice',
        message: 'This product has been identified as potentially dangerous and has been flagged by consumer safety authorities.',
        severity: 'HIGH',
        source: 'Consumer Safety Commission'
      }
    ],
    warnings: [
      'DO NOT USE - Product flagged as potentially dangerous.',
      'Manufacturer cannot be verified - no recourse if adverse effects occur.',
      'Ingredients not fully disclosed - unknown safety profile.',
      'Reported cases of severe skin reactions.'
    ],
    createdAt: '2024-01-25T15:30:00Z',
    updatedAt: '2024-03-05T16:00:00Z'
  },
  {
    id: 'prod_005',
    barcode: '567890123456',
    name: 'CoQ10 Energy Boost',
    brand: 'CardioVital',
    manufacturer: 'NutraPharma Corp',
    manufacturerCountry: 'United States',
    status: 'APPROVED',
    evidenceLevel: 'HIGH',
    category: 'SUPPLEMENT',
    description: 'Coenzyme Q10 (Ubiquinone) supplement supporting cellular energy production and cardiovascular health.',
    activeIngredients: [
      {
        name: 'Ubiquinone (CoQ10)',
        concentration: '200mg per softgel',
        description: 'A naturally occurring antioxidant important for cellular energy production, especially in heart tissue.',
        sideEffects: ['Nausea', 'Diarrhea', 'Loss of appetite', 'Heartburn'],
        interactions: ['Blood thinners (warfarin)', 'Blood pressure medications', 'Statins']
      }
    ],
    claims: [
      {
        marketingClaim: 'Supports heart health',
        scientificVerdict: 'TRUE - Supported by clinical evidence.',
        verdictType: 'TRUE',
        explanation: 'CoQ10 supplementation has been studied extensively for heart failure and cardiovascular support, with positive results in multiple clinical trials.'
      },
      {
        marketingClaim: 'Clinically proven to increase energy levels',
        scientificVerdict: 'MISLEADING - Evidence is mixed for general energy.',
        verdictType: 'MISLEADING',
        explanation: 'While CoQ10 is essential for cellular energy, studies on whether supplementation increases subjective energy levels in healthy individuals are mixed.'
      }
    ],
    redFlags: [],
    safetyAlerts: [],
    warnings: [
      'Consult healthcare provider before use, especially if on blood thinners.',
      'May interact with certain medications.',
      'Pregnant or nursing women should consult doctor before use.'
    ],
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-03-18T08:30:00Z'
  },
  {
    id: 'prod_006',
    barcode: '678901234567',
    name: 'NAD+ Infusion Complex',
    brand: 'VitalityPlus',
    manufacturer: 'Advanced Wellness Labs',
    manufacturerCountry: 'Switzerland',
    status: 'NOT_APPROVED',
    evidenceLevel: 'LOW',
    category: 'SUPPLEMENT',
    description: 'A combination supplement containing NAD+ precursors (NR and NMN) marketed for comprehensive cellular rejuvenation.',
    activeIngredients: [
      {
        name: 'Nicotinamide Riboside (NR)',
        concentration: '300mg per capsule',
        description: 'A direct precursor to NAD+ synthesis.',
        sideEffects: ['Nausea', 'Headache', 'Fatigue', 'Digestive issues'],
        interactions: ['Blood pressure medications']
      },
      {
        name: 'Alpha-Ketoglutarate',
        concentration: '500mg per capsule',
        description: 'An intermediate in the Krebs cycle, studied for potential anti-aging effects.',
        sideEffects: ['Stomach upset', 'Diarrhea', 'Dry mouth'],
        interactions: ['Thyroid medications']
      }
    ],
    claims: [
      {
        marketingClaim: 'Rejuvenates cells at DNA level',
        scientificVerdict: 'UNVERIFIED - Mechanism not fully understood in humans.',
        verdictType: 'UNVERIFIED',
        explanation: 'While NAD+ is involved in DNA repair, direct evidence that oral supplementation can "rejuvenate cells at the DNA level" in humans is lacking.'
      },
      {
        marketingClaim: 'Restores youthful NAD+ levels',
        scientificVerdict: 'TRUE - NAD+ levels do decline with age.',
        verdictType: 'TRUE',
        explanation: 'NAD+ levels naturally decline with age, and supplementation with precursors like NR has been shown to increase NAD+ levels in human studies.'
      }
    ],
    redFlags: [
      {
        type: 'EXAGGERATED_CLAIM',
        description: 'Cellular "rejuvenation at DNA level" is an oversimplification of complex biological processes.',
        severity: 'MEDIUM'
      }
    ],
    safetyAlerts: [],
    warnings: [
      'Long-term effects of combined NR and NMN supplementation are not well studied.',
      'Quality of NAD+ precursors varies significantly between manufacturers.',
      'Not a substitute for proven medical treatments.'
    ],
    createdAt: '2024-02-20T14:00:00Z',
    updatedAt: '2024-03-22T10:15:00Z'
  },
  {
    id: 'prod_007',
    barcode: '789012345678',
    name: 'Rapamycin Longevity Formula',
    brand: 'BioAge Pharma',
    manufacturer: 'Longevity Therapeutics Inc.',
    manufacturerCountry: 'United States',
    status: 'LIMITED',
    evidenceLevel: 'MODERATE',
    category: 'SUPPLEMENT',
    description: 'A rapamycin-based supplement marketed for longevity support. Note: Rapamycin is a prescription drug approved for transplant rejection prevention.',
    activeIngredients: [
      {
        name: 'Rapamycin (Sirolimus)',
        concentration: '1mg per capsule',
        description: 'An mTOR inhibitor originally used for organ transplant patients, now studied for potential longevity benefits.',
        sideEffects: ['Mouth sores', 'Weakness', 'High cholesterol', 'Increased infection risk', 'Delayed wound healing'],
        interactions: ['Many medications - consult healthcare provider']
      }
    ],
    claims: [
      {
        marketingClaim: 'Extends lifespan in mammals by 25%',
        scientificVerdict: 'TRUE - Shown in animal studies.',
        verdictType: 'TRUE',
        explanation: 'Rapamycin has shown lifespan extension in mice and other mammals in laboratory studies, though human data is limited.'
      },
      {
        marketingClaim: 'FDA-approved anti-aging drug',
        scientificVerdict: 'FALSE - Not approved for anti-aging.',
        verdictType: 'FALSE',
        explanation: 'Rapamycin is FDA-approved only for preventing organ transplant rejection. Using it for anti-aging is completely off-label and not approved.'
      },
      {
        marketingClaim: 'Works by slowing cellular aging',
        scientificVerdict: 'TRUE - mTOR inhibition mechanism is understood.',
        verdictType: 'TRUE',
        explanation: 'Rapamycin inhibits mTOR, a key pathway involved in cellular aging. This mechanism is well-documented in scientific literature.'
      }
    ],
    redFlags: [
      {
        type: 'EXAGGERATED_CLAIM',
        description: 'Animal study results cannot be directly extrapolated to human lifespan extension.',
        severity: 'MEDIUM'
      }
    ],
    safetyAlerts: [
      {
        id: 'alert_003',
        date: '2024-03-10',
        title: 'Important Safety Notice',
        message: 'Rapamycin is a potent immunosuppressant with significant side effects. Self-medication for anti-aging is not recommended and may be dangerous.',
        severity: 'HIGH',
        source: 'Medical Community'
      }
    ],
    warnings: [
      'Potent prescription medication - should only be used under strict medical supervision.',
      'Significant immunosuppressant effects increase infection risk.',
        'Not approved or recommended for anti-aging use by regulatory agencies.',
      'Requires regular blood monitoring.',
      'Many serious drug interactions.'
    ],
    createdAt: '2024-02-15T11:00:00Z',
    updatedAt: '2024-03-25T13:45:00Z'
  },
  {
    id: 'prod_008',
    barcode: '890123456789',
    name: 'Telomere Support Complex',
    brand: 'CellularYouth',
    manufacturer: 'AntiAge Dynamics Ltd.',
    manufacturerCountry: 'United Kingdom',
    status: 'NOT_APPROVED',
    evidenceLevel: 'NONE',
    category: 'SUPPLEMENT',
    description: 'A supplement containing various antioxidants marketed to support telomere length and cellular aging.',
    activeIngredients: [
      {
        name: 'TA-65 (Cyclastris)',
        concentration: '10mg per capsule',
        description: 'A patented astragalus extract claimed to activate telomerase.',
        sideEffects: ['Mild digestive issues', 'Skin changes'],
        interactions: ['Immune-stimulating supplements', 'Cancer treatments']
      },
      {
        name: 'Vitamin D3',
        concentration: '2000 IU per capsule',
        description: 'Essential vitamin important for overall health.',
        sideEffects: ['Rare at normal doses', 'Toxicity at very high doses'],
        interactions: ['Steroids', 'Weight loss drugs', 'Calcium supplements']
      },
      {
        name: 'Ashwagandha Extract',
        concentration: '300mg per capsule',
        description: 'An adaptogenic herb used in traditional medicine.',
        sideEffects: ['Stomach upset', 'Drowsiness', 'Diarrhea'],
        interactions: ['Sedatives', 'Thyroid medications', 'Immunosuppressants']
      }
    ],
    claims: [
      {
        marketingClaim: 'Lengthens telomeres by 50%',
        scientificVerdict: 'FALSE - Exaggerated and misleading.',
        verdictType: 'FALSE',
        explanation: 'No supplement has been proven to lengthen telomeres by 50%. Telomere length is influenced by many factors and current research does not support such dramatic claims.'
      },
      {
        marketingClaim: 'Reverses cellular aging',
        scientificVerdict: 'FALSE - Scientifically unsupported.',
        verdictType: 'FALSE',
        explanation: 'The claim that a supplement can "reverse cellular aging" is scientifically unfounded. Cellular aging involves complex processes that cannot be simply reversed.'
      },
      {
        marketingClaim: 'Scientifically proven to support telomere health',
        scientificVerdict: 'MISLEADING - Limited evidence for specific products.',
        verdictType: 'MISLEADING',
        explanation: 'While some ingredients like TA-65 have been studied for telomere-related effects, the specific product claims are not fully supported by independent research.'
      }
    ],
    redFlags: [
      {
        type: 'EXAGGERATED_CLAIM',
        description: 'Telomere lengthening claims are vastly overstated and not supported by scientific evidence.',
        severity: 'HIGH'
      },
      {
        type: 'UNREALISTIC_PROMISE',
        description: '"Reverses cellular aging" is a scientifically impossible claim.',
        severity: 'HIGH'
      }
    ],
    safetyAlerts: [],
    warnings: [
      'Be wary of products making telomere-related claims.',
      'Consult oncologist before use if you have a history of cancer.',
      'Telomere testing is not standardized - be cautious of products promising specific results.'
    ],
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-28T11:30:00Z'
  }
];

// Educational Articles Database
export const articles: Article[] = [
  {
    id: 'article_001',
    title: 'Understanding NMN and NAD+: The Science of Cellular Energy',
    summary: 'A deep dive into nicotinamide mononucleotide (NMN) and its role in cellular metabolism and aging.',
    content: `
# Understanding NMN and NAD+

## What Are NMN and NAD+?

Nicotinamide mononucleotide (NMN) is a molecule that plays a crucial role in cellular energy production. It serves as a direct precursor to nicotinamide adenine dinucleotide (NAD+), a coenzyme found in every cell of your body.

## Why NAD+ Matters for Aging

NAD+ is essential for:
- Cellular energy production (ATP synthesis)
- DNA repair mechanisms
- Sirtuin activation (proteins involved in aging)
- Mitochondrial function
- Immune cell regulation

## The NAD+ Decline Theory

One of the leading theories of aging suggests that NAD+ levels naturally decline as we age, dropping by up to 50% between ages 40 and 60. This decline is associated with:
- Reduced cellular energy
- Impaired DNA repair
- Mitochondrial dysfunction
- Increased inflammation

## What Does the Research Say?

### Animal Studies
Research in mice has shown that NMN supplementation can:
- Increase NAD+ levels
- Improve mitochondrial function
- Enhance insulin sensitivity
- Improve exercise capacity
- Potentially extend healthspan

### Human Studies
Human research is still emerging:
- Small studies show NMN can safely increase NAD+ levels in humans
- Some improvements in blood pressure and arterial stiffness observed
- Long-term effects require more research

## Important Considerations

1. **Not a Magic Bullet**: NMN supplementation is not a cure for aging
2. **Limited Long-Term Data**: We don't have decades of safety data
3. **Quality Varies**: Supplement quality and purity can vary significantly
4. **Consult Healthcare Providers**: Especially if taking medications

## The Verdict

NMN shows promise in preliminary research, but it's not a proven anti-aging solution. The science is still evolving, and consumers should be cautious of products making bold promises.
    `,
    category: 'SUPPLEMENT',
    evidenceLevel: 'MODERATE',
    readTime: 8,
    publishedAt: '2024-03-15',
    author: 'Dr. Sarah Chen, PhD',
    references: [
      {
        title: 'Nicotinamide mononucleotide supplementation improves physiological parameters of chronically cold-stressed mice',
        authors: 'Yi et al.',
        journal: 'Cell Metabolism',
        year: 2020
      },
      {
        title: 'Effect of oral nicotinamide mononucleotide on postprandial glucose kinetics in healthy young men',
        authors: 'Irie et al.',
        journal: 'Endocrine Journal',
        year: 2020
      }
    ],
    relatedProductIds: ['prod_001']
  },
  {
    id: 'article_002',
    title: 'Collagen Supplements: What the Science Actually Shows',
    summary: 'Separating fact from fiction about collagen supplementation for skin and joint health.',
    content: `
# Collagen Supplements: What the Science Actually Shows

## The Hype vs. Reality

Collagen supplements have become one of the most popular anti-aging products on the market. But what does science actually tell us?

## Understanding Collagen

Collagen is the most abundant protein in your body, providing structure to skin, bones, cartilage, and connective tissues. There are at least 16 types of collagen, but types I, II, and III are most relevant for supplements.

## How Collagen Supplements Work

When you ingest collagen peptides (broken-down collagen), they are:
1. Absorbed in the gut
2. Enter the bloodstream
3. Accumulate in skin and other tissues
4. May stimulate collagen synthesis

## What the Research Shows

### For Skin Health
- **Modest Benefits**: Studies show improvements in skin elasticity and hydration
- **Timeframe**: Typically 4-12 weeks to see results
- **Magnitude**: Improvements are generally modest, not dramatic
- **Best Results**: Combined with vitamin C and hyaluronic acid

### For Joint Health
- **More Promising**: Better evidence for osteoarthritis relief
- **Mechanism**: May reduce inflammation and support cartilage
- **Dose**: 10g daily appears effective

## What the Science Does NOT Show

❌ Collagen does NOT "erase wrinkles in 14 days"
❌ Results are NOT guaranteed or dramatic
❌ NOT a substitute for sunscreen or good skincare
❌ NOT proven to "turn back the clock"

## Types of Collagen

| Type | Source | Best For |
|------|--------|----------|
| Type I | Bovine, Fish | Skin, hair, nails |
| Type II | Chicken | Joint health |
| Type III | Bovine | Skin elasticity |
| Type I & III combo | Bovine | General beauty |

## Red Flags in Collagen Products

1. Unrealistic promises (e.g., "erase wrinkles in days")
2. No transparency about sourcing
3. Extremely low prices (may indicate poor quality)
4. "Proprietary blends" without ingredient details
5. Fake reviews and testimonials

## Quality Considerations

Look for:
- Third-party testing (NSF, USP, ConsumerLab)
- Transparent sourcing information
- Clinical studies cited (not just general research)
- Hydrolyzed collagen (better absorption)
- Added vitamin C (supports collagen synthesis)

## The Verdict

Collagen supplements may offer modest benefits for skin and joint health, but they are not a miracle solution. Be wary of products making exaggerated claims, and choose quality supplements from reputable manufacturers.
    `,
    category: 'SUPPLEMENT',
    evidenceLevel: 'MODERATE',
    readTime: 10,
    publishedAt: '2024-03-10',
    author: 'Dr. Michael Torres, MD',
    references: [
      {
        title: 'Collagen supplementation for skin health',
        authors: 'Bolke et al.',
        journal: 'Nutrients',
        year: 2019
      },
      {
        title: 'Effect of Collagen Peptide Supplementation on Knee Joint Discomfort',
        authors: 'Zdzieblik et al.',
        journal: 'Journal of the International Society of Sports Nutrition',
        year: 2017
      }
    ],
    relatedProductIds: ['prod_002']
  },
  {
    id: 'article_003',
    title: 'The Truth About Anti-Aging Supplements: Consumer Warning',
    summary: 'How to identify fake anti-aging products and protect yourself from deceptive marketing.',
    content: `
# The Truth About Anti-Aging Supplements: Consumer Warning

## The Problem

The anti-aging supplement market is estimated to be worth billions of dollars, but it's also rife with deceptive marketing, fake claims, and products that don't deliver.

## Common Red Flags

### 🚩 "Miracle" Claims
- "Reverse aging in 30 days"
- "Turn back the clock 20 years"
- "Cure aging forever"
- "100% effective"

These claims are scientifically impossible. Aging is a complex biological process that cannot be "cured" or dramatically reversed by any pill, cream, or supplement.

### 🚩 Fake Before/After Photos
- Too good to be true results
- Photos used across multiple products
- No original source or context
- Professional-looking but unrealistic

### 🚩 Celebrity Endorsements
- Fake celebrity endorsements are common
- "As seen on TV" doesn't mean proven
- Paid testimonials ≠ scientific evidence
- Verify any claimed endorsements

### 🚩 "Proprietary Blends"
- Hides actual ingredient amounts
- Prevents comparison shopping
- May contain minimal effective ingredients
- Lack of transparency is a warning sign

### 🚩 No Third-Party Testing
- No NSF, USP, or ConsumerLab certification
- Claims without supporting studies
- Manufacturer has no quality certifications
- "Clinical tested" without specifying by whom

## How to Protect Yourself

### 1. Research Before Buying
- Look up the product and manufacturer
- Check FDA warning letters
- Read independent reviews
- Consult healthcare providers

### 2. Check for Regulatory Status
- FDA-approved? (for drugs)
- Dietary supplement status? (not FDA approved)
- Any safety alerts or recalls?

### 3. Evaluate Claims Critically
- Does it sound too good to be true?
- Is there actual scientific evidence?
- Are claims specific or vague?
- What's the source of the information?

### 4. Verify the Manufacturer
- Can you find the company online?
- Is there contact information?
- Is the manufacturing country clear?
- Are they a legitimate business?

### 5. Report Suspicious Products
- FDA MedWatch program
- Federal Trade Commission (FTC)
- Better Business Bureau
- Your healthcare provider

## What Actually Works for Healthy Aging

While there's no "fountain of youth," these evidence-based strategies are proven to support healthy aging:

✓ Regular exercise
✓ Balanced diet rich in fruits and vegetables
✓ Quality sleep (7-9 hours)
✓ Stress management
✓ Social connections
✓ No smoking
✓ Limited alcohol
✓ Regular health screenings
✓ Mental stimulation

## Final Warning

If a product claims to "reverse aging," "cure aging," or promises dramatic results in a short time, it's almost certainly making false claims. Protect your health and your wallet by being an informed consumer.

Remember: When it comes to anti-aging, there are no miracles—just science, consistency, and realistic expectations.
    `,
    category: 'GENERAL',
    evidenceLevel: 'HIGH',
    readTime: 12,
    publishedAt: '2024-03-20',
    author: 'Consumer Safety Alliance',
    references: [
      {
        title: 'FDA Warning Letters to Companies Making Anti-Aging Claims',
        authors: 'U.S. Food and Drug Administration',
        journal: 'FDA.gov',
        year: 2023
      }
    ],
    relatedProductIds: ['prod_004', 'prod_008']
  },
  {
    id: 'article_004',
    title: 'Metformin and Aging: What You Need to Know',
    summary: 'Exploring the potential of metformin as an anti-aging medication and the ongoing TAME trial.',
    content: `
# Metformin and Aging: What You Need to Know

## What Is Metformin?

Metformin is a medication that has been used for over 60 years to treat type 2 diabetes. It works by:
- Reducing glucose production in the liver
- Improving insulin sensitivity
- Decreasing intestinal glucose absorption

## Why Are People Talking About It for Anti-Aging?

Researchers became interested in metformin for aging after observing that diabetic patients taking the drug had lower rates of:
- Cardiovascular disease
- Cancer
- Cognitive decline
- Overall mortality

## The Science Behind the Hype

### Observational Studies
- Type 2 diabetes patients on metformin showed:
  - 30% lower risk of cancer
  - Reduced cardiovascular events
  - Lower rates of cognitive decline
  - Decreased all-cause mortality

### Proposed Mechanisms
Scientists believe metformin may:
1. **Activate AMPK**: A cellular energy sensor that promotes longevity
2. **Reduce Inflammation**: Chronic inflammation is linked to aging
3. **Improve Mitochondrial Function**: Enhances cellular energy production
4. **Decrease Oxidative Stress**: Reduces cellular damage
5. **Alter Gut Microbiome**: May confer health benefits

## The TAME Trial

### What Is TAME?
TAME stands for "Targeting Aging with Metformin." It's the first clinical trial specifically designed to test whether a drug can delay aging in humans.

### Study Design
- 6-year study
- Over 3,000 participants aged 65-79
- Focus on whether metformin can prevent or delay age-related diseases

### Current Status
The TAME trial is ongoing. Results are expected in the coming years.

## Important Caveats

⚠️ **NOT FDA-APPROVED FOR ANTI-AGING**
Metformin is approved ONLY for type 2 diabetes. Using it for anti-aging is:
- Not officially studied or approved
- Considered "off-label" use
- Requires medical supervision

⚠️ **Not for Everyone**
Metformin can cause:
- Digestive issues (nausea, diarrhea)
- Vitamin B12 deficiency
- Rare but serious: lactic acidosis
- Interactions with many medications

⚠️ **Self-Medication Dangers**
Taking metformin without medical supervision can be dangerous, especially if you:
- Have kidney problems
- Have liver disease
- Consume excessive alcohol
- Are taking other medications

## Who Should Consider Metformin for Anti-Aging?

Currently, the answer is: **Wait for more research.**

### Potential Candidates (under medical supervision):
- Individuals with prediabetes or metabolic syndrome
- Those at high risk for age-related diseases
- Patients already on metformin for diabetes

### NOT Candidates:
- Healthy individuals seeking "anti-aging" benefits
- People without metabolic risk factors
- Those with kidney or liver problems

## The Verdict on Metformin for Anti-Aging

**The science is promising but not yet conclusive.**

### What We Know:
✓ Metformin is safe for most people when prescribed
✓ Observational studies show interesting associations
✓ The TAME trial may provide definitive answers
✓ Mechanisms of action are biologically plausible

### What We Don't Know:
✗ Whether it actually extends human lifespan
✗ Optimal dosing for anti-aging
✗ Long-term effects in healthy individuals
✗ Who would benefit most

## Bottom Line

Until the TAME trial results are available, metformin should be:
- Used ONLY under medical supervision
- Prescribed for its approved indications (diabetes)
- Not used as an "anti-aging supplement"

If you're interested in metformin for healthy aging, talk to your healthcare provider about whether it might be appropriate for you, especially if you have metabolic risk factors.
    `,
    category: 'SUPPLEMENT',
    evidenceLevel: 'HIGH',
    readTime: 15,
    publishedAt: '2024-03-25',
    author: 'Dr. Emily Watson, Geriatric Specialist',
    references: [
      {
        title: 'Metformin as a Target for Anti-Aaging Therapy',
        authors: 'Barzilai et al.',
        journal: 'Cell Metabolism',
        year: 2016
      },
      {
        title: 'Metformin Effect on Non-Diabetic People with Cancer',
        authors: 'Dizon et al.',
        journal: 'Clinical Cancer Research',
        year: 2019
      }
    ],
    relatedProductIds: ['prod_003']
  }
];

// Daily Insights Database
export const dailyInsights: DailyInsight[] = [
  {
    id: 'insight_001',
    title: 'The Truth About "Reverse Aging" Claims',
    content: 'No product or supplement can "reverse" aging. Aging is a complex biological process involving DNA damage, cellular senescence, and systemic changes. Be wary of any product making such claims.',
    category: 'RED_FLAG',
    date: '2024-03-28'
  },
  {
    id: 'insight_002',
    title: 'NMN vs NR: What\'s the Difference?',
    content: 'Both NMN and NR are NAD+ precursors, but they enter the NAD+ synthesis pathway at different points. NR is smaller and may be absorbed more efficiently, while NMN may have additional benefits. Research is ongoing.',
    category: 'EDUCATION',
    date: '2024-03-29'
  },
  {
    id: 'insight_003',
    title: 'Quality Matters for Supplements',
    content: 'Not all supplements are created equal. Look for third-party testing (NSF, USP, ConsumerLab) to ensure what\'s on the label is actually in the bottle.',
    category: 'CONSUMER_TIP',
    date: '2024-03-30'
  },
  {
    id: 'insight_004',
    title: 'Prescription vs. Over-the-Counter',
    content: 'Prescription medications like metformin and rapamycin are not interchangeable with supplements. Using prescription drugs without medical supervision can be dangerous.',
    category: 'SAFETY',
    date: '2024-03-31'
  },
  {
    id: 'insight_005',
    title: 'Collagen Absorption Reality',
    content: 'Collagen supplements are hydrolyzed (broken down) for better absorption, but not all collagen ends up in your skin. Some goes to other tissues. Results are typically modest and take weeks to months.',
    category: 'EDUCATION',
    date: '2024-04-01'
  }
];

// Sample Manufacturer Info
export const manufacturers: Record<string, ManufacturerInfo> = {
  'BioVital Sciences Inc.': {
    name: 'BioVital Sciences Inc.',
    registrationNumber: 'US-BIO-2021-8847',
    country: 'United States',
    address: '1234 Wellness Blvd, San Francisco, CA 94102',
    phone: '+1-415-555-0123',
    email: 'contact@biovitalsciences.com',
    website: 'https://www.biovitalsciences.com',
    verified: true,
    lastVerified: '2024-02-15'
  },
  'PureCollagen Laboratories': {
    name: 'PureCollagen Laboratories',
    registrationNumber: 'DE-PCL-2019-3321',
    country: 'Germany',
    address: 'Industriestraße 45, 80339 München',
    phone: '+49-89-555-7890',
    email: 'info@purecollagen-labs.eu',
    website: 'https://www.purecollagen-labs.eu',
    verified: true,
    lastVerified: '2024-03-01'
  },
  'Unknown Manufacturer': {
    name: 'Unknown',
    registrationNumber: 'UNKNOWN',
    country: 'Unknown',
    address: 'Unknown',
    phone: 'Unknown',
    email: 'Unknown',
    website: 'Unknown',
    verified: false,
    lastVerified: 'Unknown'
  }
};

// Data Service Class
class DataService {
  // Product Operations
  async getAllProducts(): Promise<Product[]> {
    await this.simulateDelay();
    return products;
  }

  async getProductById(id: string): Promise<Product | null> {
    await this.simulateDelay();
    return products.find(p => p.id === id) || null;
  }

  async getProductByBarcode(barcode: string): Promise<Product | null> {
    await this.simulateDelay();
    return products.find(p => p.barcode === barcode) || null;
  }

  async searchProducts(query: string): Promise<Product[]> {
    await this.simulateDelay();
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.manufacturer.toLowerCase().includes(lowerQuery) ||
      p.activeIngredients.some(i => i.name.toLowerCase().includes(lowerQuery))
    );
  }

  async getProductsByStatus(status: ApprovalStatus): Promise<Product[]> {
    await this.simulateDelay();
    return products.filter(p => p.status === status);
  }

  async getBannedProducts(): Promise<Product[]> {
    return this.getProductsByStatus('BANNED');
  }

  // Article Operations
  async getAllArticles(): Promise<Article[]> {
    await this.simulateDelay();
    return articles;
  }

  async getArticleById(id: string): Promise<Article | null> {
    await this.simulateDelay();
    return articles.find(a => a.id === id) || null;
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    await this.simulateDelay();
    return articles.filter(a => a.category === category);
  }

  // Insight Operations
  async getLatestInsight(): Promise<DailyInsight | null> {
    await this.simulateDelay();
    return dailyInsights[0] || null;
  }

  async getRecentAlerts(): Promise<Product[]> {
    await this.simulateDelay();
    return products.filter(p => p.status === 'BANNED' || p.safetyAlerts.length > 0);
  }

  // Manufacturer Operations
  async getManufacturerInfo(manufacturerName: string): Promise<ManufacturerInfo | null> {
    await this.simulateDelay();
    return manufacturers[manufacturerName] || null;
  }

  // Utility
  private simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 100));
  }
}

export const dataService = new DataService();
