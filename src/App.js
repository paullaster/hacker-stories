import React from 'react';
import logo from "./logo.svg";
import "./App.css";

//variables
function getTitle(title) {
  return title;
}

const Try = (props) => {
  const { search, onSearch} = props;
  return (
    <div>
      <label htmlFor="try"> Yet a try:</label>
      <input
        type="text"
        id="try"
        value={search}
        onChange={onSearch}
        placeholder="Try again later"
      />

      <p>
        Search for: <strong> {search} </strong>
      </p>

    </div>
  );
};

const List = ({list}) =>
  <ul>
    {list.map(item => {
      return (
        <Item 
        key={item.objectID} 
        {...item}
        />
      );
    })}
  </ul>;
const Item = ({title, url, author, points, num_comments}) => {
  return (
    <li>
      <span>
        <a href={url}>
          {title}
        </a>
      </span>
      <br />
      <span>
        {author}
      </span>
      <br />
      <span>
        {points}
      </span>
      <span>
        {num_comments}
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
  //managin Try state
  const [ searchText, setSearchText ] = React.useState ('ExpressJs');
  const handleTry = (event) => {
    setSearchText (event.target.value);
  };

  //Filtering the search text
  const searchedText = stories.filter ( (story) => {
    return story.title.toLowerCase ().includes (searchText.toLowerCase ());
  });
  console.log (searchedText)
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
