export type TmContract = {
  id: number;
  number: string;
  companyRepresentative?: string;
  companyEmail?: string;
  companyPhone: string;
  representativeFirstName: boolean;
  representativeLastName: string;
  representativeAddress?: string;
  designation?: string;
  manifacturer?: string;
  price?: string;
  commision?: string;
  deliveryAddress?: string;
  buyerName?: string;
  companyName?: string;
  buyerSignature?: string;
  companySignature?: string;
  pdfUrlLang1?: string;
  pdfUrlLang2?: string;
  lang?: string;
};

export type AcContractList = {
  content: TmContract[];
  totalItems?: number;
};
