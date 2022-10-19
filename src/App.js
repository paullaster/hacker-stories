import logo from './logo.svg';
import './App.css';

//variables
function getTitle (title) {
  return title;
};

function App() {
  return (
    <div>
      <h1>
        Welcome to {getTitle ('React App')}
      </h1>

      <label htmlFor="try" > Yet a try:</label>
      <input type="text" id="try" placeholder="Try again later" />
    </div>
  );
}

export default App;
