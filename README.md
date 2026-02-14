SkillBridge
Enterprise-Grade Tutor Booking Platform

SkillBridge is a scalable full-stack tutor marketplace platform designed to connect students with professional tutors through a structured booking system, real-time availability management, and secure authentication.

Built using modern production-ready technologies with a clean architecture and modular design.


 Overview:

SkillBridge enables:

Students to discover tutors, view detailed profiles, and book sessions

Tutors to manage availability, pricing, and bookings

Secure authentication with role-based access control

Clean, scalable backend architecture with Prisma ORM

The platform is structured with clear separation between frontend and backend services, making it maintainable and extensible.


 System Architecture:
Client (Next.js App Router)
        ↓
Better Auth (Cookie-based Auth)
        ↓
Express API (REST)
        ↓
Prisma ORM
        ↓
PostgreSQL Database


 Technology Stack:
Frontend

Next.js 14 (App Router)

TypeScript

Tailwind CSS

Shadcn UI

TanStack React Form

Lucide Icons

Better Auth (Client SDK)

Backend

Node.js

Express.js

Prisma ORM

PostgreSQL

Better Auth (Server)

Infrastructure

Vercel (Frontend Deployment)

Vercel / Custom Hosting (Backend)

PostgreSQL (Production Database)


 Core Features:
Authentication & Authorization

Secure HTTP-only cookie-based authentication

Role-based access control (Student / Tutor / Admin)

Cross-site cookie handling for production deployments

Student Capabilities

Browse featured tutors

Filter by category

View tutor profiles

View real-time availability

Book sessions

Manage bookings dashboard

Tutor Capabilities

Create and manage tutor profile

Set hourly rate

Define recurring availability slots

Track bookings

Tutor dashboard interface

Availability System

Structured availability slot management

Prevents double-booking

Booking state tracking (isBooked flag)


📂 Repository Structure
skillbridge/
│
├── frontend/
│   ├── app/
│   │   ├── (commonLayout)/
│   │   ├── (dashboardLayout)/
│   │   ├── tutor/
│   │   └── api/
│   ├── components/
│   ├── lib/
│   └── types/
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── tutor/
│   │   │   ├── booking/
│   │   │   └── category/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   └── utils/
│   └── prisma/
│       └── schema.prisma


 Database Design Example:
AvailabilitySlot Model
model AvailabilitySlot {
  id String @id @default(uuid())

  tutorProfileId String
  tutorProfile   TutorProfile @relation(fields: [tutorProfileId], references: [id], onDelete: Cascade)

  isBooked Boolean @default(false)

  startTime  DateTime
  endTime    DateTime
  daysOfWeek String[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("availability_slot")
}


Design considerations:

Cascade delete for referential integrity

Boolean booking lock to prevent race conditions

Structured time handling with DateTime


 Local Development Setup:
1. Clone Repository
git clone https://github.com/your-username/skillbridge.git
cd skillbridge

2. Backend Setup
cd backend
npm install


Create .env:

DATABASE_URL=postgresql://user:password@localhost:5432/skillbridge
BETTER_AUTH_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000


Run migrations:

npx prisma generate
npx prisma migrate dev


Start server:

npm run dev


Backend runs at:

http://localhost:5000

3. Frontend Setup
cd frontend
npm install


Create .env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000


Start frontend:

npm run dev


Frontend runs at:

http://localhost:3000


 Security Considerations:

HTTP-only cookies

SameSite=None for cross-site deployment

Secure flag enabled in production

Credentials included in client requests

Role-based route protection

Prisma query abstraction for SQL injection protection


 Scalability Considerations:

Modular backend architecture

Service layer separation

Prisma for schema migrations & type safety

Route grouping in Next.js for layout isolation

Prepared for:

Payment integration (Stripe)

WebSocket real-time updates

Caching layer (Redis)

Horizontal scaling


 Future Enhancements:

Payment gateway integration

Advanced search & filtering


Calendar synchronization

Email notifications


 Known Edge Cases Handled:

Cross-site cookie rejection (SameSite policy)

Parallel layout routing conflicts in App Router

Invalid API response shape handling

Booking duplication prevention
