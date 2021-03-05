import React from 'react';
import { useFormik } from 'formik';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { getImageUrl } from 'lib/helpers';

import { useFormStyles } from './styles';
import { getInitialValues, transformValues } from './helpers';

export const PublisherForm = props => {
  const { onSubmit, publisher } = props;

  const classes = useFormStyles();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(publisher),
    onSubmit: values => onSubmit(transformValues(values)),
  });

  const { handleSubmit, handleBlur, handleChange, values, setFieldValue } = formik;

  const handleFileChange = event => {
    setFieldValue('newLogo', event.target.files[0]);
  };

  const { name, description, authors, patroniteUrl, facebookUrl, twitterUrl, www, currentLogoUrl } = values;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField
            label="Nazwa"
            variant="outlined"
            name="name"
            value={name}
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Opis"
            variant="outlined"
            name="description"
            value={description}
            fullWidth
            rows={5}
            multiline
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        {currentLogoUrl && (
          <Grid item xs={12}>
            <Typography variant="h6">Obecne logo</Typography>
            <img src={getImageUrl(currentLogoUrl)} alt="" />
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="h6">Wgraj nowe logo</Typography>
          <input type="file" name="file" onChange={handleFileChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Autorzy (oddziel przecinkami, bez spacji)"
            variant="outlined"
            name="authors"
            value={authors}
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Patronite URL"
            variant="outlined"
            name="patroniteUrl"
            value={patroniteUrl}
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Facebook URL"
            variant="outlined"
            name="facebookUrl"
            value={facebookUrl}
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Twitter URL"
            variant="outlined"
            name="twitterUrl"
            value={twitterUrl}
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="WWW"
            variant="outlined"
            name="www"
            value={www}
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" color="primary" size="large">
            Zapisz
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
