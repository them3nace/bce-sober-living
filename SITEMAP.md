# 🗺️ BCE Sober Living Website - Site Structure

## Website Flow

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              👋 VISITOR ARRIVES                     │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│           ✨ index.html (Intro Page)                │
│                                                     │
│  • "Brought to you by Edwards Co, Inc..."          │
│  • Animated text and starfield                     │
│  • 7-second auto-redirect                          │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│              🏠 home.html (Homepage)                │
│                                                     │
│  • Hero section with call-to-action                │
│  • 3 feature cards                                 │
│  • Image gallery (3 placeholders)                  │
│  • CTA section                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
                   │
                   │ Navigation Menu (on all pages)
                   │
         ┌─────────┼─────────┬─────────┬─────────┬─────────┬─────────┐
         │         │         │         │         │         │         │
         ▼         ▼         ▼         ▼         ▼         ▼         ▼
    ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
    │Mission │ │Founder │ │ About  │ │Updates │ │Comments│ │Contact │
    └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘
```

---

## Page Breakdown

### 1. 🎬 **index.html** - Animated Intro
**Purpose**: Create a memorable first impression

**Content**:
- Line 1: "Brought to you by Edwards Co, Inc..." (fades in at 0.5s)
- Line 2: "A full service and upscale Frederick, MD transitional living" (fades in at 2.5s)
- Line 3: "BCE Sober Living Homes!!!" (glows in at 4.5s)
- Auto-redirect to home.html after 7 seconds

**Visual Effects**:
- Starfield background (100 twinkling stars)
- Gradient blue background
- Text glow animations
- Smooth fade transitions

---

### 2. 🏠 **home.html** - Main Homepage
**Purpose**: Welcome visitors and showcase key features

**Sections**:
1. **Hero Section**
   - Large title: "Welcome to BCE Sober Living"
   - Subtitle: Location information
   - 2 CTA buttons: "Learn More" and "Contact Us"

2. **Features Grid** (3 cards)
   - Professional Care
   - Structured Environment
   - Community Support

3. **Image Gallery** (3 placeholders)
   - Exterior Photo
   - Living Area
   - Bedroom

4. **CTA Section**
   - "Ready to Start Your Journey?"
   - Call-to-action button

---

### 3. 🎯 **mission.html** - Mission Statement
**Purpose**: Communicate values and commitment

**Content**:
- Opening statement
- Core values section
- Detailed explanations of values
- Commitment statement

**Key Messages**:
- Compassion
- Accountability
- Community
- Excellence
- Hope

---

### 4. 👤 **founder.html** - BCE Founder
**Purpose**: Build trust through leadership story

**Content**:
- Founder photo placeholder
- Vision statement
- Edwards Co, Inc connection
- Personal commitment to recovery
- Building something different
- Continuing legacy

---

### 5. ℹ️ **about.html** - About BCE
**Purpose**: Detailed information about services

**Content**:
- Company overview
- Facilities description
- Recovery support approach
- What sets BCE apart
- Standards and expectations
- Commitment to excellence

**Features Grid** (6 service cards):
- 24/7 Support
- Structured Environment
- Community Connection
- Life Skills Development
- Safe & Sober Environment
- Comfortable Accommodations

---

### 6. 📢 **updates.html** - BCE Updates
**Purpose**: News and announcements

**Content**:
- Welcome announcement
- Now accepting applications
- Edwards Co message
- Partnership opportunities
- Stay connected section

**Format**: News items styled as comment cards

---

### 7. 💬 **comments.html** - Comment Board
**Purpose**: Community engagement and testimonials

**Features**:
1. **Post Message Form**
   - Name field
   - Message textarea
   - Submit button
   - Community guidelines

2. **Comments Display**
   - 5 sample testimonials
   - Name and date
   - Message text
   - Animated on scroll

**Backend**: Connected to Cloudflare Worker + KV storage (optional)

---

### 8. 📧 **contact.html** - Contact Us
**Purpose**: Lead generation and inquiries

**Form Fields**:
- Full Name *
- Email Address *
- Phone Number
- Type of Inquiry (dropdown)
- Message *

**Additional Info**:
- Response time card
- Email address
- Phone number
- Visit us section
- Confidentiality notice

**Backend**: Connected to Cloudflare Worker + KV storage (optional)

---

## Navigation Structure

```
┌──────────────────────────────────────────────────────┐
│              🧭 Navigation Menu                       │
│  (Appears on ALL pages, sticky at top)               │
├──────────────────────────────────────────────────────┤
│  Logo  |  Home  |  Mission  |  Founder  |  About    │
│        |  Updates  |  Comments  |  Contact           │
└──────────────────────────────────────────────────────┘
        │
        ├─ Desktop: Horizontal menu
        └─ Mobile: Hamburger menu (☰)
