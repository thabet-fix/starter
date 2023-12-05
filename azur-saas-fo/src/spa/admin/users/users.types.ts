import { Pack } from '@/spa/Packs/Pack.type';

export type UserRole = 'ROLE_ADMIN' | 'ROLE_USER';

export type User = {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  email: string;
  activated: boolean;
  langKey: string;
  authorities: UserRole[];
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  phoneNumber?: string;
  isAdmin?: boolean;
  employerId?: number | null;
  packId?: number | null;
  pack?: Pack;
  contractNbCreated: number;
  isPremium: boolean;
};

export type UserList = {
  content: User[];
  totalItems: number;
};

export type UserListResult = {
  data: User[];
  current_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
  from: number;
  to: number;
  total: number;
  last_page: number;
  per_page: number;
};
