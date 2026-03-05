# 🚀 How to Deploy Your Updated BCE Website to Cloudflare

## What's New in This Update

✅ William's professional photo added to Founder page
✅ Charles Edwards memorial photo added to About page
✅ Logo overlay on memorial photo
✅ Serenity Prayer added below memorial photo
✅ Larger animated logo on intro page (180px)
✅ Larger logos throughout site (75px)
✅ Enhanced logo animations

---

## Quick Deploy Guide

### Step 1: Go to Cloudflare Dashboard

1. Open your browser
2. Go to: https://dash.cloudflare.com
3. Log in to your account
4. Click on **"Workers & Pages"** in the left menu
5. Find and click on your project: **bce3**

---

### Step 2: Create New Deployment

1. Click **"Create deployment"** button
2. You'll see "Upload assets" section

---

### Step 3: Upload All Files

**IMPORTANT: You need to upload ALL files, not just changed ones**

**Files to upload:**

📄 **HTML Files (9 files):**
- index.html
- home.html
- mission.html
- founder.html ⭐ (updated with William's photo)
- about.html ⭐ (updated with memorial & Serenity Prayer)
- faq.html
- updates.html
- comments.html
- contact.html

📝 **Style & Script Files (2 files):**
- styles.css ⭐ (updated with new animations)
- script.js

📁 **Images Folder:**
- images/ (entire folder with 2 photos)
  - william-edwards.jpg ⭐ NEW!
  - charles-edwards-memorial.jpg ⭐ NEW!

**Optional Backend Files:**
- worker.js
- wrangler.toml

---

### Step 4: Drag and Drop

**Easy Method:**

1. Open your `bce_website` folder on your computer
2. Select ALL files and folders (Ctrl+A or Cmd+A)
3. Drag them to the Cloudflare upload area
4. OR click "Select from computer" and choose files

**Make sure to include:**
- ✅ All HTML files
- ✅ styles.css
- ✅ script.js
- ✅ The entire `images` folder with both photos

---

### Step 5: Deploy!

1. Click **"Deploy site"** or **"Save and Deploy"**
2. Cloudflare will process your files (30 seconds - 2 minutes)
3. You'll see a success message
4. Click **"Continue to project"**

---

### Step 6: Verify It's Live

1. Visit your website: https://bcesoberliving.com
2. Check these pages:
   - **Founder page** - Should show William's photo
   - **About page** - Should show Charles's memorial photo with logo overlay and Serenity Prayer
   - **Intro page** - Should have larger animated logo (180px)
   - **All pages** - Should have slightly larger navigation logo (75px)

---

## 📸 What You Should See

### Founder Page:
- William's professional photo at top
- Blue border around photo
- Nice shadow effect
- Photo appears with fade-in animation

### About Page:
- Charles Edwards memorial photo in the middle of content
- BCE III logo overlaid in center of photo
- Serenity Prayer in a blue box below the photo
- "In loving memory of Charles Edwards 1987-2019" at bottom

### Intro Page:
- Much larger logo (180px instead of 120px)
- Enhanced glow effect
- Bouncy entrance animation
- Continuous pulse animation

### All Pages:
- Navigation logo slightly larger (75px instead of 60px)
- Same spray-paint animation
- More presence/visibility

---

## 🔄 If You Need to Make Changes Later

### To Change Text:
1. Download files from Cloudflare (or keep local copy)
2. Edit HTML files in text editor
3. Re-upload changed files
4. Deploy

### To Change Photos:
1. Replace image files in `images` folder
2. Make sure filenames match exactly:
   - `william-edwards.jpg`
   - `charles-edwards-memorial.jpg`
3. Re-upload entire `images` folder
4. Deploy

---

## 🆘 Troubleshooting

### Photos Not Showing?

**Check:**
1. Did you upload the `images` folder?
2. Are photo filenames exactly:
   - `william-edwards.jpg`
   - `charles-edwards-memorial.jpg`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Wait 2-3 minutes for Cloudflare cache

### Logo Still Small?

**Check:**
1. Did you upload the updated HTML files?
2. Did you upload styles.css?
3. Clear browser cache
4. Hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Memorial Photo Not Showing Logo Overlay?

**Check:**
1. Did you upload the updated about.html?
2. Clear browser cache
3. View page source - should see SVG code

---

## ✅ Deployment Checklist

Before deploying:
- [ ] Extracted bce_fullsite.zip
- [ ] Verified `images` folder exists with 2 photos
- [ ] Checked photo filenames are correct
- [ ] Have all HTML files ready
- [ ] Have styles.css and script.js ready

During deployment:
- [ ] Logged into Cloudflare
- [ ] Clicked on Workers & Pages
- [ ] Found bce3 project
- [ ] Clicked "Create deployment"
- [ ] Uploaded ALL files including images folder
- [ ] Clicked "Deploy site"

After deployment:
- [ ] Visited https://bcesoberliving.com
- [ ] Checked Founder page for William's photo
- [ ] Checked About page for memorial and prayer
- [ ] Checked intro page for larger logo
- [ ] Verified all pages load correctly
- [ ] Tested on mobile device

---

## 🎯 Expected Results

After deployment, your website will:

✅ Honor Charles Edwards with a beautiful memorial
✅ Show William's professional photo on Founder page
✅ Display the Serenity Prayer prominently
✅ Have a more prominent, larger logo throughout
✅ Maintain all previous functionality
✅ Load fast with Cloudflare CDN
✅ Work perfectly on mobile

---

## 💡 Pro Tips

1. **Keep a local backup** - Always keep the bce_website folder on your computer
2. **Test locally first** - Open HTML files in your browser before uploading
3. **Clear cache** - Always clear browser cache after deploying changes
4. **Mobile test** - Check on phone after deploying
5. **Take notes** - Write down what you changed for future reference

---

## 📞 Support

**If you have issues:**

1. Check Cloudflare deployment logs
2. Verify all files uploaded successfully
3. Clear browser cache completely
4. Wait 5 minutes for cache to clear
5. Contact Cloudflare Support (free, 24/7)

---

## 🎉 You're Ready!

Your updated BCE Sober Living website is ready to deploy with:
- William's photo
- Charles Edwards memorial
- Serenity Prayer
- Enhanced logo presence

**This update makes your website even more personal and meaningful.** 💙

Deploy now and honor Charles's memory while showing William's commitment to helping others!
