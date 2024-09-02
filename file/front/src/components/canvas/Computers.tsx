"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
// import { div } from "three/examples/jsm/nodes/Nodes.js";

// const Computers = ({ isMobile }) => {
const Computers = () => {
    const { scene } = useGLTF("./venueStage/scene.gltf");

    const ref = useRef();
    const [direction, setDirection] = useState(1); // 1 for right, -1 for left
    const [rotationAngle, setRotationAngle] = useState(0);

    useFrame(() => {
        // Update rotation angle
        setRotationAngle((prevAngle) => {
            const newAngle = prevAngle + direction * 0.0002; // Adjust speed here

            // Reverse direction if bounds are reached
            if (newAngle >= Math.PI / 12 || newAngle <= -Math.PI / 12) {
                setDirection(-direction);
            }

            return newAngle;
        });
    });

    return (
        <mesh>
            <ambientLight intensity={0.5} />
            <hemisphereLight intensity={3} groundColor="blue" />
            <spotLight
                position={[10, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={1024}
                // color='green'
            />
            <directionalLight intensity={3} position={[3, 2, 2]} color="red" />
            <pointLight intensity={3} color={"green"} />
            <primitive
                object={scene}
                ref={ref}
                // scale={isMobile ? 0.7 : 0.75}
                scale={1}
                position={[-20, -2.3, 1]}
                // position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
                rotation={[0, -4.6 + rotationAngle, 0]}
                // rotation={[-0, -4.7, 0]}
            />
        </mesh>
    );
};

const ComputersCanvas = () => {
    // const [isMobile, setIsMobile] = useState(false);

    // useEffect(() => {
    //   // Add a listener for changes to the screen size
    //   const mediaQuery = window.matchMedia("(max-width: 600px)");

    //   // Set the initial value of the `isMobile` state variable
    //   setIsMobile(mediaQuery.matches);

    //   // Define a callback function to handle changes to the media query
    //   const handleMediaQueryChange = (event) => {
    //     setIsMobile(event.matches);
    //   };

    //   // Add the callback function as a listener for changes to the media query
    //   mediaQuery.addEventListener("change", handleMediaQueryChange);

    //   // Remove the listener when the component is unmounted
    //   return () => {
    //     mediaQuery.removeEventListener("change", handleMediaQueryChange);
    //   };
    // }, []);

    return (
        <Canvas
            frameloop="demand"
            shadows
            // dpr={[1, 2]}
            camera={{ position: [15, 5, 5], fov: 30 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            {/* <pointLight position={[10, 10, 10]} /> */}
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    // enabled={false}
                    // minAzimuthAngle={Math.PI / 8}  // Limit left rotation
                    // maxAzimuthAngle={Math.PI / 8}  // Limit right rotation
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers />
            </Suspense>

            <Preload all />
        </Canvas>
    );
};

export default ComputersCanvas;
