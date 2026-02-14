/** Mock staff types */

export type StaffStatus = "active" | "inactive";

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  status: StaffStatus;
  [key: string]: unknown;
}

export type SBStaff = Staff;
