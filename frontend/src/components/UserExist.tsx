import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface UserExistProps {
  errors: {
    errMsg: string;
    existingUser: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export default function UserExist({ errors }: UserExistProps) {
  const navigate = useNavigate();
  const status = errors?.errMsg !== "" ? true : false;
  const [open, setOpen] = React.useState(status);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              color="error"
            >
              {errors.errMsg}
            </Typography>
            <Typography color="primary">{errors.existingUser.email}</Typography>
            <Typography id="transition-modal-description">
              {errors.existingUser.firstName} {errors.existingUser.lastName}
            </Typography>
            <hr />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Please try with other email or navigate to your profile
            </Typography>
            <Typography
              onClick={() => navigate(`/${errors.existingUser.id}`)}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: "#005a53",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              <ArrowCircleRightIcon style={{ height: "50px", width: "50px" }} />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
