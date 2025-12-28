# Portfolio Audit Checklist

## Priority: HIGH (Implement First)

### UX - Information Hierarchy & Scannability
- [ ] **Hero Section**: Add Impact Proof Strip with 3-4 quantified wins below hero
- [ ] **Featured Projects**: Convert to case-study format (Problem → Role → Solution → Results)
- [ ] **Experience Section**: Make expandable with collapsed view (title + 1 impact line) and expanded view (bullets + metrics)
- [ ] **Projects Page**: Add filters (Type, Stack) and search functionality
- [ ] **CTA Placement**: Add sticky mini-CTA rail on desktop (Resume/GitHub/LinkedIn/Email)

### Content - Metric-Led Copy
- [ ] **Hero**: Current copy is generic - needs impact metrics
- [ ] **About Section**: Rewrite with outcome-focused bullets (pull from Journey metrics)
- [ ] **Experience Descriptions**: Already have metrics (25% performance, 40% load speed, 100+ bugs) - ensure visibility
- [ ] **Project Descriptions**: Add Problem/Solution/Results format
- [ ] **Stats**: "45% Improved User Experience" needs context - which project/feature?

### SEO
- [ ] **Metadata**: Update title/description in layout.tsx (currently generic)
- [ ] **OpenGraph**: Add og:image, og:title, og:description
- [ ] **Structured Data**: Add JSON-LD for Person, WebSite, CreativeWork/SoftwareApplication
- [ ] **Sitemap**: Create sitemap.xml
- [ ] **Robots.txt**: Create robots.txt
- [ ] **Canonical URLs**: Add canonical tags
- [ ] **Project Pages**: Add unique meta for each case study

## Priority: MEDIUM

### UI - Visual Refinement
- [ ] **Typography Scale**: Ensure consistent heading hierarchy
- [ ] **Spacing**: Review section padding/margins for better rhythm
- [ ] **Contrast**: Verify text contrast ratios (WCAG AA minimum)
- [ ] **Hover States**: Ensure all interactive elements have clear hover feedback
- [ ] **Focus States**: Add visible focus rings for keyboard navigation
- [ ] **Motion Restraint**: Respect prefers-reduced-motion (already implemented in some places)

### Performance
- [ ] **Images**: Verify all using next/image (some already are)
- [ ] **Font Loading**: Plus Jakarta Sans - ensure display: swap (already set)
- [ ] **Bundle Size**: Check for heavy libraries, optimize imports
- [ ] **Motion Performance**: Ensure Framer Motion animations are GPU-accelerated
- [ ] **Core Web Vitals**: Test LCP, FID, CLS

### Accessibility
- [ ] **Keyboard Navigation**: Test all interactive elements
- [ ] **Focus Management**: Ensure logical tab order
- [ ] **ARIA Labels**: Add labels to icon-only buttons
- [ ] **Alt Text**: Verify all images have descriptive alt text
- [ ] **Reduced Motion**: Test with prefers-reduced-motion enabled

## Priority: LOW (Nice to Have)

### Additional Features
- [ ] **Testimonials Section**: Add real quotes or TODO placeholders
- [ ] **NDA-Safe Template**: Create template for company projects without confidential info
- [ ] **Top 3 Projects Block**: Add "Start here" section
- [ ] **Related Projects**: Link related projects in case studies

## Current Strengths
✅ Dark minimal theme is consistent
✅ Framer Motion animations are smooth
✅ Responsive design works well
✅ Experience section has good metrics
✅ Projects have good visual presentation

## Critical Issues Found
1. **Missing SEO**: No sitemap, robots.txt, or structured data
2. **Generic Metadata**: Title/description too generic
3. **No Impact Strip**: Recruiters need quick proof of value
4. **Projects Lack Context**: No Problem/Solution/Results format
5. **Experience Hidden**: Metrics exist but need better presentation
6. **No Case Studies**: Projects page lacks detail pages

