import React, { useState } from "react";

import MultyCityFormItem from "./MultyCityFormItem";

const SearchForm: React.FC = (): JSX.Element => {
  let [flights, setFlights] = useState([0]);

  return (
    <div>
      {flights.map((flight, index) => (
        <MultyCityFormItem
          key={index}
          idx={index}
          length={flights.length}
          handleAddFlight={() => setFlights([...flights, 0])}
        />
      ))}
    </div>
  );
};

export default SearchForm;
