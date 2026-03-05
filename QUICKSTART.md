# 🚀 QUICK START GUIDE - BCE Sober Living Website

## For Complete Beginners - 5 Easy Steps!

### ⏱️ Total Time: 15-30 minutes

---

## STEP 1️⃣: Extract the Files (2 minutes)

1. Download the `bce_fullsite.zip` file
2. Right-click on it
3. Select "Extract All" (Windows) or double-click (Mac)
4. You'll now have a folder called `bce_website` with all your files

---

## STEP 2️⃣: Create a Free Cloudflare Account (3 minutes)

1. Go to: **https://www.cloudflare.com/**
2. Click the orange "Sign Up" button
3. Enter your email and create a password
4. Check your email and click the verification link
5. You're in! 🎉

---

## STEP 3️⃣: Add Your Domain (5 minutes)

1. In Cloudflare dashboard, click **"Add a site"**
2. Type: `bcesoberliving.com`
3. Click **"Add site"**
4. Select the **FREE** plan (it's perfect!)
5. Click **"Continue"**
6. Cloudflare will show you 2 nameservers (they look like: `bob.ns.cloudflare.com` and `sue.ns.cloudflare.com`)

**IMPORTANT**: Now go to where you bought your domain (GoDaddy, Namecheap, etc.):
   - Log in to your domain registrar
   - Find "Domain Settings" or "Nameservers"
   - Change to "Custom Nameservers"
   - Enter the 2 nameservers Cloudflare gave you
   - Save

Wait 15-30 minutes for this to take effect.

---

## STEP 4️⃣: Upload Your Website (5 minutes)

**This is the easiest part!**

1. In Cloudflare, click **"Workers & Pages"** on the left
2. Click **"Create application"**
3. Click the **"Pages"** tab
4. Click **"Upload assets"**
5. Name your project: `bce-sober-living`
6. Click **"Create project"**
7. Now DRAG all these files from your `bce_website` folder:
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

8. Click **"Deploy site"**
9. Wait 1-2 minutes... ☕

---

## STEP 5️⃣: Connect Your Domain (3 minutes)

1. After deployment, click **"Custom domains"** at the top
2. Click **"Set up a custom domain"**
3. Type: `bcesoberliving.com`
4. Click **"Continue"**
5. Click **"Activate domain"**

**DONE! 🎉 Your website is LIVE!**

Visit: **https://bcesoberliving.com**

---

## 🎨 Your Website Includes:

✅ **Stunning animated intro page** - Automatically plays when someone visits
✅ **7 professional pages** - Home, Mission, Founder, About, Updates, Comments, Contact
✅ **Beautiful blue theme** - Professional gradients and animations
✅ **Mobile-friendly** - Works perfectly on phones and tablets
✅ **Contact form** - Visitors can reach you
✅ **Comment board** - Community can leave messages
✅ **Fast & secure** - SSL encrypted, loads instantly

---

## 🖼️ Want to Add Your Own Photos?

### Simple Method:

1. In Cloudflare Pages, go to your project
2. Click **"Continue to project"**
3. Create a new deployment
4. Upload your photos along with the HTML files
5. Edit the HTML files to point to your photos:

**Before:**
```html
<svg>...Placeholder...</svg>
```

**After:**
```html
<img src="my-photo.jpg" alt="Description">
```

---

## ⚠️ Troubleshooting

**Website not showing?**
- Wait 5-10 more minutes
- Clear your browser cache (Ctrl+Shift+Delete)
- Try in incognito mode

**Domain not connecting?**
- Make sure you changed nameservers at your domain registrar
- Wait up to 24 hours (usually 15-30 minutes)

**Still need help?**
- Read the full README.md file in your folder
- Visit: https://developers.cloudflare.com/pages/

---

## 🎯 What's Next?

**Optional Advanced Features** (if you want the comment board to save messages):

The basic comment board works, but messages disappear when the page reloads. To make it permanent:

1. Read the "Setting Up the Comment Board" section in README.md
2. You'll need to install Node.js and use the command line
3. This is OPTIONAL - your site works great without it!

---

## 📞 Contact Information to Update

Don't forget to update these with your real info:

1. Open `contact.html` in a text editor (Notepad on Windows, TextEdit on Mac)
2. Find and replace:
   - `(301) 555-0100` with your real phone number
   - `info@bcesoberliving.com` with your real email
3. Save the file
4. Re-upload to Cloudflare Pages

---

## ✅ Final Checklist

- [ ] Website is live at bcesoberliving.com
- [ ] All pages load correctly
- [ ] Navigation menu works
- [ ] Tested on mobile phone
- [ ] Updated contact information
- [ ] Added your own photos (optional)

---

**CONGRATULATIONS! You've successfully launched a professional website!** 🎉

Your BCE Sober Living website is now live and ready to help people in need of recovery services.

**Total Cost: $0** (using Cloudflare's free plan)
**Hosting: FREE forever**
**SSL Certificate: FREE & automatic**
**Bandwidth: Unlimited on free plan**

---

## 💡 Pro Tips

1. **Regular Updates**: Visit the "Updates" page HTML file to add news
2. **SEO**: Your site is already optimized for Google
3. **Speed**: Cloudflare makes your site load super fast
4. **Analytics**: Add free Cloudflare Web Analytics to see visitor stats
5. **Backup**: Keep a copy of all your files on your computer

---

Need more help? The full README.md has detailed instructions for everything!
