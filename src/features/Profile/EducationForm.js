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

const EducationForm = ({
  type,
  dispatchFunction,
  education,
  deleteEducation,
}) => {
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
    <div>
      <div>
        <TextField
          label="School or Bootcamp"
          value={school}
          onChange={(e) =>
            dispatch({ type: "SCHOOL", payload: e.target.value })
          }
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
          placeholder="Program Description"
        />
      </div>
      <div>
        <Button onClick={submitEducation}>Submit</Button>
        {type === "edit" && (
          <Button onClick={() => deleteEducation(education._id)}>Delete</Button>
        )}
      </div>
    </div>
  );
};

export default EducationForm;
