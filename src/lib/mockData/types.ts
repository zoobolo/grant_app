// Type definitions for the Grant Management System

export type UserRole = 'PROGRAM_MANAGER' | 'PLANNER' | 'LEAD' | 'MANAGER';

export type FundingType = 'ENTITLEMENT' | 'DISCRETIONARY' | 'BIL';

export type Phase = 'PLANNING' | 'PRE_APP' | 'SUBMITTED';

export type Status = 
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'DOCUMENTS_NEEDED'
  | 'REVIEW'
  | 'ADDRESS_COMMENTS'
  | 'COMPLETE';

export type EnvironmentalStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETE' | 'NA';

export type ProjectType = 'CONSTRUCTION' | 'DESIGN' | 'PLANNING' | 'EQUIPMENT' | 'LAND';

export type RequirementType =
  | 'APPROACHES_CLEAR'
  | 'FIVE_YEAR_ACIP'
  | 'INITIAL_CIP_PACKAGE'
  | 'ENVIRONMENTAL_DOCUMENT'
  | 'PRE_APPLICATION'
  | 'PRE_GRANT_CONFERENCE'
  | 'PERADA'
  | 'SCOPE_CONFIRMED'
  | 'BIDS_RECEIVED'
  | 'FEE_ESTIMATE'
  | 'CSPP_AIRSPACE'
  | 'APPLICATION_RECEIVED'
  | 'SPONSOR_CERTIFICATIONS';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Airport {
  id: string;
  locId: string;
  name: string;
  state: string;
  region: string;
  grantPrefix: string;
}

export interface Project {
  id: string;
  grantId: string;
  projectType: ProjectType;
  description: string;
  cost: number;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GrantRequirement {
  id: string;
  grantId: string;
  requirementType: RequirementType;
  isCompleted: boolean;
  comment?: string;
  reviewComments?: string;
  pmAddressedComments: boolean;
  documents?: Document[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  grantId: string;
  requirementId?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedById: string;
  uploadedBy?: User;
  uploadedAt: Date;
}

export interface Comment {
  id: string;
  grantId: string;
  userId: string;
  user?: User;
  text: string;
  createdAt: Date;
}

export interface Grant {
  id: string;
  grantNumber: string;
  locId: string;
  airport?: Airport;
  fiscalYear: number;
  fundingType: FundingType;
  phase: Phase;
  status: Status;
  environmentalStatus: EnvironmentalStatus;
  plannerId: string;
  planner?: User;
  programManagerId: string;
  programManager?: User;
  soarStatus?: string;
  soarUpdatedAt?: Date;
  companionGrantId?: string;
  companionGrant?: Grant;
  notes?: string;
  projects?: Project[];
  requirements?: GrantRequirement[];
  documents?: Document[];
  comments?: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

// Helper type for grant list view
export interface GrantListItem {
  id: string;
  grantNumber: string;
  locId: string;
  airportName: string;
  state: string;
  fiscalYear: number;
  description: string; // Primary project description
  totalCost: number;
  fundingType: FundingType;
  phase: Phase;
  status: Status;
  environmentalStatus: EnvironmentalStatus;
  plannerName: string;
  pmName: string;
  soarStatus?: string;
  notes?: string;
}

// Form types for creating/editing
export interface GrantFormData {
  locId: string;
  fiscalYear: number;
  fundingType: FundingType;
  phase: Phase;
  status: Status;
  environmentalStatus: EnvironmentalStatus;
  plannerId: string;
  programManagerId: string;
  notes?: string;
  projects: ProjectFormData[];
}

export interface ProjectFormData {
  projectType: ProjectType;
  description: string;
  cost: number;
  orderIndex?: number;
}

// Filter types for pipeline view
export interface GrantFilters {
  fiscalYear?: number;
  locId?: string;
  state?: string;
  phase?: Phase[];
  status?: Status[];
  fundingType?: FundingType[];
  environmentalStatus?: EnvironmentalStatus;
  plannerId?: string;
  programManagerId?: string;
  searchText?: string;
}

// Sort configuration
export interface SortConfig {
  field: keyof GrantListItem;
  direction: 'asc' | 'desc';
}