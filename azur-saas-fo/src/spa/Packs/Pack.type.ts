export type Pack = {
  id: number;
  name: string;
  description: string;
  price: string;
  stripeId: string;
  contractNb?: string;
  optionAi: string | boolean;
  period: string;
  quotaAi: number;
};

export type PackDetails = {
  id: number;
  status: string;
  sessionId: string;
  userId?: string;
  contractNb?: number;
  optionAi: string | boolean;
  quotaAi: number;
  expiredIn: string;
  isExpired: boolean;
  packId: number;
  price: string;
  pack: Pack;
};

export type PackListResult = {
  data: Pack[];
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
