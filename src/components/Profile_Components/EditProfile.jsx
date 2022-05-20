import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import authServices from "../../services/auth";

export default function EditProfile({ currentUser, fetchAndSetCurrentUser }) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: currentUser.name,
    admin_name: currentUser.admin_name,
    admin_surname: currentUser.admin_surname,
    adress: currentUser.adress,
    email: currentUser.email,
  });

  function updateForm(key, value) {
    setForm({ ...form, [key]: value });
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    updateForm(name, value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    authServices
      .editCurrentUser(form)
      .then(() => {
        fetchAndSetCurrentUser();
        setOpen(false);
      })
      .catch(() => alert("erreur"));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog open={open} onClose={handleClose} onChange={handleChangeInput}>
        <DialogTitle>Edit My Profile</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            <pre>{JSON.stringify(form, null, 2)}</pre>
          </DialogContentText> */}

          <TextField
            autoFocus
            margin="dense"
            label="Company Name"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={currentUser.name}
          />
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            name="admin_name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={currentUser.admin_name}
          />
          <TextField
            autoFocus
            margin="dense"
            label="User Surname"
            name="admin_surname"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={currentUser.admin_surname}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Adress"
            name="adress"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={currentUser.adress}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            name="email"
            fullWidth
            variant="standard"
            defaultValue={currentUser.email}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
