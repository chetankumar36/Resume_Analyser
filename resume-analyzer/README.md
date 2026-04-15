# ResumeX

**Speak the language recruiters understand.**

A premium, luxury SaaS web application that analyzes resumes against job descriptions with AI-powered insights. Designed to feel like a production-ready startup product with high-end UI/UX.

## Design Philosophy

ResumeX is built with a **minimalist, premium aesthetic** inspired by:
- **Zara** (clean, spacious layouts)
- **Apple** (premium typography, breathing room)
- **Stripe** (professional, trustworthy interface)

### Color System
- **Background**: `#0A0A0A` (pure black)
- **Text**: White / Slate-100 (soft gray)
- **Accent**: `#D4AF37` (subtle gold)
- **Borders**: `#262626` (minimal, refined)

### Typography
- **Font**: Inter (modern, professional)
- **Headings**: Bold, large, generous spacing
- **Spacing**: Generous margins and padding throughout

## Tech Stack

- **Frontend**: React 18.2 + Vite 5.0 + Tailwind CSS 3.4 + Heroicons
- **Backend**: Node.js + Express 4.18 (single-file API, CORS enabled)
- **Styling**: Custom Tailwind color tokens, glass-morphism effects, smooth animations

## Features

✨ **Premium UI/UX**
- Sticky navigation bar with smooth scrolling
- Glass-morphism cards and panels
- Smooth fade-in animations with stagger effects
- Elegant hover states (scale, lift, underline effects)
- Mobile-responsive hamburger menu with sidebar

🔐 **Authentication**
- Premium login modal with backdrop blur
- Demo mode (any email/password works)
- Account management section

📊 **Resume Analysis**
- Overall match score (0-100%)
- ATS compatibility score with thin progress bars
- Matched and missing keywords in monochrome tags
- Skill categorization (Technical, Soft Skills, Tools)
- Smart improvement suggestions with icon bullets
- Resume quality checker with visual checklist

👥 **Social Proof**
- Contributors section showcasing development team
- Premium card design with hover animations

🎨 **Design Components**
- Minimal card design with thin 1px borders
- Subtle shadows and blur effects
- Smooth scroll behavior site-wide
- Loading spinner during analysis
- Premium divider lines and spacing

## Getting Started

Open two terminals from the project root (`resume-analyzer`).

### 1. Backend (API)

```bash
cd server
npm install
npm run dev
```

The API will run on `http://localhost:5000` with a POST endpoint at `/analyze`.

### 2. Frontend (Client)

```bash
cd client
npm install
npm run dev
```

Then open the Vite URL shown in the terminal (typically `http://localhost:5173` or `http://localhost:5174`).

## Navigation Structure

### Premium Navigation Bar
- **Logo**: ResumeX branding
- **Menu Items**: Home, Analyzer, Features, Contributors
- **Account Button**: Opens premium login modal
- **Mobile**: Hamburger menu triggers smooth slide-in sidebar
- **Active Link Detection**: Smooth scrolling with visual underline indicators

### Page Sections (Smooth Scroll)
1. **Home** (`#home`) - Hero section with ResumeX tagline
2. **Analyzer** (`#analyzer`) - Resume input and analysis
3. **Features** (`#features`) - Six key capability highlights
4. **Contributors** (`#contributors`) - Meet the team with premium cards

## Premium Components

### Navbar
- Sticky positioning with glass-morphism effect
- Smooth scroll navigation to all sections
- Active link detection with 1px gold underline
- Mobile hamburger menu with smooth sidebar animation

### LoginModal
- Premium backdrop blur (`backdrop-blur-xl`)
- Email/password inputs with gold focus state
- Fade-in animation on open
- Demo mode (any email/password accepted)

### Contributors Section
- Two developer cards with professional descriptions
- Hover lift animation (`-translate-y-1`)
- Staggered fade-in effect (100ms between cards)
- Team branding footer

### Results Dashboard
- **Match Score**: Large, centered percentage
- **ATS Score**: Thin animated progress bar with status label
- **Keywords**: Monochrome tags with minimal borders
- **Skills**: Horizontal progress bars by category
- **Suggestions**: Bulleted list with icon indicators
- **Quality Check**: Visual checklist with icons

## API Contract

**Endpoint**: `POST /analyze`

**Body**:

```json
{
	"resumeText": "...",
	"jobDescription": "..."
}
```

**Response**:

```json
{
	"score": 82,
	"atsScore": 78,
	"matchedKeywords": ["react", "node", "api"],
	"missingKeywords": ["typescript"],
	"categorizedSkills": {
		"technical": { "matched": [], "missing": [], "matchPercentage": 0 },
		"soft": { "matched": [], "missing": [], "matchPercentage": 0 },
		"tools": { "matched": [], "missing": [], "matchPercentage": 0 }
	},
	"suggestions": ["..."],
	"resumeQuality": {
		"length": { "wordCount": 600, "assessment": "Balanced length for most roles" },
		"actionVerbs": { "present": true, "verbsFound": ["developed", "led"] },
		"metrics": { "hasMetrics": true },
		"overallTips": ["..."]
	}
}
```

## Design Highlights

### Animations
- **Fade-in**: Smooth 0.6s entrance with stagger delays for multiple elements
- **Hover Effects**: Scale (1.05), lift (-translate-y-1), underline indicators
- **Smooth Scroll**: Native HTML scroll-behavior throughout
- **Loading State**: Spinner animation in analyze button

### Visual Elements
- **Glass Panels**: `backdrop-blur-xl` with transparency
- **Borders**: Thin 1px, sophisticated color (#262626)
- **Shadows**: Soft, minimal shadow effects
- **Spacing**: Generous padding and margins for breathing room

## Project Structure

```
resume-analyzer/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        (sticky nav with smooth scroll)
│   │   │   ├── Sidebar.jsx       (mobile menu)
│   │   │   ├── LoginModal.jsx    (premium auth modal)
│   │   │   ├── InputForm.jsx     (minimal resume input)
│   │   │   ├── Result.jsx        (monochrome results dashboard)
│   │   │   └── Contributors.jsx  (team showcase)
│   │   ├── App.jsx              (main component, routing)
│   │   ├── App.css              (custom animations)
│   │   ├── index.css            (Tailwind + global styles)
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.cjs
│   ├── vite.config.js
│   └── index.html
├── server/
│   ├── index.js                 (Express API with ATS logic)
│   └── package.json
└── README.md
```

## Development

### Tailwind Custom Tokens
```css
resumex-border: #262626
resumex-accent: #D4AF37
```

Used throughout components for consistent premium theming.

### Component Architecture
- **Functional components** with React hooks
- **Reusable** card and button components
- **Clean prop passing** for state management
- **Modular CSS** with Tailwind utility-first approach

## Premium Features (Current)

✅ Black/gold minimalist theme
✅ Sticky navbar with smooth scrolling
✅ Premium login modal
✅ Contributors showcase
✅ Glass-morphism UI elements
✅ Smooth animations and fade-in effects
✅ Monochrome results dashboard
✅ Mobile responsive sidebar
✅ Loading spinners
✅ Premium spacing and typography

## Future Enhancements

- Live backend authentication (JWT)
- User dashboard with saved analyses
- Export to PDF functionality
- Dark/light mode toggle
- Advanced analytics dashboard
- Premium subscription tiers

---

**ResumeX** — Built for professionals who want to speak the language recruiters understand.
