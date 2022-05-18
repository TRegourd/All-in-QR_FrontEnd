import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { useNavigate, Link, useParams } from "react-router-dom";
import styled from "styled-components";
import RegisterSnackbar from "../../components/Register_Components/RegisterSnackbar";
import AttendeesServices from "../../services/attendees";
import ActivitiesServices from "../../services/activities";
import eventServices from "../../services/Event";
import dayjs from "dayjs";
import { CheckoutContext } from "../../CheckoutProvider";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Register() {
  const {
    total,
    setTotal,
    defaultActivities,
    setDefaultAcitivites,
    extraActivities,
    setExtraActivities,
    setCheckoutBody,
  } = useContext(CheckoutContext);
  const navigate = useNavigate();
  const params = useParams();
  const [body, setBody] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    extra_activities: [],
    role: params.roleId,
    event: params.eventId,
  });
  const [currentEvent, setCurrentEvent] = useState("");
  const [allActivities, setAllActivities] = useState([]);
  const [checkedActivities, setCheckedActivities] = useState([]);

  const handleActivitiesChange = (event) => {
    setCheckedActivities(event.target.value);
    const array = allActivities.filter((el) => {
      return event.target.value.find((item) => item === el._id);
    });

    setExtraActivities(array);
    handleChange(event);
  };

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    updateBody(name, value);
  }

  function fetchCurrentEvent(id) {
    eventServices
      .getOneEvent(id)
      .then((result) => {
        setCurrentEvent(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchActivities(id) {
    ActivitiesServices.listActivities(id)
      .then((result) => {
        setAllActivities(result.data);
        setDefaultAcitivites(
          result.data.filter((item) => {
            return item.role._id === body.role;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit() {
    AttendeesServices.getOneAttendeeByEmail(body).then((result) => {
      if (!result.data) {
        setCheckoutBody(body);
        localStorage.setItem("@body", JSON.stringify(body));
        navigate("/payment");
      } else {
        alert("Attendee Already exists");
      }
    });
  }

  useEffect(() => {
    fetchCurrentEvent(params.eventId);
    fetchActivities(params.eventId);
  }, []);

  return (
    <>
      <Container>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onChange={handleChange}
          style={{ marginTop: "100px" }}
        >
          {currentEvent && (
            <div>
              <h1>
                Register to the event "{currentEvent.name}" organized by{" "}
                {currentEvent.admin.name}
              </h1>
              <p>
                This event will take place in {currentEvent.place}
                <br />
                From {dayjs(currentEvent.start_date).format("DD-MM")} to{" "}
                {dayjs(currentEvent.end_date).format("DD-MM")}
              </p>
            </div>
          )}
          <div>
            <TextField
              required
              id="name"
              label="Name"
              type="text"
              name="name"
            />
            <TextField
              required
              id="surname"
              label="SurName"
              type="text"
              name="surname"
            />
            <br />
            <TextField
              required
              id="email"
              label="Email"
              type="email"
              name="email"
            />
            <TextField
              required
              id="phone"
              label="Phone"
              type="text"
              name="phone"
            />
            <br />
            <FormControl sx={{ m: 1, width: "100%", maxWidth: 300 }}>
              <InputLabel id="select-Extra Activities-label">
                Extra Activities
              </InputLabel>
              <Select
                labelId="select-Extra Activities-label"
                id="select-Extra Activities"
                multiple
                value={checkedActivities}
                onChange={handleActivitiesChange}
                input={<OutlinedInput label="Extra Activities" />}
                MenuProps={MenuProps}
                name="extra_activities"
              >
                {allActivities
                  .filter((value) => {
                    return value.event._id === body.event;
                  })
                  .filter((value) => {
                    if (value.role !== null) {
                      return value.role._id !== body.role;
                    }
                  })
                  .map((value) => {
                    return (
                      <MenuItem key={value._id} value={value._id}>
                        <Checkbox
                          checked={checkedActivities.indexOf(value._id) > -1}
                        />
                        {value.name} {value.price}€
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div>Total attendance amount : {total}€</div>

          <Link to="#">
            <Button variant="contained" onClick={handleSubmit}>
              Proceed to Checkout
            </Button>
          </Link>
          {/* <RegisterSnackbar body={body}></RegisterSnackbar> */}
        </Box>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  text-align: center;
  overflow: hidden;
  position: relative;
`;
