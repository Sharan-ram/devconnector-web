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
    case "SCHOOL":
    case "DEGREE":
    case "FIELDOFSTUDY":
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

const getInitialState = ({ type, education }) => {
  if (type === "add") {
    return {
      school: "",
      degree: "",
      fieldofstudy: "",
      description: "",
      from: moment(),
      to: undefined,
      current: false,
    };
  }
  const {
    school,
    degree,
    fieldofstudy,
    description,
    from,
    to,
    current,
  } = education;
  return {
    school,
    degree,
    fieldofstudy,
    description,
    from: moment(from),
    to: to && moment(to),
    current,
  };
};

const useStyle = makeStyles((theme) => ({
  container: {
    width: "80%",
    margin: "0 auto 2.5em",
    display: "grid",
    gridGap: "1.5em",
  },
  date: {
    width: "100%",
  },
  textArea: {
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

const EducationForm = ({
  type,
  dispatchFunction,
  education,
  deleteEducation,
}) => {
  const classes = useStyle();
  const [
    { school, degree, fieldofstudy, from, to, current, description },
    dispatch,
  ] = useReducer(reducer, getInitialState({ type, education }));
  const submitEducation = () => {
    dispatchFunction({
      _id: education?._id,
      school,
      degree,
      fieldofstudy,
      description,
      from: from.toISOString(),
      to: to?.toISOString(),
      current,
    });
  };

  return (
    <div className={classes.container}>
      <HeaderText text="Add any school or bootcamp that you have attended" />
      <small>* = required field</small>
      <div>
        <TextField
          label="School or Bootcamp"
          value={school}
          onChange={(e) =>
            dispatch({ type: "SCHOOL", payload: e.target.value })
          }
          variant="outlined"
          fullWidth
          required
        />
      </div>
      <div>
        <TextField
          label="Degree or Certificate"
          value={degree}
          onChange={(e) =>
            dispatch({ type: "DEGREE", payload: e.target.value })
          }
          variant="outlined"
          fullWidth
          required
        />
      </div>
      <div>
        <TextField
          label="Field of Study"
          value={fieldofstudy}
          onChange={(e) =>
            dispatch({ type: "FIELDOFSTUDY", payload: e.target.value })
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
          inputVariant="outlined"
          className={classes.date}
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
          placeholder="Program Description"
          className={classes.textArea}
        />
      </div>
      <div className={classes.buttonWrapper}>
        <Button variant="contained" color="primary" onClick={submitEducation}>
          Submit
        </Button>
        {type === "edit" && (
          <Button
            className={classes.deleteButton}
            onClick={() => deleteEducation(education._id)}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default EducationForm;
