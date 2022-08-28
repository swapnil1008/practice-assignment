import React from "react";
import { LOGIN, OPEN_ISSUES, REPO_NAME, WATCHERS } from "../../constants";
import "./repotable.css";
const RepoTable = (props) => {
  const { repositories, visibleCardAndTable } = props || {};
  return (
    <div>
      {visibleCardAndTable && (
        <table className="customers">
          <thead>
            <tr>
              <th>{LOGIN}</th>
              <th>{REPO_NAME}</th>
              <th>{OPEN_ISSUES}</th>
              <th>{WATCHERS}</th>
            </tr>
          </thead>
          <tbody>
            {repositories.map((value, key) => {
              return (
                <tr key={key}>
                  <td>{value.owner.login}</td>
                  <td>{value.name}</td>
                  <td>{value.open_issues_count}</td>
                  <td>{value.watchers_count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RepoTable;
