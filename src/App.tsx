import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/AuthPage";
import { images } from "./constants/images";

function App() {
  return (
    <div
      className="bg-gray-400 min-w-screen min-h-fit max-h-screen h-screen bg-cover overflow-y-auto bg-fixed"
      style={{ backgroundImage: `url(${images.signInBg})` }}
    >
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
