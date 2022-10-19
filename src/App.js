import logo from './logo.svg';
import './App.css';

//variables
const welcome = {
  greeting: "Hello, world!",
  titles: "This is a React App title"
}

function App() {
  return (
    <div>
      {welcome.greeting} {welcome.titles}
    </div>
  );
}

export default App;
