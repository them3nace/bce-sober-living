# 🌐 DNS Setup Guide for bcesoberliving.com

## Complete DNS Records Configuration

This guide shows you exactly what DNS records to set up for your BCE Sober Living website on Cloudflare.

---

## 📋 Required DNS Records

When you deploy your website to Cloudflare Pages, Cloudflare will automatically create most DNS records for you. Here's what they should look like:

---

## 🎯 Main DNS Records

### **Record 1: Root Domain (bcesoberliving.com)**

```
Type:    CNAME
Name:    @  (or leave blank, or "bcesoberliving.com")
Content: bce-sober-living.pages.dev
TTL:     Auto
Proxy:   ✅ Proxied (Orange Cloud)
```

**What this does:** Points your main domain to your Cloudflare Pages site

---

### **Record 2: WWW Subdomain (www.bcesoberliving.com)**

```
Type:    CNAME
Name:    www
Content: bcesoberliving.com  (or bce-sober-living.pages.dev)
TTL:     Auto
Proxy:   ✅ Proxied (Orange Cloud)
```

**What this does:** Ensures www.bcesoberliving.com works too

---

## � Document Storage (R2 Bucket)

If you want to host documents (PDFs, forms, etc.) on a custom subdomain, set up DNS for your R2 bucket:

### **Record 3: Documents Subdomain (documents.bcesoberliving.com)**

```
Type:    CNAME
Name:    documents
Content: 3a42011049cb313f5312fd52239aef6c.r2.cloudflarestorage.com
TTL:     Auto
Proxy:   ✅ Proxied (Orange Cloud)
```

**What this does:** Points documents.bcesoberliving.com to your R2 storage bucket

**Additional Setup Required:**
1. In Cloudflare Dashboard, go to R2 → bce-documents bucket
2. Click "Custom Domains" 
3. Add `documents.bcesoberliving.com`
4. Documents will be accessible at: https://documents.bcesoberliving.com/filename.pdf

---

## �📧 Optional Email Records (If You Want Email)

If you want to receive email at your domain (like william@bcesoberliving.com), you'll need MX records. Here are options:

### **Option A: Google Workspace (Paid - $6/month)**

```
Type:     MX
Name:     @
Priority: 1
Content:  ASPMX.L.GOOGLE.COM

Type:     MX
Name:     @
Priority: 5
Content:  ALT1.ASPMX.L.GOOGLE.COM

Type:     MX
Name:     @
Priority: 5
Content:  ALT2.ASPMX.L.GOOGLE.COM

Type:     MX
Name:     @
Priority: 10
Content:  ALT3.ASPMX.L.GOOGLE.COM

Type:     MX
Name:     @
Priority: 10
Content:  ALT4.ASPMX.L.GOOGLE.COM
```

---

### **Option B: Cloudflare Email Routing (FREE!)** ⭐ **RECOMMENDED**

**Step 1:** In Cloudflare Dashboard, go to "Email" → "Email Routing"

**Step 2:** Click "Get Started" and follow the wizard

**Step 3:** Cloudflare will automatically create these records:

```
Type:     MX
Name:     @
Priority: (Cloudflare sets this)
Content:  (Cloudflare provides this)

Type:     TXT
Name:     @
Content:  v=spf1 include:_spf.mx.cloudflare.net ~all
```

**Step 4:** Set up forwarding:
- Forward william@bcesoberliving.com → your personal email
- Forward info@bcesoberliving.com → your personal email
- Forward contact@bcesoberliving.com → your personal email

**Cost:** $0 (Completely FREE!)

---

### **Option C: No Email (Just use your personal email for now)**

Don't add any MX records. Keep using your personal email.

**Update the website contact info:**
- Change `william@bcesoberliving.com` to your actual email
- In `contact.html`, find and replace the email

---

## 🔒 Security Records (Recommended)

### **SPF Record (Prevents Email Spoofing)**

```
Type:    TXT
Name:    @
Content: v=spf1 include:_spf.mx.cloudflare.net ~all
```

