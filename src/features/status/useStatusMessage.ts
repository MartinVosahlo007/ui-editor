import { useCallback, useEffect, useState } from "react";
import type { StatusMessageValue } from "../../shared/status.types";

export function useStatusMessage() {
  const [statusMessage, setStatusMessage] = useState<StatusMessageValue | null>(null);

  const setTimedStatus = useCallback((message: StatusMessageValue) => {
    setStatusMessage(message);
  }, []);

  useEffect(() => {
    if (!statusMessage) return;

    const timeout = window.setTimeout(
      () => setStatusMessage(null),
      statusMessage.tone === "error" ? 5000 : 3000
    );

    return () => window.clearTimeout(timeout);
  }, [statusMessage]);

  return {
    statusMessage,
    setTimedStatus,
  };
}
