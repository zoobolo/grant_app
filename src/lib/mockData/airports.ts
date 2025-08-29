import { Airport } from './types';

export const airports: Airport[] = [
  {
    id: 'airport-1',
    locId: 'ATL',
    name: 'Hartsfield-Jackson Atlanta International',
    state: 'GA',
    region: 'SO',
    grantPrefix: '3-13-0003'
  },
  {
    id: 'airport-2',
    locId: 'CHS',
    name: 'Charleston International',
    state: 'SC',
    region: 'SO',
    grantPrefix: '3-45-0022'
  },
  {
    id: 'airport-3',
    locId: 'SJU',
    name: 'Luis Muñoz Marín International',
    state: 'PR',
    region: 'SO',
    grantPrefix: '3-72-0001'
  },
  {
    id: 'airport-4',
    locId: 'GSP',
    name: 'Greenville-Spartanburg International',
    state: 'SC',
    region: 'SO',
    grantPrefix: '3-45-0019'
  },
  {
    id: 'airport-5',
    locId: 'MCN',
    name: 'Middle Georgia Regional',
    state: 'GA',
    region: 'SO',
    grantPrefix: '3-13-0011'
  },
  {
    id: 'airport-6',
    locId: 'SAV',
    name: 'Savannah/Hilton Head International',
    state: 'GA',
    region: 'SO',
    grantPrefix: '3-13-0015'
  },
  {
    id: 'airport-7',
    locId: 'STT',
    name: 'Cyril E. King',
    state: 'VI',
    region: 'SO',
    grantPrefix: '3-78-0002'
  },
  {
    id: 'airport-8',
    locId: 'BQK',
    name: 'Brunswick Golden Isles',
    state: 'GA',
    region: 'SO',
    grantPrefix: '3-13-0006'
  },
  {
    id: 'airport-9',
    locId: 'CAE',
    name: 'Columbia Metropolitan',
    state: 'SC',
    region: 'SO',
    grantPrefix: '3-45-0009'
  },
  {
    id: 'airport-10',
    locId: 'AGS',
    name: 'Augusta Regional',
    state: 'GA',
    region: 'SO',
    grantPrefix: '3-13-0041'
  },
  {
    id: 'airport-11',
    locId: 'ABY',
    name: 'Southwest Georgia Regional',
    state: 'GA',
    region: 'SO',
    grantPrefix: '3-13-0028'
  },
  {
    id: 'airport-12',
    locId: 'CSG',
    name: 'Columbus Airport',
    state: 'GA',
    region: 'SO',
    grantPrefix: '3-13-0008'
  },
  {
    id: 'airport-13',
    locId: 'VLD',
    name: 'Valdosta Regional',
    state: 'GA',
    region: 'SO',
    grantPrefix: '3-13-0012'
  },
  {
    id: 'airport-14',
    locId: 'PSE',
    name: 'Mercedita International',
    state: 'PR',
    region: 'SO',
    grantPrefix: '3-72-0005'
  },
  {
    id: 'airport-15',
    locId: 'MYR',
    name: 'Myrtle Beach International',
    state: 'SC',
    region: 'SO',
    grantPrefix: '3-45-0031'
  },
  {
    id: 'airport-16',
    locId: 'FLO',
    name: 'Florence Regional',
    state: 'SC',
    region: 'SO',
    grantPrefix: '3-45-0018'
  },
  {
    id: 'airport-17',
    locId: 'HHH',
    name: 'Hilton Head',
    state: 'SC',
    region: 'SO',
    grantPrefix: '3-45-0048'
  },
  {
    id: 'airport-18',
    locId: 'GNV',
    name: 'Gainesville Regional',
    state: 'FL',
    region: 'SO',
    grantPrefix: '3-12-0041'
  },
  {
    id: 'airport-19',
    locId: 'TLH',
    name: 'Tallahassee International',
    state: 'FL',
    region: 'SO',
    grantPrefix: '3-12-0068'
  },
  {
    id: 'airport-20',
    locId: 'JAX',
    name: 'Jacksonville International',
    state: 'FL',
    region: 'SO',
    grantPrefix: '3-12-0050'
  }
];

// Helper function to get airport by LOCID
export function getAirportByLocId(locId: string): Airport | undefined {
  return airports.find(airport => airport.locId === locId);
}

// Helper function to get airports by state
export function getAirportsByState(state: string): Airport[] {
  return airports.filter(airport => airport.state === state);
}

// Get unique states
export function getUniqueStates(): string[] {
  const states = new Set(airports.map(airport => airport.state));
  return Array.from(states).sort();
}

// Get unique LOCIDs for dropdown
export function getLocIds(): string[] {
  return airports.map(airport => airport.locId).sort();
}