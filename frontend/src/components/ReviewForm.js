import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Rating from '@mui/material/Rating';


function ReviewForm() {

    const [selectedRating, setSelectedRating] = useState(0);

   
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            title: '',
            rating: 0,
            summary: ''
        }
    });

    
    const onSubmit = (data) => {
        console.log('Form Data:', data);
    
    };
    return (
        <Box sx={{}}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                Write a Review
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
               
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Name is required' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Your Name"
                                    variant="filled"
                                    fullWidth
                                    multiline
                                    rows={1.3}
                                    size="small"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Grid>
             
                    <Grid item xs={6}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^@]+@[^@]+\.[^@]+$/,
                                    message: 'Invalid email address'
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Your Email"
                                    variant="filled"
                                    multiline
                                    rows={1.3}
                                    size="small"
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

              
                <Box my={2}>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: 'Review Title is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Review Title"
                                variant="filled"
                                multiline
                                rows={1.3}
                                size="small"
                                fullWidth
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        )}
                    />
                </Box>

               
                <Box mb={2}>
                    <Typography gutterBottom>Rating:</Typography>
                    <Controller
                        name="rating"
                        control={control}
                        rules={{ required: 'Rating is required' }}
                        render={({ field }) => (
                            <Rating
                                {...field}
                                icon={<StarIcon fontSize="inherit" color='#FFC107' sx={{ color: '#FFC107' }} />}
                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                error={!!errors.rating}
                                onChange={(event, newValue) => {
                                    setSelectedRating(newValue);
                                    field.onChange(newValue); 
                                  }}
                            />
                        )}
                    />
                    <Typography variant="body2">
                        {selectedRating > 0 ? `You selected ${selectedRating} star(s)` : 'No rating selected'}
                    </Typography>
                    {errors.rating && (
                        <Typography color="error">{errors.rating.message}</Typography>
                    )}
                </Box>

               
                <Box mb={2}>
                    <Controller
                        name="summary"
                        control={control}
                        rules={{ required: 'Review Summary is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Review Summary"
                                variant="filled"
                                multiline
                                rows={3}
                                fullWidth
                                error={!!errors.summary}
                                helperText={errors.summary?.message}
                            />
                        )}
                    />
                </Box>

                <Button variant="contained" color="primary" type="submit">
                    Submit Review
                </Button>
            </form>
        </Box>
    )
}

export default ReviewForm