**Note:** If using Cloudflare Email Routing, this is created automatically

---

### **DMARC Record (Email Security)**

```
Type:    TXT
Name:    _dmarc
Content: v=DMARC1; p=none; rua=mailto:your-email@gmail.com
```

**What this does:** Helps prevent email spoofing and provides reports

---

## 🚫 Records You DON'T Need

❌ **A Records** - Not needed for Cloudflare Pages (CNAME works better)  
❌ **AAAA Records** - Not needed (IPv6)  
❌ **NS Records** - Already set by Cloudflare automatically  
❌ **CAA Records** - Optional, Cloudflare handles SSL automatically

---

## 📊 What Your DNS Should Look Like (Visual)

```
╔═══════════════════════════════════════════════════════════╗
║              YOUR DNS RECORDS IN CLOUDFLARE               ║
╚═══════════════════════════════════════════════════════════╝

Type     Name         Content                                Proxy
────────────────────────────────────────────────────────────────────
CNAME    @            bce-sober-living.pages.dev            🟠 Proxied
CNAME    www          bcesoberliving.com                     🟠 Proxied
CNAME    documents    3a42011049cb313f5312fd52239aef6c...     🟠 Proxied

(If using Cloudflare Email Routing - added automatically:)
MX       @            isaac.mx.cloudflare.net                ⚪ DNS Only
MX       @            linda.mx.cloudflare.net                ⚪ DNS Only
MX       @            amir.mx.cloudflare.net                 ⚪ DNS Only
TXT      @            v=spf1 include:_spf...                 ⚪ DNS Only
TXT      _dmarc       v=DMARC1; p=none...                    ⚪ DNS Only
```

---

## 🎯 Step-by-Step Setup Process

### **Phase 1: Deploy Website First**

1. Upload your website to Cloudflare Pages
2. Name your project: `bce-sober-living`
3. Deploy successfully
4. Get your Pages URL: `bce-sober-living.pages.dev`

**✅ Your site is now live at: bce-sober-living.pages.dev**

---

### **Phase 2: Connect Custom Domain**

1. In your Pages project, click **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter: `bcesoberliving.com`
4. Click **"Continue"**
5. Cloudflare will ask: "Do you own this domain?" → Click **"Activate domain"**

**Cloudflare automatically creates the CNAME record for you!**

6. Repeat for `www.bcesoberliving.com` if desired

---

### **Phase 3: Verify DNS (Check Your Work)**

1. Go to Cloudflare Dashboard
2. Click your domain: **bcesoberliving.com**
3. Click **"DNS"** in the left menu
4. You should see:

```
✅ CNAME  @    bce-sober-living.pages.dev   Proxied
✅ CNAME  www  bcesoberliving.com            Proxied
```

**If you see this, you're done!** ✅

---

### **Phase 4: Set Up Email (Optional but Recommended)**

**Easiest Option: Cloudflare Email Routing (FREE)**

1. In Cloudflare Dashboard, click **"Email"** → **"Email Routing"**
2. Click **"Get Started"**
3. Click **"Enable Email Routing"**
4. Cloudflare adds MX records automatically
5. Add forwarding addresses:
   - `william@bcesoberliving.com` → forward to your personal email
   - `info@bcesoberliving.com` → forward to your personal email
   - `contact@bcesoberliving.com` → forward to your personal email

**Now people can email you at william@bcesoberliving.com!** 📧

---

## 🔍 How to Check DNS Propagation

DNS changes can take 5 minutes to 48 hours to propagate worldwide.

### **Check if it's working:**

1. **Visit your site:**
   - Go to: https://bcesoberliving.com
   - Should show your website ✅

2. **Use online tools:**
   - https://dnschecker.org
   - Enter: bcesoberliving.com
   - Should show Cloudflare IPs

3. **Command line (advanced):**
   ```bash
   # Check DNS
   nslookup bcesoberliving.com
   
   # Check website
   curl -I https://bcesoberliving.com
   ```

