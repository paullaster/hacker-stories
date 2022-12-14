import React from 'react';
import "./App.css";

//variables
function getTitle(title) {
  return title;
}

const InputWithLabel = ({id, value, type='text', onInputChange, isFocused, children}) => {
  const inputRef = React.useRef ();

  React.useEffect ( () => {
    if ( isFocused && inputRef.current) {
      inputRef.current.focus ();
    }
  }, [isFocused]);

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
        ref={inputRef}
      />

      <p>
        Search for: <strong> {value} </strong>
      </p>

    </React.Fragment>
  );
};

const List = ({list, onRemoveItem}) =>
  <ul>
    {list.map( (item) => {
      return (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      );
    })}
  </ul>;
const Item = ({item, onRemoveItem}) => {
  return (
    <React.Fragment>
      <li>
        <span>
          <a href={item.url}>
            {item.title}
          </a>
        </span>
        <br />
        <span>
          {item.author}
        </span>
        <br />
        <span>
          {item.points}
        </span>
        <br />
        <span>
          {item.num_comments}
        </span>
     </li>

    <Button onClick={ () => onRemoveItem (item.objectID) } >
      Remove item
    </Button>

    </React.Fragment>
  );
};

const Button = ( {onClick, type="button", children} ) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};

const App = () => {

  const initialStories = [
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

  const getAsyncStories = () => {
    return new Promise ( (resolve) => {
      return setTimeout (
        () => {
          return resolve ( {data: {stories: initialStories}} );
        }, 2000
      );
    });
  };

  React.useEffect ( () => {
    getAsyncStories ().then ( (result) => {
      setStories (result.data.stories);
    })
  },[]);

  const [searchText, setSearchText] = useSemiPersistentState ('search', 'ExpressJs');
  
  const [stories, setStories] = React.useState ([]);

  const handleTry = (event) => {
    setSearchText (event.target.value);
  };

  const handleRemovedStory = (id) => {
    const newStories = stories.filter ( (story) => {
      return id !== story.objectID
    });
    setStories (newStories);
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
      value={searchText}
      isFocused
      >
        <strong>
          Search:
        </strong>
      </InputWithLabel>

      <hr />
      {/*want to display array below */}
      {/*List one */}
      <List list={searchedText}  onRemoveItem={handleRemovedStory} />
      {/*List two */}
      <List list={searchedText}  onRemoveItem={handleRemovedStory} />

      
    </div>
  );
};

export default App;
