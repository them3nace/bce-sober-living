# BCE Sober Living Website - Deployment Guide

## 📋 Overview

This is a complete, professional website for BCE Sober Living, L.L.C featuring:
- ✨ Stunning animated intro page
- 🎨 Professional blue theme with gradients and animations
- 📱 Mobile-responsive design
- 🗂️ 7 content pages (Home, Mission, Founder, About, Updates, Comments, Contact)
- 💬 Live comment board with Cloudflare Workers + KV storage
- 📧 Contact form with backend storage
- 🔒 SSL-ready static site structure

## 📦 What's Included

```
bce_website/
├── index.html          # Animated intro/splash page
├── home.html           # Main homepage
├── mission.html        # Mission Statement page
├── founder.html        # BCE Founder page
├── about.html          # About BCE page
├── updates.html        # BCE Updates page
├── comments.html       # Comment Board page
├── contact.html        # Contact Us page
├── styles.css          # Complete CSS with animations
├── script.js           # JavaScript for interactivity
├── worker.js           # Cloudflare Worker for API
├── wrangler.toml       # Cloudflare configuration
└── README.md           # This file
```

## 🚀 Step-by-Step Deployment to Cloudflare Pages

### Step 1: Prepare Your Files

1. Download all the files from this project
2. Keep them in a folder called `bce_website`

### Step 2: Create a Cloudflare Account (if you don't have one)

1. Go to https://www.cloudflare.com/
2. Click "Sign Up" in the top right
3. Enter your email and create a password
4. Verify your email address

### Step 3: Add Your Domain to Cloudflare

1. Log in to your Cloudflare dashboard
2. Click "Add a Site" or "Add site" button
3. Enter your domain: `bcesoberliving.com`
4. Click "Add site"
5. Select the **FREE** plan
6. Cloudflare will scan your DNS records
7. Click "Continue"
8. Cloudflare will show you nameservers (they look like: `bob.ns.cloudflare.com`)
9. **Important**: Go to your domain registrar (where you bought bcesoberliving.com) and change the nameservers to the ones Cloudflare gave you
10. Wait for DNS to propagate (can take up to 24 hours, but usually 15 minutes)

### Step 4: Deploy Your Website to Cloudflare Pages

#### Option A: Using Git (Recommended)

1. Create a GitHub account if you don't have one (github.com)
2. Create a new repository called `bce-website`
3. Upload all your website files to this repository
4. In Cloudflare Dashboard:
   - Click "Workers & Pages" in the left sidebar
   - Click "Create application"
   - Click "Pages" tab
   - Click "Connect to Git"
   - Authorize Cloudflare to access GitHub
   - Select your `bce-website` repository
   - Click "Begin setup"
   - Build settings:
     - Framework preset: **None**
     - Build command: (leave empty)
     - Build output directory: `/`
   - Click "Save and Deploy"

#### Option B: Direct Upload (Easier for beginners)

1. In Cloudflare Dashboard:
   - Click "Workers & Pages" in the left sidebar
   - Click "Create application"
   - Click "Pages" tab
   - Click "Upload assets"
2. Give your project a name: `bce-sober-living`
3. Drag and drop your website folder OR click "Select from computer"
4. Select ALL the HTML, CSS, and JS files:
   - index.html
   - home.html
   - mission.html
   - founder.html
   - about.html
   - updates.html
   - comments.html
   - contact.html
   - styles.css
   - script.js
5. Click "Deploy site"
6. Wait for deployment to complete (usually 1-2 minutes)

### Step 5: Connect Your Custom Domain

1. After deployment, you'll see a URL like: `bce-sober-living.pages.dev`
2. Click "Custom domains" at the top
3. Click "Set up a custom domain"
4. Enter: `bcesoberliving.com`
5. Click "Continue"
6. Cloudflare will automatically configure DNS
7. Click "Activate domain"
8. Repeat for `www.bcesoberliving.com` if desired

🎉 **Your website is now live at https://bcesoberliving.com!**

## 🔧 Setting Up the Comment Board & Contact Form (Optional Advanced Feature)

The comment board and contact form require a Cloudflare Worker with KV storage.

### Step 1: Create KV Namespaces

1. In Cloudflare Dashboard, go to "Workers & Pages"
2. Click "KV" in the left sidebar
3. Click "Create a namespace"
4. Name it: `BCE_COMMENTS`
5. Click "Add"
6. Create another namespace: `BCE_CONTACTS`

### Step 2: Note Your Namespace IDs

1. Click on `BCE_COMMENTS`
2. Copy the "Namespace ID" (looks like: `a1b2c3d4e5f6...`)
3. Do the same for `BCE_CONTACTS`

### Step 3: Update wrangler.toml

1. Open `wrangler.toml` in a text editor
2. Replace `YOUR_COMMENTS_KV_NAMESPACE_ID` with the actual ID
3. Replace `YOUR_CONTACTS_KV_NAMESPACE_ID` with the actual ID
4. Save the file

### Step 4: Install Wrangler CLI (One-time setup)

Open Terminal (Mac) or Command Prompt (Windows):

```bash
npm install -g wrangler
```

