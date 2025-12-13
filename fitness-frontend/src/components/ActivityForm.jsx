import React from 'react'
import Box from '@mui/material/Box';
import { Form } from 'react-router';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addActivity } from '../services/api';

const ActivityForm = ({onActivityAdded}) => {

    const [actvity , setActivity] = React.useState({
        type : "RUNNING" , duration : '', caloriesBurned: '',
        adddtionalMetrics: {}
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addActivity(actvity);
            onActivityAdded();
            setActivity({
                type : "RUNNING" , duration : '', caloriesBurned: '',
                adddtionalMetrics: {}
            })
        }catch(error) {
            console.error(error);
        }
        
    }
  return (
    <Box component="form" sx={{ mb: 2}} onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{mb :2 }}>
            <InputLabel>Activity Type</InputLabel>
            <Select
                value={actvity.type}
                onChange={(e) => {setActivity({...actvity, type: e.target.value})}}>
                <MenuItem value="RUNNING">Running</MenuItem>
                <MenuItem value="WALKING">Walking</MenuItem>
                <MenuItem value="CYCLING">Cycling</MenuItem>
            </Select>
        </FormControl>
    <TextField fullWidth label="Duration" type="number" sx={{mb:2}} value={actvity.duration} onChange={(e) => {setActivity({...actvity, duration: e.target.value})}}/>
    <TextField fullWidth label="Calories Burned" type="number" sx={{mb:2}} value={actvity.caloriesBurned} onChange={(e) => {setActivity({...actvity, caloriesBurned: e.target.value})}}/>
    <Button type="submit" variant="contained" color="primary">
        Add Activity
    </Button>
    </Box>
    
  )
}

export default ActivityForm