---

## ⚠️ Common DNS Issues & Fixes

### **Issue 1: "DNS_PROBE_FINISHED_NXDOMAIN"**

**Problem:** Domain not found  
**Fix:** 
- Wait 15-30 minutes for DNS to propagate
- Check nameservers are Cloudflare's
- Verify CNAME record exists

---

### **Issue 2: "Too Many Redirects"**

**Problem:** SSL redirect loop  
**Fix:**
- Go to Cloudflare → SSL/TLS
- Set to **"Full"** or **"Full (strict)"**
- Never use "Flexible"

---

### **Issue 3: "www" Not Working**

**Problem:** www.bcesoberliving.com doesn't work  
**Fix:**
- Add CNAME record for `www`
- Point to `bcesoberliving.com`
- Make sure it's proxied (orange cloud)

---

### **Issue 4: Email Not Working**

**Problem:** Can't receive email at @bcesoberliving.com  
**Fix:**
- Set up Cloudflare Email Routing (free)
- Or use your personal email in the website
- MX records take 24-48 hours to propagate

---

## 🎯 Recommended DNS Settings

### **SSL/TLS Settings:**
```
SSL/TLS encryption mode: Full (strict)
Always Use HTTPS: ✅ ON
Automatic HTTPS Rewrites: ✅ ON
```

### **Speed Settings:**
```
Auto Minify: ✅ JavaScript, CSS, HTML
Brotli: ✅ ON
```

### **Security Settings:**
```
Security Level: Medium
Challenge Passage: 30 minutes
Browser Integrity Check: ✅ ON
```

---

## 📞 Your Final DNS Configuration

**For BCE Sober Living, this is all you need:**

```
╔═══════════════════════════════════════════════════════╗
║           MINIMUM REQUIRED DNS RECORDS                ║
╚═══════════════════════════════════════════════════════╝

CNAME  @         → bce-sober-living.pages.dev        (Proxied)
CNAME  www       → bcesoberliving.com                 (Proxied)
CNAME  documents → 3a42011049cb313f5312fd52239aef6c...  (Proxied)

╔═══════════════════════════════════════════════════════╗
║              OPTIONAL EMAIL RECORDS                   ║
║          (only if you want @bcesoberliving.com)       ║
╚═══════════════════════════════════════════════════════╝

Use Cloudflare Email Routing (FREE):
- Cloudflare adds MX records automatically
- Set up forwarding to your personal email
```

---

## ✅ DNS Checklist

- [ ] Website deployed to Cloudflare Pages
- [ ] Custom domain added in Pages dashboard
- [ ] CNAME record for @ exists (auto-created)
- [ ] CNAME record for www exists (optional)
- [ ] CNAME record for documents exists (for R2 storage)
- [ ] All CNAMEs are proxied (orange cloud)
- [ ] SSL/TLS set to "Full (strict)"
- [ ] Website loads at https://bcesoberliving.com
- [ ] Website loads at https://www.bcesoberliving.com
- [ ] Documents accessible at https://documents.bcesoberliving.com
- [ ] Email routing set up (if desired)
- [ ] Tested sending email to william@bcesoberliving.com

---

## 🆘 Need Help?

**DNS not working after 24 hours?**

1. Check nameservers at your domain registrar
2. Verify they're Cloudflare's nameservers
3. Check Cloudflare Dashboard → DNS → Records
4. Contact Cloudflare Support (free, 24/7)

**Email not working?**

1. Use Cloudflare Email Routing (easiest)
2. Or just use your personal email in the website
3. Email setup is 100% optional

---

## 🎉 That's It!

**Simple DNS = Simple Life**

With Cloudflare Pages and R2, you need these DNS records:
1. CNAME for @ (root domain)
2. CNAME for www (optional)
3. CNAME for documents (for R2 storage)

**Cloudflare handles everything else automatically!** ✅

---

**Questions?** See QUICKSTART.md or README.md for deployment instructions.
