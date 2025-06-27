export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface Branch {
  _id: string;
  churchId: string;
  branchName: string;
  address: string;
  country: string;
  establishedDate: string; // ISO string; use `Date` if you parse it
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BranchListResponse {
  branches: Branch[];
  pagination: Pagination;
}
