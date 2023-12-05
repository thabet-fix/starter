import { Language } from '../language/Language.type';

export type Template = {
  id: number;
  name: string;
  content: string;
  contents: Content[];
  language?: Language;
  labelSign1: string;
  labelSign2: string;
};

export type Content = {
  id: number | string;
  content: string;
  langId: number | string;
  templateId: number | string;
  language: Language;
};

export type TemplateListResult = {
  data: Template[];
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
