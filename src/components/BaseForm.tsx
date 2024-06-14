import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { FormControl, TextField, Box, Button } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import type { Field, FieldValues } from '../types';

export default ({
  fields,
  onCancel,
  onSubmit,
}: {
  fields: Field[];
  onCancel: () => void;
  onSubmit: (values: FieldValues) => void;
}) => {
  const [values, setValues] = useState<FieldValues>(
    fields.reduce((acc, curr) => {
      if (curr.type === 'datepicker') {
        acc[curr.key] = curr.initialValue
          ? curr.initialValue
          : dayjs(new Date());
      } else {
        acc[curr.key] = curr.initialValue ? curr.initialValue : '';
      }
      return acc;
    }, {}),
  );

  useEffect(() => {
    setValues(
      fields.reduce((acc, curr) => {
        if (curr.type === 'datepicker') {
          acc[curr.key] = curr.initialValue
            ? dayjs(curr.initialValue)
            : dayjs(new Date());
        } else {
          acc[curr.key] = curr.initialValue ? curr.initialValue : '';
        }
        return acc;
      }, {}),
    );
  }, [fields]);

  const [errors, setErrors] = useState<FieldValues>(
    fields.reduce((acc, curr) => {
      acc[curr.key] = '';
      return acc;
    }, {}),
  );

  const validate = () => {
    let errorObj = {};
    fields.forEach((field) => {
      errorObj[field.key] = field.error?.(values[field.key]) ?? '';
    });
    setErrors(errorObj);
    return !Object.values(errorObj).some((err) => !!err);
  };

  const submit = () => {
    if (!validate()) return;
    onSubmit(values);
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
        width: '100%',
      }}
    >
      {fields?.map(({ type, label, key }: Field) => {
        if (type === 'textfield') {
          return (
            <FormControl key={key} sx={{ width: '70%' }}>
              <TextField
                id={key}
                label={label}
                variant="outlined"
                error={!!errors?.[key]}
                value={values?.[key]}
                onChange={(e: React.ChangeEvent) => {
                  const newValue = (e.target as HTMLInputElement).value;
                  setValues({ ...values, [key]: newValue });
                }}
                helperText={errors?.[key]}
              />
            </FormControl>
          );
        }

        if (type === 'datepicker') {
          return (
            <FormControl key={key} sx={{ width: '70%' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of birth"
                  value={values?.[key] as Dayjs}
                  onChange={(newValue) => {
                    setValues({ ...values, [key]: newValue });
                  }}
                  slotProps={{
                    textField: {
                      error: !!errors?.[key],
                      helperText: errors?.[key],
                    },
                  }}
                />
              </LocalizationProvider>
            </FormControl>
          );
        }
      })}

      <Box
        sx={{
          width: '70%',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Button color="error" variant="contained" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="success" variant="contained" onClick={submit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
