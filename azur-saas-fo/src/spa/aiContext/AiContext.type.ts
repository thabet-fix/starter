export type Context = {
  id: number;
  name: string;
  context: string;
  fields: Field[];
};

export type Field = {
  id?: number;
  label: string;
  value: string;
};

export type ContextListResult = {
  data: Context[];
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
