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
import AttendeesServices from "../../services/attendees";
import ActivitiesServices from "../../services/activities";
import eventServices from "../../services/Event";
import dayjs from "dayjs";
import { CheckoutContext } from "../../CheckoutProvider";
import RolesServices from "../../services/roles";
import RegisterEventCard from "./RegisterEventCard";

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
  const { total, setDefaultAcitivites, setExtraActivities, setCheckoutBody } =
    useContext(CheckoutContext);
  const navigate = useNavigate();
  const params = useParams();
  const [allRoles, setAllRoles] = useState();
  let noVisitorRole;

  let roleId;
  if (params.roleId === "visitor") {
    if (allRoles) {
      let isVisitor = allRoles.find(
        (el) => el.name.toLowerCase() === params.roleId
      );
      if (isVisitor) {
        roleId = isVisitor._id;
      } else {
        noVisitorRole = true;
      }
    }
  } else {
    roleId = params.roleId;
  }

  const [body, setBody] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    extra_activities: [],
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

  function getAllRoles() {
    RolesServices.listRoles(params.eventId).then((result) =>
      setAllRoles(result.data)
    );
  }

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
            return item.role._id === roleId;
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
        setCheckoutBody({ ...body, role: roleId });
        navigate("/payment");
      } else {
        alert("Attendee Already exists");
      }
    });
  }

  useEffect(() => {
    getAllRoles(params.eventId);
    fetchCurrentEvent(params.eventId);
    fetchActivities(params.eventId);
  }, [roleId]);

  return (
    <>
      {!noVisitorRole && (
        <Container>
          {currentEvent && (
            <EventContainer>
              <RegisterEventCard event={currentEvent} />
            </EventContainer>
          )}
          <FormContainer>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              onChange={handleChange}
            >
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
                          return value.role._id !== roleId;
                        }
                      })
                      .map((value) => {
                        return (
                          <MenuItem key={value._id} value={value._id}>
                            <Checkbox
                              checked={
                                checkedActivities.indexOf(value._id) > -1
                              }
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
            </Box>
          </FormContainer>
        </Container>
      )}
      {noVisitorRole && (
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
                <h1>Public registration for this event is not oppen yet</h1>
                <p>Please comme back later...</p>
              </div>
            )}
          </Box>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 1rem;
`;

const EventContainer = styled.div`
  width: 80vw;
  text-align: center;
  position: relative;
`;

const FormContainer = styled.div`
  position: relative;
`;
