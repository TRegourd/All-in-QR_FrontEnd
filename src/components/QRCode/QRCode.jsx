import React from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCode(attendee) {
  return (
    <div>
      <QRCodeSVG value={attendee} />
    </div>
  );
}
