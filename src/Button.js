import react from "react";
import { ACTIONS } from "./App";

const Button = ({ buttonType, dispatch, value }) => {
  switch (buttonType) {
    case "digit":
      return (
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.ADD_DIGIT, payload: { value } })
          }
        >
          {value}
        </button>
      );
    case "operation":
      return (
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { value } })
          }
        >
          {value}
        </button>
      );
    case "clear":
      return (
        <button
          onClick={() => dispatch({ type: ACTIONS.CLEAR, payload: { value } })}
        >
          {value}
        </button>
      );
    case "delete":
      return (
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.DELETE_DIGIT, payload: { value } })
          }
        >
          {value}
        </button>
      );
    case "equals":
      return (
        <button
          onClick={() =>
            dispatch({ type: ACTIONS.EVALUTE, payload: { value } })
          }
        >
          {value}
        </button>
      );
    default:
      break;
  }
};

export default react.memo(Button);
