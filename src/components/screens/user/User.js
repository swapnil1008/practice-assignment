import React from "react";
import "./user.css";

const User = (props) => {
  const { user, visibleCardAndTable } = props || {};
  return (
    <div>
      {visibleCardAndTable && (
        <div className="card">
          <img src={user.avatar_url} alt="Avatar" />
          <div className="container">
            <h4>
              <b>{user.name}</b>
            </h4>
            <p>{user.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
