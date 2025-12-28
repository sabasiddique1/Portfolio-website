# Implementation Plan & Progress

## ✅ COMPLETED

### 1. Impact Proof Strip
- ✅ Created `components/impact-proof-strip.tsx`
- ✅ Added to homepage after hero section
- ✅ Shows 4 quantified wins: 40% Load Speed, 100+ Bugs Resolved, 25% Performance, 30% Faster Delivery

### 2. SEO Foundation
- ✅ Updated metadata in `app/layout.tsx` with comprehensive SEO
- ✅ Added OpenGraph tags
- ✅ Added Twitter card metadata
- ✅ Created `app/sitemap.ts` (auto-generated)
- ✅ Created `app/robots.ts` (auto-generated)
- ✅ Created `components/structured-data.tsx` with JSON-LD for Person, WebSite, and CreativeWork

## 🚧 IN PROGRESS / TODO

### 3. Case Study Pages (`/projects/[slug]`)
**Status**: Need to create
**Files to create**:
- `app/projects/[slug]/page.tsx` - Dynamic case study page
- Update `constants/projects.ts` to include: problem, role, solution, results (metrics), tech stack

**Template structure**:
```
- Hero: Project title, category, featured image
- Problem: What challenge was solved
- Role: Your specific contributions
- Solution: How you solved it
- Results: Quantified metrics (if available)
- Tech Stack: Technologies used
- Links: GitHub, Demo, Related projects
```

### 4. Featured Projects Upgrade
**Status**: Need to update
**File**: `components/featured-projects-section.tsx`
**Changes needed**:
- Add Problem/Role/Solution/Results format
- Link to case study pages
- Add "Top 3 Projects" callout

### 5. Experience Section Accordion
**Status**: Need to create
**File**: `components/experience-section-minimal.tsx`
**Changes needed**:
- Make items expandable (use Accordion from shadcn/ui)
- Collapsed: Title, Company, Dates, 1 impact line
- Expanded: Full description, ownership bullets, key wins, tech chips, related project links

### 6. Projects Page Filters
**Status**: Need to create
**File**: `app/projects/page.tsx`
**Features to add**:
- Filter by type: Personal/Company/Collaborative
- Filter by tech stack (chips)
- Sort: Most impactful, Most recent
- Search box

### 7. Sticky CTA Rail
**Status**: Need to create
**File**: `components/sticky-cta-rail.tsx`
**Features**:
- Desktop only (hidden on mobile)
- Fixed position (right side or bottom)
- Icons: Resume, GitHub, LinkedIn, Email
- Minimal design matching theme

### 8. Testimonials Section
**Status**: Need to create
**File**: `components/testimonials-section.tsx`
**Features**:
- Support real quotes or TODO placeholders
- 2-3 testimonials max
- Name, role, company, quote
- Optional: Photo

### 9. Performance Optimizations
**Status**: Partial
**Checklist**:
- ✅ Font loading (display: swap already set)
- ⚠️ Images: Some using next/image, verify all
- ⚠️ Bundle size: Check for heavy libraries
- ⚠️ Motion: Ensure GPU acceleration
- ⚠️ Core Web Vitals: Test LCP, FID, CLS

### 10. Accessibility Improvements
**Status**: Need to audit
**Checklist**:
- ⚠️ Keyboard navigation: Test all interactive elements
- ⚠️ Focus rings: Add visible focus states
- ⚠️ ARIA labels: Add to icon-only buttons
- ⚠️ Alt text: Verify all images
- ✅ Reduced motion: Already implemented in some places

## 📋 NEXT STEPS (Priority Order)

1. **Create case study pages** - High impact for recruiter conversion
2. **Upgrade Featured Projects** - Better storytelling
3. **Experience accordion** - Better information hierarchy
4. **Projects filters** - Better UX for browsing
5. **Sticky CTA** - Reduce friction for contact
6. **Testimonials** - Social proof
7. **Performance audit** - Run Lighthouse
8. **Accessibility audit** - Test with screen reader

## 📝 NOTES

- All TODO markers are marked with `// TODO:` comments
- Domain placeholders: Replace `https://your-portfolio-domain.com` with actual domain
- LinkedIn/Twitter: Add actual URLs where marked
- OG Image: Create 1200x630px image at `/public/og-image.png`
- Metrics: Some are placeholders - verify with actual data from Journey page

## 🎯 Recruiter Flow (First 10 Seconds)

**Current Flow**:
1. Hero: "Hey! I'm Sabaa" + tagline
2. Impact Strip: 4 quantified wins (NEW)
3. Skills ticker: Quick tech overview
4. Featured Projects: Visual showcase

**Ideal Next Clicks**:
- "View Resume" (sticky CTA)
- Featured project → Case study
- "Connect with Me" button

**Improvements Needed**:
- Impact metrics more visible
- Case studies provide depth
- Sticky CTA reduces friction

