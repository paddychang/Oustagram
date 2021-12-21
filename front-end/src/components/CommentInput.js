// MUI
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CommentInput = ({ state, setState, handleSubmit }) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "flex-end",
        padding: "10px",
        width: 1,
      }}
    >
      <TextField
        id="filled-comment-input"
        label="Comment Here....."
        type="comment"
        fullWidth
        variant="standard"
        onChange={(e) => setState({ ...state, comment: e.target.value })}
        value={state.comment}
        error={state.error ? true : false}
        helperText={state.error}
      />
      <IconButton type="submit" aria-label="add a comment">
        <SendIcon color="info" sx={{ mr: 1, my: 1 }} fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default CommentInput;
