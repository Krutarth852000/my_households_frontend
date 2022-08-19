import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";
import { useContext } from "react";
import { AuthContext } from "./hooks/context";
import NewGroup from "./components/newGroup";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import CurrentGroup from "./components/CurrentGroup";
import Page404 from "./common/Page404";
import Expense from "./components/Expense";
import ExpenseDetails from "./components/ExpenseDetails";
import Active from "./common/Active";
import Settled from "./common/Settled";
function App() {
  const { user } = useContext(AuthContext);
  // console.log(user);
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<Header />} />
      </Routes>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/newGroup" element={<NewGroup />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/group/:groupId" element={<CurrentGroup />} />
          <Route path="/expense/:groupId" element={<ExpenseDetails />}>
            <Route path="/expense/:groupId" element={<Active />} />
            <Route
              path="/expense/:groupId/expenseSettled"
              element={<Settled />}
            />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
