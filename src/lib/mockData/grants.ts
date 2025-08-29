import { Grant, Project, GrantRequirement, GrantListItem, RequirementType } from './types';
import { airports } from './airports';
import { users } from './users';

// Helper to generate a grant ID
function generateGrantId(index: number): string {
  return `grant-${index.toString().padStart(3, '0')}`;
}

// Helper to generate grant requirements for each grant
function generateRequirements(grantId: string): GrantRequirement[] {
  const requirementTypes: RequirementType[] = [
    'APPROACHES_CLEAR',
    'FIVE_YEAR_ACIP',
    'INITIAL_CIP_PACKAGE',
    'ENVIRONMENTAL_DOCUMENT',
    'PRE_APPLICATION',
    'PRE_GRANT_CONFERENCE',
    'PERADA',
    'SCOPE_CONFIRMED',
    'BIDS_RECEIVED',
    'FEE_ESTIMATE',
    'CSPP_AIRSPACE',
    'APPLICATION_RECEIVED',
    'SPONSOR_CERTIFICATIONS'
  ];

  return requirementTypes.map((type, index) => ({
    id: `req-${grantId}-${index}`,
    grantId,
    requirementType: type,
    isCompleted: Math.random() > 0.5,
    comment: Math.random() > 0.7 ? 'Sample comment for this requirement' : undefined,
    reviewComments: Math.random() > 0.8 ? 'Review comment from ADO' : undefined,
    pmAddressedComments: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }));
}

// Generate sample projects
function generateProjects(grantId: string, count: number = 1): Project[] {
  const projectTypes = ['CONSTRUCTION', 'DESIGN', 'PLANNING', 'EQUIPMENT', 'LAND'] as const;
  const descriptions = [
    'Runway 15/33 Rehabilitation',
    'Taxiway B Realignment',
    'Terminal Apron Expansion Phase 2',
    'Runway Safety Area Improvements',
    'GA Ramp Expansion and Rehabilitation',
    'Perimeter Fencing Upgrade',
    'ARFF Vehicle Replacement',
    'Master Plan Update',
    'Snow Removal Equipment',
    'Terminal Building Design',
    'Runway Extension - 1000ft',
    'Apron Reconstruction Phase 1'
  ];

  const projects: Project[] = [];
  for (let i = 0; i < count; i++) {
    projects.push({
      id: `project-${grantId}-${i}`,
      grantId,
      projectType: projectTypes[Math.floor(Math.random() * projectTypes.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      cost: Math.floor(Math.random() * 10000000) + 500000,
      orderIndex: i,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    });
  }
  return projects;
}

// Generate mock grants
export function generateMockGrants(): Grant[] {
  const grants: Grant[] = [];
  const planners = users.filter(u => u.role === 'PLANNER');
  const pms = users.filter(u => u.role === 'PROGRAM_MANAGER');
  
  const statuses = ['NOT_STARTED', 'IN_PROGRESS', 'DOCUMENTS_NEEDED', 'REVIEW', 'ADDRESS_COMMENTS', 'COMPLETE'] as const;
  const phases = ['PLANNING', 'PRE_APP', 'SUBMITTED'] as const;
  const fundingTypes = ['ENTITLEMENT', 'DISCRETIONARY', 'BIL'] as const;
  const envStatuses = ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETE', 'NA'] as const;

  // Generate 50 grants
  for (let i = 0; i < 50; i++) {
    const airport = airports[Math.floor(Math.random() * airports.length)];
    const planner = planners[Math.floor(Math.random() * planners.length)];
    const pm = pms[Math.floor(Math.random() * pms.length)];
    const fiscalYear = 2024 + Math.floor(Math.random() * 2);
    const fundingType = fundingTypes[Math.floor(Math.random() * fundingTypes.length)];
    
    // Generate grant number
    const sequentialNumber = i < 25 ? 'TBD' : (100 + i).toString();
    const grantNumber = `${airport.grantPrefix}-${sequentialNumber}-${fiscalYear}`;
    
    const grantId = generateGrantId(i);
    const projects = generateProjects(grantId, Math.floor(Math.random() * 3) + 1);
    
    const grant: Grant = {
      id: grantId,
      grantNumber: fundingType === 'BIL' && Math.random() > 0.5 ? `${grantNumber}-BIL` : grantNumber,
      locId: airport.locId,
      airport,
      fiscalYear,
      fundingType,
      phase: phases[Math.floor(Math.random() * phases.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      environmentalStatus: envStatuses[Math.floor(Math.random() * envStatuses.length)],
      plannerId: planner.id,
      planner,
      programManagerId: pm.id,
      programManager: pm,
      soarStatus: Math.random() > 0.7 ? 'Active' : Math.random() > 0.5 ? 'Pending' : undefined,
      soarUpdatedAt: Math.random() > 0.5 ? new Date() : undefined,
      notes: Math.random() > 0.6 ? 'Sample notes for this grant' : undefined,
      projects,
      requirements: generateRequirements(grantId),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date()
    };
    
    grants.push(grant);
  }
  
  return grants;
}

// Convert Grant to GrantListItem for the pipeline view
export function grantToListItem(grant: Grant): GrantListItem {
  const primaryProject = grant.projects?.[0];
  const totalCost = grant.projects?.reduce((sum, p) => sum + p.cost, 0) || 0;
  
  return {
    id: grant.id,
    grantNumber: grant.grantNumber,
    locId: grant.locId,
    airportName: grant.airport?.name || '',
    state: grant.airport?.state || '',
    fiscalYear: grant.fiscalYear,
    description: primaryProject?.description || '',
    totalCost,
    fundingType: grant.fundingType,
    phase: grant.phase,
    status: grant.status,
    environmentalStatus: grant.environmentalStatus,
    plannerName: grant.planner?.name || '',
    pmName: grant.programManager?.name || '',
    soarStatus: grant.soarStatus,
    notes: grant.notes
  };
}

// Initialize mock grants
let mockGrants: Grant[] = [];

export function initializeMockData(): void {
  mockGrants = generateMockGrants();
}

export function getGrants(): Grant[] {
  if (mockGrants.length === 0) {
    initializeMockData();
  }
  return mockGrants;
}

export function getGrantById(id: string): Grant | undefined {
  if (mockGrants.length === 0) {
    initializeMockData();
  }
  return mockGrants.find(grant => grant.id === id);
}

export function getGrantListItems(): GrantListItem[] {
  return getGrants().map(grantToListItem);
}

// Add a new grant
export function addGrant(grant: Omit<Grant, 'id' | 'createdAt' | 'updatedAt'>): Grant {
  const newGrant: Grant = {
    ...grant,
    id: generateGrantId(mockGrants.length),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  mockGrants.push(newGrant);
  return newGrant;
}

// Update a grant
export function updateGrant(id: string, updates: Partial<Grant>): Grant | undefined {
  const index = mockGrants.findIndex(g => g.id === id);
  if (index === -1) return undefined;
  
  mockGrants[index] = {
    ...mockGrants[index],
    ...updates,
    updatedAt: new Date()
  };
  
  return mockGrants[index];
}

// Delete a grant
export function deleteGrant(id: string): boolean {
  const index = mockGrants.findIndex(g => g.id === id);
  if (index === -1) return false;
  
  mockGrants.splice(index, 1);
  return true;
}