import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';
import constructImageUrl from '../lib/constructImageUrl';
import BaseCard from '../components/BaseCard';
import BaseAlert from '../components/BaseAlert';
import Service from '../services/Service';
import type { Card } from '../types';
import { ERROR_MESSAGES } from '../constants/errors';

export const Collection = () => {
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState<Card[]>([]);
  const [alert, setAlert] = useState<{ type: string; message: string }>(null);

  useEffect(() => {
    Service.cards()
      .index()
      .onStart(() => setLoading(true))
      .onSuccess((response: Card[]) => {
        setCollection(response);
      })
      .onNoData(() => {})
      .onError(() =>
        setAlert({ type: 'error', message: ERROR_MESSAGES['ERROR'] }),
      )
      .onClientError(() =>
        setAlert({ type: 'error', message: ERROR_MESSAGES['CLIENT_ERROR'] }),
      )
      .onErrorNotFound(() =>
        setAlert({ type: 'error', message: ERROR_MESSAGES['ERROR_NOT_FOUND'] }),
      )
      .onErrorNotAvailable(() =>
        setAlert({
          type: 'warning',
          message: ERROR_MESSAGES['ERROR_NOT_AVAILABLE'],
        }),
      )
      .onFinish(() => setLoading(false))
      .execute();
  }, []);

  return (
    <>
      {!!alert && (
        <BaseAlert
          message={alert.message}
          type={alert.type}
          close={() => setAlert(null)}
        />
      )}

      {!loading &&
        collection.map((card, idx) => (
          <BaseCard
            key={idx}
            imageUrl={constructImageUrl(card.id)}
            title={`${card.player.firstname} ${card.player.lastname}`}
            subtitle={format(card.player.birthday, 'PP')}
            action={{
              label: 'BUY',
              handler: () => {},
            }}
            size="sm"
          />
        ))}
      {loading && <BaseCard imageUrl="" title="" size="sm" loading={loading} />}
    </>
  );
};
