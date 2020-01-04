import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function Give() {
  return (
    <React.Fragment>
      <Typography align="center" component="h1" variant="h5" gutterBottom style={{marginTop: '2%', fontWeight: '900',}}>
        How was it for you?
      </Typography>
{/*       <Typography align="center" paragraph color="textSecondary" style={{marginTop: '2%'}}>
        Tell us about your experience with the product.
      </Typography> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="feedback"
            name="feedback"
            label="Type here or use mic"
            fullWidth
            autoComplete="feedback"
            multiline
            rowsMax="10"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Anonymize your feedback"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}