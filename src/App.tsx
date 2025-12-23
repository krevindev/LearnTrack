import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignInForm from "./forms/SignInForm";
import SignUpForm from "./forms/SignUpForm";
import { images } from "./constants/images";
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <div
      className="bg-gray-400 min-w-screen min-h-fit max-h-screen h-screen bg-cover overflow-y-auto bg-fixed"
      style={{ backgroundImage: `url(${images.signInBg})` }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />}>
          <Route index element={<SignInForm />} />
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
