import logo from './logo.svg';
import './App.css';

//variables
function getTitle (title) {
  return title;
};

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

const List  = (props) =>(
    <ul>
      {
        props.list.map ( (item) => {
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

const App = () => {
  const stories = [
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
  ]
  return (
    <div>
      <h1>
        Welcome to {getTitle ('Hacker Stories')}
      </h1>

      <Try />

      <hr />
      {/*want to display array below */}
      {/*List one */}
      <List list={stories}/>
      {/*List two */}
      <List list ={stories}/>
    </div>
  )
};

export default App;
