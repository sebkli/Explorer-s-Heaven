import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import {
  Box,
  Button,
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { AlertProps } from './AlertProps';

function Alert({ title, content, handleCloseAlert, handleAccept }: AlertProps) {
  return (
    <Box>
      <IconButton
        aria-label="close"
        onClick={handleCloseAlert}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle id="alert-dialog-title" color="text.secondary" variant="h4">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" variant="h5">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonGroup
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
        >
          <Button
            variant="contained"
            endIcon={<CloseIcon />}
            color="error"
            onClick={handleCloseAlert}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            endIcon={<DoneIcon />}
            color="success"
            onClick={handleAccept}
          >
            OK
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Box>
  );
}

export default Alert;
