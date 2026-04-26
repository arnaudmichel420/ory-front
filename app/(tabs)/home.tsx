/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei/native";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { Suspense, useRef } from "react";
import { useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { type Mesh } from "three";

function RedCube() {
  const cubeRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!cubeRef.current) {
      return;
    }

    cubeRef.current.rotation.x += delta * 0.6;
    cubeRef.current.rotation.y += delta * 0.8;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1.6, 1.6, 1.6]} />
      <meshBasicMaterial color="#ef1d25" />
    </mesh>
  );
}

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();

  return (
    <SafeAreaView className="flex-1 bg-[#101066]">
      <View style={{ flex: 1, backgroundColor: "#101066" }}>
        <Canvas
          camera={{ position: [3, 2.4, 4], fov: 45 }}
          gl={{ antialias: false, alpha: false }}
          onCreated={({ gl }) => {
            gl.setClearColor("#101066", 1);
            console.log("R3F Canvas created on native");
          }}
          style={{
            width,
            height,
            backgroundColor: "#101066",
          }}
        >
          <color attach="background" args={["#101066"]} />
          <Suspense fallback={null}>
            <RedCube />
            {/*
              Boilerplate modele Draco:

              1. Ajoute ton fichier dans assets/models/mon-modele.glb
              2. Importe le composant:
                 import { DracoModel } from "@/components/three/draco-model";
              3. Remplace le cube par:
                 <DracoModel source={require("@/assets/models/mon-modele.glb")} />

              Si tu utilises un decodeur Draco local, passe aussi:
                 dracoDecoderPath="/assets/draco/"
            */}
          </Suspense>
          <OrbitControls
            enableDamping
            dampingFactor={0.08}
            enablePan={false}
            minDistance={2.5}
            maxDistance={8}
          />
        </Canvas>
      </View>
    </SafeAreaView>
  );
}
