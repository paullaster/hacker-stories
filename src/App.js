import logo from './logo.svg';
import './App.css';

//variables
function getTitle (title) {
  return title;
};

const list = [
  {
    title: 'ExpressJs',
    url: 'http://expressjs.com/',
    author: 'expressjs',
    points: 4,
    num_comments: 10,
    objectID: '1'
  },
  {
    title: 'NodeJs',
    url: 'http://nodejs.org/',
    author: 'nodejs',
    points: 4,
    num_comments: 20,
    objectID: '2'
  },
];

const Try = () => {
  const handleChange = (event) => {
    console.log (event.target.value);
  }
  return (
    <div>
      <label htmlFor="try" > Yet a try:</label>
      <input type="text" id="try" onChange={handleChange} placeholder="Try again later" />
    </div>
  );
}

const List  = () =>(
    <ul>
      {
        list.map ( (item) => {
          return(
            <li key={item.objectID}>
                <span>
                  <a href={item.url}> {item.title} </a>
                </span>
                <br />
                <span>
                  {item.author}
                </span>
                <br />
                <span>
                  {item.points}
                </span>
                <span>
                  {item.num_comments}
                </span>
          </li>
          );}
        )
      }
    </ul>
  )

const App = () =>(
    <div>
      <h1>
        Welcome to {getTitle ('React App')}
      </h1>

      <Try />

      <hr />
      {/*want to display array below */}
      {/*List one */}
      <List />
      {/*List two */}
      <List />
    </div>
  );

export default App;
