import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./layouts";
import ResultPage from "./pages/Result";
import MainPage from "./pages/Main";
import { IFlightState } from "./types";

export const FlightContext = createContext({
  flightState: [] as IFlightState[],
  setFlightState: (arg: IFlightState[]) => {},
});

const App: React.FC = (): JSX.Element => {
  const [flightState, setFlightState] = useState([] as IFlightState[]);

  return (
    <FlightContext.Provider value={{ flightState, setFlightState }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/result" element={<ResultPage />} />
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Layout>
      </Router>
    </FlightContext.Provider>
  );
};

export default App;
