/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei/native";

type DracoModelProps = {
  source: string | number;
  dracoDecoderPath?: boolean | string;
  position?: [number, number, number];
  scale?: number | [number, number, number];
};

function DracoModel({
  source,
  dracoDecoderPath = true,
  position = [0, 0, 0],
  scale = 1,
}: DracoModelProps) {
  const { scene } = useGLTF(source as string, dracoDecoderPath);

  return <primitive object={scene} position={position} scale={scale} />;
}

function preloadDracoModel(
  source: string | number,
  dracoDecoderPath: boolean | string = true,
) {
  useGLTF.preload(source as string, dracoDecoderPath);
}

export { DracoModel, preloadDracoModel };
