import React, { useState, useEffect } from "react";

const states = {
    Maharashtra: ["Pune", "Mumbai","Nashik", "Ratnagiri", "Sindhudurg"],
    Karnataka: ["Kodagu", "Mysuru", " Bangalore"],
    Goa:["North Goa","South Goa"]
  }; 

const Dropdown = () => {
  const [stateData, setStateData] = useState(["Maharashtra"]);
  const [selectedState, setSelectedState] = useState("");

  const checkInsertInArray = newState => {
    let findStatus = stateData.find(x => {
      return x === newState;
    });
    if (!findStatus) {
        setStateData([...stateData, newState]);
    }
  };

  const stateChange = event => {
    if (event.target.value) {
        setSelectedState(event.target.value);
    }
  };

  useEffect(() => {
    Object.keys(states).forEach(state => {
      checkInsertInArray(state);
    });
  });

  return (
    <>

    

<label for="">State</label>
      <select onChange={stateChange} >
        <option value="" />
        {stateData.map((allStates, index) => {
          return <option key={index} name="Cstate" value={allStates}>{allStates}</option>;
        })}
      </select>
      <br />
      {selectedState ? (
        <>
        <label for="">City</label>{" "}
          <select >
            <option value="" />
            {states[selectedState].map((allStates, indx) => {
              return <option key={indx} name="Ccity" value={allStates}>{allStates}</option>;
            })}
          </select>
        </>
      ) : (
        <span>City: Please select a State first </span>
        
      )}
      <br /> <br />
    </>
  );
};

export default Dropdown;

