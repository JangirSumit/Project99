import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login';
import { GlobalContextProvider } from './contexts/GlobalContext';

function App() {

    return (
        <GlobalContextProvider>
            <Login />
        </GlobalContextProvider>
    );
}

export default App;