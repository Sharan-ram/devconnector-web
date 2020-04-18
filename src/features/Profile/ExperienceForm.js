import React, { useReducer } from "react";
import moment from "moment";
import { DatePicker } from "@material-ui/pickers";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/styles";

import { HeaderText } from "../../components/ui";

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

const useStyle = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridGap: "1.5em",
    width: "80%",
    margin: "0 auto 2.5em",
  },
  textArea: {
    width: "100%",
  },
  date: {
    width: "100%",
  },
  buttonWrapper: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: "1em",
    width: "30%",
  },
  deleteButton: {
    background: theme.palette.primary.danger,
    color: "#fff",
  },
}));

const ExperienceForm = ({
  type,
  dispatchFunction,
  experience,
  deleteExperience,
}) => {
  const classes = useStyle();
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
    <div className={classes.container}>
      <HeaderText text="Add any developer/programming positions that you have had in the past" />
      <small>* = required field</small>
      <div>
        <TextField
          label="Job Title"
          value={title}
          onChange={(e) => dispatch({ type: "TITLE", payload: e.target.value })}
          required
          variant="outlined"
          fullWidth
        />
      </div>
      <div>
        <TextField
          label="Company"
          value={company}
          onChange={(e) =>
            dispatch({ type: "COMPANY", payload: e.target.value })
          }
          variant="outlined"
          fullWidth
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
          variant="outlined"
          fullWidth
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
          inputVariant="outlined"
          className={classes.date}
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
          inputVariant="outlined"
          className={classes.date}
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
          className={classes.textArea}
        />
      </div>
      <div className={classes.buttonWrapper}>
        <Button variant="contained" color="primary" onClick={submitExperience}>
          Submit
        </Button>
        {type === "edit" && (
          <Button
            variant="contained"
            className={classes.deleteButton}
            onClick={() => deleteExperience(experience._id)}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
