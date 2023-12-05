import React from 'react';

import { Center, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { FieldInput } from '@/components/FieldInput';

export const TmContractForm = ({}) => {
  const { t } = useTranslation(['common', 'tmContract', 'dashboard']);
  return (
    <>
      <Center>
        <Text as="b" fontSize="xl">
          {t('tmContract:transferContract')}
        </Text>
      </Center>
      <Text as="b">
        {t('tmContract:Date')} {new Date().toLocaleDateString() + ''}
      </Text>
      {/* OWNER COMPANY THAT FINANCES THE ACQUISITION OF (THE) GOOD(S) */}
      <Text as="b">{t('tmContract:ownerCompany.title')}</Text>
      <Text>{t('tmContract:ownerCompany.company')}</Text>
      <FieldInput
        name="companyRepresentative"
        label={t('tmContract:ownerCompany.RepresentedBy')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="companyPhone"
        label={t('tmContract:ownerCompany.Telephone')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="companyEmail"
        label={t('tmContract:ownerCompany.Email')}
        required={t('common:use.required')}
      />
      {/* AGENT REPRESENTATIVE */}
      <Text as="b">II. {t('tmContract:agentRepresentative.title')}</Text>
      <FieldInput
        name="representativeFirstName"
        label={t('tmContract:agentRepresentative.Name')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="representativeLastName"
        label={t('tmContract:agentRepresentative.LastName')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="representativeAddress"
        label={t('tmContract:agentRepresentative.Adresse')}
        required={t('common:use.required')}
      />
      {/* DESCRIPTION OF THE PRODUCT, SUBJECT OF PURCHASE*/}
      <Text as="b">{t('tmContract:product.title')}</Text>
      <FieldInput
        name="designation"
        label={t('tmContract:product.Designation')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="manifacturer"
        label={t('tmContract:product.Manufacturer')}
        required={t('common:use.required')}
      />
      {/* IV. PRICE PAID AND COMMISSION RULES */}
      <Text as={'b'}> {t('tmContract:Payment.title')} </Text>
      <Text> {t('tmContract:Payment.productPriceInTheStore')} </Text>
      <FieldInput
        name="price"
        label="(En Euros)"
        required={t('common:use.required')}
      />
      <Text> {t('tmContract:Payment.commission')} </Text>
      <FieldInput
        name="commision"
        label="(En Euros)"
        required={t('common:use.required')}
      />
      <Text> {t('tmContract:Payment.priceDescribed')} </Text>
      {/* DELIVERY, INSPECTION AND CLAIMS */}
      <Text as={'b'}> {t('tmContract:delivery.title')} </Text>
      <Text> {t('tmContract:delivery.clause1')} </Text>
      <FieldInput
        name="deliveryAddress"
        label=""
        required={t('common:use.required')}
      />
      <Text> {t('tmContract:delivery.clause2')} </Text>
      <Text> {t('tmContract:delivery.clause3')} </Text>
      {/* VI. DISPUTES AND LIABILITIES */}
      <Text as={'b'}> {t('tmContract:disputes.title')} </Text>
      <Text> {t('tmContract:disputes.clause1')} </Text>
      <Text> {t('tmContract:disputes.clause2')} </Text>
      {/* VII. COMMUNICATION AND NOTIFICATIONS*/}
      <Text as={'b'}> {t('tmContract:communication.title')} </Text>
      <Text> {t('tmContract:communication.clause')} </Text>
    </>
  );
};
