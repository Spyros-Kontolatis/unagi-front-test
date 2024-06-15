import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';
import { sort as sortArray } from '../lib/sortArray';
import constructImageUrl from '../lib/constructImageUrl';

import Service from '../services/Service';

import BaseCard from '../components/BaseCard';
import BaseAlert from '../components/BaseAlert';
import { Container, CardGrid, ResponsiveCardGrid } from './Collection.style';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BaseSelect from '../components/BaseSelect';

import { ERROR_MESSAGES } from '../constants/errors';

import type {
  PlayerCard,
  BaseAlert as AlertType,
  SortOrderDirection,
} from '../types';

export const Collection = () => {
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState<PlayerCard[]>([]);
  const [alert, setAlert] = useState<AlertType>(null);
  const [order, setOrder] = useState<SortOrderDirection>('asc');
  const [orderCriteria, setOrderCriteria] = useState('');
  const history = useHistory();

  useEffect(() => {
    Service.cards()
      .index()
      .onStart(() => {
        setLoading(true);
      })
      .onSuccess((response: PlayerCard[]) => {
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

  const sort = (criteria: string, orderDirection: SortOrderDirection) => {
    if (!criteria) return;
    const sortedArray = sortArray(collection, criteria, orderDirection);
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
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginBottom: '8px',
          justifyContent: 'center',
        }}
      >
        <BaseSelect
          options={[
            { value: 'player.birthday', label: 'Date of Birth' },
            { value: 'player.firstname', label: 'First Name' },
            { value: 'player.lastname', label: 'Last Name' },
          ]}
          label="Sort by"
          cb={(value) => {
            setOrderCriteria(value as string);
            sort(value as string, order);
          }}
          initialValue={orderCriteria}
        />
        <BaseSelect
          options={[
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' },
          ]}
          label="Order"
          cb={(value) => {
            setOrder(value as SortOrderDirection);
            sort(orderCriteria, value as SortOrderDirection);
          }}
          initialValue={order}
        />
        <Button
          sx={{
            minWidth: 200,
            margin: '8px',
            minHeight: '56px',
          }}
          size="small"
          color="primary"
          variant="contained"
          onClick={() => history.push('/create-card')}
        >
          Create Player
        </Button>
      </Box>
      {!!collection?.length ? (
        <ResponsiveCardGrid>
          {collection.map((card, idx) => (
            <BaseCard
              key={idx}
              imageUrl={constructImageUrl(card.id)}
              title={`${card.player.firstname} ${card.player.lastname}`}
              subtitle={format(new Date(card.player.birthday), 'PP')}
              action={{
                label: 'BUY',
                handler: () => {},
              }}
              size="xs"
              onImgClick={() => history.push(`/player/${card.id}`)}
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
