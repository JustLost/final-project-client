import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { red } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";

export default function SwitchesGroup() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: true
  });

  const handleChange = (event) => {
    if (event.target.checked && !state.gilad && state.jason && state.antoine) {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        jason: false
      });
    } else if (
      event.target.checked &&
      state.gilad &&
      !state.jason &&
      state.antoine
    ) {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        antoine: false
      });
    } else if (
      event.target.checked &&
      state.gilad &&
      state.jason &&
      !state.antoine
    ) {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        gilad: false
      });
    } else {
      setState({
        ...state,
        [event.target.name]: event.target.checked
      });
    }
  };

  const RedSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: red[600],
      "&:hover": {
        backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: red[600],
    },
  }));

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">Choose Wisely!</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <RedSwitch
              checked={state.gilad}
              onChange={handleChange}
              name="red"
            />
          }
          label="Speed"
        />
        <FormControlLabel
          control={
            <RedSwitch
            
              checked={state.jason}
              onChange={handleChange}
              name="jason"
            />
          }
          label="Quality"
        />
        <FormControlLabel
          control={
            <RedSwitch
              checked={state.antoine}
              onChange={handleChange}
              name="antoine"
            />
          }
          label="Quantity"
        />
      </FormGroup>
      <FormHelperText>Choose Agilize!</FormHelperText>
    </FormControl>
  );
}