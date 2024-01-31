import { FC } from 'react';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

type Props = {
  handleAction: () => void,
  errorMessage: string,
  buttonText: string
}

export const BackgroundError: FC<Props> = ({ handleAction, errorMessage, buttonText }) => {
  const isError = !!errorMessage?.length;

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isError}>
      <Alert severity="error" sx={{width: '100%', minWidth:214, maxWidth: 500}} action={
        <Button variant="contained" size="small" sx={{alignSelf: 'end'}} color='inherit' onClick={handleAction}>
          {buttonText}
        </Button>
      }>
        <AlertTitle>Error</AlertTitle>
        {errorMessage}
      </Alert>
    </Backdrop>
  );
};