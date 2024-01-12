import ContectProvider from "./context";
import FormComponent from "./components/formComponent";
import WeatherComponent from "./components/weatherComponent";

function App() {
  return (
    <div className="App">
      <ContectProvider>
        <FormComponent />
        <WeatherComponent />
      </ContectProvider>
    </div>
  );
}

export default App;
