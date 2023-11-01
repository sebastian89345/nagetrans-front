// react-router components
import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";

// context
import { AuthGuard } from "./guards/auth.guard";

//Hoja de estilos
import '../src/styles/style.css'

// vistas de las interfaces
import Login from './views/login/Login';
import Home from './views/home/Home';

// font-family: 'Poppins', sans-serif;

function App() {
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="login" element={<Login />} />
          <Route element={<AuthGuard/>}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>    
  );
}

export default App;
