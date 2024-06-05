export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export interface Entry {

}

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
  MALE = "male",
  FEMALE = 'female',
  OTHER = 'other'
}

export type NoSensitivePatient = Omit<Patient, 'ssn' | 'entries'>

export type PatientWithoutSSN = Omit<Patient, 'ssn'>

export type NewPatient = Omit<Patient, 'id'>
