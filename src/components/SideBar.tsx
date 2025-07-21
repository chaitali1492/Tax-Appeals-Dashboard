'use client';

import React, { useState, PropsWithChildren } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import GavelIcon from '@mui/icons-material/Gavel';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

/** ------------------------------------------------------------------
 * Collapsible SideBar
 * -------------------------------------------------------------------
 * Features:
 *  • Expand / collapse toggle.
 *  • Icon‑only mini width when collapsed; icons + labels when expanded.
 *  • Smooth width transition.
 *  • Tooltips show menu labels when collapsed.
 *  • Selected menu item highlight preserved across states.
 *  • Responsive props for custom widths (optional).
 *
 * Usage:
 *  <SideBar>
 *    <YourPageContent />
 *  </SideBar>
 *
 *  -- OR -- just render the sidebar alone if you handle layout elsewhere.
 */

interface MenuItemDef {
  text: string;
  icon: React.ReactNode;
}

const menuItems: MenuItemDef[] = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Accounts', icon: <AccountCircleIcon /> },
  { text: 'Batches', icon: <FolderIcon /> },
  { text: 'Resolution', icon: <GavelIcon /> },
  { text: 'Assessments', icon: <AssessmentIcon /> },
  { text: 'Appeal Letter', icon: <DescriptionIcon /> },
  { text: 'Summary', icon: <SummarizeIcon /> },
];

export interface SideBarProps extends PropsWithChildren {
  /** Width (px) when expanded */
  expandedWidth?: number;
  /** Width (px) when collapsed */
  collapsedWidth?: number;
  /** Optional externally controlled selected index */
  selectedIndex?: number;
  /** Default selected index (uncontrolled) */
  defaultSelectedIndex?: number;
  /** Callback when a menu item is clicked */
  onSelect?: (index: number, item: MenuItemDef) => void;
  /** Start collapsed? */
  collapsed?: boolean;

  toggleCollapsed :() =>void;
}

export default function SideBar({
  children,
  expandedWidth = 240,
  collapsedWidth = 72,
  selectedIndex: controlledSelected,
  defaultSelectedIndex = 5, // Appeal Letter by default
  onSelect,
  collapsed = false,
  toggleCollapsed
}: SideBarProps) {
  // Uncontrolled selected index fallback
  const [internalSelected, setInternalSelected] = useState<number>(defaultSelectedIndex);
  const actualSelected = controlledSelected ?? internalSelected;

  const handleSelect = (idx: number) => {
    if (controlledSelected === undefined) {
      setInternalSelected(idx);
    }
    onSelect?.(idx, menuItems[idx]);
  };

  const width = collapsed ? collapsedWidth : expandedWidth;

  return (
    <Box display="flex" width="100%" height="100vh" overflow="hidden">
      {/* Sidebar */}
      <Box
        sx={{
          width,
          borderRadius:3,
          height: '100%',
          backgroundColor: '#2C4E6C',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pt: 2,
          transition: 'width 0.25s ease',
        }}
      >
        {/* Top section: toggle + menu */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
          {/* Collapse / Expand Toggle */}
          <Box sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', px: collapsed ? 0 : 1, mb: 1 }}>
            <Tooltip title={collapsed ? 'Expand' : 'Collapse'} placement="right">
              <IconButton size="small" onClick={toggleCollapsed} sx={{ color: 'white' }}>
                {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          <List disablePadding>
            {menuItems.map((item, index) => {
              const selected = actualSelected === index;
              const listItem = (
                <ListItemButton
                  key={item.text}
                  selected={selected}
                  onClick={() => handleSelect(index)}
                  sx={{
                    pl: collapsed ? 0 : 3,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    color: selected ? '#fff' : '#ffffffcc',
                    backgroundColor: selected ? '#1b263b' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#1b263b',
                      color: '#fff',
                    },
                    minHeight: 40,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: '#ffffffcc',
                      minWidth: collapsed ? 'auto' : 40,
                      mr: collapsed ? 0 : 1,
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={item.text} />}
                </ListItemButton>
              );

              return collapsed ? (
                <Tooltip key={item.text} title={item.text} placement="right">
                  {listItem}
                </Tooltip>
              ) : (
                listItem
              );
            })}
          </List>
        </Box>

        {/* Bottom section: settings + logout */}
        <Box sx={{ px: collapsed ? 0 : 2, pb: 2 }}>
          {!collapsed && <Divider sx={{ borderColor: '#ffffff33', mb: 1 }} />}
          <List disablePadding>
            <Tooltip title="Settings" placement="right" disableHoverListener={!collapsed}>
              <ListItemButton
                sx={{
                  pl: collapsed ? 0 : 2,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  color: '#ffffffcc',
                  '&:hover': {
                    backgroundColor: '#1b263b',
                    color: '#fff',
                  },
                  minHeight: 40,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: '#ffffffcc',
                    minWidth: collapsed ? 'auto' : 40,
                    mr: collapsed ? 0 : 1,
                    justifyContent: 'center',
                  }}
                >
                  <SettingsIcon />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Settings" />}
              </ListItemButton>
            </Tooltip>
          </List>

          {collapsed ? (
            <Tooltip title="Logout" placement="right">
              <IconButton
                size="small"
                sx={{
                  mt: 1,
                  color: '#21bf73',
                  backgroundColor: 'rgba(33,191,115,0.2)',
                  '&:hover': { backgroundColor: 'rgba(31,164,99,0.3)' },
                }}
              >
                <PowerSettingsNewIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              variant="contained"
              fullWidth
              color="success"
              startIcon={<PowerSettingsNewIcon />}
              sx={{
                mt: 1,
                textTransform: 'none',
                backgroundColor: '#21bf73',
                '&:hover': {
                  backgroundColor: '#1fa463',
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Box>

      {/* Main content area (optional) */}
      {children && (
        <Box flexGrow={1} height="100%" overflow="auto">
          {children}
        </Box>
      )}
    </Box>
  );
}
