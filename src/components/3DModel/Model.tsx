import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei/native";
import { GLTF } from "three-stdlib";
import RedDot from "./RedDot";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { setRedDotPosition } from "../../store/patient/humanModelSlice";

type GLTFResult = GLTF & {
  nodes: {
    BaseSpiderMan: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const dispatch = useAppDispatch();
  const { nodes, materials } = useGLTF(require("../../assets/glb/3DHumanBodyModel.glb")) as GLTFResult;
  const selectRedDotPosition = useAppSelector((state) => state.patientHumanModel.redDotModelPosition);
  return (
    <>
      <directionalLight position={[1, 1, 1]} args={["gray", 5]} />
      <directionalLight position={[-1, 1, -1]} args={["gray", 5]} />
      <directionalLight position={[-1, 0, -1]} args={["gray", 5]} />
      <ambientLight color={"#ffffff"} />
      <group {...props} dispose={null} scale={0.98} position={[0, -2, 0]}>
        <mesh
          onPointerUp={(e) => dispatch(setRedDotPosition(Object.values(e.point)))}
          isMesh
          castShadow
          receiveShadow
          geometry={nodes.BaseSpiderMan.geometry}
          material={materials["Material.001"]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={2.113}
        >
          <meshLambertMaterial />
        </mesh>
      </group>
      {selectRedDotPosition && <RedDot position={selectRedDotPosition} />}
    </>
  );
}

useGLTF.preload(require("../../assets/glb/3DHumanBodyModel.glb"));
