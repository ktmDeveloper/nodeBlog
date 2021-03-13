import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Dropdown from "../components/Dropdown";
import Dashboard from "../components/Dashboard";
const PAGE_ID = document.getElementById("reactId");

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [contentUrl, setContentUrl] = useState("");

  useEffect(() => {
    fetch("/cc")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Dashboard contentUrl={contentUrl} />
        <Dropdown menu={items} setContentUrl={setContentUrl} />
      </>
    );
  }
};

if (PAGE_ID) {
  ReactDOM.render(<App />, PAGE_ID);
}
