import { useCallback, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { submitText } from "../utils/requests";

export const TextInput: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [textOutput, setTextOutput] = useState<string>("");
  const [error, setError] = useState(false);

  const onValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    []
  );

  const onTextSubmit = useCallback(async () => {
    try {
      setTextOutput("");
      setError(false);

      const response = await submitText(text);

      if (!response.ok) {
        throw response;
      }

      const data = await response.text();
      setTextOutput(data);
    } catch (e) {
      setError(true);
      console.error("Error submitting text", e);
    } finally {
      setText("");
    }
  }, [text]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        margin: "auto",
        alignItems: "center",
      }}
    >
      {error && <Alert severity="error">Error submitting text to server</Alert>}
      <TextField
        sx={{ width: "75%", my: "20px" }}
        hiddenLabel
        label="Enter Text"
        variant="outlined"
        value={text}
        onChange={onValueChange}
      />
      <Button
        variant="contained"
        disabled={text.length === 0}
        onClick={onTextSubmit}
      >
        Submit
      </Button>
      {Boolean(textOutput.length) && (
        <Alert sx={{ minWidth: "200px", my: "20px" }} severity="success">
          {textOutput}
        </Alert>
      )}
    </Box>
  );
};
