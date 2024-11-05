import { BrowserRouter, Route, Routes } from "react-router-dom";
import Weather from "./components/Template/Weather";
import Template from "./components/Template/Template";
import Movie from "./components/Template/Movie";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Template/>}>
            <Route index element={<Weather/>}/>
            <Route path="weather" element={<Weather/>}/>
            <Route path="movie" element={<Movie/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
