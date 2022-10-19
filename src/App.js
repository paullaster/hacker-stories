import logo from './logo.svg';
import './App.css';

//variables
const titles = "This is a React App title"

function App() {
  return (
    <div>
      Hello World! {titles}
      <label htmlFor= "try" > Try:</label>
      <input type='text' id="try" placeholder="Try..." />
    </div>
  );
}

export default App;
