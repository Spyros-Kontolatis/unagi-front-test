import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { BaseSelect } from '../types';

export default ({ label, options, initialValue, cb }: BaseSelect) => {
  const [selectedOption, setSelectedOption] = useState(initialValue ?? '');

  return (
    <FormControl sx={{ minWidth: 300, margin: '8px' }}>
      <InputLabel id="sort-label">{label}</InputLabel>
      <Select
        labelId="sort-label"
        id="sort"
        label={label}
        value={selectedOption}
        onChange={(e: SelectChangeEvent) => {
          const value = e.target.value;
          setSelectedOption(value);
          if (cb) cb(value);
        }}
      >
        {options.map(({ value: optValue, label: optLabel }, idx) => (
          <MenuItem key={idx} value={optValue}>
            {optLabel}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
