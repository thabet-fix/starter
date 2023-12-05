import React from 'react';

import { Box, Center, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { FieldInput } from '@/components/FieldInput';

export const AcContractForm = ({}) => {
  const { t } = useTranslation(['common', 'acContract', 'dashboard']);
  return (
    <>
      <Center>
        <Text as="b" fontSize="xl">
          {t('acContract:commissionArgrement')}
        </Text>
      </Center>
      <Center>
        <Text as="b">{t('acContract:GeneralContractOfOrder')}</Text>
      </Center>
      <Text as="b">
        {t('acContract:Date')} {new Date().toLocaleDateString() + ''}
      </Text>
      <Box as="span">
        {t('acContract:AzurAlianceJsc')} {t('acContract:refferedToAzurAliance')}
      </Box>
      <Text as="b">{t('acContract:referredToCompany.title')}</Text>
      <FieldInput
        name="name"
        label={t('acContract:referredToCompany.Name')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="passportId"
        label={t('acContract:referredToCompany.IdPassport')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="nationality"
        label={t('acContract:referredToCompany.Nationality')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="address"
        label={t('acContract:referredToCompany.Adresse')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="zipCode"
        label={t('acContract:referredToCompany.ZipCode')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="city"
        label={t('acContract:referredToCompany.City')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="phoneNumber"
        label={t('acContract:referredToCompany.Telephone')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="email"
        label={t('acContract:referredToCompany.Email')}
        required={t('common:use.required')}
      />
      <Text as="b">{t('acContract:refferedToBuyer.title')}</Text>
      <Text>{t('acContract:refferedToBuyer.clause1')}</Text>
      <Text>{t('acContract:refferedToBuyer.clause2')}</Text>
      {/* I. General Conditions */}
      {/* 1. General Conditions */}
      <Text as="b">{t('acContract:GeneralConditions.title')}</Text>
      <Text as="b">
        {t('acContract:GeneralConditions.GeneralConditions.title')}
      </Text>
      <Text>{t('acContract:GeneralConditions.GeneralConditions.clause1')}</Text>
      <Text>{t('acContract:GeneralConditions.GeneralConditions.clause2')}</Text>
      <Text>{t('acContract:GeneralConditions.GeneralConditions.clause3')}</Text>
      <Text>{t('acContract:GeneralConditions.GeneralConditions.clause4')}</Text>
      <Text>{t('acContract:GeneralConditions.GeneralConditions.clause5')}</Text>
      <Text>{t('acContract:GeneralConditions.GeneralConditions.clause6')}</Text>

      {/* 2. Purchase Price / Service Fee / Order */}
      <Text as="b">
        {t('acContract:GeneralConditions.PurchasePriceServiceFeeOrder.title')}
      </Text>
      <Text>{t('acContract:GeneralConditions.GeneralConditions.clause1')}</Text>
      <Text>{t('acContract:GeneralConditions.GeneralConditions.clause2')}</Text>
      <Text>{t('acContract:GeneralConditions.GeneralConditions.clause3')}</Text>

      {/* 3. Ownership of purchased goods */}
      <Text as="b">
        {t('acContract:GeneralConditions.OwnershipOfPurchasedGoods.title')}
      </Text>
      <Text>
        {t('acContract:GeneralConditions.OwnershipOfPurchasedGoods.clause1')}
      </Text>
      <Text>
        {t('acContract:GeneralConditions.OwnershipOfPurchasedGoods.clause2')}
      </Text>
      {/* 4. Modalities for the provision of services */}
      <Text as="b">
        {t(
          'acContract:GeneralConditions.ModalitiesForTheProvisionOfServices.title'
        )}
      </Text>
      <Text>
        {t(
          'acContract:GeneralConditions.ModalitiesForTheProvisionOfServices.clause1'
        )}
      </Text>

      {/* I. Payment */}
      <Text as="b">{t('acContract:Payment.title')}</Text>
      {/* 1. General Conditions */}
      <Text as="b">{t('acContract:Payment.Payment.title')}</Text>
      <Text>{t('acContract:Payment.Payment.clause')}</Text>
      {/* 2. Payment for services provided (Service / Order) */}
      <Text as="b">
        {t('acContract:Payment.PaymentFoServicesProvided.title')}
      </Text>
      <Text>{t('acContract:Payment.PaymentFoServicesProvided.clause1')}</Text>
      <Text>{t('acContract:Payment.PaymentFoServicesProvided.clause2')}</Text>
      <FieldInput
        name="bank"
        label={t('acContract:Payment.PaymentFoServicesProvided.bank')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="swift"
        label={t('acContract:Payment.PaymentFoServicesProvided.swift')}
        required={t('common:use.required')}
      />
      <FieldInput
        name="iban"
        label={t('acContract:Payment.PaymentFoServicesProvided.iban')}
        required={t('common:use.required')}
      />
      {/* III. Termination and Liability */}
      <Text as="b">{t('acContract:TerminationAndLiability.title')}</Text>
      <Text>{t('acContract:TerminationAndLiability.clause1')}</Text>
      <Text>{t('acContract:TerminationAndLiability.clause2')}</Text>
      <Text>{t('acContract:TerminationAndLiability.clause3')}</Text>
      <Text as="b">{t('acContract:TerminationAndLiability.addressL1')}</Text>
      <Text as="b">{t('acContract:TerminationAndLiability.addressL2')}</Text>
      <Text as="b">{t('acContract:TerminationAndLiability.addressL3')}</Text>
      <Text>{t('acContract:TerminationAndLiability.note')}</Text>

      {/* III. IV. Loyalty and ethics */}
      <Text as="b">{t('acContract:LoyaltyAndEthics.title')}</Text>
      <Text>{t('acContract:LoyaltyAndEthics.clause1')}</Text>
      <Text>{t('acContract:LoyaltyAndEthics.clause2')}</Text>
      <Text>{t('acContract:LoyaltyAndEthics.clause3')}</Text>
    </>
  );
};
