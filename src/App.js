import React from 'react';
import axios from 'axios';
import styles from "./App.module.css";
import classNames from 'classnames';
import { ReactComponent as Check } from './check.svg';

//variables
export const getTitle = (title) => {
  return title;
}
export const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_INIT":
      return {
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
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        )
      };
    default:
      throw new Error('Invalid action type')
  }
}

export const InputWithLabel = ({ id, value, type = 'text', onInputChange, isFocused, children }) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <React.Fragment>
      <label htmlFor={id} className={styles.label}> {children}</label>
      &nbsp;
      <input
        type={type}
        id={id}
        value={value}
        onChange={onInputChange}
        placeholder="Try again later"
        ref={inputRef}
        className={styles.input}
      />

      <p>
        Search for: <strong> {value} </strong>
      </p>

    </React.Fragment>
  );
};

export const List = React.memo(({ list, onRemoveItem }) =>
  console.log("B: List") ||
  <ul>
    {list.map((item) => {
      return (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      );
    })}
  </ul>
);
export const Item = React.memo(({ item, onRemoveItem }) => {
  console.log("D: item" + item.objectID)
  return (
    <React.Fragment>
      <li className={styles.item}>
        <span style={{ width: '40%' }}>
          <a href={item.url}>
            {item.title}
          </a>
        </span>
        <br />
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <br />
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <br />
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          <Button onClick={() => onRemoveItem(item)} >
            <Check width="20px" height="20px" />
          </Button>
        </span>
      </li>

    </React.Fragment>
  );
});

export const Button = ({ onClick, type = "button", children }) => {
  return (
    <button onClick={onClick} type={type} className={classNames(styles.button, styles.buttonSmall)}>
      {children}
    </button>
  );
};

export const SearchForm = React.memo(({ searchTerm, handleTry, handleSearchSubmit }) => {
  console.log("C: form")
  return (
    <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
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
      <button
        type='submit'
        disabled={!searchTerm}
        className={classNames(styles.button, styles.buttonLarge)}
      >
        submit
      </button>
    </form>
  )
});

export const getSumComments = (stories) => {
  return stories.data.reduce( (result, value) => {
    return result + value.num_comments;
  }, 0)
}

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
  console.log('B: APP');
  const useSemiPersistentState = (key, initialState) => {
    const isMounted = React.useRef(false);
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState,
    );
    React.useEffect(() => {
      if (!isMounted.current) {
        isMounted.current = true;
      } else {
        console.log('A');
        localStorage.setItem(key, value);
      }
    }, [value, key]);

    return [value, setValue];
  };

  const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'ExpressJs');
  const [URL, setURL] = React.useState(`${API_ENDPOINT}${searchTerm}`);
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  //CREATING A MEMOIZED FUNCTION:
  const handleFetchedStories = React.useCallback(async () => {
    // if (!searchTerm) return;
    dispatchStories(
      {
        type: 'STORIES_INIT',
      }
    )
    try {
      const responseData = await axios.get(URL)
      dispatchStories(
        {
          type: 'SET_STORIES',
          payload: responseData.data.hits,
        }
      );
    } catch {
      return dispatchStories({
        type: 'STORIES_ERROR',
      });
    }
  }, [URL])

  React.useEffect(() => {
    handleFetchedStories();
  }, [handleFetchedStories]);

  const handleTry = React.useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSearchSubmit = React.useCallback((event) => {
    setURL(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  }, [])

  const handleRemovedStory = React.useCallback((item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  },[]);

const sumComment = React.useMemo( () => getSumComments(stories), [stories]);
  //Filtering the search text
  // const searchedTerm = stories.data.filter ( (story) => {
  //   return story.title.toLowerCase ().includes (searchText.toLowerCase ());
  // });
  return (
    <div className={styles.container}>
      <h1 className={styles.headlinePrimary}>
        Welcome to {getTitle("Hacker Stories")} with {sumComment} comments
      </h1>
      <SearchForm
        searchTerm={searchTerm}
        handleTry={handleTry}
        handleSearchSubmit={handleSearchSubmit}
      />

      {/*want to display array below */}
      {/*List one */}
      {stories.isError && <p>Something went wrong...</p>}
      {
        stories.isLoading ? (
          <p> Loading...</p>
        ) :
          (
            <>
              <List list={stories.data} onRemoveItem={handleRemovedStory} />
            </>
          )
      }


    </div>
  );
};

export default App;
