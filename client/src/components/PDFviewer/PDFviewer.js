import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";
import "./PDFviewer.css";

const PDFviewer = ({ bookPath }) => {
  const viewer = useRef(null);
  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: "lib",
        initialDoc: bookPath,
      },
      viewer.current
    ).then((instance) => {
      const { docViewer } = instance;

      docViewer.on("documentLoaded", () => {});
    });
  }, []);

  return (
    <>
      <div className="webviewer" ref={viewer}></div>
    </>
  );
};

export default PDFviewer;
