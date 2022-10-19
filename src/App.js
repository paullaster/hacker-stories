import logo from './logo.svg';
import './App.css';

//variables
function getTitle (title) {
  return title;
};

const listItem = [
  {
    title: 'ExpressJs',
    url: 'http://expressjs.com/',
    author: 'expressjs',
    points: 4,
    num_comments: 10,
    ObjectId: '1'
  },
  {
    title: 'NodeJs',
    url: 'http://nodejs.org/',
    author: 'nodejs',
    points: 4,
    num_comments: 20,
    ObjectId: '2'
  },
];

function outPut (item) {
   return (
    <li key={item.ObjectId}>
      <span>
        { item.title }
      </span>
      <br />
      <span>
        { item.url}
      </span>
      <br />
      <span>
        {item.author}
      </span>
      <br />
      <span>
        { item.points }
      </span>
      <br />
      <span>
        { item.num_comments }
      </span>
    </li>
   );
}
function App() {
  return (
    <div>
      <h1>
        Welcome to {getTitle ('React App')}
      </h1>

      <label htmlFor="try" > Yet a try:</label>
      <input type="text" id="try" placeholder="Try again later" />

      <hr />
      {/*want to display array below */}

      <ul>
        {
          listItem.map (outPut)
        }
      </ul>

    </div>
  );
}

export default App;
