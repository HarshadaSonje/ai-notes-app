import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Signup from "./pages/Signup"; 

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/notes"
          element={<Notes />}
        />

        <Route
  path="/signup"
  element={<Signup />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;