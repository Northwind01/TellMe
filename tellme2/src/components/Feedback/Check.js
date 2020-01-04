import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function Check() {
  return (
    <React.Fragment>
      <Typography align="center" component="h1" variant="h5" gutterBottom style={{marginTop: '2%', fontWeight: '900',}}>
        Do we understand your right?
      </Typography>
      <Typography align="center" paragraph color="textSecondary" style={{marginTop: '2%'}}>
      Do we capture your impressions right? Feel free to make any adjustments or add more feedback.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <TextField
                id="feedback2"
                name="feedback2"
                label="Feel free to add anything here"
                fullWidth
                autoComplete="feedback2"
                multiline
                rowsMax="10"
            />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}