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




