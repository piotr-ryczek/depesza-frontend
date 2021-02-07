import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  box: {
    marginTop: 50,
  },
  paper: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));
