// Central export for all mock data and types

export * from './types';
export * from './airports';
export * from './users';
export * from './grants';

// Initialize mock data on import
import { initializeMockData } from './grants';
initializeMockData();