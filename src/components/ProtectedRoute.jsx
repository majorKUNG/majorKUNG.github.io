import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const teamId = localStorage.getItem("teamId");
  if (!teamId) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
