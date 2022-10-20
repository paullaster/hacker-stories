import React from 'react';
import logo from "./logo.svg";
import "./App.css";

//variables
function getTitle(title) {
  return title;
}

const Try = () => {
  console.log ()
  const [ searchText, setSearchText] = React.useState ('');
  const handleChange = (event) => {
    setSearchText (event.target.value);
  };
  return (
    <div>
      <label htmlFor="try"> Yet a try:</label>
      <input
        type="text"
        id="try"
        onChange={handleChange}
        placeholder="Try again later"
      />


      <p>
        Searching for : <strong>{searchText}</strong>
      </p>
    </div>
  );
};

const List = props =>
  <ul>
    {props.list.map(item => {
      return (
        <Item key={item.objectID} item={item} />
      );
    })}
  </ul>;
const Item = (props) => {
  return (
    <li>
      <span>
        <a href={props.item.url}>
          {props.item.title}
        </a>
      </span>
      <br />
      <span>
        {props.item.author}
      </span>
      <br />
      <span>
        {props.item.points}
      </span>
      <span>
        {props.item.num_comments}
      </span>
    </li>
  );
};
const App = () => {
  const stories = [
    {
      title: "Javascript",
      url: "https://javascript.com/",
      author: "Javascript Developer",
      points: 104,
      num_comments: 1000000,
      objectID: "1"
    },
    {
      title: "ExpressJs",
      url: "https://expressjs.com/",
      author: "expressjs",
      points: 4,
      num_comments: 10,
      objectID: "2"
    },
    {
      title: "NodeJs",
      url: "https://nodejs.org/",
      author: "nodejs",
      points: 4,
      num_comments: 20,
      objectID: "3"
    }
  ];
  return (
    <div>
      <h1>
        Welcome to {getTitle("Hacker Stories")}
      </h1>

      <Try />

      <hr />
      {/*want to display array below */}
      {/*List one */}
      <List list={stories} />
      {/*List two */}
      <List list={stories} />
    </div>
  );
};

export default App;
