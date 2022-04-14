import React, { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";

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
      <div
        className="webviewer"
        style={{
          height: "88vh",
          width: "90%",
          margin: "3.5% 5% 2% 5%",
          WebkitBoxShadow: "1px 1px 10px #999",
          boxShadow: "1px 1px 10px #999",
        }}
        ref={viewer}
      ></div>
    </>
  );
};

export default PDFviewer;