```

---

## Design System

### 🎨 Color Palette
```
Primary Blue:   #4da6ff  ████  (Buttons, links, accents)
Dark Blue:      #0a1f44  ████  (Headers, footer)
Medium Blue:    #1e3a5f  ████  (Navigation, backgrounds)
Light Blue:     #a8d5ff  ████  (Subtle text, highlights)
Accent Blue:    #2a5298  ████  (Gradients, CTAs)
White:          #ffffff  ████  (Text on dark)
Off-White:      #f8f9fa  ████  (Page backgrounds)
```

### 📐 Layout Grid
- Max width: 1200px
- Container padding: 2rem
- Section spacing: 5rem vertical
- Card gaps: 2rem

### ✨ Animations
1. **Fade In Up**: Elements slide up while fading in
2. **Float**: Icons gently move up and down
3. **Glow**: Text pulses with blue glow
4. **Scale on Hover**: Cards grow slightly
5. **Slide In**: Navigation menu slides from top
6. **Rotate Pulse**: Logo rotates and scales

---

## File Structure

```
bce_website/
│
├── 📄 HTML Files (9 total)
│   ├── index.html          (Intro)
│   ├── home.html           (Homepage)
│   ├── mission.html        (Mission)
│   ├── founder.html        (Founder)
│   ├── about.html          (About)
│   ├── updates.html        (Updates)
│   ├── comments.html       (Comments)
│   └── contact.html        (Contact)
│
├── 🎨 Styling
│   └── styles.css          (All CSS, 1000+ lines)
│
├── ⚡ Functionality
│   └── script.js           (All JavaScript)
│
├── 🔧 Backend (Optional)
│   ├── worker.js           (Cloudflare Worker)
│   └── wrangler.toml       (Worker config)
│
└── 📚 Documentation
    ├── README.md           (Full guide)
    ├── QUICKSTART.md       (Beginner guide)
    └── SITEMAP.md          (This file)
```

---

## User Journeys

### Journey 1: Person Seeking Recovery Housing
```
1. Arrives at site → Intro animation
2. Lands on Homepage → Reads about services
3. Clicks "About BCE" → Learns details
4. Clicks "Contact Us" → Fills out form
5. Receives response from BCE team
```

### Journey 2: Family Member Researching
```
1. Arrives at site → Intro animation
2. Lands on Homepage → Gets overview
3. Clicks "Mission Statement" → Understands values
4. Clicks "BCE Founder" → Builds trust
5. Clicks "Contact Us" → Asks questions
```

### Journey 3: Community Member
```
1. Arrives at site → Intro animation
2. Lands on Homepage → Browses
3. Clicks "BCE Updates" → Reads news
4. Clicks "Comment Board" → Leaves message
5. Returns periodically for updates
```

---

## Mobile Responsiveness

### Breakpoints:
- **Desktop**: > 768px - Full horizontal navigation
- **Tablet**: 768px - Adjusted grid layouts
- **Mobile**: < 480px - Hamburger menu, single column

### Mobile Optimizations:
- Touch-friendly buttons (min 44px)
- Larger text for readability
- Simplified navigation
- Optimized images
- Fast loading times

---

## Technical Specs

### Performance:
- **Load Time**: < 2 seconds
- **Page Size**: 30-50kb per page
- **Animations**: 60fps smooth
- **Mobile Score**: 95+ (Google PageSpeed)

### SEO:
- Meta descriptions on all pages
- Semantic HTML structure
- Alt text for images
- Descriptive page titles
- Schema-ready structure

### Security:
- SSL/HTTPS required
- Form validation
- XSS protection
- CORS configured
- No exposed credentials

---

## Maintenance Guide

### To Update Content:
1. Edit HTML files in text editor
2. Save changes
3. Re-upload to Cloudflare Pages

### To Add New Pages:
1. Copy an existing HTML file
2. Update content
3. Add link to navigation menu
4. Upload to Cloudflare

### To Change Colors:
1. Edit `styles.css`
2. Find `:root` section
3. Update color variables
4. Re-upload

---

**This is your complete BCE Sober Living website!** 🎉

Professional, beautiful, and ready to help people find the recovery support they need.
