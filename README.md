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