export type StatusTone = "info" | "success" | "error";

export interface StatusMessageValue {
  tone: StatusTone;
  text: string;
}
