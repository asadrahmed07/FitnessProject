import { useState, useEffect, use } from 'react';
import { useParams } from 'react-router';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Divider } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { getActivityDetail } from '../services/api';

const ActivityDetail = () => {

  const {id} = useParams();
  const[activity , setActivities] = useState(null);
  const[recommendation , setRecommendation] = useState(null);   

  useEffect(() => {
    const fetchActivityDetail = async () => {
        try {
            const response = await getActivityDetail(id);
            setActivities(response.data);
            setRecommendation(response.data.recommendation);
        }catch(error) {
            console.error('Error fetching activity detail', error);
        }
    }
    fetchActivityDetail();
  } , [id]);

  if(!activity) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' , p: 2 }}>
        <Card sx={{ mb: 2}}>
            <CardContent>
                    <Typography variant="h5" gutterBottom>Activity Details</Typography>
                    <Typography>Type: {activity.type}</Typography>
                    <Typography>Date: {new Date(activity.createdAt).toLocaleString()}</Typography>
            </CardContent>
        </Card>

        {recommendation && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>AI Recommendation</Typography>
                        <Typography variant="h6">Analysis</Typography>
                        <Typography paragraph>{activity.recommendation}</Typography>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="h6">Improvements</Typography>
                        {activity?.improvements?.map((improvement, index) => (
                            <Typography key={index} paragraph>• {activity.improvements}</Typography>
                        ))}
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="h6">Suggestions</Typography>
                        {activity?.suggestions?.map((suggestion, index) => (
                            <Typography key={index} paragraph>• {suggestion}</Typography>
                        ))}
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="h6">Safety Guidelines</Typography>
                        {activity?.safety?.map((safety, index) => (
                            <Typography key={index} paragraph>• {safety}</Typography>
                        ))}
                    </CardContent>
                </Card>
            )}
    </Box>
  )
}

export default ActivityDetail