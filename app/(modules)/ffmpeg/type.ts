export type TFile = Record<string, string | undefined >;

export interface IFileInfo {
  format: string;
  duration: string;
  size: number;
  video?: {
    codec: string;
    codec_params: string;
    width: number;
    height: number;
    resolution: string;
    framerate: number | null;
  };
  audio?: {
    codec: string;
    codec_params: string;
    sample_rate: string;
    channels: number;
  };
}
