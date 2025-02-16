import React, { useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectContext, RecordEntry } from '../contexts/ProjectContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const GraphUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addRecord } = useContext(ProjectContext);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && date && value) {
      const record: RecordEntry = {
        date: date.format('YYYY-MM-DD'),
        value: Number(value)
      };
      addRecord(Number(id), record);
      navigate(`/project/${id}`);
    }
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="日付"
            value={date}
            onChange={(newDate: Dayjs | null) => {
              if (newDate) {
                setDate(newDate);
              }
            }}
            slotProps={{
              textField: {
                required: true,
                fullWidth: true
              }
            }}
          />
        </LocalizationProvider>
        <TextField
          type="number"
          label="値"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          登録
        </Button>
      </Box>
    </Box>
  );
};

export default GraphUpdate;
