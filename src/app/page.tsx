"use client";
import Sidebar from '../components/SideBar';
import Topbar from '../components/TopBar';
import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import AppealLetterTabs from '@/components/AppealTabs';


export default function Home() {

  const [collapsed, setCollapsed] = useState(false);


  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        p: 2
      }}
    >
      {/* Top bar stays at top */}
      <Box sx={{ flexShrink: 0, my: 1, borderRadius: 3 }} component={Paper}>
        <Topbar />
      </Box>

      {/* Main row: sidebar + content */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          minHeight: 0, // allow children to control vertical overflow
          my: 1
        }}
      >
        <Box mr={2}>
          <Sidebar
            collapsed={collapsed}
            toggleCollapsed={() => setCollapsed((v) => !v)}
          />
        </Box>

        {/* Content area that should fill the rest */}
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,      // <-- REQUIRED for proper width calc
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* If your grid should stretch to full height too */}
          <Box sx={{ flexGrow: 1, minHeight: 0 }}>
            <AppealLetterTabs />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

