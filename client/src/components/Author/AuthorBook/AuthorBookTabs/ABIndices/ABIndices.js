import React from "react";

const ABIndices = ({
  pageNo,
  setShowIndex,
  setPageNo,
  setShowSummary,
  totalPages,
}) => {
  const selectPage = (e) => {
    e.preventDefault();

    if (!pageNo) {
      alert("Please enter page number");
      return;
    }
    setShowIndex(false);
    setShowSummary(true);
  };
  return (
    <div className="IndexContainer">
      <h1>INDEX</h1>
      <form onSubmit={selectPage} className="indexForm">
        <div className="formControl">
          <label>Page Number</label>
          <input
            type="number"
            min="1"
            max={totalPages}
            placeholder="Enter Page Number"
            onChange={(e) => setPageNo(e.target.value)}
            value={pageNo}
          />
        </div>
        <input
          className="btn btn-primary btn-block mt-4"
          type="submit"
          value="Get Content"
        />
      </form>
    </div>
  );
};

export default ABIndices;
