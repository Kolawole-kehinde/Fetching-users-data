
import HomePage from "./Page/Home";
import UserFullDetails from "./Page/userDetailsPage";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <Routes>
      <Route path="/"/>
      <Route index element={<HomePage/>} />
      <Route path="/user/:username" element={<UserFullDetails />} />
    
     
    </Routes>
  );
};

export default App;
