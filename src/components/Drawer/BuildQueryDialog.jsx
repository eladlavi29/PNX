import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';


import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import BlurLinearRoundedIcon from '@mui/icons-material/BlurLinearRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';

import InputParamDialog from './InputParamDialog';

import Query from '../../Query'
import {getInputParams, getInputParamsTypes, getFinalQuery, exeQuery, getTypeofQuery} from '../../DjangoCommunication'

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

export default function BuildQueryDialog({insertedQueryJson, query, updateQuery, insertToHistory, calledFromHistory, updateOpen, setHeatMapData, setShowHeatMap, setFlights,setMarkerMapData, setShowMarkerMap}) {
  const [open, setOpen] = React.useState(true);

  const inputParams = getInputParams(query.query);
  const inputParamsTypes = getInputParamsTypes(query.query);

  const updateInputParamsVals = (index, val) => updateQuery({...query,  inputParams: {
    ...query.inputParams,
      [index]: (val)
    },
  })

  //const outputParams = ["fid", "Erez's scheducle", "Omer's grades", "Nitzan's Excel"]

  // const [stateCheckbox, setStateCheckbox] = React.useState(
  //   Array(outputParams.length).fill(false)
  // );

  // const handleCheckboxChange = (index) => {
  //   setStateCheckbox({
  //     ...stateCheckbox,
  //     [index]: (!stateCheckbox[index])
  //   });
  // };

  const handleClose = () => {
    setOpen(false);
    updateOpen();
  };

  return (
    <React.Fragment>  
    <Dialog
        fullWidth
        maxWidth='xs'
        open={open}
        onClose={handleClose}
        PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              if(!calledFromHistory)
                insertToHistory({ ...query });
              
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              // formData.append("region", region);
              // formData.append("dateFrom", dateFrom);
              // formData.append("dateTo", dateTo);
              // formData.append("timeFrom", timeFrom);
              // formData.append("timeTo", timeTo);
              formData.append("query", query.query);
              inputParams.map((param, index) => (
                formData.append(param, query.inputParams[index])
              ));

              console.log(Object.fromEntries(formData.entries()));
              
              const finalQuery = getFinalQuery(Object.fromEntries(formData.entries()))
              const query_name = (Object.fromEntries(formData.entries())).query
              const query_type = getTypeofQuery(query_name)
              
              console.log("QUERY: ", finalQuery);
              console.log("QUERY TYPE: ", query_type)
              console.log("query_name: ", query_name)

              insertedQueryJson(Object.fromEntries(formData.entries()));
              
              if (query_type=="Heat Map"){
                let res = exeQuery(finalQuery, query_name, setHeatMapData)
                console.log("res: ", res)
                setShowHeatMap(res)
              }
              if (query_type=="Plane"){
                exeQuery(finalQuery, query_name, setFlights)
              }
              if (query_type=="Marker Map"){
                let res = exeQuery(finalQuery, query_name, setMarkerMapData)
                console.log("res: ", res)
                setShowMarkerMap(res)        
              }
              
              handleClose();
            },
          }}
        PaperComponent={PaperComponent}
      >
        <DialogTitle 
        style={{ cursor: 'move' }} id="draggable-dialog-title">
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            p={1}>
          {(() => {
              switch(query.type) {
                  case 'Heat Map': return <BlurLinearRoundedIcon />
                  case 'Marker Map': return <FmdGoodRoundedIcon />
                  default: return <MapRoundedIcon />
              }
          })()}
          {query.query}
          </Box>
          


        </DialogTitle>

        <Divider /> 

        {inputParams.map((param, index) => (
            <InputParamDialog key={index}
              param={param} type={inputParamsTypes[index]} content={query.inputParams[index]} setContent={updateInputParamsVals} index={index}/>
        ))}

{/* 
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
        </Box> */}
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
        
      </Dialog>
    </React.Fragment>
  );
}