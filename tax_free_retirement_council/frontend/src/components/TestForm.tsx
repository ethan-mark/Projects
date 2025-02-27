//@ts-check
import React, { useState, useEffect } from "react";
import "../assets/css/navbar.css";
import "../assets/css/testform.css";
import taxFreeLogo from "../assets/img/tax_free_retirement_council.png";
import { ReactComponent as Calendar } from "../assets/img/red-calendar.svg";
import { ReactComponent as PiggyBank } from "../assets/img/piggy-bank.svg";
import { data } from "../components/TestQuestions";
import Select from "react-select";
import RightArrow from "../assets/img/right_arrow.svg";
import NextPage from "../assets/img/next-page.svg";
import PrevPage from "../assets/img/previous-page.svg";
import { HandleSubmit } from "../components/SubmitBackEnd";
import { ClipLoader } from "react-spinners";
import { InlineWidget } from "react-calendly";
import { motion } from "framer-motion";
import { ReactComponent as UncheckedBox } from "../assets/img/unchecked-box.svg";
import { ReactComponent as CheckedBox } from "../assets/img/checked-box.svg";
import { ReactComponent as Money } from "../assets/img/money.svg";
import { ReactComponent as ClipBoard } from "../assets/img/clipboard.svg";
import { ReactComponent as HourGlass } from "../assets/img/hourglass.svg";
import { ReactComponent as Map } from "../assets/img/map.svg";
import { ReactComponent as DetailsCheckMark } from "../assets/img/checkmark-details.svg";
import { SingleValue, ActionMeta } from "react-select";
import useDocumentTitle from "./UseDocumentTitle";
const TestForm: React.FC = () => {
  useDocumentTitle("Roth Conversion Qualificiation", true);
  return (
    <div className="main-container">
      <div className="test-form-nav-bar">
        <TestFormNavBar />
      </div>

      <TestFormSurvey />
    </div>
  );
};

const TestFormNavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <a href="/" className="logo">
            <img className="Home-Button" src={taxFreeLogo} />
          </a>
        </div>
      </div>
    </nav>
  );
};

const TestFormDescription: React.FC = () => {
  return (
    <div className="description-main-container">
      <h1>Take Back Control of Your Retirement – Stop Overpaying in Taxes!</h1>
      <p>
        Most retirees unknowingly give away hundreds of thousands in taxes. But
        with the right strategy, you can keep more of your hard-earned money and
        retire stress-free.
      </p>
    </div>
  );
};

