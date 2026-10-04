# 👑 FM Marketing Agency - Fatima Melhem (وكالة فاطمة ملحم للتسويق)

An ultra-luxurious, bilingual (English & Arabic) boutique marketing and social media agency website crafted for **Fatima Melhem**.

![FM Marketing Logo](assets/images/logo.jpg)

## ✨ Key Features

1. **Luxury Aesthetic Design System**:
   - Deep Royal Burgundy (`#571325`), Champagne Gold (`#dfb76c`), and Pearl Ivory theme inspired by the brand logo.
   - Smooth glassmorphism, floating badges, and dynamic ambient background canvas particles.
   - Micro-animations, interactive 3D perspective cards, and scroll-reveal transitions.

2. **Full Bilingual Support (English / العربية)**:
   - Instant language switcher with persistence (`localStorage`).
   - Full RTL (Right-to-Left) typography support with Google Fonts (`Tajawal` & `Cairo` for Arabic, `Cinzel` & `Plus Jakarta Sans` for English).

3. **High-Converting Sections**:
   - **Hero Section**: High-impact headlines, live statistics pills, and dynamic CTAs.
   - **Metrics Counter Bar**: Animated counters showcasing impressions, campaigns, and ROI.
   - **About Fatima Melhem**: Agency manifesto, founder profile, and core philosophy pillars.
   - **Signature Services**: 6 comprehensive service modules with detailed deliverables.
   - **Portfolio & Case Studies**: Filterable project gallery (Beauty, Fashion, Hospitality) with interactive detailed popup modals.
   - **Interactive Growth & ROI Estimator**: Interactive calculator that estimates monthly impressions and recommended deliverables based on client goals and budget.
   - **Bespoke Packages**: 3 structured tiers (*Boutique Growth*, *Signature Prestige*, *Omnichannel Empire*).
   - **Client Testimonials & Press**: Social proof and ratings.
   - **Consultation Booking & WhatsApp Integration**: Interactive form that forwards directly to WhatsApp with pre-filled consultation details.

---

## 🚀 How to Deploy to GitHub Pages (Repository: `FM-site`)

### Step 1: Create the repository on GitHub
1. Go to [GitHub](https://github.com) and click **New Repository**.
2. Name the repository **`FM-site`**.
3. Choose **Public** and leave other options unchecked.
4. Click **Create repository**.

### Step 2: Push your local code to GitHub
Run the following commands in PowerShell from `c:\Users\HP\Desktop\FM-SITE`:

```powershell
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial release of FM Marketing luxury bilingual website"

# Rename branch to main
git branch -M main

# Link to your GitHub repository (replace YOUR_GITHUB_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/FM-site.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages in 1 Click
1. In your GitHub repository (`FM-site`), go to **Settings** > **Pages** (on the left menu).
2. Under **Build and deployment** > **Source**:
   - Select **GitHub Actions** (recommended - it uses the included automated workflow), **OR**
   - Select **Deploy from a branch** -> choose branch `main` -> folder `/ (root)` -> click **Save**.
3. Your website will be live in ~1-2 minutes at:
   `https://YOUR_GITHUB_USERNAME.github.io/FM-site/`

---

## ⚙️ Customization Guide

- **Change WhatsApp Number**:
  Open `index.html` and `js/main.js` and replace `96170000000` with Fatima's actual phone/WhatsApp number (with country code, e.g. `9617...`, `9715...`, `9665...`).
- **Change Email**:
  In `index.html` and `js/translations.js`, update `contact@fatimamelhem.com`.
- **Change Social Media Links**:
  In `index.html` (Footer section), update the `href` links for Instagram, TikTok, and LinkedIn.
