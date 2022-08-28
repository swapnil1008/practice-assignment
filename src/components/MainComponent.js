import React, { useState, useEffect } from "react";
import TypeHead from "./screens/typehead/TypeHead";
import User from "./screens/user/User";
import RepoTable from "./screens/repo-table/RepoTable";
import { TYPEHEAD_PLACEHOLDER } from "./constants";

const MainComponent = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [user, setUser] = useState({});
  const [isDropDownVisible, setIsDropDownVisible] = useState(true);
  const [error, setError] = useState("");

  const getData = () => {
    if (wordEntered.length) {
      fetch(`https://api.github.com/search/users?q=${wordEntered}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.items.length) {
            const newFilter = data.items.filter((value) => {
              return value.login
                .toLowerCase()
                .includes(wordEntered.toLowerCase());
            });
            setFilteredData(newFilter);
          }
        })
        .catch(() => {
          setError("API limit exceeded...");
        });
    }
  };

  const debounce = function (fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
      }, delay);
    };
  };

  useEffect(() => {
    const fun1 = debounce(getData, 500);
    fun1();
  }, [wordEntered]);

  const handleFilter = (event) => {
    const searchWord = event.target.value || "";
    setWordEntered(searchWord);
    if (!!searchWord) {
      setFilteredData([]);
      setRepositories([]);
      setIsDropDownVisible(true);
      setUser({});
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setRepositories([]);
    setIsDropDownVisible(true);
    setUser({});
  };

  const displayUser = async (value) => {
    const repositories = await fetch(value.repos_url);
    const repoJson = await repositories.json();

    const user = await fetch(`https://api.github.com/users/${value.login}`);
    const userJson = await user.json();

    if (repoJson.length && Object.keys(userJson).length !== 0) {
      setRepositories(repoJson);
      setUser(userJson);
      setIsDropDownVisible(false);
    }
  };

  const visibleList = filteredData.length != 0 && isDropDownVisible;
  const visibleCardAndTable =
    Object.keys(user).length !== 0 && repositories.length != 0 && !!wordEntered;

  return (
    <div>
      <TypeHead
        filteredData={filteredData}
        visibleList={visibleList}
        displayUser={displayUser}
        clearInput={clearInput}
        handleFilter={handleFilter}
        placeholder={TYPEHEAD_PLACEHOLDER}
        wordEntered={wordEntered}
      />
      <User user={user} visibleCardAndTable={visibleCardAndTable} />
      <RepoTable
        repositories={repositories}
        visibleCardAndTable={visibleCardAndTable}
      />
      {error && <h2>{error}</h2>}
    </div>
  );
};

export default MainComponent;
