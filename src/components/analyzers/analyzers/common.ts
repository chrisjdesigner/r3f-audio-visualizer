export interface AnalyzerInputControl {
  _audioCtx: AudioContext;
  connectInput: (source: AudioNode) => void;
  disconnectInputs: () => void;
  volume: number;
}