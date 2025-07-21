export interface AppealRecord {
  id: number;
  taxYear: number | null;
  company: string;
  state: string;
  assessor: string;
  account: string;
  appealedDate: string;
}
