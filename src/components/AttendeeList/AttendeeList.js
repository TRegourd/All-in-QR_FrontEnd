import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import { useGridApiContext } from "@mui/x-data-grid";
import DeleteAttendee from "../DeleteAttendee/DeleteAttendee";
import SendQRCodeToAll from "../SendQRCodeToEveryAttendee/SendQRCodeToEveryAttendee";
import AttendeesServices from "../../services/attendees";
import { Box } from "@mui/material";
import { GridCellParams } from "@mui/x-data-grid";

function AttendeeList({ attendees, fetchAndSet, roles }) {
  let params = useParams();
  const [editedField, setEditedFiled] = useState({});

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
      AttendeesServices.modifyAttendee(id, body)
        .then(() => {})
        .catch(() => alert("erreur"));
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
      field: "surname",
      headerName: "Surname",
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
      field: "phone",
      headerName: "Phone",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: false,
    },
    {
      field: "extra_activities",
      headerName: "Extra Activities",

      width: 200,
      editable: true,
    },
    {
      field: "present",
      headerName: "Présence",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        if (params.row.present === true) {
          return "Présent";
        } else {
          return "Absent";
        }
      },
    },
    {
      field: "QRsent",
      headerName: "QR Code",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        if (params.row.QRsent === true) {
          return "Envoyé";
        } else {
          return "Non envoyé";
        }
      },
    },
  ];

  const rows = attendees.map((attendee) => ({
    ...attendee,
    id: attendee._id,
    roleName: attendee.role !== null ? attendee.role.name : "",
    extra_activities: attendee.extra_activities.map((activity) => {
      return activity.name;
    }),
  }));

  const [selectionModel, setSelectionModel] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    if (event.target.value) {
      const body = {
        id: editedField.id,
        [editedField.field]: event.target.value,
      };
      AttendeesServices.modifyAttendee(editedField.id, body)
        .then(() => {
          fetchAndSet(params.eventID);
        })
        .catch(() => alert("erreur"));
    }
  }

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <Box
          sx={{
            height: 400,
            width: 1,
            "& .true": {
              backgroundColor: "#2ECC71",
              color: "white",
            },
            "& .false": {
              backgroundColor: "#E74C3C",
              color: "white",
            },
          }}
        >
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
              setEditedFiled({
                id: event.currentTarget.parentElement.dataset.id,
                field: event.currentTarget.dataset.field,
              });
            }}
            onCellEditStop={(params, event) => {
              handleSubmit(event);
            }}
            getCellClassName={(params) => {
              if (params.value === "Présent") {
                return "true";
              } else if (params.value === "Absent") {
                return "false";
              }
            }}
          />
        </Box>
      </div>
      {selectionModel && (
        <DeleteAttendee
          attendeesToDelete={selectionModel}
          fetchAndSet={fetchAndSet}
          eventID={params.eventID}
        />
      )}
      <SendQRCodeToAll attendeesQR={selectionModel} />
    </div>
  );
}

export default AttendeeList;
