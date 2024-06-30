export interface AgeGroup {
  start_age: number;
  end_age?: number;
}

export const ageGroups: AgeGroup[] = [
  { start_age: 18, end_age: 29 },
  { start_age: 30, end_age: 39 },
  { start_age: 30, end_age: 49 },
  { start_age: 55 },
];
