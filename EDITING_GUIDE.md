# ✏️ How to Edit Text and Add Pictures

## Complete Beginner-Friendly Guide

This guide shows you exactly how to update text and add photos to your BCE Sober Living website.

---

## 📝 Part 1: How to Edit Text

### **Method 1: Using a Text Editor (Easiest)**

**Step 1: Choose a Text Editor**

Pick one of these FREE editors:

**For Mac:**
- TextEdit (built-in)
- BBEdit (free download)
- Visual Studio Code (free, professional)

**For Windows:**
- Notepad (built-in, but basic)
- Notepad++ (free download, recommended)
- Visual Studio Code (free, professional)

**For Linux:**
- gedit (built-in)
- Visual Studio Code (free)

**Recommended:** Visual Studio Code (works on all systems)
- Download from: https://code.visualstudio.com
- Free, easy to use, color-codes HTML

---

### **Step 2: Open Your Website Files**

1. **Extract bce_fullsite.zip** if you haven't already
2. **Navigate to the folder** (probably called `bce_website`)
3. **Right-click on any HTML file** (like `home.html`)
4. **Choose "Open With"** → Select your text editor

---

### **Step 3: Find the Text You Want to Change**

**Example: Change the phone number**

1. Open `contact.html` in your text editor
2. Press `Ctrl+F` (Windows) or `Cmd+F` (Mac) to search
3. Type: `(424) 395-6144`
4. You'll see something like:

```html
<p>Call or text William at <strong>(424) 395-6144</strong></p>
```

5. Change the number between the tags:

```html
<p>Call or text William at <strong>(301) 555-1234</strong></p>
```

6. Save the file: `Ctrl+S` (Windows) or `Cmd+S` (Mac)

---

### **Step 4: Common Text Edits**

#### **Change Email Address:**

**File:** `contact.html`

**Find:**
```html
<p>Prefer email? Reach William directly at <strong>william@bcesoberliving.com</strong></p>
```

**Change to:**
```html
<p>Prefer email? Reach William directly at <strong>your-email@example.com</strong></p>
```

---

#### **Change Homepage Subtitle:**

**File:** `home.html`

**Find:**
```html
<p class="hero-subtitle animate-fade-in-delay">Named in honor of a brother lost...</p>
```

**Change the text between the tags:**
```html
<p class="hero-subtitle animate-fade-in-delay">Your new text here</p>
```

---

#### **Change Mission Statement:**

**File:** `mission.html`

**Find the paragraph you want to change, it will look like:**
```html
<p>At BCE Sober Living, our mission is...</p>
```

**Change the text between `<p>` and `</p>` tags**

---

#### **Change Founder Story:**

**File:** `founder.html`

**Find any paragraph and change the text:**
```html
<p>Five years ago, my brother passed away...</p>
```

**Change to your text:**
```html
<p>Your story here...</p>
```

---

### **Step 5: Save and Re-upload**

1. **Save your changes:** `Ctrl+S` or `Cmd+S`
2. **Go to Cloudflare Dashboard**
3. **Workers & Pages** → Click your project (`bce3`)
4. **Create a new deployment**
5. **Upload the files you changed**
6. **Wait 1-2 minutes**
7. **Visit your site** - changes should appear!

---

## 📸 Part 2: How to Add Pictures

### **Understanding Image Placeholders**

Your website currently has SVG placeholders (blue rectangles with text). We'll replace these with real photos.

---

### **Step 1: Prepare Your Photos**

**Get your photos ready:**
- Take photos of your facility
- Or get them from your phone/camera
- Save them on your computer

**Recommended photo sizes:**
- Exterior photo: 800x600 pixels
- Interior photos: 800x600 pixels
- Founder photo: 400x400 pixels (square)
- Keep file size under 500KB each for fast loading

**Name your photos clearly:**
- `exterior.jpg`
- `living-room.jpg`
- `bedroom.jpg`
- `william-photo.jpg`

---

### **Step 2: Optimize Your Photos (Optional but Recommended)**

**Make photos load faster by compressing them:**

**Free online tools:**
- https://tinypng.com (drag and drop, super easy)
- https://compressor.io
- https://imagecompressor.com

**Steps:**
1. Go to tinypng.com
2. Drag your photos
3. Download compressed versions
4. Use these for your website

---

### **Step 3: Upload Photos to Cloudflare Pages**

**Option A: Using Cloudflare Dashboard (Easier)**

1. **Go to Cloudflare Dashboard**
2. **Workers & Pages** → Click `bce3`
3. **Create a new deployment**
4. **Create a folder called `images`**
5. **Upload your photos into the `images` folder**

**Your folder structure should look like:**
```
bce_website/
├── home.html
├── styles.css
├── script.js
└── images/
    ├── exterior.jpg
    ├── living-room.jpg
    ├── bedroom.jpg
    └── william-photo.jpg
```

---

**Option B: Upload with Files (Recommended)**

