import "./App.css";
import React, { useState } from "react";

const API_URL = "https://api.github.com";
// const response = await fetch(`${API_URL}/search/users?q=${query}`);
const Form = ({ onSubmit, onChange, value }) => {
  return (
    <form onSubmit={onSubmit} onChange={onChange} className="search-form">
      <input
        id="search"
        type="text"
        value={value}
        placeholder="Enter your username or email"
      />
      <button type="submit">Search</button>
    </form>
  );
};
const User = ({ avatar, url, username }) => {
  return (
    <div className="user">
      <img src={avatar} alt="Profile" width="50" height="50" />
      <a href={url} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    setQuery(e.target.value);
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${API_URL}/search/users?q=${query}`);
      const json = await response.json();
      setResults(json.items);
    } catch (e) {
      throw new Error(e);
    }
  };
  return (
    <div className="App">
      <main>
        <h1>Project 5: Github User search</h1>
        <Form onSubmit={onSubmit} onChange={onChange} value={query} />
        <h3>Results</h3>
        <div id="results">
          {results.map((user) => (
            <User
              key={user.login}
              avatar={user.avatar_url}
              url={user.html_url}
              username={user.login}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
