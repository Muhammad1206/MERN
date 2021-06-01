import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from "./components/Route/routes";
import { Navbar } from './components/Navbar/Navbar';
import {Loader} from "./components/Loader/Loader";
import "./App.css";
import 'materialize-css';


function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if(!ready) {
    <Loader />

  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId
    }}>
      {isAuthenticated && <Navbar/>}
      <div className="container">
        {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
