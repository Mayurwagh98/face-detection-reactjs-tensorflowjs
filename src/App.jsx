import { useState, useRef, useEffect } from "react";
import "./App.css";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as blazeface from "@tensorflow-models/blazeface";
import ClickSelfie from "./ClickSelfie";

function App() {
  // const webcamRef = useRef(null);
  // const canvasRef = useRef(null);

  // const runFacedetection = async () => {
  //   const model = await blazeface.load();
  //   // console.log("FaceDetection Model is Loaded..");
  //   setInterval(() => {
  //     detect(model);
  //   }, 100);
  // };
  // const draw = (predictions, ctx) => {
  //   if (predictions.length > 0) {
  //     for (let i = 0; i < predictions.length; i++) {
  //       const start = predictions[i].topLeft;
  //       const end = predictions[i].bottomRight;
  //       const size = [end[0] - start[0], end[1] - start[1]];

  //       // Render a rectangle over each detected face.

  //       ctx.beginPath();
  //       ctx.lineWidth = "6";
  //       ctx.strokeStyle = "red";
  //       ctx.rect(start[0], start[1], size[0], size[1]);
  //       ctx.stroke();
  //     }
  //   }
  // };
  // const returnTensors = false;

  // const detect = async (model) => {
  //   if (
  //     typeof webcamRef.current !== "undefined" &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     // Get video properties
  //     const video = webcamRef.current.video;
  //     const videoWidth = webcamRef.current.video.videoWidth;
  //     const videoHeight = webcamRef.current.video.videoHeight;

  //     //Set video height and width
  //     webcamRef.current.video.width = videoWidth;
  //     webcamRef.current.video.height = videoHeight;

  //     //Set canvas height and width
  //     canvasRef.current.width = videoWidth;
  //     canvasRef.current.height = videoHeight;

  //     // Make detections

  //     const prediction = await model.estimateFaces(video, returnTensors);

  //     // console.log(prediction);

  //     const ctx = canvasRef.current.getContext("2d");
  //     draw(prediction, ctx);
  //   }
  // };

  // runFacedetection();

  return (
    <>
      <ClickSelfie />
      {/* <div className="App">
        <header className="App-header">
          <Webcam
            ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              top: 100,
              left: 0,
              right: 80,
              textAlign: "center",
              zIndex: 9,
              width: 640,
              height: 480,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              top: 100,
              left: 0,
              right: 80,
              textAlign: "center",
              zIndex: 9,
              width: 640,
              height: 480,
            }}
          />
        </header>
      </div> */}
    </>
  );
}

export default App;
