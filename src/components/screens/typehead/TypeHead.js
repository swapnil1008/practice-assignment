import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import "./typehead.css";

const TypeHead = (props) => {
  const {
    filteredData,
    visibleList,
    displayUser,
    clearInput,
    handleFilter,
    placeholder,
    wordEntered,
  } = props || {};

  return (
    <div>
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {visibleList && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <div
                  className="dataItem"
                  key={key}
                  onClick={() => {
                    displayUser(value);
                  }}
                >
                  <p>{value.login} </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TypeHead;
