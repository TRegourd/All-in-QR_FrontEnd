import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

import DeleteRole from "../DeleteRole/DeleteRole";

import RolesServices from "../../services/roles";

function RoleList({ roles, fetchAndSet, activities }) {
  let params = useParams();
  const [editedField, setEditedField] = useState({});

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "activities",
      headerName: "Role Activities",
      width: 150,
      editable: false,
    },
  ];

  const rows = roles.map((role) => ({
    ...role,
    id: role._id,
    activities: activities
      .filter((el) => el.role._id === role._id)
      .map((activity) => {
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

      RolesServices.modifyRoles(editedField.id, body)
        .then(() => {
          fetchAndSet(params.eventID);
        })
        .catch(() => alert("erreur"));
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
        <DeleteRole
          rolesToDelete={selectionModel}
          fetchAndSet={fetchAndSet}
          eventID={params.eventID}
        />
      )}
    </div>
  );
}

export default RoleList;
