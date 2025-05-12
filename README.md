# 🧠 ONEX: A Simple CRM – Personalization & Campaign Engine

Maximize repeat revenue through dynamic segmentation and personalized campaign delivery — built as part of the **Xeno SDE Internship Assignment**.

![Xeno CRM Preview Banner](https://github.com/user-attachments/assets/df7412bb-ccf9-484b-98a2-69f88106d3fc)


---

## 🚀 Demo

> 🎥 [Click here for Loom walkthrough](https://www.loom.com/share/69cd5477417641d29040f2621ac1c883?sid=203ffc3f-2bc5-4b96-a207-08cc01568266)

---

## 🛠️ Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | Next.js 14 (App Router) |
| UI Framework | TailwindCSS + ShadCN/UI |
| Backend      | Next.js API Routes (Edge Functions) |
| Database     | MongoDB Atlas         |
| Auth         | NextAuth.js + Google OAuth |
| Parsing      | PapaParse             |
| Message API  | Simulated vendor API with success/failure |
| Deployment   | Vercel                |

---

## 📦 Features

- ✅ Upload & Parse Customers & Orders CSVs
- ✅ Store structured data in MongoDB
- ✅ Dynamic Rule Builder UI (with AND/OR logic)
- ✅ Create & Save Segments
- ✅ Launch Campaigns on Segments with message personalization
- ✅ Simulated message delivery (90% success, 10% fail)
- ✅ Save Campaign History
- ✅ Log per-customer communication status
- ✅ Google OAuth + Route Protection
- ✅ User-scoped data (all content is per-user)

---

## 🧱 Folder Structure

├── app/
│ ├── api/
│ │ ├── upload/ # CSV upload handling
│ │ ├── query/ # Segment rule execution
│ │ ├── segments/ # Segment create + fetch
│ │ ├── campaigns/ # Campaign creation + logs
│ │ ├── comm-logs/ # Communication logs (per user per campaign)
│ ├── segments/
│ │ ├── create/ # Rule builder UI
│ │ ├── [id]/ # Segment detail + campaign launch
│ ├── campaigns/
│ │ ├── [id]/ # Campaign logs
│ │ ├── page.tsx # Campaign History
│ ├── auth/ # Auth login page (if custom)
│ ├── page.tsx # File upload entry
│
├── components/
│ ├── FileUpload.tsx
│ ├── DataPreview.tsx
│ ├── RuleBuilder.tsx
│ ├── Navbar.tsx
│
├── lib/
│ ├── db.ts # DB connection utility
│
├── models/
│ ├── Customer.ts
│ ├── Order.ts
│ ├── Segment.ts
│ ├── Campaign.ts
│ ├── CommunicationLogs.ts
│
├── middleware.ts # Protects routes via NextAuth
├── .env # Environment variables
├── README.md
└── ...

## 🧪 Getting Started (Local Dev)

### 1️⃣ Clone & Install

```bash
git clone https://github.com/vasu1303/onex.git
cd onex
npm install

```
## Create a .env.local file
```bash
MONGODB_URI=your_mongodb_atlas_connection_string
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
```
## Run Dev Server

```bash
npm run dev
```

## 🔐 Auth Overview
- Google OAuth via NextAuth
- Routes protected via middleware.ts
- Data is filtered via created_by = user.email
- Users see only their own segments, campaigns, logs

---

## 🔄 Core Logic Summary
* Rule Builder: Converts UI rules to MongoDB filters ($and, $or, $regex, etc.)
* Campaign Flow:
    * Create campaign
    * Personalize messages using placeholders
    * Simulate delivery (90% success via Math.random)
    * Log status for each message
* Communication Logs: Track message delivery status per customer per campaign

---

## 📈 Upcoming Features

- 📤 Real email/SMS integration	Planned
- 🧩 Dynamic CSV column mapping	Planned
- 🧼 Empty state designs	Planned
- 📊 Analytics dashboard	Stretch
- 🧪 Unit/integration tests	Stretch
- 🏷️ Campaign tagging / filtering	Stretch
- 📁 File validation / schema checks	Planned

---
## API Usage
- Dummy Vendor API ![image](https://github.com/user-attachments/assets/75cde4c8-baa8-491f-ae05-ac9ce4e234a0)

---

## Important 
# Trade offs 
- The file uploading feature as of now, requires pre-defined columns name only.
    * Use This: [customers.csv](https://github.com/user-attachments/files/20177615/customers.csv)
    * Use This: [orders.csv](https://github.com/user-attachments/files/20177650/orders.csv)
- Due to time Constraints, there is no AI Feature as of now
- Due to some hard to solve error, the code is not deployed yet. It'll be linked as soon as it's live





## 🧑‍💻 Author
# Vasu Singh

>  [LinkedIn](https://www.linkedin.com/in/vasusingh1305/)




test-onex/
├── app/                     # Next.js 13+ app directory
│   ├── api/                # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── campaign/      # Campaign management endpoints
│   │   ├── comm-logs/     # Communication logs endpoints
│   │   ├── query/         # Query handling endpoints
│   │   ├── segments/      # Segment management endpoints
│   │   └── upload/        # File upload endpoints
│   ├── auth/              # Authentication pages
│   ├── campaign/          # Campaign related pages
│   ├── segment/           # Segment related pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── DataPreview.tsx   # CSV data preview component
│   ├── Features.tsx      # Features section component
│   ├── FileUpload.tsx    # File upload component
│   ├── Footer.tsx        # Footer component
│   ├── Hero.tsx         # Hero section component
│   ├── Navbar.tsx       # Navigation component
│   ├── Signin.tsx       # Sign in component
│   └── Signout.tsx      # Sign out component
├── hooks/                # Custom React hooks
│   └── use-mobile.tsx   # Mobile detection hook
├── lib/                  # Utility functions
│   ├── db.ts            # Database connection
│   └── utils.ts         # Helper functions
├── models/              # MongoDB models
│   ├── Campaign.ts      # Campaign model
│   ├── CommunicationLogs.ts # Communication logs model
│   ├── Customer.ts      # Customer model
│   ├── Orders.ts        # Orders model
│   └── Segment.ts       # Segment model
├── public/              # Static files
│   ├── assets/         # Images and SVGs
│   └── uploads/        # User uploaded files
├── .env.local          # Environment variables
├── auth.ts             # Authentication configuration
├── middleware.ts       # Next.js middleware
└── package.json        # Project dependencies