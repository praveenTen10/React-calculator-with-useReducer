import "./App.css";
import { useReducer } from "react";
import Button from "./Button";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-'operation'",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUTE: "evaluate",
};

const initialState = {
  currentOperand: "",
  previousOperand: "",
  operation: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.currentOperand === 0 && payload.value === 0) return state;
      if (
        payload.value === "." &&
        state.currentOperand &&
        state.currentOperand.includes(".")
      )
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.value}`,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        previousOperand: null,
        currentOperand: 0,
        operation: null,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand === null && state.previousOperand === null) {
        return state;
      }
      if (state.previousOperand === "") {
        return {
          ...state,
          operation: payload.value,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      if (state.currentOperand === null)
        return {
          ...state,
          operation: payload.value,
        };

      return {
        ...state,
        previousOperand: calculate(state),
        operation: payload.value,
        currentOperand: null,
      };
    default:
      return "default";
  }
};

const calculate = ({ currentOperand, previousOperand, operation }) => {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let compute;
  if (isNaN(current) || isNaN(previous)) return;
  switch (operation) {
    case "+":
      compute = previous + current;
      break;
    case "-":
      compute = previous - current;
      break;
    case "*":
      compute = previous * current;
      break;
    case "/":
      compute = previous / current;
      break;
    default:
  }
  return compute.toString();
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const buttons = [
    { buttonType: "clear", buttonValue: "AC" },
    { buttonType: "operation", buttonValue: "%" },
    { buttonType: "delete", buttonValue: "C" },
    { buttonType: "operation", buttonValue: "/" },
    { buttonType: "digit", buttonValue: 7 },
    { buttonType: "digit", buttonValue: 8 },
    { buttonType: "digit", buttonValue: 9 },
    { buttonType: "operation", buttonValue: "*" },
    { buttonType: "digit", buttonValue: 4 },
    { buttonType: "digit", buttonValue: 5 },
    { buttonType: "digit", buttonValue: 6 },
    { buttonType: "operation", buttonValue: "-" },
    { buttonType: "digit", buttonValue: 1 },
    { buttonType: "digit", buttonValue: 2 },
    { buttonType: "digit", buttonValue: 3 },
    { buttonType: "operation", buttonValue: "+" },
    { buttonType: "digit", buttonValue: "00" },
    { buttonType: "digit", buttonValue: 0 },
    { buttonType: "digit", buttonValue: "." },
    { buttonType: "operation", buttonValue: "=" },
  ];

  return (
    <div className="calculator">
      <div className="output">
        <div className="previous-operand">
          {state.previousOperand} {state.operation}
        </div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <div className="calculator-body">
        {buttons.map((button, i) => (
          <Button
            key={`${button.buttonValue} ${i}`}
            buttonType={button.buttonType}
            value={button.buttonValue}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
