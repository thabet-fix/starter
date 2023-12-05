import { User } from '../admin/users/users.types';
import { Template } from '../contractTemplate/Template.type';

export type StandardContract = {
  id: number;
  number: string;
  buyerSignature?: string;
  companySignature?: string;
  lang?: string;
  created_at?: string;
  templateId?: string;
  template?: Template;
  fields?: SdField[];
  created_by: User;
};

export type StandardContractList = {
  content: StandardContract[];
  totalItems?: number;
};

export type SdField = {
  field: string;
  value: string;
};

export type SdListResult = {
  data: StandardContract[];
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

  value: string;
};
