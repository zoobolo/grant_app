import { User, UserRole } from './types';

export const users: User[] = [
  // Program Managers
  {
    id: 'user-pm-1',
    email: 'r.martinez@faa.gov',
    name: 'R. Martinez',
    role: 'PROGRAM_MANAGER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-pm-2',
    email: 'j.smith@faa.gov',
    name: 'J. Smith',
    role: 'PROGRAM_MANAGER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-pm-3',
    email: 'k.davis@faa.gov',
    name: 'K. Davis',
    role: 'PROGRAM_MANAGER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-pm-4',
    email: 'm.johnson@faa.gov',
    name: 'M. Johnson',
    role: 'PROGRAM_MANAGER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-pm-5',
    email: 't.wilson@faa.gov',
    name: 'T. Wilson',
    role: 'PROGRAM_MANAGER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-pm-6',
    email: 'l.rodriguez@faa.gov',
    name: 'L. Rodriguez',
    role: 'PROGRAM_MANAGER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-pm-7',
    email: 'a.brown@faa.gov',
    name: 'A. Brown',
    role: 'PROGRAM_MANAGER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-pm-8',
    email: 's.thompson@faa.gov',
    name: 'S. Thompson',
    role: 'PROGRAM_MANAGER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  
  // Planners
  {
    id: 'user-planner-1',
    email: 'p.anderson@faa.gov',
    name: 'P. Anderson',
    role: 'PLANNER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-planner-2',
    email: 'd.miller@faa.gov',
    name: 'D. Miller',
    role: 'PLANNER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-planner-3',
    email: 'b.taylor@faa.gov',
    name: 'B. Taylor',
    role: 'PLANNER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-planner-4',
    email: 'c.white@faa.gov',
    name: 'C. White',
    role: 'PLANNER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  
  // Leads
  {
    id: 'user-lead-1',
    email: 'e.jackson@faa.gov',
    name: 'E. Jackson',
    role: 'LEAD' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-lead-2',
    email: 'f.garcia@faa.gov',
    name: 'F. Garcia',
    role: 'LEAD' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  
  // Managers
  {
    id: 'user-manager-1',
    email: 'g.harris@faa.gov',
    name: 'G. Harris',
    role: 'MANAGER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: 'user-manager-2',
    email: 'h.martin@faa.gov',
    name: 'H. Martin',
    role: 'MANAGER' as UserRole,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  }
];

// Helper functions
export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function getUsersByRole(role: UserRole): User[] {
  return users.filter(user => user.role === role);
}

export function getProgramManagers(): User[] {
  return getUsersByRole('PROGRAM_MANAGER');
}

export function getPlanners(): User[] {
  return getUsersByRole('PLANNER');
}

export function getLeads(): User[] {
  return getUsersByRole('LEAD');
}

export function getManagers(): User[] {
  return getUsersByRole('MANAGER');
}