If you don't have npm, install Node.js first from: https://nodejs.org/

### Step 5: Login to Cloudflare

```bash
wrangler login
```

This will open a browser window. Click "Allow" to authorize.

### Step 6: Deploy the Worker

Navigate to your website folder:

```bash
cd path/to/bce_website
wrangler deploy
```

### Step 7: Connect Worker to Your Site

1. Go to Cloudflare Dashboard > "Workers & Pages"
2. Click on your worker: `bce-sober-living-api`
3. Click "Settings" > "Triggers"
4. Click "Add route"
5. Enter route: `bcesoberliving.com/api/*`
6. Select your worker
7. Click "Add route"

✅ **Your comment board and contact form are now fully functional!**

## 📱 Features Overview

### Animated Intro Page (index.html)
- Displays "Brought to you by Edwards Co, Inc..."
- Shows company description with animations
- Auto-redirects to home page after 7 seconds
- Beautiful starfield background

### Navigation Menu
- Responsive hamburger menu on mobile
- Smooth animations on hover
- Active page highlighting
- Works on all pages

### Pages Included
1. **Home** - Hero section, features, image gallery
2. **Mission Statement** - Core values and commitments
3. **BCE Founder** - Leadership and vision
4. **About BCE** - Services, facilities, approach
5. **BCE Updates** - News and announcements
6. **Comment Board** - Community messages (with working backend)
7. **Contact Us** - Contact form (with working backend)

### Design Features
- Professional blue color scheme (#4da6ff primary)
- Gradient backgrounds
- Smooth animations and transitions
- Hover effects on cards and buttons
- Mobile-first responsive design
- SEO-optimized metadata
- Image placeholders ready for your photos

## 🖼️ Adding Your Own Images

To replace the image placeholders:

1. Prepare your images (recommended: JPG or PNG, under 1MB each)
2. Upload images to Cloudflare Pages:
   - In your Pages project, create an `images` folder
   - Upload your photos
3. Edit the HTML files:
   - Find the `<svg>` image placeholders
   - Replace with: `<img src="images/your-photo.jpg" alt="Description">`

Example:
```html
<!-- Replace this: -->
<svg width="100%" height="100%" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#1e3a5f"/>
    <text x="50%" y="50%" text-anchor="middle" fill="#4da6ff">Photo</text>
</svg>

<!-- With this: -->
<img src="images/facility-exterior.jpg" alt="BCE Sober Living Exterior" style="width: 100%; border-radius: 15px;">
```

## 🎨 Customizing Colors

To change the color scheme, edit `styles.css`:

```css
:root {
    --primary-blue: #4da6ff;     /* Main brand color */
    --dark-blue: #0a1f44;        /* Dark backgrounds */
    --medium-blue: #1e3a5f;      /* Medium backgrounds */
    --light-blue: #a8d5ff;       /* Light accents */
    --accent-blue: #2a5298;      /* Secondary accent */
}
```

## 📞 Support & Troubleshooting

### Common Issues:

**Website not showing after deployment:**
- Wait 5-10 minutes for DNS propagation
- Clear your browser cache (Ctrl+Shift+Delete)
- Try accessing in incognito/private mode

**Custom domain not working:**
- Make sure nameservers are changed at your domain registrar
- DNS can take up to 24 hours to propagate
- Check "DNS" tab in Cloudflare to verify records

**Comment board not working:**
- Make sure the Worker is deployed
- Verify KV namespaces are created and IDs are correct in wrangler.toml
- Check Worker route is: `yourdomain.com/api/*`

**Images not showing:**
- Make sure images are uploaded to the same folder as HTML files
- Check file names match exactly (case-sensitive)
- Verify image paths in HTML

## 🔐 Security Notes

- All forms include CORS protection
- KV storage is private and secure
- Contact form data is encrypted in transit (HTTPS)
- No sensitive data is stored in frontend code

## 📊 Analytics (Optional)

To add Cloudflare Web Analytics:
1. Go to "Analytics" > "Web Analytics" in Cloudflare
2. Click "Add a site"
3. Enter your domain
4. Copy the provided script
5. Add before `</head>` in all HTML files

## ✅ Launch Checklist

Before going live:
- [ ] Test all pages on desktop
- [ ] Test all pages on mobile
- [ ] Test contact form submission
- [ ] Test comment board posting
- [ ] Add your actual photos
- [ ] Update contact information (phone, email)
- [ ] Add actual address if desired
- [ ] Test all links in navigation
- [ ] Check spelling and grammar
- [ ] Verify SSL certificate is active (https://)

## 🎉 You're Done!

Your professional BCE Sober Living website is now live at:
**https://bcesoberliving.com**

The site features:
✅ Beautiful animated intro
✅ Professional design with blue theme
✅ 7 content-rich pages
✅ Mobile responsive
✅ Working comment board
✅ Working contact form
✅ SEO optimized
✅ Fast loading
✅ SSL secure

---

**Questions?** The Cloudflare documentation is excellent: https://developers.cloudflare.com/pages/

**Need help?** Cloudflare has a community forum: https://community.cloudflare.com/
