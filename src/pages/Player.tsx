import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Service from '../services/Service';

import { validateBirthday, validateImage } from '../lib/';

import BaseAlert from '../components/BaseAlert';
import BaseForm from '../components/BaseForm';
import { Typography, Box, CircularProgress, Button } from '@mui/material';

import { ERROR_MESSAGES } from '../constants/errors';

import type {
  Player,
  PlayerCard,
  BaseAlert as AlertType,
  FieldValues,
} from '../types';
import type { Dayjs } from 'dayjs';

export default () => {
  const [alert, setAlert] = useState<AlertType>(null);
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<PlayerCard>(null);
  const history = useHistory();
  const { playerId } = useParams<{ playerId?: string }>();

  useEffect(() => {
    Service.cards()
      .get(parseInt(playerId))
      .onStart(() => {
        setLoading(true);
      })
      .onSuccess((response: PlayerCard) => {
        setPlayer(response);
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
  }, []);

  const editPlayer = (fieldValues: FieldValues) => {
    const player: Player = {
      ...(fieldValues as Record<keyof Player, string>),
      birthday: (fieldValues.birthday as Dayjs).format('YYYY-MM-DDTHH:mm:ss'),
    };
    const data = {
      id: parseInt(playerId),
      player,
    };
    Service.cards()
      .update(parseInt(playerId))
      .data(data)
      .onStart(() => {
        setLoading(true);
      })
      .onSuccess((response: PlayerCard) => {
        setPlayer(response);
        setAlert({ type: 'success', message: 'Successfully updated player' });
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

  const deletePlayer = () => {
    Service.cards()
      .delete(parseInt(playerId))
      .onSuccess(() => {
        history.push('/collection');
      })
      .onStart(() => {
        setLoading(true);
      })
      .onError((err) => {
        setLoading(false);
        setAlert({
          type: 'error',
          message: err?.message ?? ERROR_MESSAGES['ERROR'],
        });
      })
      .onClientError((err) => {
        setLoading(false);
        setAlert({
          type: 'error',
          message: err?.message ?? ERROR_MESSAGES['CLIENT_ERROR'],
        });
      })
      .onErrorNotFound((err) => {
        setLoading(false);
        setAlert({
          type: 'error',
          message: err?.message ?? ERROR_MESSAGES['ERROR_NOT_FOUND'],
        });
      })
      .onErrorNotAvailable((err) => {
        setLoading(false);
        setAlert({
          type: 'warning',
          message: err?.message ?? ERROR_MESSAGES['ERROR_NOT_AVAILABLE'],
        });
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
      {player?.player?.firstname && player?.player?.lastname && (
        <Typography variant="h3" gutterBottom>
          You are viewing {player?.player?.firstname} {player?.player?.lastname}
        </Typography>
      )}
      <Button onClick={deletePlayer} variant="contained" color="error">
        Delete Player
      </Button>
      <BaseForm
        fields={[
          {
            type: 'textfield',
            label: 'First name',
            key: 'firstname',
            initialValue: player?.player?.firstname,
            error: (val) => (!val ? 'First name is mandatory' : ''),
          },
          {
            type: 'textfield',
            label: 'Last name',
            key: 'lastname',
            initialValue: player?.player.lastname,
            error: (val) => (!val ? 'Last name is mandatory' : ''),
          },
          {
            type: 'textfield',
            label: 'Image Url',
            key: 'image',
            initialValue: player?.player.image,
            error: (val: string) => validateImage(val),
          },
          {
            type: 'datepicker',
            label: 'Date of Birth',
            key: 'birthday',
            initialValue: player?.player.birthday,
            error: (val: Dayjs) => validateBirthday(val),
          },
        ]}
        onCancel={() => history.push('/collection')}
        onSubmit={editPlayer}
      />
    </Box>
  );
};
