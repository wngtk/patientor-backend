export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: {
    date: string
    criteria: string
  }
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: number
}

type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export enum Gender {
  Male = "male",
  Female = 'female',
  Other = 'other'
}

export type NoSensitivePatient = Omit<Patient, 'ssn' | 'entries'>

export type PatientWithoutSSN = Omit<Patient, 'ssn'>

export type NewPatient = Omit<Patient, 'id'>
