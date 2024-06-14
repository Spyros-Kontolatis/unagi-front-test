import React, { useState } from 'react';
import { FormControl, Typography, TextField, Box, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import { useHistory } from 'react-router-dom';

export default ({
  firstname: {
    value: firstnameValue,
    setter: setFirstnameValue,
    error: firstnameError,
  },
  lastname: {
    value: lastnameValue,
    setter: setLastnameValue,
    error: lastnameError,
  },
  image: { value: imageValue, setter: setImageValue, error: imageError },
  birthday: {
    value: birthdayValue,
    setter: setBirthdayValue,
    error: birthdayError,
  },
  onSubmit,
}) => {
  const history = useHistory();

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Create a Player
      </Typography>
      <FormControl sx={{ width: '70%' }}>
        <TextField
          id="firstname"
          label="First Name"
          variant="outlined"
          error={!!firstnameError}
          value={firstnameValue}
          onChange={(e: React.ChangeEvent) =>
            setFirstnameValue((e.target as HTMLInputElement).value)
          }
          helperText={firstnameError}
        />
      </FormControl>
      <FormControl sx={{ width: '70%' }}>
        <TextField
          id="lastname"
          label="Last Name"
          variant="outlined"
          value={lastnameValue}
          onChange={(e: React.ChangeEvent) =>
            setLastnameValue((e.target as HTMLInputElement).value)
          }
          error={!!lastnameError}
          helperText={lastnameError}
        />
      </FormControl>
      <FormControl sx={{ width: '70%' }}>
        <TextField
          id="image"
          label="Image URL"
          variant="outlined"
          value={imageValue}
          onChange={(e: React.ChangeEvent) =>
            setImageValue((e.target as HTMLInputElement).value)
          }
          error={!!imageError}
          helperText={imageError}
        />
      </FormControl>
      <FormControl sx={{ width: '70%' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of birth"
            value={birthdayValue}
            onChange={(newValue) => setBirthdayValue(newValue)}
            slotProps={{
              textField: {
                error: !!birthdayError,
                helperText: birthdayError,
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>
      <Box
        sx={{
          width: '70%',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Button
          color="error"
          variant="contained"
          onClick={() => history.push('/collection')}
        >
          Cancel
        </Button>
        <Button color="success" variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </>
  );
};
