// ------------ if face is detected then click pic code ----------
import { useState, useRef, useEffect } from "react";
import "./App.css";
import * as blazeface from "@tensorflow-models/blazeface";

function ClickSelfie() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    }
  }, [isCameraOn]);

  const runFacedetection = async () => {
    const model = await blazeface.load();
    setInterval(() => {
      detect(model);
    }, 100);
  };

  const draw = (predictions, ctx) => {
    if (predictions.length > 0) {
      setIsFaceDetected(true); // Set state to true when a face is detected
      for (let i = 0; i < predictions.length; i++) {
        const start = predictions[i].topLeft;
        const end = predictions[i].bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];

        // Render a rectangle over each detected face.
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "red";
        ctx.rect(start[0], start[1], size[0], size[1]);
        ctx.stroke();
      }
    } else {
      setIsFaceDetected(false); // Set state to false when no face is detected
    }
  };

  const returnTensors = false;

  const detect = async (model) => {
    if (
      typeof videoRef.current !== "undefined" &&
      videoRef.current !== null &&
      videoRef.current.readyState === 4
    ) {
      // Get video properties
      const video = videoRef.current;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video height and width
      video.width = videoWidth;
      video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const prediction = await model.estimateFaces(video, returnTensors);

      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear previous drawings
      draw(prediction, ctx);
    }
  };

  const startCamera = () => {
    setIsCameraOn(true);
    runFacedetection();
  };

  const captureImage = () => {
    setIsFaceDetected(false);
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageSrc = canvas.toDataURL("image/jpeg");
    setCapturedImage(imageSrc);
  };

  return (
    <>
      {!isFaceDetected && isCameraOn && !capturedImage && (
        <h1 style={{ margin: "-300px 0 10% 0" }}>
          Detecting the face, please wait..
        </h1>
      )}
      <div>
        <header>
          {!isCameraOn ? (
            <button onClick={startCamera}>Start Camera</button>
          ) : (
            <>
              {!capturedImage ? (
                <video
                  ref={videoRef}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    top: 100,
                    left: 0,
                    right: 80,
                    textAlign: "center",
                    zIndex: 0,
                    width: 640,
                    height: 480,
                  }}
                />
              ) : (
                <img
                  src={capturedImage}
                  alt="Captured"
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    top: 100,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zIndex: 9,
                  }}
                />
              )}

              {!capturedImage && (
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
              )}
            </>
          )}
        </header>
      </div>
      {isFaceDetected && (
        <button onClick={captureImage} style={{ marginTop: "600px" }}>
          Capture Image
        </button>
      )}
    </>
  );
}

export default ClickSelfie;
