import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import constructImageUrl from '../lib/constructImageUrl';
import BaseCard from '../components/BaseCard';
import BaseAlert from '../components/BaseAlert';
import Service from '../services/Service';
import type { Card } from '../types';
import { ERROR_MESSAGES } from '../constants/errors';
import { useHistory } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import {
  Container,
  CardGrid,
  StyledForm,
  ResponsiveCardGrid,
} from './Collection.style';
import { sort as sortArray } from '../lib/sortArray';

export const Collection = () => {
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState<Card[]>([]);
  const [alert, setAlert] = useState<{ type: string; message: string }>(null);
  const [order, setOrder] = useState('asc');
  const [orderCriteria, setOrderCriteria] = useState('');
  const history = useHistory();

  useEffect(() => {
    Service.cards()
      .index()
      .onStart(() => {
        setLoading(true);
      })
      .onSuccess((response: Card[]) => {
        setCollection(response);
      })
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
      .onFinish(() => {
        setLoading(false);
      })
      .execute();
  }, []);

  const sort = (c: string, o: string) => {
    if (!c) return;
    const sortedArray = sortArray(collection, c, o);
    setCollection(sortedArray);
  };

  return (
    <Container>
      {!!alert && (
        <BaseAlert
          message={alert.message}
          type={alert.type}
          close={() => setAlert(null)}
        />
      )}
      <Form
        onSubmit={() => {}}
        initialValues={{ order: order, sort: orderCriteria }}
        render={() => (
          <StyledForm>
            <div>
              <label>Sort by</label>
              <Field
                name="sort"
                component="select"
                onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                  const value = (e.target as HTMLSelectElement).value;
                  setOrderCriteria(value);
                  sort(value, order);
                }}
              >
                <option />
                <option value="player.birthday">Date of Birth</option>
                <option value="player.firstname">First Name</option>
                <option value="player.lastname">Last Name</option>
              </Field>
              <Field
                name="order"
                component="select"
                value={order}
                onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                  const value = (e.target as HTMLSelectElement).value;
                  setOrder(value);
                  sort(orderCriteria, value);
                }}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Field>
            </div>
          </StyledForm>
        )}
      />
      {!!collection.length ? (
        <ResponsiveCardGrid>
          {collection.map((card, idx) => (
            <BaseCard
              key={idx}
              imageUrl={constructImageUrl(card.id)}
              title={`${card.player.firstname} ${card.player.lastname}`}
              subtitle={format(card.player.birthday, 'PP')}
              action={{
                label: 'BUY',
                handler: () => {},
              }}
              size="xs"
            />
          ))}
        </ResponsiveCardGrid>
      ) : (
        <CardGrid>
          <BaseCard
            imageUrl=""
            title={!loading ? 'Ooooops!' : ''}
            subtitle={!loading ? 'No Players added yet' : ''}
            size="lg"
            action={
              !loading
                ? {
                    label: 'Create One!',
                    handler: () => {
                      history.push('/create-card');
                    },
                  }
                : undefined
            }
            loading={loading}
          />
        </CardGrid>
      )}
    </Container>
  );
};
