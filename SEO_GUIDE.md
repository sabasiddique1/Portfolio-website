# SEO Guide: How to Rank Your Portfolio on Google

## 🎯 Goal: Get Your Portfolio to Appear at Top of Google Search

### Step 1: Domain & Hosting Setup

1. **Get a Custom Domain**
   - Purchase from: Namecheap, Google Domains, or Cloudflare
   - Examples: `sabasiddique.dev`, `sabasiddique.com`, `saba.dev`
   - Cost: ~$10-15/year

2. **Deploy to Production**
   - **Vercel** (Recommended for Next.js):
     - Connect GitHub repo
     - Add custom domain
     - Automatic SSL/HTTPS
   - **Netlify** or **Cloudflare Pages** (alternatives)

### Step 2: Update Domain in Code

Replace `https://your-portfolio-domain.com` with your actual domain in:
- `app/layout.tsx` (metadata.openGraph.url)
- `app/sitemap.ts` (baseUrl)
- `app/robots.ts` (baseUrl)
- `components/structured-data.tsx` (baseUrl)
- `app/projects/[slug]/page.tsx` (baseUrl)

### Step 3: Essential SEO Setup

#### ✅ Already Implemented:
- ✅ Comprehensive metadata
- ✅ OpenGraph tags
- ✅ Twitter Cards
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt

#### ⚠️ Still Need to Do:

1. **Create OG Image**
   - Create `/public/og-image.png` (1200x630px)
   - Include: Your name, title, key skills, portfolio URL
   - Use design tools: Figma, Canva, or Photoshop

2. **Add Social Links**
   - LinkedIn URL in `components/sticky-cta-rail.tsx`
   - LinkedIn URL in `components/structured-data.tsx`
   - Twitter handle in `app/layout.tsx`

### Step 4: Submit to Search Engines

#### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (your domain)
3. Verify ownership (DNS record or HTML file)
4. Submit sitemap: `https://your-domain.com/sitemap.xml`
5. Request indexing for homepage

#### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap

### Step 5: Content Optimization

#### Keywords to Target
- "Sabaa Siddique portfolio"
- "Sabaa Siddique developer"
- "Front-end developer portfolio"
- "React developer portfolio"
- "Next.js developer"
- "UI/UX designer portfolio"

#### Where to Use Keywords:
1. **Page Title**: Already optimized ✅
2. **Meta Description**: Already optimized ✅
3. **Headings**: Use keywords naturally in h1, h2
4. **Content**: Mention skills naturally in descriptions
5. **Alt Text**: Use keywords in image alt attributes

### Step 6: Build Backlinks

#### Free Methods:
1. **GitHub Profile**
   - Add portfolio link to GitHub profile README
   - Pin portfolio repository

2. **LinkedIn**
   - Add portfolio URL to LinkedIn profile
   - Share portfolio in posts
   - Add to "Featured" section

3. **Twitter/X**
   - Add portfolio to bio
   - Share portfolio updates

4. **Dev Communities**
   - Dev.to profile
   - Hashnode profile
   - Medium profile
   - All link back to portfolio

5. **Online Resumes**
   - Indeed profile
   - AngelList profile
   - Wellfound profile

### Step 7: Performance Optimization

#### Already Good:
- ✅ Next.js (fast by default)
- ✅ Image optimization (next/image)
- ✅ Font optimization (display: swap)

#### Check & Improve:
```bash
# Run Lighthouse audit
npm run build
npm run start
# Then test at: http://localhost:3000
```

**Target Scores:**
- Performance: 90+
- SEO: 95+
- Accessibility: 90+
- Best Practices: 90+

### Step 8: Local SEO (Optional)

If targeting local jobs:
1. Add location to structured data
2. Create location-specific content
3. Add to Google Business Profile (if applicable)

### Step 9: Monitor & Improve

#### Tools to Use:
1. **Google Search Console**
   - Monitor search performance
   - See which keywords bring traffic
   - Fix any errors

2. **Google Analytics**
   - Track visitors
   - See traffic sources
   - Monitor user behavior

3. **Lighthouse**
   - Regular performance audits
   - Fix issues as they arise

### Step 10: Content Strategy

#### Blog Posts (Optional but Powerful):
Create `/blog` section with posts like:
- "How I Built My Portfolio with Next.js"
- "Front-End Development Best Practices"
- "React Performance Optimization Tips"
- "My Journey as a Front-End Developer"

**Why This Helps:**
- More indexed pages = more search opportunities
- Establishes expertise
- Natural keyword usage

### Quick Wins Checklist

- [ ] Get custom domain
- [ ] Deploy to Vercel/Netlify
- [ ] Update all domain placeholders in code
- [ ] Create og-image.png
- [ ] Add LinkedIn/Twitter URLs
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Add portfolio link to GitHub profile
- [ ] Add portfolio link to LinkedIn profile
- [ ] Run Lighthouse audit
- [ ] Fix any performance issues

### Expected Timeline

**Week 1-2:**
- Domain setup
- Deployment
- Search Console submission

**Week 3-4:**
- Google starts indexing
- First impressions in search

**Month 2-3:**
- Better rankings for your name
- Portfolio appears in search results

**Month 4-6:**
- Top results for "Your Name + portfolio"
- Better rankings for skill-based searches

### Pro Tips

1. **Consistency**: Use same name/format everywhere
2. **Fresh Content**: Update portfolio regularly
3. **Social Signals**: Share on social media
4. **Mobile-First**: Ensure mobile experience is perfect
5. **Speed**: Fast sites rank higher
6. **HTTPS**: Already handled by Vercel ✅

### Common Mistakes to Avoid

❌ Don't keyword stuff
❌ Don't buy backlinks
❌ Don't use black hat SEO
❌ Don't ignore mobile users
❌ Don't forget alt text on images

### Measuring Success

**Key Metrics:**
- Search Console impressions
- Click-through rate (CTR)
- Average position
- Organic traffic
- Time to first ranking

**Tools:**
- Google Search Console (free)
- Google Analytics (free)
- Ahrefs (paid, but powerful)

---

## 🚀 Quick Start (Next 30 Minutes)

1. **Purchase Domain** (10 min)
   - Go to Namecheap or Cloudflare
   - Search for available domain
   - Purchase

2. **Deploy to Vercel** (10 min)
   - Push code to GitHub
   - Import to Vercel
   - Add custom domain
   - Update DNS settings

3. **Update Code** (10 min)
   - Replace domain placeholders
   - Create og-image.png
   - Add social links

4. **Submit to Search Engines** (10 min)
   - Google Search Console
   - Bing Webmaster Tools
   - Submit sitemap

**Total Time: ~40 minutes**

After this, Google will start indexing your site. Rankings improve over 2-6 months with consistent content and backlinks.

