import React from "react";
import Styled from "styled-components";
import DeleteAttendee from "../DeleteAttendee/DeleteAttendee";
import SendQRCode from "../SendQRCodeEmail/SendQRCodeEmail";
import EditAttendee from "../EditAttendee/EditAttendee";
import QRCode from "../QRCode/QRCode";

function Attendee({ attendeeInfo, eventId, fetchAndSetAttendees }) {
  return (
    <div>
      <AttendeeStyle>
        <div>{attendeeInfo.name}</div>
        <div>{attendeeInfo.surname}</div>
        <div>{attendeeInfo.role.name}</div>
        <div>{attendeeInfo.phone}</div>
        <div>{attendeeInfo.email}</div>
        <div>
          <EditAttendee
            result={attendeeInfo}
            eventID={eventId}
            fetchAndSetAttendees={fetchAndSetAttendees}
          />
        </div>
        <div>
          <DeleteAttendee
            result={attendeeInfo}
            eventID={eventId}
            fetchAndSetAttendees={fetchAndSetAttendees}
          />
        </div>
        <div>
          <SendQRCode result={attendeeInfo} />
        </div>
        <div key={attendeeInfo._id}>
          <QRCode attendeeID={attendeeInfo._id} />
        </div>
      </AttendeeStyle>
    </div>
  );
}

const AttendeeStyle = Styled.div`
  display: flex;
  margin: 1rem; 
  justify-content: space-around; 
  background-color: grey; 
  padding: 1rem;
  border-radius : 20px;
  align-items : center; 
  div {
      width: 100%;
  }
  button {
      padding: 0.5rem; 
      border-radius : 20px;
  }
`;

export default Attendee;
