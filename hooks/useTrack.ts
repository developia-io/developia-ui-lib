import { useCallback } from 'react';
import { FunnelExtraType, ILogRequest } from '@/interfaces/log.interface';
import { useSendLogMutation } from '@/store/services/logService';

export default function useTrack() {
  const [triggerFunnel] = useSendLogMutation();

  const funnelLogRequest = useCallback(
    (payload: ILogRequest) => {
      triggerFunnel(payload);
    },
    [triggerFunnel]
  );

  const contactHostLog = useCallback(
    ({ SelectedDates, VisitedProductId, ChatId }: FunnelExtraType) => {
      funnelLogRequest({
        Action: 'CONTACT_HOST',
        Extra: { SelectedDates, VisitedProductId, ChatId },
      });
    },
    [funnelLogRequest]
  );

  const reservationRequestLog = useCallback(
    ({ SelectedDates, VisitedProductId }: FunnelExtraType) => {
      funnelLogRequest({
        Action: 'REQUEST_FOR_BOOKING',
        Extra: { SelectedDates, VisitedProductId },
      });
    },
    [funnelLogRequest]
  );

  const loginLog = useCallback(() => {
    funnelLogRequest({ Action: 'LOGIN' });
  }, [funnelLogRequest]);

  const registerLog = useCallback(() => {
    funnelLogRequest({ Action: 'SIGNUP' });
  }, [funnelLogRequest]);

  const checkoutAddressLog = useCallback(
    ({ VisitedProductId, SelectedDates }: FunnelExtraType) => {
      funnelLogRequest({
        Action: 'CHECKOUT_ADDRESS',
        Extra: { VisitedProductId, SelectedDates },
      });
    },
    [funnelLogRequest]
  );

  const checkoutAddonsLog = useCallback(
    ({ VisitedProductId, SelectedDates }: FunnelExtraType) => {
      funnelLogRequest({
        Action: 'CHECKOUT_ADDONS',
        Extra: { VisitedProductId, SelectedDates },
      });
    },
    [funnelLogRequest]
  );

  const checkoutPaymentLog = useCallback(
    ({ VisitedProductId, SelectedDates }: FunnelExtraType) => {
      funnelLogRequest({
        Action: 'CHECKOUT_PAYMENT',
        Extra: { VisitedProductId, SelectedDates },
      });
    },
    [funnelLogRequest]
  );

  const checkoutSuccessLog = useCallback(
    ({ VisitedProductId, SelectedDates }: FunnelExtraType) => {
      funnelLogRequest({
        Action: 'CHECKOUT_SUCCESS',
        Extra: { VisitedProductId, SelectedDates },
      });
    },
    [funnelLogRequest]
  );

  const bookedLog = useCallback(
    ({ VisitedProductId, SelectedDates }: FunnelExtraType) => {
      funnelLogRequest({
        Action: 'BOOKED',
        Extra: { VisitedProductId, SelectedDates },
      });
    },
    [funnelLogRequest]
  );

  const paymentLinkSent = useCallback(
    ({ VisitedProductId, SelectedDates }: FunnelExtraType) => {
      funnelLogRequest({
        Action: 'PAYMENT_LINK_SENT',
        Extra: { VisitedProductId, SelectedDates },
      });
    },
    [funnelLogRequest]
  );

  const setDatesLog = useCallback(
    ({ VisitedProductId, SelectedDates }: FunnelExtraType) => {
      funnelLogRequest({
        Action: 'SET_DATES',
        Extra: { VisitedProductId, SelectedDates },
      });
    },
    [funnelLogRequest]
  );

  const productVisitLog = useCallback(
    ({ VisitedProductId, SelectedDates, Guest }: FunnelExtraType) => {
      funnelLogRequest({
        Action: 'PRODUCT_VISIT',
        Extra: { VisitedProductId, SelectedDates, Guest },
      });
    },
    [funnelLogRequest]
  );

  const getAssistanceFromSubmittionLog = useCallback(() => {
    funnelLogRequest({
      Action: 'GET_ASSISTANCE_FORM_SUBMITTION',
    });
  }, [funnelLogRequest]);

  const inquireToBookRouteLog = useCallback(
    ({ VisitedProductId, SelectedDates, RouteId }: FunnelExtraType) => {
      funnelLogRequest({
        Action: 'INQUIRE_TO_BOOK_ROUTE',
        Extra: { VisitedProductId, SelectedDates, RouteId },
      });
    },
    [funnelLogRequest]
  );

  return {
    funnelLogRequest,
    contactHostLog,
    reservationRequestLog,
    loginLog,
    registerLog,
    productVisitLog,
    setDatesLog,
    bookedLog,
    paymentLinkSent,
    getAssistanceFromSubmittionLog,
    checkoutAddressLog,
    checkoutAddonsLog,
    checkoutPaymentLog,
    checkoutSuccessLog,
    inquireToBookRouteLog,
  };
}
