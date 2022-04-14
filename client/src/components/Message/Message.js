import React from "react";
import PropTypes from "prop-types";

const Message = ({ msg, setMsg }) => {
  setTimeout(() => {
    setMsg(null);
  }, 3000);
  return (
    <div className="alert alert-info alert-dismissible" role="alert">
      {msg}
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Message;
