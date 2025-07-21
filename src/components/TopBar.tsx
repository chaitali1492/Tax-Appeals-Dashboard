'use client';

import {
  Box,
  Typography,
  Select,
  MenuItem,
  InputBase,
  IconButton,
  Avatar,
  Grid,
  TextField,
  InputAdornment
} from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { GridSearchIcon } from '@mui/x-data-grid';

const TopBar = () => {
  return (
    <Box sx={{ borderBottom: '1px solid #e0e0e0', px: 3, py: 1 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        {/* Left Section */}
        <Grid>
          <Box sx={{ display: 'flex', alignItems: "center", justifyContent:"space-around"}}>
            <Typography variant="h6" fontWeight={700} fontSize="18px" color="#000">
              Property Tax Plus
            </Typography>
            
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Select
              defaultValue="Client Workspace"
              IconComponent={ArrowDropDownIcon}
              variant="standard"
              disableUnderline
              sx={{
                fontSize: '14px',
                fontWeight: 500,
                ml: 2, // margin-left to separate from title
                minWidth: 150,
                '& .MuiSelect-select': {
                  paddingRight: '24px !important',
                },
              }}
            >
              <MenuItem value="Client Workspace">Client Workspace</MenuItem>
              <MenuItem value="Other Client">Other Client</MenuItem>
            </Select>
            <TextField
              placeholder="Search"
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
                    <GridSearchIcon color="action" />
                  </InputAdornment>
                ),
              }}/>
            <IconButton>
              <NotificationsNoneOutlinedIcon sx={{ color: '#000' }} />
            </IconButton>
            <IconButton>
              <HelpOutlineOutlinedIcon sx={{ color: '#000' }} />
            </IconButton>
            <Avatar
              alt="User"
              src="/avatar.jpg"
              sx={{ width: 36, height: 36 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopBar;
