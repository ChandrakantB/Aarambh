import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage.jsx";
import TrainsPage from "./components/TrainsPage.jsx";
import TrainList from "./components/TrainList.jsx";
import SmartSecurePage from "./components/SmartSecurePage.jsx";
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trains" element={<TrainsPage />} />
        <Route path="/trains-page" element={<TrainList />} />
        <Route path="/secure-seat" element={<SmartSecurePage  />} />
      </Routes>
    </Router>
  );
}

export default App;
