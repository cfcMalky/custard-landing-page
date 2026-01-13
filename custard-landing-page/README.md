# Custard Landing Page

A high-conversion landing page for joincustard.co.uk, promoting the UK's fastest GPT (Get Paid To) platform. This page highlights the £2.50 sign-up bonus, Rapid Pay feature, and various earning opportunities including paid surveys, game testing, and free trials.

## Features

- Responsive design optimized for mobile and desktop
- SEO-optimized with meta keywords and descriptions
- Accessibility-friendly with ARIA labels and screen reader text
- Interactive lightbox for screenshot gallery
- Trust badges and social proof
- Call-to-action optimization with bonus highlighting

## Quick Start

### Option 1: Deploy to Vercel (Recommended)

1. Push this repository to your GitHub account
2. Go to [Vercel](https://vercel.com) and sign up
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a static site and deploy it
6. Your site will be live at a permanent URL (e.g., `your-repo.vercel.app`)

### Option 2: Deploy Manually

Upload all files to any static hosting service:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## Google Search Console Verification

The file `google7cad3819d9f506e6.html` is included at the root level for Google Search Console verification. After deploying:

1. Add your Vercel URL to Google Search Console
2. Select "HTML file" verification method
3. Google will find the verification file automatically
4. Click "Verify" to complete the process

## Updating the Site

To make changes and deploy updates:

### If you pushed to GitHub:

1. Make your changes locally
2. Push to GitHub: `git add . && git commit -m "Your message" && git push`
3. Vercel will automatically detect the change and redeploy
4. Your live URL will update within seconds

### If I help you deploy:

Just let me know what changes you want, and I'll update the files and deploy from GitHub.

## File Structure

```
custard-landing-page/
├── index.html                          # Main landing page
├── styles.css                          # Styling and animations
├── script.js                           # Lightbox and interactions
├── google7cad3819d9f506e6.html         # Google Search Console verification
├── 1.png                               # Screenshot: Play & Earn
├── 2.png                               # Screenshot: RapidPay offers
├── 3.png                               # Screenshot: Free Trials
├── qr.png                              # QR code for easy signup
└── .gitignore                          # Git ignore rules
```

## Affiliate Link

This landing page uses a referral link for joincustard.co.uk. The link includes UTM parameters for tracking:
- `utm_source=referral`
- `utm_medium=affiliate`

Update the referral link in `index.html` if needed (lines 77, 96, 350).

## Technologies Used

- Pure HTML5, CSS3, and Vanilla JavaScript
- No frameworks or build tools required
- Google Fonts (Inter and Poppins)
- Fully static - can be hosted anywhere

## License

This is a custom landing page for affiliate marketing purposes.