1. **On your computer, in the `bce_website` folder:**
2. **Create a new folder called `images`**
3. **Copy your photos into this folder**
4. **Upload everything to Cloudflare Pages** (including the images folder)

---

### **Step 4: Replace Image Placeholders in HTML**

Now we'll change the SVG placeholders to show your real photos.

#### **Example 1: Replace Exterior Photo**

**File:** `home.html`

**Find this SVG placeholder:**
```html
<div class="image-placeholder">
    <svg width="100%" height="100%" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#1e3a5f"/>
        <text x="50%" y="50%" text-anchor="middle" fill="#4da6ff" font-size="20">Exterior Photo</text>
    </svg>
</div>
```

**Replace with:**
```html
<img src="images/exterior.jpg" alt="BCE Sober Living Exterior" style="width: 100%; border-radius: 15px;">
```

---

#### **Example 2: Replace Living Room Photo**

**Find:**
```html
<div class="image-placeholder">
    <svg width="100%" height="100%" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#1e3a5f"/>
        <text x="50%" y="50%" text-anchor="middle" fill="#4da6ff" font-size="20">Living Area</text>
    </svg>
</div>
```

**Replace with:**
```html
<img src="images/living-room.jpg" alt="Comfortable Living Area" style="width: 100%; border-radius: 15px;">
```

---

#### **Example 3: Replace Bedroom Photo**

**Find:**
```html
<div class="image-placeholder">
    <svg width="100%" height="100%" viewBox="0 0 400 300">
        <rect width="400" height="300" fill="#1e3a5f"/>
        <text x="50%" y="50%" text-anchor="middle" fill="#4da6ff" font-size="20">Bedroom</text>
    </svg>
</div>
```

**Replace with:**
```html
<img src="images/bedroom.jpg" alt="Private Bedroom" style="width: 100%; border-radius: 15px;">
```

---

#### **Example 4: Replace Founder Photo**

**File:** `founder.html`

**Find:**
```html
<div class="image-placeholder">
    <svg width="100%" height="100%" viewBox="0 0 400 400">
        <rect width="400" height="400" fill="#1e3a5f"/>
        <circle cx="200" cy="150" r="60" fill="#4da6ff" opacity="0.3"/>
        <path d="M200 220 L200 280 M170 250 L230 250 M180 290 L180 340 M220 290 L220 340" stroke="#4da6ff" stroke-width="8" opacity="0.3"/>
        <text x="50%" y="90%" text-anchor="middle" fill="#4da6ff" font-size="16">Founder Photo</text>
    </svg>
</div>
```

**Replace with:**
```html
<img src="images/william-photo.jpg" alt="William Edwards - Founder" style="width: 100%; max-width: 400px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
```

---

### **Step 5: Find ALL Image Placeholders**

**Search for image placeholders across all files:**

1. **Open each HTML file** (home.html, founder.html, about.html)
2. **Press Ctrl+F** (or Cmd+F on Mac)
3. **Search for:** `<svg width="100%"`
4. **Replace each one** with an `<img>` tag pointing to your photo

---

### **Step 6: Save and Upload**

1. **Save all changed HTML files**
2. **Make sure photos are in the `images` folder**
3. **Upload everything to Cloudflare Pages:**
   - All HTML files you edited
   - The entire `images` folder with your photos
4. **Wait 1-2 minutes for deployment**
5. **Visit your site** - photos should appear!

---

## 🎨 Part 3: Image Best Practices

### **Photo Recommendations:**

**Exterior Photo:**
- Show the building from outside
- Good lighting (daytime)
- Clean, welcoming appearance
- 800x600 pixels or similar

**Living Areas:**
- Clean, organized spaces
- Natural lighting if possible
- Show comfortable furniture
- Make it look inviting

**Bedrooms:**
- Show privacy and comfort
- Clean beds and furnishings
- Natural light
- Peaceful atmosphere

**Founder Photo (William):**
- Professional but approachable
- Good lighting
- Friendly expression
- Square crop (400x400)
- Can be casual or professional attire

---

### **File Formats:**

**Use these formats:**
- ✅ `.jpg` or `.jpeg` (best for photos)
- ✅ `.png` (good for graphics, larger file size)
- ✅ `.webp` (modern, smaller files, but less compatible)

**Avoid:**
- ❌ `.bmp` (too large)
- ❌ `.tiff` (too large)

---

### **File Sizes:**

**Aim for:**
- Individual photos: 100-500KB each
- Total all photos: Under 2MB

**If photos are too large:**
- Use tinypng.com to compress
- Or resize to 800x600 pixels
- This makes your site load faster

---

## 🔄 Part 4: Quick Edit Workflow

### **To Update Text:**

1. Open HTML file in text editor
2. Find text using Ctrl+F (search)
3. Edit text between HTML tags
4. Save file (Ctrl+S)
5. Upload to Cloudflare Pages
6. Check your live site

---

