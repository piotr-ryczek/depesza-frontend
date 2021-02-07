import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  loaderWrapper: {
    width: '100%',
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, 0.7)',
      top: 0,
      left: 0,
      opacity: 0,
      zIndex: 0,
      transition: '0.3s',
    },
  },
  loaderWrapperActive: {
    pointerEvents: 'none',
    '&::after': {
      opacity: 1,
      zIndex: 11,
    },
  },
  loadingIconWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 12,
  },
  childrenWrapper: {
    position: 'relative',
    zIndex: 1,
  },
}));
