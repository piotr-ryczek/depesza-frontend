import { makeStyles } from '@material-ui/core/styles';

export const useNotificationsStyles = makeStyles(theme => ({
  wrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    boxSizing: 'border-box',
    width: '100%',
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    zIndex: 20,
  },
}));
