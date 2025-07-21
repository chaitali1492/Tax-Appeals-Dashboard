import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowModesModel,
  GridRowModes,
  GridActionsCellItem,
  GridPaginationModel,
  GridRowId,
} from "@mui/x-data-grid";

import {
  addRecord,
  updateRecord,
  deleteRecord,
} from "@/store/slices/appealSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import { AppealRecord } from "@/types/appeal";

import BottomDrawerActions from "./BottomDrawerActions";
import TopActionsBar from "./ActionBar";

// Rename to avoid conflict with built-in Record
interface AppealGridRecord extends AppealRecord {
  isNew?: boolean;
}

const AppealGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.appeals.records);
  const [nextId, setNextId] = useState<number>(rows.length + 1);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });
  const [selectedRows, setSelectedRows] = useState<any>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleSelectionChange = (newSelection: any) => {
    setSelectedRows(newSelection);
    setDrawerOpen(newSelection.ids.size > 0); // Open drawer when rows are selected
};


  // Modal State
  const [openModal, setOpenModal] = useState(false);
  const [newRow, setNewRow] = useState<AppealGridRecord>({
    id: 0,
    taxYear: null,
    company: "",
    state: "",
    assessor: "",
    account: "",
    appealedDate: "",
  });

  /** Add new row using modal */
  const handleOpenModal = () => {
    setNewRow({
      id: nextId,
      taxYear: null,
      company: "",
      state: "",
      assessor: "",
      account: "",
      appealedDate: "",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSaveNewRow = () => {
    dispatch(addRecord(newRow));
    setNextId((prev) => prev + 1);
    setOpenModal(false);
  };

  /** Row CRUD for inline editing */
  const handleSaveRow = (id: GridRowId) => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleCancelRow = (id: GridRowId) => {
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));
  };

  const handleDeleteRow = (id: GridRowId) => {
    dispatch(deleteRecord(id as number))
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow } as AppealGridRecord;
    dispatch(updateRecord(updatedRow))
    return updatedRow;
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, editable: false },
    { field: "taxYear", headerName: "Tax Year", flex: 1, editable: true, type: "number" },
    { field: "company", headerName: "Company", flex: 2, editable: true },
    { field: "state", headerName: "State", flex: 1, editable: true },
    { field: "assessor", headerName: "Assessor", flex: 2, editable: true },
    { field: "account", headerName: "Account", flex: 1, editable: true },
    { field: "appealedDate", headerName: "Appealed Date", flex: 1.5, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        return isInEditMode
          ? [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={() => handleSaveRow(id)}
                color="primary"
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                onClick={() => handleCancelRow(id)}
                color="inherit"
              />,
            ]
          : [
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDeleteRow(id)}
                color="default"
              />,
            ];
      },
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      {/* Action Buttons */}
      <Box mt={1} pl={2} display={"flex"} justifyContent={"space-between"}>
        <Box >
            <IconButton
            color="primary"
            onClick={handleOpenModal}
            sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                    backgroundColor: 'primary.dark',
                    },
                }}
            >
                <AddIcon />
            </IconButton>
        </Box>
        <Box>
            <TopActionsBar/>
        </Box>
      </Box>

      {/* DataGrid */}
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        processRowUpdate={processRowUpdate}
        onRowSelectionModelChange={(newSelection) =>
            handleSelectionChange(newSelection as any)
        }
        />

      {/* Add Row Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <TextField
            label="Tax Year"
            type="number"
            fullWidth
            margin="dense"
            value={newRow.taxYear ?? ""}
            onChange={(e) =>
              setNewRow({
                ...newRow,
                taxYear: parseInt(e.target.value, 10) || null,
              })
            }
          />
          <TextField
            label="Company"
            fullWidth
            margin="dense"
            value={newRow.company}
            onChange={(e) => setNewRow({ ...newRow, company: e.target.value })}
          />
          <TextField
            label="State"
            fullWidth
            margin="dense"
            value={newRow.state}
            onChange={(e) => setNewRow({ ...newRow, state: e.target.value })}
          />
          <TextField
            label="Assessor"
            fullWidth
            margin="dense"
            value={newRow.assessor}
            onChange={(e) => setNewRow({ ...newRow, assessor: e.target.value })}
          />
          <TextField
            label="Account"
            fullWidth
            margin="dense"
            value={newRow.account}
            onChange={(e) => setNewRow({ ...newRow, account: e.target.value })}
          />
          <TextField
            label="Appealed Date"
            fullWidth
            margin="dense"
            value={newRow.appealedDate}
            onChange={(e) =>
              setNewRow({ ...newRow, appealedDate: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSaveNewRow} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bottom Drawer */}
      <BottomDrawerActions
        count={selectedRows?.ids?.size || 0}
        open={isDrawerOpen}
      />
    </div>
  );
};

export default AppealGrid;
