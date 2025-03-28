import type { FC } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingOverlayProp {
  loading: boolean;
}

export const LoadingOverlay: FC<LoadingOverlayProp> = ({ loading = true }) => {
  return (
    <Backdrop
      open={loading}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: '#fff',
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
