# Property Manager - Web Application

A modern property management system built with Next.js, TypeScript, and Turso SQLite database. Manage your property listings, owner details, prospects, and their requirements all in one place.

## Features

✅ **Property Management**
- Add, view, edit, and delete property listings
- Track property details (type, size, bedrooms, bathrooms, land title)
- Manage owner information directly with each property
- Filter by property type and purpose (For Rent / For Sale)
- Search properties by address

✅ **Prospect Management**
- Add and track buyers and tenants
- Record detailed remarks/notes about prospect requirements
- Filter by prospect type
- Search prospects by name
- View full prospect details with requirements notes

✅ **Dashboard**
- Quick statistics overview
- Real-time filtering and search
- Responsive design

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: Turso (SQLite Edge)
- **ORM**: Drizzle ORM
- **Styling**: CSS (vanilla)
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm/yarn
- Turso account ([https://turso.tech](https://turso.tech))
- Vercel account ([https://vercel.com](https://vercel.com)) for deployment
- Git

## Local Development Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd property-manager
npm install
```

### 2. Create Turso Database

Sign up for Turso and create a new database:

```bash
# Install Turso CLI
npm install -g @libsql/cli

# Login to Turso
turso auth login

# Create a new database
turso db create property-manager

# Get your database credentials
turso db show property-manager
```

You'll receive:
- `TURSO_DATABASE_URL`: Your database connection string
- `TURSO_AUTH_TOKEN`: Your authentication token

### 3. Set Environment Variables

Create a `.env.local` file in the root directory:

```env
TURSO_DATABASE_URL=libsql://your-database-url-here
TURSO_AUTH_TOKEN=your-auth-token-here
```

### 4. Push Database Schema

```bash
npm run db:push
```

This creates the `properties` and `prospects` tables in your Turso database.

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
property-manager/
├── app/
│   ├── api/
│   │   ├── properties/
│   │   │   ├── route.ts          # GET all, POST new
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE single
│   │   └── prospects/
│   │       ├── route.ts          # GET all, POST new
│   │       └── [id]/route.ts     # GET, PUT, DELETE single
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   ├── page.css                  # Page styles
│   └── globals.css               # Global styles
├── components/
│   ├── PropertiesSection.tsx      # Properties tab content
│   ├── PropertiesSection.css
│   ├── PropertyCard.tsx           # Property card display
│   ├── PropertyForm.tsx           # Add property form
│   ├── PropertyDetail.tsx         # Property detail modal
│   ├── ProspectsSection.tsx       # Prospects tab content
│   ├── ProspectsSection.css
│   ├── ProspectForm.tsx           # Add prospect form
│   └── ProspectDetail.tsx         # Prospect detail modal
├── db/
│   ├── schema.ts                 # Database schema
│   └── index.ts                  # Database client
├── drizzle.config.ts             # Drizzle configuration
├── package.json
├── tsconfig.json
├── next.config.js
├── .env.example
└── README.md
```

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `POST /api/properties` - Create new property
- `GET /api/properties/[id]` - Get property details
- `PUT /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property

### Prospects
- `GET /api/prospects` - Get all prospects (with filters)
- `POST /api/prospects` - Create new prospect
- `GET /api/prospects/[id]` - Get prospect details
- `PUT /api/prospects/[id]` - Update prospect
- `DELETE /api/prospects/[id]` - Delete prospect

## Database Schema

### Properties Table
```
- id: integer (primary key)
- address: text
- propertyType: text (condo, apartment, shoplot, etc.)
- size: integer (sqft)
- landTitle: text (freehold, leasehold, etc.)
- bedrooms: integer
- bathrooms: integer
- purpose: text (rent, sale)
- price: text
- description: text
- ownerName: text
- ownerPhone: text
- ownerEmail: text
- ownerIdType: text
- ownerIdNumber: text
- ownerAddress: text
- createdAt: integer (timestamp)
- updatedAt: integer (timestamp)
```

### Prospects Table
```
- id: integer (primary key)
- name: text
- phone: text
- email: text
- type: text (buyer, tenant, both)
- budget: text
- preferredPropertyType: text
- remarks: text (detailed requirements notes)
- createdAt: integer (timestamp)
- updatedAt: integer (timestamp)
```

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Select your repository
5. Vercel will auto-detect it's a Next.js project

### 3. Add Environment Variables

In Vercel project settings:
1. Go to Settings → Environment Variables
2. Add these variables:
   - `TURSO_DATABASE_URL`: Your Turso database URL
   - `TURSO_AUTH_TOKEN`: Your Turso auth token

### 4. Deploy

Click "Deploy" - Vercel will build and deploy your app automatically.

Your app will be live at `https://your-project-name.vercel.app`

## Usage Guide

### Adding a Property

1. Click **"+ Add New Property"** button
2. Fill in property details:
   - Address, type, size, land title
   - Bedrooms, bathrooms
   - Purpose (Rent/Sale) and price
   - Description (optional)
3. Fill in owner information:
   - Owner name, phone, email
   - ID type and number
   - Address
4. Click **"Save Property"**

The owner is now directly associated with the property!

### Adding a Prospect

1. Click **"+ Add New Prospect"** button
2. Enter contact information:
   - Name, phone, email
   - Prospect type (Buyer/Tenant/Both)
3. Enter requirements:
   - Budget/price range
   - Preferred property type
4. Add detailed remarks:
   - Must-have features (e.g., "Must have 3 bedrooms")
   - Location preferences
   - Timeline ("Need to move in within 2 months")
   - Any special requests
5. Click **"Save Prospect"**

### Viewing Prospect Details

1. Go to **Prospects** tab
2. Click **"View"** button on any prospect row
3. See full contact info and detailed remarks in a highlighted box

### Finding Matching Properties

- Filter properties by type and purpose
- Check prospect remarks to understand their needs
- Use the search function to find specific addresses

## Customization

### Styling
- Edit `app/globals.css` for global styles
- Edit component-specific CSS files for local styles
- Colors and variables defined in `:root` in `globals.css`

### Database Schema
- Modify `db/schema.ts` to add/change fields
- Run `npm run db:push` to update the database

### Property Types
Supported property types in the system:
- Condo
- Apartment
- Shoplot
- Warehouse
- Terrace House
- Bungalow
- Semi-D

Add more by editing the select options in components and database schema.

## Troubleshooting

### Database Connection Issues
```bash
# Test your Turso connection
turso db show property-manager

# Verify environment variables
echo $TURSO_DATABASE_URL
echo $TURSO_AUTH_TOKEN
```

### Build Errors
```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

### Schema Not Updating
```bash
# Force schema push
npm run db:push
```

## Security Notes

- Never commit `.env.local` to version control
- Keep `TURSO_AUTH_TOKEN` secret
- Use Vercel's environment variables for production
- Validate all user inputs on the server side (add as needed)

## Future Enhancements

- User authentication and multi-user support
- Property image uploads
- Lease/transaction tracking
- Commission calculations
- Email notifications
- Export to PDF/Excel
- WhatsApp integration for prospect notifications
- Advanced analytics dashboard

## Support

For issues or questions:
1. Check the Turso documentation: [https://docs.turso.tech](https://docs.turso.tech)
2. Check the Drizzle documentation: [https://orm.drizzle.team](https://orm.drizzle.team)
3. Check the Next.js documentation: [https://nextjs.org](https://nextjs.org)

## License

MIT License - feel free to use this project for personal or commercial purposes.
