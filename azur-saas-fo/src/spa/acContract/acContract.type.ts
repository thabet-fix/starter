export type AcContract = {
  id: number;
  number: string;
  name?: string;
  passportId?: string;
  zipCode: string;
  address: boolean;
  nationality: string;
  city?: string;
  phoneNumber?: string;
  bank?: string;
  iban?: string;
  swift?: string;
  buyerSignature?: string;
  companySignature?: string;
  lang?: string;
  created_at?: string;
  pdfUrlLang1?: string;
  pdfUrlLang2?: string;
  email?: string;
};

export type AcContractList = {
  content: AcContract[];
  totalItems?: number;
};
