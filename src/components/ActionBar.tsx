import React from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function TopActionsBar({ handleOpenModal }: { handleOpenModal?: () => void }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        px: 2,
      }}
    >
      {/* Search Field */}
      <TextField
        placeholder="Search by Property, Jurisdiction, Parcel Number or Client"
        variant="outlined"
        size="small"
        sx={{
          width: 400,
          mr:1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '3px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Right-side Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          sx={{
            border: '1px solid',
            borderColor: 'primary.main',
            color: 'primary.main',
            borderRadius:1
          }}
        >
          <TuneIcon />
        </IconButton>

        <IconButton
          sx={{
            backgroundColor: '#f28b82',
            color: 'white',
            '&:hover': { backgroundColor: '#e57373' },
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
