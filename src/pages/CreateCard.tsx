import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Service from '../services/Service';

import { validateBirthday, validateImage } from '../lib/';

import BaseForm from '../components/BaseForm';
import BaseAlert from '../components/BaseAlert';
import { Typography, Box, CircularProgress } from '@mui/material';

import { ERROR_MESSAGES } from '../constants/errors';

import type { Player, BaseAlert as AlertType, FieldValues } from '../types';
import type { Dayjs } from 'dayjs';

export const CreateCard = () => {
  const [alert, setAlert] = useState<AlertType>(null);

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onSubmit = (fieldValues: FieldValues) => {
    const player: Player = {
      ...(fieldValues as Record<keyof Player, string>),
      birthday: (fieldValues.birthday as Dayjs).format('YYYY-MM-DDTHH:mm:ss'),
    };
    const data = {
      id: parseInt(
        (fieldValues.image as string).split('.')?.slice(-2)?.[0] ?? '0',
      ),
      player,
    };
    Service.cards()
      .create()
      .data(data)
      .onStart(() => {
        setLoading(true);
      })
      .onSuccess(() => {
        setAlert({ type: 'success', message: 'Successfully created player' });
      })
      .onError((err) =>
        setAlert({
          type: 'error',
          message: err?.message ?? ERROR_MESSAGES['ERROR'],
        }),
      )
      .onClientError((err) =>
        setAlert({
          type: 'error',
          message: err?.message ?? ERROR_MESSAGES['CLIENT_ERROR'],
        }),
      )
      .onErrorNotFound((err) =>
        setAlert({
          type: 'error',
          message: err?.message ?? ERROR_MESSAGES['ERROR_NOT_FOUND'],
        }),
      )
      .onErrorNotAvailable((err) =>
        setAlert({
          type: 'warning',
          message: err?.message ?? ERROR_MESSAGES['ERROR_NOT_AVAILABLE'],
        }),
      )
      .onFinish(() => {
        setLoading(false);
      })
      .execute();
  };

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginBottom: '8px',
        marginTop: '24px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      {loading && <CircularProgress />}
      {!!alert && (
        <BaseAlert
          message={alert.message}
          type={alert.type}
          close={() => setAlert(null)}
        />
      )}
      <Typography variant="h3" gutterBottom>
        Create a Player
      </Typography>
      <BaseForm
        fields={[
          {
            type: 'textfield',
            label: 'First name',
            key: 'firstname',
            error: (val) => (!val ? 'First name is mandatory' : ''),
          },
          {
            type: 'textfield',
            label: 'Last name',
            key: 'lastname',
            error: (val) => (!val ? 'Last name is mandatory' : ''),
          },
          {
            type: 'textfield',
            label: 'Image Url',
            key: 'image',
            error: (val: string) => validateImage(val),
          },
          {
            type: 'datepicker',
            label: 'Date of Birth',
            key: 'birthday',
            error: (val: Dayjs) => validateBirthday(val),
          },
        ]}
        onCancel={() => history.push('/collection')}
        onSubmit={onSubmit}
      />
    </Box>
  );
};
