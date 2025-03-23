# BookLovers - Social Media for Book Enthusiasts

A modern web application for book lovers to discover, review, and discuss books with fellow readers.

## Project Structure

```
📂 book-lovers-website/     # Root Project Folder
│── 📂 public/              # Static assets (images, icons, etc.)
│── 📂 src/                 # Main source code
│   ├── 📂 components/      # Reusable UI components
│   │   ├── Navbar.tsx      # Navigation Bar
│   │   ├── Footer.tsx      # Footer
│   │   ├── Button.tsx      # Reusable buttons
│   │   ├── BookCard.tsx    # Reusable book card component
│   │   ├── HeroSection.tsx # Homepage banner (CTA)
│   │   ├── FeaturedBooks.tsx # Carousel for trending books
│   │   ├── Testimonials.tsx  # User feedback section
│   │   ├── SearchBar.tsx   # AI-powered search component
│   ├── 📂 pages/           # Next.js pages
│   │   ├── index.tsx       # Home Page
│   │   ├── reviews.tsx     # Book Reviews Page
│   │   ├── clubs.tsx       # Book Clubs Page
│   │   ├── recommendations.tsx  # AI Book Recommendations Page
│   │   ├── profile.tsx     # User Profile Page
│   │   ├── login.tsx       # Login Page
│   │   ├── register.tsx    # Registration Page
│   │   ├── admin/seed.tsx  # Admin page for seeding data
│   ├── 📂 styles/          # Global and component-specific styles
│   │   ├── globals.css     # Global Tailwind CSS styles
│   ├── 📂 utils/           # Helper functions
│   │   ├── cn.ts           # Class name utility function
│   │   ├── searchUtils.ts  # Search utility functions
│   │   ├── seedData.ts     # Data seeding utilities
│   ├── 📂 lib/             # Configurations & integrations
│   ├── 📂 assets/          # Local images & icons
│   ├── 📂 hooks/           # Custom React Hooks
│   │   ├── useAuth.ts      # Authentication hook
│   │   ├── useSearch.ts    # Firebase search hook
│   ├── firebaseConfig.js   # Firebase configuration
│── package.json            # Dependencies & project metadata
│── tailwind.config.js      # Tailwind CSS configuration
│── next.config.js          # Next.js configuration
│── tsconfig.json           # TypeScript configuration
```

## Tech Stack

- Next.js - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- Framer Motion - Animations
- Swiper.js - Carousel/slider
- Firebase - Backend & Database
- Firestore - NoSQL Database

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd book-lovers-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Firestore database
   - Add your Firebase configuration to `src/firebaseConfig.js`

4. Seed initial data (optional):
   - Navigate to `/admin/seed` in your browser
   - Click "Seed Test Data" to populate the database with sample books, reviews, and authors

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Modern, responsive navigation
- Hero section with animations
- Featured books carousel
- How it works section
- User testimonials
- Comprehensive footer
- Mobile-friendly design
- **Firebase Integration**:
  - Firestore database for storing books, reviews, and authors
  - Real-time search functionality
  - AI-powered search suggestions
  - Recent searches tracking

## Firebase Integration

The application uses Firebase Firestore for data storage and retrieval:

1. **Search Functionality**: 
   - Real-time search across books, reviews, and authors
   - Optimized queries with searchable fields
   - Debounced search to minimize database calls

2. **AI-Powered Suggestions**:
   - Smart suggestions based on user search terms
   - Context-aware recommendations
   - Improved user experience with relevant suggestions

3. **Data Structure**:
   - Books collection with searchable titles and authors
   - Reviews collection with searchable content
   - Authors collection with searchable names
   - Optimized fields for efficient querying

4. **Admin Tools**:
   - Data seeding utility for development
   - Test data management
   - Database monitoring

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint 