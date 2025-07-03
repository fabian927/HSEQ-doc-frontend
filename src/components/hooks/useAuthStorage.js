const useAuthStorage = () => {
  const saveAuthData = ({ token, userId, userName, lastName, roll }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("roll", roll);
  };

  const getAuthData = () => {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      lastName: localStorage.getItem("lastName"),
      roll: localStorage.getItem("roll")
    };
  };

  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("roll");
  };

  return {
    saveAuthData,
    getAuthData,
    clearAuthData,
  };
};

export default useAuthStorage;