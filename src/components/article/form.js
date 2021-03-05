import React from 'react';
import { useFormik } from 'formik';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { RichEditor } from 'common/rich-editor';
import { getImageUrl } from 'lib/helpers';

import { useFormStyles } from './styles';
import { getInitialValues, transformValues } from './helpers';

export const ArticleForm = props => {
  const { onSubmit, isEdit, article, regions } = props;

  const classes = useFormStyles();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(isEdit, article),
    onSubmit: values => onSubmit(transformValues(values)),
  });

  const { handleSubmit, handleBlur, handleChange, values, setFieldValue } = formik;

  const onContentStateChange = editorState => {
    setFieldValue('content', editorState);
  };

  const onExcerptStateChange = editorState => {
    setFieldValue('excerpt', editorState);
  };

  const handleRegionChange = event => {
    setFieldValue('regionId', event.target.value);
  };

  const handleFileChange = event => {
    setFieldValue('newPhoto', event.target.files[0]);
  };

  const { title, author, excerpt, content, currentPhotoUrl, regionId, isPublished } = values;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={isPublished} onChange={handleChange} name="isPublished" color="primary" />}
            label="Opublikowany?"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Tytuł"
            variant="outlined"
            name="title"
            value={title}
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Autor"
            variant="outlined"
            name="author"
            value={author}
            fullWidth
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel>Region</InputLabel>
            <Select value={regionId} onChange={handleRegionChange}>
              {regions.map(region => (
                <MenuItem value={region._id} key={region._id}>
                  {region.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {currentPhotoUrl && (
          <Grid item xs={12}>
            <Typography variant="h6">Obecny obrazek</Typography>
            <img src={getImageUrl(currentPhotoUrl)} alt="" />
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="h6">Wgraj obrazek</Typography>
          <input type="file" name="file" onChange={handleFileChange} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Skrócona treść</Typography>
          <RichEditor onChange={onExcerptStateChange} value={excerpt} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Treść</Typography>
          <RichEditor onChange={onContentStateChange} value={content} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" type="submit" color="primary" size="large">
          Zapisz
        </Button>
      </Grid>
    </form>
  );
};
