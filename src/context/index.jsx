import React, { createContext, useContext } from "react";

const AppContext = createContext(null);

export const useContectData = () => {
  const context = useContext(AppContext);
  return context;
};

const ContectProvider = ({ children }) => {
  const data = window.localStorage.getItem("@weatherData");
  const [weatherData, setWeatherData] = React.useState(JSON.parse(data) || {});

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };
  return (
    <React.Fragment>
      <AppContext.Provider value={{ weatherData, handleWeatherData }}>
        {children}
      </AppContext.Provider>
    </React.Fragment>
  );
};

export default ContectProvider;
