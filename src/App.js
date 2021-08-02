import './App.css';
import { Route, Switch } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import ErrorPage from './pages/Error';

// navbar
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/rooms/:slug" exact component={SingleRoom} />
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/" exact component={Home} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}

export default App;
