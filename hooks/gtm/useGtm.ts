import { useCallback } from 'react';
import { IBoatDetail } from '@/interfaces/boat.interface';
import { IBoat } from '@/interfaces/favorites.interface';
import { IGetReservationByConfirmationCodeResponse } from '@/interfaces/reservation.interface';

function humanize(str: string) {
  var i,
    frags = str.split('_');
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join('');
}

function onCommerce({
  eventName,
  paymentType,
  currencyName,
  boat,
  reservation,
}: {
  eventName: string;
  paymentType: string;
  currencyName: string;
  boat: IBoatDetail;
  reservation: IGetReservationByConfirmationCodeResponse;
}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer?.push({ ecommerce: null });
  const data: any = {
    event: eventName,
    ecommerce: {
      value: reservation.reservation.TotalPrice,
      tax: reservation.taxFee,
      payment_type: paymentType,
      comission: reservation.comissionFee,
      currency: currencyName,
      transaction_id: reservation.reservation.ConfirmationCode,
      coupon: reservation.reservation.PromoCode,
      items: [
        {
          item_id: String(boat.ID),
          item_name: boat.Name,
          affiliation: boat.Source,
          item_brand: boat.Brand,
          item_category: boat.Location?.CountryName,
          item_category2: boat.Location?.City,
          price: reservation.reservation.TotalDailyPrice || 0,
          quantity: 1,
          service_type: boat.ServiceType,
          boat_type: boat.BoatType,
          how_many: String(
            reservation.reservation.GuestCount ||
              reservation.reservation.TicketCount
          ),
          routes: String(reservation.reservation.RouteId),
          language: boat.LanguageList.map((item) => item.Code).join(','),
          measure: String(boat.Lenght),
          start_date: reservation.reservation.CheckInDay,
          end_date: reservation.reservation.CheckOutDay,
          boat_age: String(new Date().getFullYear() - boat.Year),
          boat_model: boat.Model,
          cancellation_policy: boat.RefundedPolicies[0]?.FlexibilityLevel || '',
          ...(eventName === 'purchase' && {
            item_comission:
              reservation.reservation.TotalDailyPriceCommision || 0,
          }),
        },
        ...reservation.reservationAddon.map((item) => {
          return {
            item_id: String(item.AddonID),
            item_name: item.Name,
            item_category: 'Add-Ons',
            price: item?.TotalPrice || 0,
            quantity: item?.Quantity || 0,
            ...(eventName === 'purchase' && {
              item_comission: item.AddonComission || 0,
            }),
          };
        }),
        ...boat.RouteList.filter(
          (item: { ID: any }) => item.ID === reservation.reservation.RouteId
        ).map((item: { ID: any; RouteName: any; Price: any }) => {
          return {
            item_id: String(item.ID || ''),
            item_name: item.RouteName,
            item_list_id: 'routes',
            item_list_name: 'Routes',
            price: Number(reservation.reservation.RoutePrice || 0),
            quantity: 1,
            ...(eventName === 'purchase' && {
              item_comission: reservation.reservation.RoutePriceComission || 0,
            }),
          };
        }),
      ],
    },
  };

  if (eventName === 'purchase') {
    delete data.ecommerce.payment_type;
  }
  if (eventName === 'add_payment_info') {
    delete data.ecommerce.transaction_id;
    delete data.ecommerce.tax;
    delete data.ecommerce.comission;
  }
  if (eventName === 'begin_checkout') {
    delete data.ecommerce.payment_type;
    delete data.ecommerce.transaction_id;
    delete data.ecommerce.tax;
    delete data.ecommerce.comission;
  }
  window.dataLayer?.push(data);
}

