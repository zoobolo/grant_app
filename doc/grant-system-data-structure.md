# Grant Management System - Data Structure Documentation

## Overview
A grant management system for airport infrastructure projects using Next.js, PostgreSQL, and Prisma ORM.

## Database Schema (Prisma)

### Core Models

```prisma
// prisma/schema.prisma

model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String
  role            UserRole
  plannerGrants   Grant[]   @relation("PlannerGrants")
  pmGrants        Grant[]   @relation("PMGrants")
  documents       Document[]
  comments        Comment[]
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Airport {
  id          String   @id @default(cuid())
  locId       String   @unique
  name        String
  state       String
  region      String
  grantPrefix String   // e.g., "3-13-0003" for ATL
  grants      Grant[]
}

model Grant {
  id                  String              @id @default(cuid())
  grantNumber         String              @unique
  locId               String
  airport             Airport             @relation(fields: [locId], references: [locId])
  fiscalYear          Int
  fundingType         FundingType
  phase               Phase
  status              Status
  environmentalStatus EnvironmentalStatus
  plannerId           String
  planner             User                @relation("PlannerGrants", fields: [plannerId], references: [id])
  programManagerId    String
  programManager      User                @relation("PMGrants", fields: [programManagerId], references: [id])
  soarStatus          String?
  soarUpdatedAt       DateTime?
  companionGrantId    String?             @unique
  companionGrant      Grant?              @relation("CompanionGrant", fields: [companionGrantId], references: [id])
  companionedBy       Grant?              @relation("CompanionGrant")
  notes               String?
  projects            Project[]
  requirements        GrantRequirement[]
  documents           Document[]
  comments            Comment[]
  createdAt           DateTime            @default(now())
  updatedAt           DateTime            @updatedAt
  
  @@index([locId])
  @@index([fiscalYear])
  @@index([status])
  @@index([phase])
}

model Project {
  id          String      @id @default(cuid())
  grantId     String
  grant       Grant       @relation(fields: [grantId], references: [id], onDelete: Cascade)
  projectType ProjectType
  description String
  cost        Decimal     @db.Money
  orderIndex  Int
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  @@index([grantId])
}

model GrantRequirement {
  id                   String          @id @default(cuid())
  grantId              String
  grant                Grant           @relation(fields: [grantId], references: [id], onDelete: Cascade)
  requirementType      RequirementType
  isCompleted          Boolean         @default(false)
  comment              String?
  reviewComments       String?         @db.Text
  pmAddressedComments  Boolean         @default(false)
  documents            Document[]
  createdAt            DateTime        @default(now())
  updatedAt            DateTime        @updatedAt
  
  @@unique([grantId, requirementType])
  @@index([grantId])
}

model Document {
  id              String            @id @default(cuid())
  grantId         String
  grant           Grant             @relation(fields: [grantId], references: [id], onDelete: Cascade)
  requirementId   String?
  requirement     GrantRequirement? @relation(fields: [requirementId], references: [id])
  fileName        String
  fileUrl         String
  fileSize        Int
  mimeType        String
  uploadedById    String
  uploadedBy      User              @relation(fields: [uploadedById], references: [id])
  uploadedAt      DateTime          @default(now())
  
  @@index([grantId])
  @@index([requirementId])
}

model Comment {
  id        String   @id @default(cuid())
  grantId   String
  grant     Grant    @relation(fields: [grantId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  text      String   @db.Text
  createdAt DateTime @default(now())
  
  @@index([grantId])
  @@index([createdAt(sort: Desc)])
}

// Enums
enum UserRole {
  PROGRAM_MANAGER
  PLANNER
  LEAD
  MANAGER
}

enum FundingType {
  ENTITLEMENT
  DISCRETIONARY
  BIL
}

enum Phase {
  PLANNING
  PRE_APP
  SUBMITTED
}

enum Status {
  NOT_STARTED
  IN_PROGRESS
  DOCUMENTS_NEEDED
  REVIEW
  ADDRESS_COMMENTS
  COMPLETE
}

enum EnvironmentalStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETE
  NA
}

enum ProjectType {
  CONSTRUCTION
  DESIGN
  PLANNING
  EQUIPMENT
  LAND
}

enum RequirementType {
  APPROACHES_CLEAR
  FIVE_YEAR_ACIP
  INITIAL_CIP_PACKAGE
  ENVIRONMENTAL_DOCUMENT
  PRE_APPLICATION
  PRE_GRANT_CONFERENCE
  PERADA
  SCOPE_CONFIRMED
  BIDS_RECEIVED
  FEE_ESTIMATE
  CSPP_AIRSPACE
  APPLICATION_RECEIVED
  SPONSOR_CERTIFICATIONS
}
```

