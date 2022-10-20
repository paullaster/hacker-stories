import React from 'react';
import logo from "./logo.svg";
import "./App.css";

//variables
function getTitle(title) {
  return title;
}

const Try = (props) => {
  return (
    <div>
      <label htmlFor="try"> Yet a try:</label>
      <input
        type="text"
        id="try"
        value={props.search}
        onChange={props.onSearch}
        placeholder="Try again later"
      />

      <p>
        Search for: <strong> {props.search} </strong>
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
  console.log ("changes")
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
  //managin Try state
  const [ searchText, setSearchText ] = React.useState ('ExpressJs');
  const handleTry = (event) => {
    setSearchText (event.target.value);
  };

  //Filtering the search text
  const searchedText = stories.filter ( (story) => {
    return story.title.toLowerCase ().includes (searchText.toLowerCase ());
  });

  return (
    <div>
      <h1>
        Welcome to {getTitle("Hacker Stories")}
      </h1>

      <Try onSearch={handleTry} search={searchText} />

      <hr />
      {/*want to display array below */}
      {/*List one */}
      <List list={searchedText} />
      {/*List two */}
      <List list={searchedText} />
    </div>
  );
};

export default App;
