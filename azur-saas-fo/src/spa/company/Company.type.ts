export type Company = {
  id: number;
  denomination: string;
  presidentName: string;
  siret: string;
  siren: string;
  activated: boolean | string;
  adresse: string;
  postalCode: string;
  logo: string;
};

export type CompanyListResult = {
  data: Company[];
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