function onCommerceItemEvent({
  eventName,
  boat,
  itemListName,
  itemListID,
}: {
  eventName: string;
  boat: IBoatDetail[];
  itemListName: string;
  itemListID: string;
}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer?.push({ ecommerce: null });
  const data: any = {
    event: eventName,
    ecommerce: {
      items: boat.map((item) => {
        return {
          item_id: String(item.ID),
          item_name: item.Name,
          item_brand: item.Brand,
          item_category: item.Location?.CountryName,
          item_category2: item.Location?.City,
          item_variant: item.BoatType,
          affiliation: item.Source,
          price: item.BasePrice,
          quantity: 1,
          item_list_name: itemListName,
          item_list_id: itemListID,
          service_type: item.ServiceType,
          boat_type: item.BoatType,
          how_many: String(item.SleepingCapacityCount || item.GuestsCount),
          routes: String(item?.RouteList?.length || 0),
          language: item.LanguageList?.map((item) => item.Code).join(','),
          measure: String(item.Lenght),
          boat_age: String(new Date().getFullYear() - item.Year),
          boat_model: item.Model,
          cancellation_policy: item.RefundedPolicies[0]?.FlexibilityLevel || '',
        };
      }),
    },
  };

  window.dataLayer?.push(data);
}

function onCommerceItemAddToWishlist({
  eventName,
  boat,
  itemListName,
  itemListID,
}: {
  eventName: string;
  boat: IBoat[];
  itemListName: string;
  itemListID: string;
}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer?.push({ ecommerce: null });
  const data: any = {
    event: eventName,
    ecommerce: {
      items: boat?.map((item) => {
        return {
          item_id: String(item?.ID || 0),
          item_name: item?.Name || '',
          item_brand: item?.BoatBrandName || '',
          item_category: item?.CountryName || '',
          item_category2: item?.City || '',
          item_variant: item?.BoatServiceType || item?.ExperienceType || '',
          price: item?.BasePrice || 0,
          quantity: 1,
          item_list_name: itemListName,
          item_list_id: itemListID,
          service_type: item?.BoatServiceType || item?.ExperienceType || '',
          how_many: String(item?.Person || ''),
          routes: String(item?.RouteCount || 0),
          boat_model: item?.BoatModelName || '',
        };
      }),
    },
  };

  window.dataLayer?.push(data);
}

function onCommerceHubSpot({ eventName }: { eventName: string }) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer?.push({ ecommerce: null });

  window.dataLayer?.push({
    event: eventName || '',
  });
  window.fbq?.('trackCustom', eventName || '');
}

function onCommerceItemViewListEvent({
  eventName,
  boat,
  itemListName,
  itemListID,
}: {
  eventName: string;
  boat: IBoat[];
  itemListName: string;
  itemListID: string;
}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer?.push({ ecommerce: null });
  const data: any = {
    event: eventName,
    ecommerce: {
      items: boat.map((item) => {
        return {
          item_id: String(item.ID),
          item_name: item.Name,
          item_category: item?.CountryName || '',
          item_category2: item?.City,
          item_variant: item.BoatServiceType || item.ExperienceType,
          price: item.BasePrice,
          quantity: 1,
          item_list_name: itemListName,
          item_list_id: itemListID,
          service_type: item.BoatServiceType || item.ExperienceType,
          how_many: String(item.Person),
        };
      }),
    },
  };

  window.dataLayer?.push(data);
}

