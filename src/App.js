import React from 'react';
import logo from "./logo.svg";
import "./App.css";

//variables
function getTitle(title) {
  return title;
}

const InputWithLabel = ({id, value, type='text', onInputChange, children}) => {
  return (
    <React.Fragment>
      <label htmlFor={id}> {children}</label>
      &nbsp;
      <input
        type={type}
        id={id}
        value={value}
        onChange={onInputChange}
        placeholder="Try again later"
      />

      <p>
        Search for: <strong> {value} </strong>
      </p>

    </React.Fragment>
  );
};

const List = ({list}) =>
  <ul>
    {list.map( ({objectID, ...item}) => {
      return (
        <Item key={objectID} {...item} />
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
      <br />
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
    },
    {
      title: "C#",
      url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      author: "microsoft",
      points: 8,
      num_comments: 200,
      objectID: "4"
    },
    {
      title: "C++",
      url: "https://learn.microsoft.com/en-us/cpp/cpp/?view=msvc-170",
      author: "microsoft",
      points: 28,
      num_comments: 20000,
      objectID: "5"
    },
  ];
  //managin Try state
  //const [ searchText, setSearchText ] = React.useState (
  //  localStorage.getItem ('search') || 'ExpressJs');

  //React.useEffect ( () => {
    //saving the search text to localStorage
  //  localStorage.setItem ( 'search', searchText);
  //}, [searchText])
  //custom hook
  const useSemiPersistentState = (key, initialState) => {
    const [ value, setValue] = React.useState (
      localStorage.getItem (key) || initialState,
    );
    React.useEffect ( () => {
      localStorage.setItem (key, value);
    }, [value, key]);

    return [value, setValue];
  };

  const [searchText, setSearchText] = useSemiPersistentState ('search', 'ExpressJs');
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

      <InputWithLabel 
      id="search"
      label="search:"
      onInputChange={handleTry} 
      value={searchText}>
        <strong>
          Search:
        </strong>
      </InputWithLabel>

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
