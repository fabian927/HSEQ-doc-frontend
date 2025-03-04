import { Routes, Route, useNavigate } from "react-router-dom";
import UserApp from "../usersComponent/UserApp";
import DocumentsApp from "../documentComponent/DocumentsApp";
import ReportsApp from "../reportComponent/ReportsApp";
import LoginApp from "../loginComponent/LoginApp";
import HomeApp from "../homeComponent/HomeApp";
import "bootstrap/dist/css/bootstrap.min.css";

const RoutesApp = () => {

    const navigate = useNavigate();

  return (
    
    <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/users/*" element={<UserApp />} />
        <Route path="/documents" element={<DocumentsApp />} />
        <Route path="/reports" element={<ReportsApp />} />
        <Route path="/login" element={<LoginApp />} />
    </Routes>
    
  )
}

export default RoutesApp