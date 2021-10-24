import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { Country, State } from "country-state-city";

const allCountries = Country.getAllCountries().map((country) => {
  return {
    label: country.name,
    value: country.isoCode,
  };
});
console.log(State.getStatesOfCountry("CA"));

export default function PreferencesBar(props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [states, setStates] = useState([]);
  const [stateName, setStateName] = useState("");

  return (
    <Menu secondary>
      {/* <Image src="static/img/frontpage-logo.jpg" class="center-logo"> */}

      <Menu.Item>
        <label className="labelNameTitle"> Click 2 Trip </label>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <form
            onSubmit={() => {
              // noop
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={(startVal) => {
                setStartDate(startVal);
                props.startDate(startVal.toISOString().substring(0, 10));
              }}
              name="startDate"
              dateFormat="yyyy-MM-dd"
              wrapperClassName="datePicker-form"
              placeholderText="Start Date"
            />
          </form>
        </Menu.Item>
        <Menu.Item>
          <Menu.Item>
            <form
              onSubmit={() => {
                //noop
              }}
            >
              <DatePicker
                selected={endDate}
                onChange={(endVal) => {
                  setEndDate(endVal);
                  props.endDate(endVal.toISOString().substring(0, 10));
                }}
                name="endDate"
                dateFormat="yyyy-MM-dd"
                wrapperClassName="datePicker-form"
                placeholderText="End Date"
              />
            </form>
          </Menu.Item>
        </Menu.Item>
        <Menu.Item>
          <Select
            options={allCountries}
            placeholder="Country"
            onChange={(country) => {
              props.editLocation(country.value, "");
              setStates(
                State.getStatesOfCountry(country.value).map((state) => {
                  return {
                    value: state.isoCode,
                    label: state.name,
                  };
                })
              );
              setStateName("");
            }}
          />
          <Select
            options={states}
            placeholder="States"
            value={stateName}
            onChange={(state) => {
              console.log(state);
              setStateName(state.name);
              props.editLocation(props.data.originCountry, state.label);
            }}
          />
        </Menu.Item>
        <Menu.Item>
          <ToggleButtonGroup
            color="primary"
            exclusive
            onChange={props.changeCurrency}
            className="Btn-BG"
          >
            <ToggleButton value="CAD">Canadian Dollar</ToggleButton>
            <ToggleButton value="USD"> {"   US Dollar   "} </ToggleButton>
          </ToggleButtonGroup>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
