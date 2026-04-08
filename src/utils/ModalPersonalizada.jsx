import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(3),
    },
  }));


function ModalPersonalizada({ show, onHide, title, children, acciones }) {

  return (
    <>
      <BootstrapDialog
        onClose={onHide}
        aria-labelledby="customized-dialog-title"
        open={show}
        maxWidth="sm"
        fullWidth
          slotProps={{
    paper: {
      sx: {
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        m: 0,
        height: "100vh",
        maxHeight: "100vh",  
        width: 400,
        borderRadius: 0,
      },
    },
  }}
      >
        <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center', fontWeight: 'bold' }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onHide}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
        <DialogContent dividers>
            {children}
        </DialogContent>
        <DialogActions>
          {acciones}
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default ModalPersonalizada;