const TestFormSurvey: React.FC = () => {
  const [formData, setFormData] = useState({
    // User Information
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",

    // Test Answers
    retirementStatus: "",
    estimatedSavings: "",
    mainConcerns: "",
    age: "",
    state: "",
  });
  const statesList = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  //useEffect(() => {
  //console.log("Updated Form Data:", formData);
  //console.log("selectedItem:", selectedItem);
  //}, [formData]); // Logs whenever formData updates
  const [index, setIndex] = useState<number>(0);

  interface SelectedItem {
    [key: number]: string | undefined;
  }
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({});
  const question = data[index]; // Get current question dynamically

  // Handle changes for input fields (e.g., Name, Email, Phone)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [selectedMultipleItems, setSelectedMultipleItems] = useState<string[]>(
    [],
  );
  const handleStateChange = (
    selectedOption: SingleValue<{ label: string; value: string }>,
    index: number,
  ) => {
    if (!selectedOption) return;
    setSelectedItem((prev) => ({ ...prev, [5]: selectedOption.value }));
    setFormData((prev) => ({
      ...prev,
      ["state"]: selectedOption.value, // Dynamically assign answer
    }));
  };
  // Handle selection for multiple-choice answers
  const handleItemClick = (index: number, item: string) => {
    const questionKeys = [
      "filler",
      "retirementStatus",
      "estimatedSavings",
      "mainConcerns",
      "age",
      "state",
    ];
    //console.log(item);
    if (index === 3) {
      //console.log(selectedMultipleItems);
      if (selectedMultipleItems.includes(item)) {
        const updatedSelections = selectedMultipleItems.filter(
          (e) => e !== item,
        );
        setSelectedMultipleItems(updatedSelections);
        setFormData((prev) => ({
          ...prev,
          [questionKeys[index]]: updatedSelections, // Dynamically assign answer
        }));
      } else {
        const updatedSelections = [...selectedMultipleItems, item];
        setSelectedMultipleItems(updatedSelections);
        setFormData((prev) => ({
          ...prev,
          [questionKeys[index]]: updatedSelections, // Dynamically assign answer
        }));
      }
    } else {
      setSelectedItem((prev) => ({ ...prev, [index]: item ?? "" }));
      setFormData((prev) => ({
        ...prev,
        [questionKeys[index]]: item, // Dynamically assign answer
      }));
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const HandleSubmitClick = async () => {
    const response: boolean = await HandleSubmit(formData, setIsLoading);
    if (response) {
      openCalendly();
      closeTest();
    }
  };
  const openCalendly = () => {
    setCalendlyActive(true);
  };
  const closeCalendly = () => {
    setCalendlyActive(false);
  };

  const [isCalendlyActive, setCalendlyActive] = useState(false);
  const [isTestActive, setTestActive] = useState(true);
  const closeTest = () => {
    setTestActive(false);
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phoneNumber.trim() !== ""
    );
  };
  interface CalendlyProps {
    className: string;
  }

  return (
    <div className="outer-survey-container">
      {isTestActive && (
        <div className="survey-container">
          <div className="survey-panel">
            <motion.div
              key={index} // Ensures animation resets on every page change
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="calendar-icon-wrapper">
                {/*Dynamic  */}
                {index === 0 && (
                  <div className="landing-panel">
                    <h1>
                      Take Back Control of Your Retirement – Stop Overpaying in
                      Taxes!
                    </h1>
                    <p>
                      Most retirees unknowingly give away hundreds of thousands
                      in taxes. But with the right strategy, you can keep more
                      of your hard-earned money and retire stress-free.
                      <p style={{ fontWeight: "600" }}>
                        {" "}
                        Learn how a Roth Conversion can help you pay less in
                        taxes! Answer a few quick questions to find out if you
                        qualify.{" "}
                      </p>
                    </p>
                  </div>
                )}
                {index === 1 && <Calendar className="calendar-icon" />}
                {index === 2 && <PiggyBank className="piggy-icon" />}

                {index === 3 && <ClipBoard className="clipboard-icon" />}
                {index === 4 && <HourGlass className="hourglass-icon" />}
                {index === 5 && <Map className="map-icon" />}
                {index === 6 && (
                  <DetailsCheckMark className="details-checkmark-icon" />
                )}
                {index < data.length && index !== 3 && index !== 0 && (
                  <h3>{question?.question}</h3>
                )}
                {index === 3 && (
                  <div>
                    <h3>{question?.question}</h3>
                    <p className="select-multiple">(select multiple)</p>
                  </div>
                )}
              </div>
              {index !== 0 && <hr />}
              {index === 5 && (
                <Select
                  className="state-selector"
                  options={statesList.map((opt: string) => ({
                    label: opt,
                    value: opt,
                  }))}
                  onChange={(
                    selectedOption: SingleValue<{
                      label: string;
                      value: string;
                    }>,
                    actionMeta: ActionMeta<{ label: string; value: string }>,
                  ) => handleStateChange(selectedOption, index)}
                  defaultValue={{
                    label: selectedItem[5] ? selectedItem[5] : "Select...",
                    value: selectedItem[5] ? selectedItem[5] : "Select...",
                  }}
                  styles={{
                    control: (base) => ({
                      ...base,
                      cursor: "pointer",
                      borderColor: "#1a73e8",
                    }),
                  }}
                  placeholder="Select..."
                />
              )}{" "}
              {index === 3 && (
                <div className="nav-arrows-container">
                  <button
                    className="nav-arrow-left"
                    onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                  >
                    <img src={PrevPage} />
                  </button>

                  <ul className="q3-container">
                    {question.options &&
                      Object.values(question.options)
                        .filter((option) => option !== null)
                        .map((option, optionIndex) => (
                          <li
                            key={optionIndex}
                            onClick={() =>
                              option !== null && handleItemClick(index, option)
                            }
                            style={{
                              fontWeight:
                                option !== null &&
                                selectedMultipleItems.includes(option)
                                  ? "700"
                                  : "400",
                              backgroundColor:
                                option !== null &&
                                selectedMultipleItems.includes(option)
                                  ? "#81C784"
                                  : "#f8fafc",
                              cursor: "pointer",
                            }}
                          >
                            {option !== null &&
                            !selectedMultipleItems.includes(option) ? (
                              <UncheckedBox className="unchecked-box" />
                            ) : (
                              <CheckedBox className="unchecked-box" />
                            )}
                            {option}
                          </li>
                        ))}
                  </ul>
                  <button
                    className="nav-arrow-right"
                    onClick={() => setIndex((prev) => prev + 1)}
                    disabled={selectedMultipleItems.length === 0}
                  >
                    <img src={NextPage} />
                  </button>
                </div>
              )}
              {index < 6 && index !== 3 && index !== 0 && (
                <div className="nav-arrows-container">
                  <button
                    className="nav-arrow-left"
                    onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                  >
                    <img src={PrevPage} />
                  </button>

                  <ul>
                    {question.options &&
                      Object.values(question.options)
                        .filter((option) => option !== null)
                        .map((option, optionIndex) => (
                          <li
                            key={optionIndex}
                            onClick={() => {
                              option !== null && handleItemClick(index, option);
                              setIndex((prev) => prev + 1);
                            }}
                            style={{
                              fontWeight:
                                selectedItem !== null &&
                                selectedItem[index] === option
                                  ? "700"
                                  : "400",
                              backgroundColor:
                                selectedItem !== null &&
                                selectedItem[index] === option
                                  ? "#81C784"
                                  : "#f8fafc",
                              cursor: "pointer",
                            }}
                          >
                            {option}
                          </li>
                        ))}
                  </ul>

                  <button
                    className="nav-arrow-right"
                    onClick={() => setIndex((prev) => prev + 1)}
                    disabled={!selectedItem[index]}
                  >
                    <img src={NextPage} />
                  </button>
                </div>
              )}
              {index === 6 && (
                <div className="nav-arrows-container">
                  <button
                    className="nav-arrow-left-form"
                    onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
                    style={{ justifyContent: "left", alignContent: "left" }}
                  >
                    <img src={PrevPage} />
                  </button>

                  <div className="form-list">
                    <div className="form-row">
                      <label>
                        First name *{" "}
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                    <div className="form-row">
                      <label>
                        Last name *{" "}
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                    <div className="form-row">
                      <label>
                        Email *
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                    <div className="form-row">
                      <label>
                        Phone Number *
                        <input
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          required
                        />
                      </label>
                    </div>
                  </div>
                  <button
                    className="nav-arrow-right"
                    onClick={() => setIndex((prev) => prev + 1)}
                    disabled={!selectedItem[index]}
                    hidden
                  >
                    <img src="" />
                  </button>
                </div>
              )}
              {index === 0 && (
                <div className="big-button-container">
                  <button
                    className="big-test-button"
                    onClick={() => {
                      if (index < data.length - 1) {
                        setIndex((prev) => prev + 1);
                      } else {
                        console.log("Final Form Data:", formData);
                        alert("Form Submitted!");
                      }
                    }}
                  >
                    Take the Test
                  </button>
                </div>
              )}
              {index === data.length - 1 && (
                <div className="big-button-container">
                  <button
                    className="big-test-button"
                    onClick={HandleSubmitClick}
                    disabled={!isFormValid()}
                  >
                    {isLoading ? (
                      <ClipLoader size={20} color={"#fff"} />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
      {isCalendlyActive && (
        <div className="congrats-page">
          <div className="congrats-header">
            <h2>
              You're Eligible for a Tax-Free Retirement Strategy Session!{" "}
            </h2>
            <p className="important-text">
              {" "}
              Our certified retirement specialists will guide you through a Roth
              Conversion plan that could <strong>save you thousands</strong> in
              retirement taxes.{" "}
            </p>{" "}
            <p className="schedule-p">
              {" "}
              Book a free strategy session with our experts to find out how much
              you could save. 👇
            </p>
          </div>
          <div className="calendly-inline-widget">
            <InlineWidget url={"https://calendly.com/"}></InlineWidget>
          </div>
        </div>
      )}
    </div>
  );
};
export default TestForm;