### **To Add/Change Photos:**

1. Prepare photos (resize, compress)
2. Put photos in `images` folder
3. Open HTML file in text editor
4. Find SVG placeholder
5. Replace with `<img src="images/photo.jpg" alt="Description">`
6. Save file
7. Upload both HTML files and images folder
8. Check your live site

---

## 🎯 Common Locations to Edit

### **Contact Information:**

**Files:** `contact.html`, `home.html`, `faq.html`

**What to change:**
- Phone number: Search for `(424) 395-6144`
- Email: Search for `william@bcesoberliving.com`

---

### **Personal Story:**

**Files:** `founder.html`, `mission.html`, `about.html`

**What to change:**
- William's story
- Mission statement
- About BCE description

---

### **Images:**

**Files:** `home.html`, `founder.html`

**What to change:**
- Facility exterior
- Living room
- Bedroom
- William's photo

---

## ⚠️ Important Rules When Editing

### **DO:**
✅ Save files after every change
✅ Make backups before editing
✅ Test on your local computer first (open HTML in browser)
✅ Use a proper text editor (not Microsoft Word!)
✅ Keep HTML tags intact (don't delete `<` or `>`)

### **DON'T:**
❌ Delete HTML tags accidentally
❌ Use Microsoft Word (it adds weird formatting)
❌ Change CSS/JavaScript unless you know what you're doing
❌ Upload super huge photos (compress them first!)
❌ Forget to save your changes

---

## 🆘 Troubleshooting

### **Problem: Text didn't change on website**

**Solution:**
1. Make sure you saved the file (Ctrl+S)
2. Make sure you uploaded the correct file
3. Clear browser cache (Ctrl+Shift+Delete)
4. Wait 2-3 minutes for Cloudflare to update

---

### **Problem: Photos not showing**

**Solution:**
1. Check photo filename matches exactly (case-sensitive!)
   - `images/Photo.jpg` ≠ `images/photo.jpg`
2. Make sure `images` folder is uploaded
3. Check file path: `src="images/photo.jpg"` (lowercase)
4. Verify photo format is .jpg, .jpeg, or .png
5. Check photo isn't corrupt (open on your computer first)

---

### **Problem: Website looks broken**

**Solution:**
1. You might have deleted an HTML tag accidentally
2. Re-download the original file from backup
3. Try again more carefully
4. Don't edit the CSS or JavaScript files unless you know HTML

---

### **Problem: Changes work locally but not online**

**Solution:**
1. Make sure you uploaded the changed files
2. Clear Cloudflare cache:
   - Cloudflare Dashboard → Caching → Purge Everything
3. Clear browser cache
4. Wait a few minutes

---

## 📚 Quick Reference

### **HTML Tags to Know:**

```html
<p>Paragraph text here</p>
<h2>Heading text here</h2>
<strong>Bold text here</strong>
<a href="page.html">Link text here</a>
<img src="images/photo.jpg" alt="Description">
```

**Rule:** Always close tags! `<p>` needs `</p>`

---

### **Image Tag Template:**

```html
<img src="images/YOUR-PHOTO-NAME.jpg" 
     alt="Description of photo" 
     style="width: 100%; border-radius: 15px;">
```

**Replace:** `YOUR-PHOTO-NAME.jpg` with your actual filename

---

## ✅ Editing Checklist

Before uploading changes:

- [ ] Text looks correct in text editor
- [ ] All HTML tags are intact (no broken `<` or `>`)
- [ ] Photos are in `images` folder
- [ ] Photo filenames match exactly in HTML
- [ ] Photos are compressed (under 500KB each)
- [ ] Files are saved (Ctrl+S)
- [ ] Tested opening HTML in browser locally
- [ ] Ready to upload to Cloudflare

---

## 🎓 Want to Learn More?

**Free HTML tutorials:**
- https://www.w3schools.com/html/
- https://developer.mozilla.org/en-US/docs/Learn/HTML

**Video tutorials:**
- Search YouTube for "HTML basics for beginners"
- Search YouTube for "How to edit HTML"

---

## 💡 Pro Tips

1. **Always backup before editing**
   - Keep a copy of original files
   - Save different versions

2. **Edit one thing at a time**
   - Change text, test, then move to photos
   - Don't change everything at once

3. **Test locally first**
   - Open HTML files in your browser before uploading
   - Make sure it looks good

4. **Use "Find and Replace"**
   - Most text editors have this (Ctrl+H)
   - Change all instances of something at once

5. **Take notes**
   - Write down what you changed
   - Easier to undo if something breaks

---

## 🚀 You're Ready!

Editing your website is easier than it seems:
1. Open HTML file in text editor
2. Find what you want to change
3. Change it
4. Save
5. Upload
6. Check your live site

**Start with small changes and build confidence!**

---

**Questions?** Contact Cloudflare Support or search for HTML tutorials online.

**Remember:** You can always re-download the original files if something goes wrong!