## Key Business Logic

### Grant Number Format
- Pattern: `{airport_prefix}-{sequential_number}-{fiscal_year}`
- Example: `3-45-0022-001-2025`
- New grants start with "TBD" for sequential number
- BIL companion grants append "-BIL" suffix

### Automatic Calculations
1. **Total Grant Cost**: Sum of all associated project costs
2. **Status Transitions**: Based on requirement completions
3. **Phase Progression**: Planning → Pre-app → Submitted

### Requirement Rules
- Each grant automatically gets all requirement types on creation
- Documents can be attached to specific requirements
- Review comments trigger "Address Comments" status
- PM can mark comments as addressed

## API Routes Structure

```typescript
// Grants
GET    /api/grants                 // List with filters
POST   /api/grants                 // Create new grant
GET    /api/grants/[id]           // Get grant details
PUT    /api/grants/[id]           // Update grant
DELETE /api/grants/[id]           // Delete grant

// Projects
GET    /api/grants/[id]/projects           // List projects
POST   /api/grants/[id]/projects           // Add project
PUT    /api/grants/[id]/projects/[pid]     // Update project
DELETE /api/grants/[id]/projects/[pid]     // Delete project

// Requirements
GET    /api/grants/[id]/requirements       // List requirements
PUT    /api/grants/[id]/requirements/[rid] // Update requirement

// Documents
GET    /api/grants/[id]/documents          // List documents
POST   /api/grants/[id]/documents          // Upload document
DELETE /api/grants/[id]/documents/[did]    // Delete document

// Comments
GET    /api/grants/[id]/comments           // List comments
POST   /api/grants/[id]/comments           // Add comment
```

## Sample Data Seeds

### Airports
```javascript
const airports = [
  { locId: 'ATL', name: 'Hartsfield-Jackson', state: 'GA', grantPrefix: '3-13-0003' },
  { locId: 'CHS', name: 'Charleston International', state: 'SC', grantPrefix: '3-45-0022' },
  { locId: 'SJU', name: 'San Juan', state: 'PR', grantPrefix: '3-72-0001' },
  // ... etc
];
```

### Users
```javascript
const users = [
  { name: 'R. Martinez', role: 'PROGRAM_MANAGER' },
  { name: 'P. Anderson', role: 'PLANNER' },
  { name: 'J. Smith', role: 'PROGRAM_MANAGER' },
  // ... etc
];
```

## Query Examples

### Get Pipeline View Data
```typescript
const grants = await prisma.grant.findMany({
  where: {
    fiscalYear: 2025,
    status: { not: 'COMPLETE' }
  },
  include: {
    airport: true,
    projects: {
      select: { cost: true }
    },
    planner: { select: { name: true } },
    programManager: { select: { name: true } }
  },
  orderBy: [
    { status: 'asc' },
    { locId: 'asc' }
  ]
});
```

### Get Grant Detail
```typescript
const grant = await prisma.grant.findUnique({
  where: { id: grantId },
  include: {
    airport: true,
    projects: { orderBy: { orderIndex: 'asc' } },
    requirements: {
      include: {
        documents: {
          include: { uploadedBy: true }
        }
      }
    },
    comments: {
      include: { user: true },
      orderBy: { createdAt: 'desc' }
    },
    planner: true,
    programManager: true,
    companionGrant: true
  }
});
```

### Update Grant Status
```typescript
await prisma.grant.update({
  where: { id: grantId },
  data: {
    status: 'IN_PROGRESS',
    phase: 'PRE_APP',
    updatedAt: new Date()
  }
});
```

