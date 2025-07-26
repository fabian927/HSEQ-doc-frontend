import { Routes, Route, useNavigate } from "react-router-dom";
import UserApp from "../usersComponent/UserApp";
import DocumentsApp from "../documentComponent/DocumentsApp";
import ReportsApp from "../reportComponent/ReportsApp";
import ReportInspectionApp from "../reportComponent/ReportInspectionApp";
import ReportPermissionApp from "../reportComponent/ReportPermissionApp";
import LoginApp from "../loginComponent/LoginApp";
import HomeApp from "../homeComponent/HomeApp";
import "bootstrap/dist/css/bootstrap.min.css";

import WorkPermitionApp from "../documentComponent/permisosComponent/workPermitionComponent/WorkPermitionApp";
import WorkPermitionHeightsApp from "../documentComponent/permisosComponent/workPermitionHeightsComponent/WorkPermitionHeightsApp";
import InspectionApp from "../documentComponent/documentosComponent/inspectionComponent/InspectionApp";
import AtsApp from "../documentComponent/atsComponent/analisisComponent/AtsApp";

const RoutesApp = () => {

    const navigate = useNavigate();

  return (
    
    <Routes>
        <Route path="/" element={<HomeApp />} />
        <Route path="/users/*" element={<UserApp />} />
        <Route path="/documents" element={<DocumentsApp />} />
        <Route path="/reports" element={<ReportsApp />} />
        <Route path="/reportsDocument" element={<ReportInspectionApp />} />
        <Route path="/reportsPermission" element={<ReportPermissionApp />} />
        <Route path="/login" element={<LoginApp />} />
        
        <Route path="/documents/workPermition" element={<WorkPermitionApp />} />
        <Route path="/documents/workPermitionHeights" element={<WorkPermitionHeightsApp />} />
        <Route path="/documents/inspection" element={<InspectionApp />} />
        <Route path="/documents/ats" element={<AtsApp />} />


    </Routes>
    
  )
}

export default RoutesApp