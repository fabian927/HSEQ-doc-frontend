const useAuthStorage = () => {
  const saveAuthData = ({ token, userId, userName, lastName }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("lastName", lastName);
  };

  const getAuthData = () => {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      userName: localStorage.getItem("userName"),
      lastName: localStorage.getItem("lastName"),
    };
  };

  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("lastName");
  };

  return {
    saveAuthData,
    getAuthData,
    clearAuthData,
  };
};

export default useAuthStorage;