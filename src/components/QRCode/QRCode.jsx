import React, { useState } from "react";
import QRCodeNew from "qrcode";

/* https://www.npmjs.com/package/qrcode */

export default function QRCode(attendeeID) {
  const [url, setUrl] = useState("");

  function generateQRCode(attendeeID) {
    QRCodeNew.toDataURL(JSON.stringify(attendeeID))
      .then((url) => {
        setUrl(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  generateQRCode(attendeeID);

  return (
    <div key={attendeeID}>
      <img src={url} alt="" />
    </div>
  );
}
