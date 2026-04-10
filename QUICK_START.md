# QUICK START GUIDE - Property Manager App

Follow these simple steps to get your app running in 15 minutes!

## 🚀 STEP 1: Get Your Turso Database Ready (5 minutes)

### A. Create Turso Account
1. Go to https://turso.tech
2. Click "Sign Up" → Use GitHub login (easier)
3. Authorize access

### B. Create Database
1. Click "Create Database" 
2. Name it: `property-manager`
3. Choose closest region (Singapore for Malaysia)
4. Click "Create"

### C. Get Your Credentials
After database is created:
1. Open your database
2. Look for "Connection String" section
3. Copy these two values:
   - **Database URL** (starts with `libsql://`)
   - **Auth Token** (long string)

**SAVE THESE - YOU'LL NEED THEM!**

---

## 🔧 STEP 2: Set Up Local Project (5 minutes)

### A. Download & Install
```bash
# Download the project files to your computer
cd property-manager
npm install
```

### B. Create Environment File
Create `.env.local` file in the root folder with:
```
TURSO_DATABASE_URL=libsql://your-url-here
TURSO_AUTH_TOKEN=your-token-here
```

Replace with your actual values from Step 1.

### C. Initialize Database
```bash
npm run db:push
```

This creates the tables in your Turso database.

### D. Test Locally
```bash
npm run dev
```

Visit http://localhost:3000 in your browser. 

If you see the app working → Great! Continue to Step 3.

---

## 📤 STEP 3: Deploy to Vercel (5 minutes)

### A. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### B. Connect to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

### C. Add Environment Variables
In Vercel project settings:
1. Go to **Settings** → **Environment Variables**
2. Add two variables:
   - Name: `TURSO_DATABASE_URL`
     Value: (paste your database URL)
   - Name: `TURSO_AUTH_TOKEN`
     Value: (paste your auth token)
3. Click "Save"

### D. Deploy
Click "Deploy" button. Wait 2-3 minutes...

✅ **Your app is now live!** 🎉

Visit the URL shown in Vercel (e.g., `https://property-manager.vercel.app`)

---

## 📝 Features Ready to Use

✅ Add properties with owner details
✅ Add prospects with detailed requirements/remarks
✅ Filter properties and prospects
✅ View detailed property and prospect information
✅ Search by address or name
✅ Full CRUD operations (Create, Read, Update, Delete)

---

## ❓ Troubleshooting

**Issue**: "Cannot connect to database"
**Solution**: Check your .env.local file has correct credentials

**Issue**: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org

**Issue**: Database tables don't exist
**Solution**: Run `npm run db:push` again

**Issue**: Vercel deployment fails
**Solution**: Check environment variables are set correctly in Vercel dashboard

---

## 🎯 Next Steps

1. **Customize**: Edit colors in `app/globals.css`
2. **Add Features**: Modify components in `components/` folder
3. **Backup Data**: Turso automatically backs up your database
4. **Share App**: Send the Vercel URL to anyone!

---

## 📚 Documentation Links

- Turso Docs: https://docs.turso.tech
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs

---

**Need Help?** Check the main README.md in the project folder!
