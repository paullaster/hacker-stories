import React from 'react';
import "./App.css";

//variables
const getTitle = (title) => {
  return title;
}
const storiesReducer = ( state, action) => {
  switch (action.type) {
    case "STORIES_INIT":
      return{
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'SET_STORIES':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case 'STORIES_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data:state.data.filter (
          (story) => action.payload.objectID !== story.objectID
        )
        };
    default:
      throw new Error ( 'Invalid action type')
  }
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

    <Button onClick={ () => onRemoveItem (item) } >
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

  // const initialStories = [
  //   {
  //     title: "Javascript",
  //     url: "https://javascript.com/",
  //     author: "Javascript Developer",
  //     points: 104,
  //     num_comments: 1000000,
  //     objectID: "1"
  //   },
  //   {
  //     title: "ExpressJs",
  //     url: "https://expressjs.com/",
  //     author: "expressjs",
  //     points: 4,
  //     num_comments: 10,
  //     objectID: "2"
  //   },
  //   {
  //     title: "NodeJs",
  //     url: "https://nodejs.org/",
  //     author: "nodejs",
  //     points: 4,
  //     num_comments: 20,
  //     objectID: "3"
  //   },
  //   {
  //     title: "C#",
  //     url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
  //     author: "microsoft",
  //     points: 8,
  //     num_comments: 200,
  //     objectID: "4"
  //   },
  //   {
  //     title: "C++",
  //     url: "https://learn.microsoft.com/en-us/cpp/cpp/?view=msvc-170",
  //     author: "microsoft",
  //     points: 28,
  //     num_comments: 20000,
  //     objectID: "5"
  //   },
  // ];
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

  const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

  const [searchTerm, setSearchTerm] = useSemiPersistentState ('search', 'ExpressJs');
  
  const [stories, dispatchStories] = React.useReducer (
    storiesReducer, {
      data: [],
      isLoading: false,
      isError: false,
  } );
  React.useEffect ( () => {
    if (searchTerm === '') return;
    dispatchStories(
      {
        type: 'STORIES_INIT',
      }
    )

    fetch(`${API_ENDPOINT}${searchTerm}`)
    .then ( (response) => response.json())
    .then ( (responseData) => {
      dispatchStories (
        {
          type: 'SET_STORIES',
          payload: responseData.hits,
        }
      );
    }).catch ( (error) => {
      return dispatchStories({
        type: 'STORIES_ERROR',
      });
    })
  },[searchTerm]);

  const handleTry = (event) => {
    setSearchTerm (event.target.value);
  };

  const handleRemovedStory = (item) => {
    dispatchStories ({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };


  //Filtering the search text
  // const searchedTerm = stories.data.filter ( (story) => {
  //   return story.title.toLowerCase ().includes (searchText.toLowerCase ());
  // });
  return (
    <div>
      <h1>
        Welcome to {getTitle("Hacker Stories")}
      </h1>

      <InputWithLabel 
      id="search"
      label="search:"
      onInputChange={handleTry} 
      value={searchTerm}
      isFocused
      >
        <strong>
          Search:
        </strong>
      </InputWithLabel>

      <hr />
      {/*want to display array below */}
      {/*List one */}
      {stories.isError && <p>Something went wrong...</p>}
      {
        stories.isLoading ? (
          <p> Loading...</p>
        ):
        (
        <>
          <List list={stories.data}  onRemoveItem={handleRemovedStory} />
        </>
        )
      }

      
    </div>
  );
};

export default App;
