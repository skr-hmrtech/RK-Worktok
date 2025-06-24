# WorkTok - Home Services Platform

WorkTok is a comprehensive platform that connects customers with skilled professionals in Iraq. Our mission is to redefine the home & property services, repairs, and maintenance industry by providing unparalleled convenience, reliability, and trust.

## 🌟 Overview

WorkTok serves as a bridge between customers who need services and verified service providers. The platform offers a seamless experience for booking home services, repairs, and professional maintenance across major Iraqi cities.

### Key Features

- **Verified Professionals**: All service providers are thoroughly vetted and verified
- **Quick Response**: Instant quotes and fast service delivery
- **Quality Guarantee**: High-quality service delivery with satisfaction guarantee
- **Multi-language Support**: Available in English and Arabic
- **Mobile Apps**: Dedicated apps for both customers and service providers
- **Secure Payments**: Multiple payment options with secure processing

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository or open in Replit
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables (use Replit Secrets for production)

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages and API routes
│   ├── about/             # About page
│   ├── api/               # API endpoints
│   │   ├── categories/    # Service categories API
│   │   ├── cities/        # Cities/locations API
│   │   ├── providers/     # Service providers API
│   │   └── stats/         # Statistics API
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy page
│   ├── providers/         # Service providers pages
│   └── services/          # Services listing page
├── components/            # Reusable React components
│   ├── pages/             # Page-specific components
│   ├── ui/                # UI component library (shadcn/ui)
│   ├── animated-section.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   └── ...
├── data/                  # Static content data
│   ├── content-en.json    # English content
│   └── content-ar.json    # Arabic content
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries and configurations
├── assets/                # Static assets (images, etc.)
└── shared/                # Shared schemas and types
```

## 🛠 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Query** - Data fetching and caching
- **Radix UI** - Headless UI components
- **shadcn/ui** - Component library

### Backend & APIs

- **Next.js API Routes** - Server-side API endpoints
- **Axios** - HTTP client for external API calls

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler for development

## 🌐 Deployment

### Vercel Deployment

This project is optimized for deployment on Vercel:

1. Configure deployment settings in Vercel
2. Set up environment variables using Vercel Secrets
3. Deploy directly from the Vercel interface

### Environment Variables

Set up the following environment variables:

- `API_BASE_URL` - Base URL for backend API
- Any other API keys or configuration values

## 🎨 UI Components

The project uses a comprehensive UI component library built on top of Radix UI and styled with Tailwind CSS. Components include:

- Forms and inputs
- Navigation and menus
- Cards and layouts
- Modals and dialogs
- Charts and data visualization
- Animations and transitions

## 🌍 Internationalization

The application supports multiple languages:

- **English** (`content-en.json`)
- **Arabic** (`content-ar.json`)

Content is managed through JSON files in the `src/data/` directory.

## 📱 Features

### For Customers

- Browse verified service providers
- Search by location and service type
- Read reviews and ratings
- Book services instantly
- Track service requests
- Secure payment processing

### For Service Providers

- Create professional profiles
- Manage service offerings
- Receive booking notifications
- Track earnings and performance
- Customer communication tools

### Platform Features

- Real-time notifications
- Advanced search and filtering
- Mobile-responsive design
- Multi-language support
- Analytics and reporting
- Customer support system

## 🔧 Configuration

### Next.js Configuration

The project includes custom Next.js configuration for:

- Image optimization with remote patterns
- S3 bucket integration for media storage
- TypeScript path mapping

### Tailwind Configuration

Custom Tailwind setup with:

- Design system tokens
- Animation utilities
- Component variants

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and inquiries:

- **Email**: admin@worktok.org
- **Phone**: +964 7856075950
- **Location**: Baghdad, Iraq

## 📄 License

This project is proprietary software owned by WorkTok. All rights reserved.

## 🔗 Links

- [Company Website](https://worktok.org)
- [Privacy Policy](https://worktok.org)
- [Contact Us](https://worktok.org)

---

**WorkTok** - Life Becomes Easier. 🛠️✨
