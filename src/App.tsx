import { Provider } from "react-redux";
import "./App.css";
import Map from "./pages/map";
import store from "./shared/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Map />
      </Provider>
    </div>
  );
}

export default App;
