import { React, useState } from "react";
import "../../App.css";
import PDFviewer from "../PDFviewer/PDFviewer";

const Tutorial = () => {
  return (
    <div style={{ background: "#f6f6f6" }}>
      <PDFviewer bookPath={"./docs/flip_tutorial.pdf"} />
    </div>
  );
};

export default Tutorial;
