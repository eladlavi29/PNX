import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import BlurLinearRoundedIcon from '@mui/icons-material/BlurLinearRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';

import {getInputParams, getFinalQuery, exeQuery} from '../../DjangoCommunication'

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function BuildQueryDialog({insertedQueryJson, type, query, updateOpen, setHeatMapData}) {
  const [open, setOpen] = React.useState(true);

  const inputParams = getInputParams(query);
  const [inputParamsVals, setInputParamsVals] = React.useState([]);

  const [region, setRegion] = React.useState("");

  const [dateFrom, setDateFrom] = React.useState();
  const [timeFrom, setTimeFrom] = React.useState();
  const [dateTo, setDateTo] = React.useState();
  const [timeTo, setTimeTo] = React.useState();

  const regions = ["Populars' Apartment", "True Friends' Apartment", "The Edge of Eli's pants"];
  const outputParams = ["fid", "Erez's scheducle", "Omer's grades", "Nitzan's Excel"]

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const [stateCheckbox, setStateCheckbox] = React.useState(
    Array(outputParams.length).fill(false)
  );

  const handleCheckboxChange = (index) => {
    setStateCheckbox({
      ...stateCheckbox,
      [index]: (!stateCheckbox[index])
    });
  };

  const handleClose = () => {
    setOpen(false);
    updateOpen();
  };

  return (
    <React.Fragment>  
    <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              formData.append("region", region);
              formData.append("dateFrom", dateFrom);
              formData.append("dateTo", dateTo);
              formData.append("timeFrom", timeFrom);
              formData.append("timeTo", timeTo);
              formData.append("query", query);
              inputParams.map((param, index) => (
                formData.append(param, inputParamsVals[index])
              ));
              
              const finalQuery = getFinalQuery(Object.fromEntries(formData.entries()))
              const query_name = (Object.fromEntries(formData.entries())).query
              
              console.log("QUERY: ", finalQuery);

              insertedQueryJson(Object.fromEntries(formData.entries()));
              
              if (query_name=="RPM_FOR_FID"){
                exeQuery(finalQuery, query_name, setHeatMapData)
              }
              if (query_name=="Plane_1"){
                exeQuery(finalQuery, query_name, null)
              }
              

              handleClose();
            },
          }}
        PaperComponent={PaperComponent}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {(() => {
            switch(type) {
                case 'Heat Map': return <BlurLinearRoundedIcon />
                case 'Marker Map': return <FmdGoodRoundedIcon />
                default: return <MapRoundedIcon />
            }
        })()}
        {query}
        </DialogTitle>
        
        <DialogContent >
        {inputParams.map((param, index) => (
            <TextField
                sx={{   
                    margin:2
                }}
                key= {param}
                required
                id={param}
                name= {param}
                label= {param}
                onChange={(event)=>setInputParamsVals({
                  ...inputParamsVals,
                  [index]: (event.target.value)
                })}
                value= {inputParamsVals[index]}
                variant="standard"
            />
        ))}
        </DialogContent>

        <DialogContent>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Region</InputLabel>
              <Select
                autoFocus
                required
                native
                value={region}
                onChange={handleRegionChange}
                input={<OutlinedInput label="Region" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                {regions.map((region) => (
                    <option value={region} key={region}>{region}</option>
                ))}

              </Select>
            </FormControl>
        </DialogContent>

        {['From', 'To'].map((range) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} key={range}>
            <DemoContainer components={['DatePicker', 'TimePicker']}>
                <DatePicker label={range+" day"}
                  required
                  sx={{
                    left: 10
                  }}
                  onChange={(newValue) => range == 'From' ? setDateFrom(newValue) :
                    setDateTo(newValue)}/>
            <TimePicker label={range+" time"} 
                              required

                onChange={(newValue) => range == 'From' ? setTimeFrom(newValue) :
                    setTimeTo(newValue)}/>
            </DemoContainer>
        </LocalizationProvider>))}

        <Box sx={{ display: 'flex' }}>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Choose Output Parameters</FormLabel>
              {outputParams.map((param, index) => (
                <FormControlLabel key = {index}
                control={
                  <Checkbox checked={stateCheckbox[index]} 
                  onChange={() => (handleCheckboxChange(index))} name={param} />
                }
                label={param}
              />
              ))}
            </FormControl>
        </Box>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
        
      </Dialog>
    </React.Fragment>
  );
}