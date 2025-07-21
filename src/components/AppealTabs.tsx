'use client';

import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper } from '@mui/material';
import AppealGrid from './AppealList';

function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      {...other}
      style={{ width: '100%' }}
      component={Paper}
    >
      {value === index && <Box pt={1}>{children}</Box>}
    </Box>
  );
}

const AppealLetterTabs= () => {
  const [value, setValue] = useState(0); // 0 = Dashboard, 1 = Appeal Letter etc.

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }} >
      {/* Tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label={(
            <Typography color='black' textTransform={"capitalize"} fontSize={14} fontWeight={500}>Appeal Letter</Typography>
        )} />
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={value} index={0} >
        <AppealGrid />
      </TabPanel>
    </Box>
  );
}

export default AppealLetterTabs;