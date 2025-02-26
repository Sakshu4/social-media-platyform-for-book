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
│   ├── 📂 pages/           # Next.js pages
│   │   ├── index.tsx       # Home Page
│   │   ├── reviews.tsx     # Book Reviews Page
│   │   ├── clubs.tsx       # Book Clubs Page
│   │   ├── recommendations.tsx  # AI Book Recommendations Page
│   │   ├── profile.tsx     # User Profile Page
│   │   ├── login.tsx       # Login Page
│   │   ├── register.tsx    # Registration Page
│   ├── 📂 styles/          # Global and component-specific styles
│   │   ├── globals.css     # Global Tailwind CSS styles
│   ├── 📂 utils/           # Helper functions
│   │   ├── cn.ts          # Class name utility function
│   ├── 📂 lib/             # Configurations & integrations
│   ├── 📂 assets/          # Local images & icons
│   ├── 📂 hooks/           # Custom React Hooks
│── package.json            # Dependencies & project metadata
│── tailwind.config.js      # Tailwind CSS configuration
│── next.config.js          # Next.js configuration
│── tsconfig.json          # TypeScript configuration
```

## Tech Stack

- Next.js - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- Framer Motion - Animations
- Swiper.js - Carousel/slider
- ShadCN UI - UI components

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

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Modern, responsive navigation
- Hero section with animations
- Featured books carousel
- How it works section
- User testimonials
- Comprehensive footer
- Mobile-friendly design

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint 