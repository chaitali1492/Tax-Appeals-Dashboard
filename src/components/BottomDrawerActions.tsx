import React from "react";
import { Box, Button, SwipeableDrawer, Typography } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface BottomDrawerActionsProps {
  count: number;
  open: boolean;
}

const BottomDrawerActions: React.FC<BottomDrawerActionsProps> = ({ count, open }) => {
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onOpen={() => {}}
      onClose={() => {}}
      ModalProps={{
        hideBackdrop: true,           // Allow background interaction
        disableEnforceFocus: true,    // Don't trap focus
        disableEscapeKeyDown: true,   // Drawer won't close on Escape
        sx: {
        pointerEvents: 'none', // Allow clicks to pass through
        },
      }}
      PaperProps={{
        sx: { borderRadius: "16px 16px 0 0", padding: 2, minHeight: "100px" },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Typography>{count} Appeal Letter{count > 1 ? "s" : ""} selected</Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined" startIcon={<CloudDownloadIcon />} size="small">
            Export Grid Details
          </Button>
          <Button variant="outlined" startIcon={<FileDownloadIcon />} size="small">
            Download Letter
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckCircleIcon />}
            size="small"
            sx={{ backgroundColor: "#21bf73", color: "white" }}
          >
            Change Status
          </Button>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default BottomDrawerActions;
