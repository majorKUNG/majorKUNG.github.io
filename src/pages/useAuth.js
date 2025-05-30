export function useAuth() {
  const teamId = localStorage.getItem("teamId");
  return { 
    teamId, 
    isLoggedIn: !!teamId 
  }
}