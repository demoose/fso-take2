import React from "react";

function Filter({ filterName, handleFilter }) {
  return (
    <div>
      filter by name: <input value={filterName} onChange={handleFilter} />
    </div>
  );
}

export default Filter;
