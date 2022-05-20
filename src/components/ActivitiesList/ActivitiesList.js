import { useParams } from "react-router-dom";
import ActivitiesServices from "../../services/activities";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import { useGridApiContext } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DeleteActivities from "../DeleteActivities/DeleteActivities";

export default function ActivitiesList({ activities, fetchAndSet, roles }) {
  let params = useParams();

  const [editedField, setEditedField] = useState({});

  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  function SelectEditInputCell(props) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleChange = async (event) => {
      await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });
      const selectedRole = roles.find((e) => e.name === event.target.value);
      const body = { role: selectedRole._id };
      ActivitiesServices.modifyActivities(id, body)
        .then(() => {
          fetchAndSet(params.eventID);
          setSnackbar({
            children: "activity sucessfully modified",
            severity: "success",
          });
        })
        .catch(() =>
          setSnackbar({ children: "il y a eu une erreur", severity: "error" })
        );
    };

    return (
      <Select
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ height: 1 }}
        native
        autoFocus
      >
        <option value={""} defaultChecked>
          Select Role
        </option>
        {roles.map((role) => {
          return <option key={role._id}>{role.name}</option>;
        })}
      </Select>
    );
  }

  SelectEditInputCell.propTypes = {
    /**
     * The column field of the cell that triggered the event.
     */
    field: PropTypes.string.isRequired,
    /**
     * The grid row id.
     */
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.any,
  };

  const renderSelectEditInputCell = (params) => {
    return <SelectEditInputCell {...params} />;
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 180,
      editable: true,
      type: "dateTime",
    },

    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: true,
    },
    {
      field: "roleName",
      headerName: "Role",
      renderEditCell: renderSelectEditInputCell,
      width: 150,
      editable: true,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 150,
      editable: true,
    },
  ];

  const rows = activities.map((activity) => ({
    ...activity,
    id: activity._id,
    date: dayjs(activity.date).format("DD-MM-YYYY HH:mm"),
    roleName: activity.role !== null ? activity.role.name : "",
  }));

  const [selectionModel, setSelectionModel] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    if (event.target.value) {
      const body = {
        id: editedField.id,
        [editedField.field]: event.target.value,
      };
      ActivitiesServices.modifyActivities(editedField.id, body)
        .then(() => {
          fetchAndSet(params.eventID);
          setSnackbar({
            children: "activity sucessfully modified",
            severity: "success",
          });
        })
        .catch(() =>
          setSnackbar({ children: "il y a eu une erreur", severity: "error" })
        );
    }
  }

  return (
    <div>
      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
          {...rows}
          onCellKeyDown={(params, event) => {
            setEditedField({
              id: event.currentTarget.parentElement.dataset.id,
              field: event.currentTarget.dataset.field,
            });
          }}
          onCellEditStop={(params, event) => {
            handleSubmit(event);
          }}
        />
      </div>
      {selectionModel && (
        <DeleteActivities
          activitiesToDelete={selectionModel}
          fetchAndSet={fetchAndSet}
          eventID={params.eventID}
        />
      )}
      {snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}
