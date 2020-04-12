import React, { useReducer } from "react";
import moment from "moment";
import { DatePicker } from "@material-ui/pickers";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const reducer = (state, action) => {
  switch (action.type) {
    case "TITLE":
    case "COMPANY":
    case "LOCATION":
    case "DESCRIPTION":
    case "FROM":
    case "TO":
    case "CURRENT":
      return Object.assign({}, state, {
        [action.type.toLowerCase()]: action.payload,
      });
    default:
      return state;
  }
};

const getInitialState = ({ type, experience }) => {
  if (type === "add") {
    return {
      title: "",
      company: "",
      location: "",
      description: "",
      from: moment(),
      to: undefined,
      current: false,
    };
  }
  const {
    title,
    company,
    location,
    description,
    from,
    to,
    current,
  } = experience;
  return {
    title,
    company,
    location,
    description,
    from: moment(from),
    to: to && moment(to),
    current,
  };
};

const ExperienceForm = ({
  type,
  dispatchFunction,
  experience,
  deleteExperience,
}) => {
  const [
    { title, company, location, description, from, to, current },
    dispatch,
  ] = useReducer(reducer, getInitialState({ type, experience }));
  const submitExperience = () => {
    dispatchFunction({
      _id: experience?._id,
      title,
      company,
      location,
      description,
      from: from.toISOString(),
      to: to?.toISOString(),
      current,
    });
  };

  return (
    <div>
      <div>
        <TextField
          label="Job Title"
          value={title}
          onChange={(e) => dispatch({ type: "TITLE", payload: e.target.value })}
          required
        />
      </div>
      <div>
        <TextField
          label="Company"
          value={company}
          onChange={(e) =>
            dispatch({ type: "COMPANY", payload: e.target.value })
          }
          required
        />
      </div>
      <div>
        <TextField
          label="Location"
          value={location}
          onChange={(e) =>
            dispatch({ type: "LOCATION", payload: e.target.value })
          }
        />
      </div>
      <div>
        <DatePicker
          label="From Date"
          value={from}
          onChange={(date) => dispatch({ type: "FROM", payload: date })}
          format="DD/MM/YYYY"
          variant="inline"
          autoOk
          disableFuture
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={current}
              onChange={(e) =>
                dispatch({ type: "CURRENT", payload: e.target.checked })
              }
            />
          }
          label="Current"
        />
      </div>
      <div>
        <DatePicker
          label="To Date"
          value={to}
          onChange={(date) => dispatch({ type: "TO", payload: date })}
          format="DD/MM/YYYY"
          disabled={current}
          disableFuture
          autoOk
          variant="inline"
        />
      </div>
      <div>
        <TextareaAutosize
          rowsMin={5}
          value={description}
          onChange={(e) =>
            dispatch({ type: "DESCRIPTION", payload: e.target.value })
          }
          placeholder="Job Description"
        />
      </div>
      <div>
        <Button onClick={submitExperience}>Submit</Button>
        {type === "edit" && (
          <Button onClick={() => deleteExperience(experience._id)}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
