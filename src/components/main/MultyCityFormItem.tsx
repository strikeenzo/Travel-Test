import React, { BaseSyntheticEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import locationIcon from "../../assets/img/main/location.png";
import calendarIcon from "../../assets/img/main/calendar.png";
import usersIcon from "../../assets/img/main/users.png";
import reloadIcon from "../../assets/img/main/reload.png";
import reFreshIcon from "../../assets/img/main/refresh.png";
import CityList from "./CityList";
import PassengerSelect from "./PassengerSelect";
import { FlightContext } from "../../App";
import { useCheckout } from "../../mock-backend";
import { City } from "../../types";

interface ISearchFormProps {
  idx: number;
  handleAddFlight: () => void;
  length: number;
}

const SearchFormItem: React.FC<ISearchFormProps> = ({
  idx,
  length,
  handleAddFlight,
}): JSX.Element => {
  const flightContext = useContext(FlightContext);
  const navigate = useNavigate();
  const { search, calc } = useCheckout();

  const [state, setState] = useState({
    editingCurrent: idx > 0 ? false : true,
    editingDestination: true,
    editingDateFrom: false,
    editingUsers: true,
  });
  const [showValidationError, setShowValidationError] = useState(false);
  const [openUserSelect, setOpenUserSelect] = useState(false);
  const [openCurrentSelect, setOpenCurrentSelect] = useState(false);
  const [openDestinationSelect, setOpenDestinationSelect] = useState(false);
  const thisDateFrom =
    idx > 0 ? flightContext.flightState[idx - 1].dateFrom : new Date();
  const [dateFrom, setDateFrom] = useState(thisDateFrom);
  const [flightState, setFlightState] = useState({
    current:
      idx > 0 ? flightContext.flightState[idx - 1].destination : ({} as City),
    destination: {} as City,
    passengers: ["1:1 traveler", "1,0,0,0,0,0"] as string[],
  });
  const [cityList, setCityList] = useState({
    current: [] as City[],
    destination: [] as City[],
  });

  if (idx > 0) {
    flightContext.flightState[idx].current =
      flightContext.flightState[idx - 1].destination;
  }

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (checkValidation()) {
      calc(
        flightContext.flightState.map((state) => {
          return {
            from: state.current,
            to: state.destination,
            dateFrom: state.dateFrom,
            passengers: flightState.passengers[0].split(":")[0],
          };
        })
      ).then((res) => {
        let params = "";

        res.map((item, index) => {
          return (params += `${index}=${JSON.stringify(item)}&`);
        });

        navigate(`/result?${params}`);
      });
    } else {
      setShowValidationError(true);
    }
  };

  const handleChange = (e: BaseSyntheticEvent) => {
    const {
      target: { value, name },
    } = e;

    setFlightState({
      ...flightState,
      [name]: value,
    });

    search(value).then((res) => {
      if (name === "current") {
        setCityList({
          ...cityList,
          current: res,
        });
      } else {
        setCityList({
          ...cityList,
          destination: res,
        });
      }
    });

    setShowValidationError(false);
  };

  const handleItemSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    if (checkValidation()) {
      flightContext.setFlightState([
        ...flightContext.flightState,
        {
          current: flightState.current,
          destination: flightState.destination,
          dateFrom: dateFrom,
          passengers: flightState.passengers[0],
        },
      ]);
      handleAddFlight();
    } else {
      setShowValidationError(true);
    }

    return;
  };

  const onChangeDateFrom = (e) => {
    setDateFrom(e);

    flightContext.flightState[idx].dateFrom = e;
  };

  const checkValidation = () => {
    const { current, destination } = flightState;
    console.log(flightState);
    return current.name && destination.name && dateFrom;
  };

  const handleCurrentSelect = (city: City): void => {
    setFlightState({
      ...flightState,
      current: city,
    });

    setState({
      ...state,
      editingCurrent: false,
    });

    flightContext.flightState[idx].current = city;
  };

  const handleDestinationSelect = (city: City): void => {
    setFlightState({
      ...flightState,
      destination: city,
    });

    setState({
      ...state,
      editingDestination: false,
    });

    flightContext.flightState[idx].destination = city;
  };

  const handlePassengerSelect = (data) => {
    setOpenUserSelect(false);
    setFlightState({
      ...flightState,
      passengers: data,
    });
  };

  const changeDestination = () => {
    setFlightState({
      ...flightState,
      current: flightState.destination,
      destination: flightState.current,
    });

    setState({
      ...state,
      editingCurrent: false,
      editingDestination: false,
    });
  };

  return (
    <div className="xl:mt-0 mt-[15px]">
      <div id={`form_${idx}`} className="main-search-form">
        <div className="grid grid-cols-12 xl:gap-0 md:gap-[15px]">
          <div className="xl:col-span-6 xl:flex md:col-span-9 col-span-12 relative">
            <>
              {state.editingCurrent ? (
                <div
                  onBlur={() => {
                    setTimeout(() => {
                      setOpenCurrentSelect(false);
                    }, 200);
                  }}
                  className="h-[67px] cursor-pointer pl-[30px] relative xl:w-[50%] w-[100%] xl:mb-0 mb-[15px] xl:rounded-l-[4px] xl:rounded-r-none rounded-[4px] border-r border-t border-[#D7D7D7] bg-white flex items-center"
                >
                  <div className="mr-[9px]">
                    <img src={locationIcon} alt="from" />
                  </div>
                  <input
                    type="text"
                    name="current"
                    placeholder="From"
                    onChange={handleChange}
                    value={flightState.current.name}
                    onFocus={() => {
                      setOpenCurrentSelect(true);
                      setOpenDestinationSelect(false);
                      setOpenUserSelect(false);
                      setState({
                        ...state,
                        editingDateFrom: false,
                      });

                      setShowValidationError(false);
                    }}
                    className="focus:outline-none w-full peer"
                    required
                    autoComplete="off"
                  />
                  {showValidationError && (
                    <div className="text-[14px] text-red-700 px-[5px] py-[2px] bg-white absolute -top-[10px] right-[10px]">
                      Please enter a valid departure city
                    </div>
                  )}
                  {openCurrentSelect && (
                    <CityList
                      cityList={cityList.current}
                      onSelect={handleCurrentSelect}
                    />
                  )}
                </div>
              ) : (
                <div
                  onClick={() => {
                    setOpenUserSelect(false);
                    setState({
                      ...state,
                      editingDateFrom: false,
                      editingCurrent: true,
                    });
                  }}
                  className="h-[67px] cursor-pointer pl-[30px] xl:w-[50%] w-[100%] xl:mb-0 mb-[15px] xl:rounded-l-[4px] xl:rounded-r-none rounded-[4px] border-r border-t border-[#D7D7D7] bg-white flex items-center"
                >
                  <div className="flex items-center">
                    <div className="mr-[9px]">
                      <img src={locationIcon} alt="from" />
                    </div>
                    {
                      <p className="font-hind font-bold text-[20px] leading-[107.5%] text-[#494949]">
                        {flightState.current.name}
                      </p>
                    }
                  </div>
                </div>
              )}

              <div className="w-full flex justify-center xl:hidden cursor-pointer absolute top-[60px] z-20">
                <img
                  onClick={changeDestination}
                  src={reFreshIcon}
                  width="30px"
                  height="30px"
                  alt=""
                />
              </div>
            </>

            <div className="bg-white w-[16px] border-t border-[#D7D7D7] relative items-center xl:inline hidden cursor-pointer">
              <img
                onClick={changeDestination}
                src={reloadIcon}
                width="16px"
                height="16px"
                className="absolute -left-[8px] bg-white top-[26px]"
                alt=""
              />
            </div>

            {state.editingDestination ? (
              <div
                onBlur={() => {
                  setTimeout(() => {
                    setOpenDestinationSelect(false);
                  }, 200);
                }}
                className="flex h-[67px] focus:outline-none relative cursor-pointer pl-[30px] xl:w-[50%] w-[100%] md:mb-0 mb-[15px] xl:rounded-none rounded-[4px] border-r border-t border-[#D7D7D7] bg-white items-center"
              >
                <div className="mr-[9px]">
                  <img src={locationIcon} alt="from" />
                </div>
                <input
                  type="text"
                  placeholder="To"
                  name="destination"
                  onChange={handleChange}
                  value={flightState.destination.name}
                  onFocus={() => {
                    setOpenDestinationSelect(true);
                    setOpenCurrentSelect(false);
                    setOpenUserSelect(false);
                    setState({
                      ...state,
                      editingDateFrom: false,
                    });

                    setShowValidationError(false);
                  }}
                  className="focus:outline-none w-full peer"
                  required
                  autoComplete="off"
                />
                {showValidationError && (
                  <div className="text-red-700 text-[14px] px-[5px] py-[2px] bg-white absolute -top-[10px] right-[10px]">
                    Please enter a valid arrival city
                  </div>
                )}
                {openDestinationSelect && (
                  <CityList
                    cityList={cityList.destination}
                    onSelect={handleDestinationSelect}
                  />
                )}
              </div>
            ) : (
              <div
                onClick={() => {
                  setOpenUserSelect(false);
                  setState({
                    ...state,
                    editingDateFrom: false,
                    editingDestination: true,
                  });
                }}
                className="h-[67px] cursor-pointer pl-[30px] xl:w-[50%] w-[100%] md:mb-0 mb-[15px] xl:rounded-none rounded-[4px] border-r border-t border-[#D7D7D7] bg-white flex items-center"
              >
                <div className="flex items-center">
                  <div className="mr-[9px]">
                    <img src={locationIcon} alt="from" />
                  </div>
                  {
                    <p className="font-hind font-bold text-[20px] leading-[107.5%] text-[#494949]">
                      {flightState.destination.name}
                    </p>
                  }
                </div>
              </div>
            )}
          </div>

          <div className="xl:col-span-3 md:col-span-3 col-span-12 xl:flex md:block flex h-[67px] xl:rounded-none rounded-[4px] border-r border-[#D7D7D7] bg-white items-center justify-center">
            {state.editingDateFrom ? (
              <div
                onBlur={(e) =>
                  !e.relatedTarget &&
                  setTimeout(() => {
                    setState({
                      ...state,
                      editingDateFrom: false,
                    });
                  }, 200)
                }
                tabIndex={1}
                className="relative xl:w-[100%] md:w-[100%] bg-white flex items-center w-[100%] h-[67px] xl:mb-0 md:mb-[15px] mb-0 px-[20px] xl:rounded-none rounded-[4px] border-t focus:outline-none cursor-pointer justify-center"
              >
                <p className="font-hind font-normal text-[38px] leading-[38px] text-[#494949] mr-[5px] pt-[6px]">
                  {new Date(dateFrom).getDate()}
                </p>
                <div>
                  <div className="flex items-center font-open_sans font-normal text-[16px] leading-[22px] text-[#494949]">
                    {new Date(dateFrom).toLocaleDateString("en-US", {
                      month: "short",
                    })}{" "}
                    <div className="ml-[8px]">
                      <img src={calendarIcon} alt="" />
                    </div>
                  </div>
                  <p className="font-open_sans font-normal text-[12px] leading-[14px] text-[#494949]">
                    {new Date(dateFrom).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>
                </div>
                <Calendar
                  className="absolute top-[65px] xl:left-0 md:right-0 left-0 md:min-w-[320px] min-w-[299px] z-50"
                  tileDisabled={({ date }) =>
                    date <
                    (new Date(dateFrom).getDate() !== new Date().getDate()
                      ? new Date(dateFrom)
                      : new Date().setDate(new Date().getDate() - 1))
                  }
                  onChange={(e: React.SetStateAction<Date>) => {
                    onChangeDateFrom(e);
                    setState({
                      ...state,
                      editingDateFrom: false,
                    });
                  }}
                  value={new Date(dateFrom)}
                />
              </div>
            ) : (
              <div
                onBlur={() =>
                  setTimeout(() => {
                    setState({
                      ...state,
                      editingDateFrom: false,
                    });
                  }, 200)
                }
                tabIndex={2}
                onClick={() => {
                  setState({
                    ...state,
                    editingDateFrom: true,
                  });
                  setOpenCurrentSelect(false);
                  setOpenDestinationSelect(false);
                  setOpenUserSelect(false);
                }}
                className="xl:w-[100%] md:w-[100%] w-[100%] h-[67px] xl:mb-0 md:mb-[15px] mb-0 cursor-pointer xl:rounded-none rounded-[4px] border-t flex items-center justify-center"
              >
                <p className="font-hind font-normal text-[38px] leading-[38px] text-[#494949] mr-[5px] pt-[6px]">
                  {new Date(dateFrom).getDate()}
                </p>
                <div>
                  <div className="flex items-center font-open_sans font-normal text-[16px] leading-[22px] text-[#494949]">
                    {new Date(dateFrom).toLocaleDateString("en-US", {
                      month: "short",
                    })}{" "}
                    <div className="ml-[8px]">
                      <img src={calendarIcon} alt="" />
                    </div>
                  </div>
                  <p className="font-open_sans font-normal text-[12px] leading-[14px] text-[#494949]">
                    {new Date(dateFrom).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>

          {idx === length - 1 && (
            <div
              onClick={handleItemSubmit}
              className="cursor-pointer xl:hidden inline w-[230px] text-center underline bg-[#10091D]/[.5] text-white mt-[7px] px-[10px] py-[3px] font-open_sans font-bold text-[16px] leading-[22px]"
            >
              +Add intermediate city
            </div>
          )}

          <>
            {idx === 0 && (
              <>
                <div className="xl:inline-flex hidden xl:col-span-3 relative col-span-12 cursor-pointer h-[67px] px-[30px] border-r border-t md:my-0 my-[15px] xl:rounded-none rounded-[4px] border-[#D7D7D7] bg-white items-center">
                  <div
                    onClick={() => {
                      setOpenUserSelect(!openUserSelect);
                      setState({
                        ...state,
                        editingDateFrom: false,
                      });
                      setTimeout(() => {
                        document.getElementById("selectUsers")?.focus();
                      }, 200);
                    }}
                  >
                    <p className="font-hind font-bold text-[16px] leading-[18px] text-[#494949]">
                      {flightState.passengers[0]?.split(":")[0]}{" "}
                      {flightState.passengers[0]?.split(":")[0] === "1"
                        ? "Passenger"
                        : "Passengers"}
                    </p>
                    <div className="flex">
                      <div className="mr-[5px]">
                        <img src={usersIcon} alt="users-icon" />
                      </div>
                      <p className="font-open_sans font-normal text-[12px] leading-[14px] text-[#494949]">
                        {flightState.passengers[0]?.split(":")[1]
                          ? flightState.passengers[0]?.split(":")[1]
                          : "1 traveler"}
                      </p>
                    </div>
                  </div>
                  {openUserSelect && (
                    <PassengerSelect
                      onSelect={handlePassengerSelect}
                      preData={flightState.passengers}
                    />
                  )}
                </div>
              </>
            )}
          </>

          <>
            {idx === length - 1 && (
              <>
                <div className="xl:hidden flex xl:col-span-2 relative col-span-12 cursor-pointer h-[67px] px-[30px] border-r border-t md:my-0 my-[15px] xl:rounded-none rounded-[4px] border-[#D7D7D7] bg-white items-center">
                  <div
                    onClick={() => {
                      setOpenUserSelect(!openUserSelect);
                      setState({
                        ...state,
                        editingDateFrom: false,
                      });
                      setTimeout(() => {
                        document.getElementById("selectUsers")?.focus();
                      }, 200);
                    }}
                  >
                    <p className="font-hind font-bold text-[16px] leading-[18px] text-[#494949]">
                      {flightState.passengers[0]?.split(":")[0]}{" "}
                      {flightState.passengers[0]?.split(":")[0] === "1"
                        ? "Passenger"
                        : "Passengers"}
                    </p>
                    <div className="flex">
                      <div className="mr-[5px]">
                        <img src={usersIcon} alt="users-icon" />
                      </div>
                      <p className="font-open_sans font-normal text-[12px] leading-[14px] text-[#494949]">
                        {flightState.passengers[0]?.split(":")[1]
                          ? flightState.passengers[0]?.split(":")[1]
                          : "1 traveler"}
                      </p>
                    </div>
                  </div>
                  {openUserSelect && (
                    <PassengerSelect
                      onSelect={handlePassengerSelect}
                      preData={flightState.passengers}
                    />
                  )}
                </div>
              </>
            )}
          </>
        </div>

        {idx === length - 1 && (
          <div
            onClick={handleItemSubmit}
            className="cursor-pointer xl:inline-flex hidden underline bg-[#10091D]/[.5] text-white mt-[7px] px-[10px] py-[3px] font-open_sans font-bold text-[16px] leading-[22px]"
          >
            +Add intermediate city
          </div>
        )}
        {idx === length - 1 && (
          <div
            onClick={handleSubmit}
            className="cursor-pointer h-[67px] w-[30%] mt-5 bg-[#F3E351] hover:bg-[#F3E351]/[.8] active:bg-[#F3E351]/[.6] xl:rounded-r-[4px] xl:rounded-l-none rounded-[4px] flex items-center justify-center text-[#10091D] font-open_sans font-bold text-[18px] leading-[25px]"
          >
            Get a quote
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFormItem;
