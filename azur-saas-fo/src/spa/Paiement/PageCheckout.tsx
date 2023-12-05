import { Box, Button, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { isEmail, isMaxLength, isMinLength } from '@formiz/validations';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FieldInput } from '@/components/FieldInput';
import { useToastError, useToastSuccess } from '@/components/Toast';

import { Page, PageContent, PageTopBar } from '../layout';
import { useStripeSubscription } from './Payment.service';

const stripePromise = loadStripe(
  'pk_test_51NIZ4WG8uVEVd2p0VOXiC5Xj1CF0dgN2mcexr1tk6NHaIeBPGXkNLbk6hqQ1xOEAkFJOf1khLdUFNJd5M68ntnly00PhkgvDpF'
);

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const toastError = useToastError();
  const toastSuccess = useToastSuccess();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const packStripeId = params.get('packStripeId');
  const navigate = useNavigate();
  const { mutate: subscription } = useStripeSubscription({
    onSuccess: () => {
      toastSuccess({
        title: 'votre abonnement à été activé avec success',
      });
      navigate('/admin/settings/billing');
    },
    onError: (error: TODO) => {
      toastError({
        title: error.response.data,
      });
    },
  });
  const handleCheckout = async (values: TODO) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (cardElement) {
      // Create a token from the card element
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        toastError({
          title: t('common:use.errorOccurred'),
        });
        // Handle errors
      } else {
        // Send the token to your server or handle it as needed
        const data = {
          token: token,
          packStripeId: packStripeId,
          ...values,
        };
        try {
          await subscription(data);
        } catch (error) {
          toastError({
            title: t('common:use.errorOccurred'),
          });
        }
      }
    } else {
      // Handle the case where cardElement is null
      console.error('Card element is null');
    }
  };
  const form = useForm({ subscribe: false });
  const { t } = useTranslation(['common', 'account', 'users', 'payment']);
  return (
    <Formiz id="create-user-form" onValidSubmit={handleCheckout} connect={form}>
      <form onSubmit={form.submit}>
        <Stack bg={'white'} p="7" m="10px">
          <FieldInput
            name="name"
            label={t('account:data.firstname.label')}
            required={t('account:data.firstname.required') as string}
          />
          <FieldInput
            name="email"
            label={t('account:data.email.label')}
            required={t('account:data.email.required') as string}
            validations={[
              {
                rule: isEmail(),
                message: t('account:data.email.invalid'),
              },
              {
                rule: isMinLength(5),
                message: t('account:data.email.tooShort', { min: 5 }),
              },
              {
                rule: isMaxLength(254),
                message: t('account:data.email.tooLong', { min: 254 }),
              },
            ]}
          />
          <FieldInput
            name="adresseFacturation"
            label={t('account:data.adresseFacturation.label')}
            validations={[
              {
                rule: isMaxLength(500),
                message: t('account:data.email.tooLong', { min: 500 }),
              },
            ]}
          />
          <Box pb={6}>
            <Text pb={3}>
              {t('payment:CardNumber')}{' '}
              <Text as={'b'} color="red">
                *
              </Text>
            </Text>
            <CardElement />
          </Box>
          <Button type="submit">{t('payment:Pay')}</Button>
        </Stack>
      </form>
    </Formiz>
  );
}

export const PageCheckout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'payment']);
  return (
    <Page containerSize="xl">
      <PageContent>
        <PageTopBar mb="4" w="full" showBack onBack={() => navigate(-1)}>
          <HStack justifyContent="space-between" zIndex="99">
            <Heading size="md"> {t('payment:Checkout')}</Heading>
          </HStack>
        </PageTopBar>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </PageContent>
    </Page>
  );
};
