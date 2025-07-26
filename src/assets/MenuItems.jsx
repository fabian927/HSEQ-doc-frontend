import { FaUsers, FaFileAlt, FaChartBar } from 'react-icons/fa';

export const menuItemsAdmin = [
    
    {
        label: "Usuarios",
        icon: <FaUsers />,
        subItems: [
        { path: "/users", label: "Listar Usuarios" },
        { path: "/users/create", label: "Crear Usuario" },
        { path: "/users/updtPass", label: "Cambiar Contraseña" },
        ]
    },
        {
        label: "Permisos",
        icon: <FaFileAlt />,
        subItems: [
        { label: "Trabajo en Alturas", path: "/documents/workPermitionHeights" },
        { label: "Trabajo en Caliente", path: "/documents/permission2" },
        { label: "Trabajo Eléctrico", path: "/documents/permission3" },
        { label: "Espacios Confinados", path: "/documents/permission4" }
        ]
    },
    {
        label: "Documentos",
        icon: <FaFileAlt />,
        subItems: [
        { label: "Inspección de Herramienta", path: "/documents/inspection" },
        { label: "Herramientas Eléctricas", path: "/documents/document2" },
        { label: "Equipos de Altura", path: "/documents/document3" },
        { label: "Llamado de Atención", path: "/documents/document4" }
        ]
    },
    {
        label: "ATS",
        icon: <FaFileAlt />,
        subItems: [
        { label: "Trabajo Seguro", path: "/documents/ats" },
        { label: "Alturas", path: "/documents/ats2" },
        { label: "Espacios Confinados", path: "/documents/ats3" }
        ]
    },
    {
        label: "Reportes",
        icon: <FaChartBar />,
        subItems: [
        { path: "/reports", label: "Reportes Ats" },
        { path: "/reportsDocument", label: "Reportes Documentos" },
        { path: "/reportsPermission", label: "Reportes Permisos" }
        ]
    }
];

 export const menuItemsOther = [
      
    {
        label: "Usuarios",
        icon: <FaUsers />,
        subItems: [
            { path: "/users/updtPass", label: "Cambiar Contraseña" },
        ]
    },
    {
        label: "Permisos",
        icon: <FaFileAlt />,
        subItems: [
            { label: "Trabajo en Alturas", path: "/documents/workPermitionHeights" },
            { label: "Trabajo en Caliente", path: "/documents/permission2" },
            { label: "Trabajo Eléctrico", path: "/documents/permission3" },
            { label: "Espacios Confinados", path: "/documents/permission4" }
        ]
    },
    {
        label: "Documentos",
        icon: <FaFileAlt />,
        subItems: [
            { label: "Inspección de Herramienta", path: "/documents/inspection" },
            { label: "Herramientas Eléctricas", path: "/documents/document2" },
            { label: "Equipos de Altura", path: "/documents/document3" },
            { label: "Llamado de Atención", path: "/documents/document4" }
        ]
    },
    {
        label: "ATS",
        icon: <FaFileAlt />,
        subItems: [
            { label: "Trabajo Seguro", path: "/documents/ats" },
            { label: "Alturas", path: "/documents/ats2" },
            { label: "Espacios Confinados", path: "/documents/ats3" }
        ]
    },
    {
        label: "Reportes",
        icon: <FaChartBar />,
        subItems: [
            { path: "/reports", label: "Reportes ATS" },
            { path: "/reportsDocument", label: "Reportes Documentos" },
            { path: "/reportsPermission", label: "Reportes Permisos" }
        ]
    }
];