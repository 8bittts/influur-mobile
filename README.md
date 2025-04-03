# Influur Mobile

A modern creator platform built with Next.js, TypeScript, and Tailwind CSS.

<img width="3008" alt="Xnapper-2025-04-03-08 38 41" src="https://github.com/user-attachments/assets/807eb06a-1e9c-4ab3-be89-03b5fae19b8f" />


## 🚀 Features

- **Creator Dashboard**: Track your content performance and earnings
- **Campaign Management**: Discover and manage brand partnerships
- **Profile Management**: Showcase your work and connect with brands
- **Payment Integration**: Secure and easy payment processing
- **Onboarding Flow**: Streamlined creator onboarding experience
- **Real-time Analytics**: Track your growth and engagement
- **Social Integration**: Connect your social media platforms

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Animation**: Framer Motion
- **State Management**: React Context
- **Authentication**: NextAuth.js
- **Database**: Prisma + PostgreSQL
- **Deployment**: Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/8bittts/influur-mobile.git
cd influur-mobile
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/influur"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Architecture

### High-Level Data Flow

```mermaid
graph TD
    A[Client] --> B[Next.js App Router]
    B --> C[API Routes]
    C --> D[Database]
    D --> E[External APIs]
    
    subgraph Authentication
        F[NextAuth.js] --> G[User Context]
        G --> H[Protected Routes]
    end
    
    subgraph Data Management
        I[Context Providers] --> J[State Management]
        J --> K[Data Fetching]
    end
```

### Key Components

1. **Authentication Flow**
   - NextAuth.js integration
   - Protected routes
   - User context management

2. **Creator Dashboard**
   - Real-time analytics
   - Campaign management
   - Payment processing

3. **Onboarding System**
   - Multi-step form
   - Profile setup
   - Social media integration

4. **Campaign Management**
   - Discovery
   - Application
   - Tracking
   - Payment

## 📁 Project Structure

```
/src
  /app
    /_components      # Private components for specific pages
    /api             # API routes
    /(routes)        # App router pages
    /auth           # Authentication flows
    /dashboard      # Main creator dashboard
    /campaigns      # Campaign discovery & management
    /profile       # Profile management
    /payments      # Payment settings
    /settings      # App settings
  /components
    /ui              # Reusable UI components
    /forms           # Form-related components
    /layout          # Layout components
    /features        # Feature-specific components
  /lib              # Utility functions and shared logic
  /types            # TypeScript type definitions
  /styles           # Global styles and Tailwind config
```

## 🔄 Data Flow Examples

### Campaign Creation Flow

```mermaid
sequenceDiagram
    participant C as Creator
    participant F as Frontend
    participant B as Backend
    participant D as Database
    
    C->>F: Create Campaign
    F->>B: POST /api/campaigns
    B->>D: Store Campaign Data
    D-->>B: Return Created Campaign
    B-->>F: Return Success
    F-->>C: Show Success Message
```

### Payment Processing Flow

```mermaid
sequenceDiagram
    participant C as Creator
    participant F as Frontend
    participant B as Backend
    participant P as Payment Provider
    
    C->>F: Initiate Payment
    F->>B: POST /api/payments
    B->>P: Create Payment Intent
    P-->>B: Return Payment Details
    B-->>F: Return Payment Info
    F-->>C: Show Payment Form
    C->>F: Submit Payment
    F->>B: POST /api/payments/confirm
    B->>P: Confirm Payment
    P-->>B: Payment Status
    B-->>F: Update Payment Status
    F-->>C: Show Success/Error
```

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📊 Project Statistics

### Codebase Overview
- **Total Files**: 66 TypeScript/TypeScript React files
- **Total Lines of Code**: ~5,500-6,500 (including documentation)
- **Pure Code Lines**: ~3,800-4,500 (excluding documentation)

### File Distribution
- **UI Components**: 25 files (37.9%)
- **Pages**: 15 files (22.7%)
- **Context/Utils**: 12 files (18.2%)
- **API Routes**: 8 files (12.1%)
- **Types/Interfaces**: 4 files (6.1%)
- **Config Files**: 2 files (3.0%)

### Documentation Breakdown
- **JSDoc Comments**: ~1,700 lines
- **README Sections**: 12 major sections
- **Code Examples**: 8 documented examples
- **Flow Diagrams**: 3 Mermaid diagrams

### Code Quality Metrics
- **TypeScript Coverage**: 100%
- **Component Documentation**: 100%
- **Function Documentation**: 95%
- **Interface Documentation**: 100%

### Key Directories
- **/src/components**: 37 files
- **/src/app**: 15 files
- **/src/lib**: 8 files
- **/src/types**: 4 files
- **/src/styles**: 2 files

These statistics provide a clear overview of the project's composition and quality metrics for contributors and stakeholders.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/) 
