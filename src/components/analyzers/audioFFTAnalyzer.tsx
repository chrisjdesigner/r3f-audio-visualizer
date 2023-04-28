import { useEffect, useMemo } from "react";
import ControlledAudioSource from "../audio/audioSource";
import {
  AudioSource,
  buildAudio,
  buildAudioContext,
  useSelectAudioSource,
} from "../audio/sourceControls/common";
import FFTAnalyzerControls from "./fftAnalyzerControls";
import FFTAnalyzer from "./analyzers/fft";

interface InternalAudioAnalyzerProps {
  audioSource: AudioSource;
}
const InternalAudioFFTAnalyzer = ({
  audioSource,
}: InternalAudioAnalyzerProps) => {

  const audioCtx = useMemo(() => buildAudioContext(), []);
  const audio = useMemo(() => buildAudio(), []);
  const analyzer = useMemo(() => {
    console.log("Creating analyzer...");
    return new FFTAnalyzer(audio, audioCtx);
  }, [audio, audioCtx]);

  useEffect(() => {
    analyzer.volume = 1.0;
  }, [analyzer, audioSource]);

  return (
    <>
      <ControlledAudioSource
        audio={audio}
        audioSource={audioSource as unknown as AudioSource}
      />
      <FFTAnalyzerControls analyzer={analyzer} />
    </>
  );
};

export interface AudioFFTAnalyzerProps {}
const AudioFFTAnalyzer = ({}: AudioFFTAnalyzerProps) => {
  const audioSource = useSelectAudioSource();

  return <InternalAudioFFTAnalyzer audioSource={audioSource as unknown as AudioSource} />
};

export default AudioFFTAnalyzer;
