import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { getRequestURL } from "../utils/requests";

export const CurrentTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const eventSource = new EventSource(getRequestURL("current-time"));

    eventSource.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      setCurrentTime(data.time);
    };

    // on unmount, close the event source
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <Typography>Current Time</Typography>
      <Typography variant="h1">{currentTime}</Typography>
    </>
  );
};
