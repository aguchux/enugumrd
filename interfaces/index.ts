export type WebWindow = {
  addEventListener(arg0: string, handleResize: () => void): unknown;
  width?: number;
  height?: number;
  size?: string;
};

export interface ResponseFunctions {
  GET?: Function;
  POST?: Function;
}
