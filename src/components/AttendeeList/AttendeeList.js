import AttendeesServices from "../../services/attendees";
import Attendee from "../Attendee/Attendee";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteAttendee from "../DeleteAttendee/DeleteAttendee";
import SendQRCodeToAll from "../SendQRCodeToEveryAttendee/SendQRCodeToEveryAttendee";

function AttendeeList({ attendees }) {
  let params = useParams();

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
      editable: true,
    },
  ];

  const rows = attendees.map((attendee) => ({
    ...attendee,
    id: attendee._id,
    roleName: attendee.role !== null ? attendee.role.name : "",
  }));

  const [selectionModel, setSelectionModel] = useState([]);

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
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
        />
      </div>
      {selectionModel && <DeleteAttendee attendeesToDelete={selectionModel} />}
      <SendQRCodeToAll attendeesQR={selectionModel} />
    </div>
  );
}

export default AttendeeList;