export default function useGtm() {
  const onBeginCheckout = useCallback(
    ({
      currencyName,
      boat,
      reservation,
    }: {
      currencyName: string;
      boat: IBoatDetail;
      reservation: IGetReservationByConfirmationCodeResponse;
    }) => {
      onCommerce({
        eventName: 'begin_checkout',
        paymentType: '',
        currencyName,
        boat,
        reservation,
      });

      window.fbq?.('track', 'InitiateCheckout', {
        content_ids: [boat.ID],
        content_type: 'product',
        currency: currencyName,
        num_items: 1,
        value: reservation.reservation.TotalPrice,
      });
    },
    [onCommerce]
  );

  const onAddPaymentInfo = useCallback(
    ({
      paymentType,
      currencyName,
      boat,
      reservation,
    }: {
      paymentType: string;
      currencyName: string;
      boat: IBoatDetail;
      reservation: IGetReservationByConfirmationCodeResponse;
    }) => {
      onCommerce({
        eventName: 'add_payment_info',
        paymentType,
        currencyName,
        boat,
        reservation,
      });

      window.fbq?.('track', 'AddPaymentInfo', {
        content_ids: [boat.ID],
        content_type: 'product',
        currency: currencyName,
        num_items: 1,
        value: reservation.reservation.TotalPrice,
      });
    },
    [onCommerce]
  );

  const onPurchase = useCallback(
    ({
      paymentType,
      currencyName,
      boat,
      reservation,
    }: {
      paymentType: string;
      currencyName: string;
      boat: IBoatDetail;
      reservation: IGetReservationByConfirmationCodeResponse;
    }) => {
      onCommerce({
        eventName: 'purchase',
        paymentType,
        currencyName,
        boat,
        reservation,
      });

      window.fbq?.('track', 'Purchase', {
        content_ids: [boat.ID],
        content_type: 'product',
        currency: currencyName,
        num_items: 1,
        value: reservation.reservation.TotalPrice,
      });
    },
    [onCommerce]
  );

  const onAuth = useCallback(
    ({
      eventName,
      method,
      userID,
      platformName,
      platform,
    }: {
      eventName: string;
      method: string;
      userID: string;
      platformName: string;
      platform?: string | undefined;
    }) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer?.push({ ecommerce: null });
      window.dataLayer.push({
        event: eventName,
        user_id: userID,
        method: method,
        platform_name: platform,
        source_name: platformName,
      });

      window.fbq?.('trackCustom', humanize(method), {
        user_id: userID,
        platform_name: platform,
        source_name: platformName,
      });
    },
    []
  );

  const onAddToWishlist = useCallback(
    ({
      boat,
      itemListName,
      itemListID,
    }: {
      boat: IBoat[];
      itemListID: string;
      itemListName: string;
    }) => {
      onCommerceItemAddToWishlist({
        eventName: 'add_to_wishlist',
        boat: boat,
        itemListName: itemListName,
        itemListID: itemListID,
      });
      window.fbq?.('track', 'AddToWishlist', {
        content_category: itemListName,
        content_ids: boat.map((b) => b.ID),
      });
    },
    [onCommerceItemEvent]
  );

  const onViewItem = useCallback(
    ({ boat }: { boat: IBoatDetail[] }) => {
      onCommerceItemEvent({
        eventName: 'view_item',
        boat: boat,
        itemListName: 'Product Detail Page',
        itemListID: 'product_detail_page',
      });

      window.fbq?.('track', 'ViewContent', {
        content_ids: boat.map((b) => b.ID),
        content_category: 'Product Detail Page',
      });
    },
    [onCommerceItemEvent]
  );

  const onViewItemList = useCallback(
    ({
      boat,
      itemListID,
      itemListName,
    }: {
      boat: IBoat[];
      itemListID: string;
      itemListName: string;
    }) => {
      onCommerceItemViewListEvent({
        eventName: 'view_item_list',
        boat: boat,
        itemListName: itemListName,
        itemListID: itemListID,
      });

      window.fbq?.('track', 'ViewContent', {
        content_ids: boat.map((b) => b.ID),
        content_category: itemListName,
      });
    },
    [onCommerceItemViewListEvent]
  );

  const onFormSubmit = useCallback(() => {
    onCommerceHubSpot({ eventName: 'contact_us_form_submit' });
  }, [onCommerceHubSpot]);

  const onFormHelpCenterSubmit = useCallback(() => {
    onCommerceHubSpot({ eventName: 'support_form_submit' });
  }, [onCommerceHubSpot]);

  return {
    onAuth,
    onPurchase,
    onBeginCheckout,
    onAddPaymentInfo,
    onViewItem,
    onAddToWishlist,
    onViewItemList,
    onFormSubmit,
    onFormHelpCenterSubmit,
  };
}
