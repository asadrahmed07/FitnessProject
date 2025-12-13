import React, { use, useEffect } from 'react'
import { useState } from 'react';
import { CardContent, Grid, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';

const ActivityList = () => {
    const [activities, setActivities] = useState([]); 
    const navigate = useNavigate();
    const fetchActivities = async () => {
        try {
            const response = await getActivities();
            setActivities(response.data);
        }catch(error) {
            console.error('Error fetching activities', error);
        }
    }
    useEffect(() => {
        fetchActivities();
    }, []);

    return (
        <Grid container spacing={2}>
            {activities.map((activity) => (
                <Grid container spacing={{xs:2, md:3}} columns={{xs:4, sm:8, md:12}}>
                    <Card sx={{cursor: 'pointer', width: 300}} onClick={() => navigate(`/activities/${activity.id}`)}>
                        <CardContent>
                            <Typography variant='h6'>{activity.type}</Typography>
                            <Typography variant='body2'>Duration: {activity.duration} mins</Typography>
                            <Typography variant='body2'>Calories Burned: {activity.caloriesBurned} kcal</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))} 

        </Grid>
  )
}

export default ActivityList