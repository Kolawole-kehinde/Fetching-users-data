
import FetchUsers from "./Components/Users";
import UserFullDetails from "./Page/userDetailsPage";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FetchUsers/>} />
      <Route path="/user/:username" element={<UserFullDetails />} />
    </Routes>
  );
};

export default App;
