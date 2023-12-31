import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { BsArrowRepeat } from "react-icons/bs";
import "./cameraStyle.css";

// import Swal from "sweetalert2";

function CameraComponent({ cameraView , camera }) {
  let capturedImages;

  const webcamRef = useRef(null);
  // const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [mirror, setMirror] = useState(false);

  const captureImage = () => {
    // const imageSrc = webcamRef.current.getScreenshot();
    // if (imageSrc != null) {
    //   capturedImages = imageSrc;
    //   next(imageSrc);
    // } else {
    //   Swal.fire({
    //     title: "Por favor activa los permisos de cámara.",
    //     allowOutsideClick: false,
    //     confirmButtonText: "Entendido.",
    //     customClass: {
    //       title: "pt-5",
    //       confirmButton: "mb-5",
    //     },
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       Swal.close();
    //     }
    //   });
    // }
  };

  const toggleCamera = () => {
    setFacingMode((prevFacingMode) => (prevFacingMode === "user" ? "environment" : "user"));
    // setMirror((prevMirror) => ( prevMirror === true ? setMirror(false) ))

    setMirror(!mirror);
    console.log(!mirror);

    // if(mirror === true) {
    //   setMirror(false)
    // } else if (mirror === false) {
    //   setMirror(true)
    // }
  };

  return (
    <div className="camera-container">
      {capturedImages ? (
        <div>
          <div className="rounded-image">
            <img src={capturedImages} alt="Captured" />
          </div>
          {/* <div className="button-retake-image">
            <button onClick={retakeImage}>Volver a capturar</button>
          </div> */}
        </div>
      ) : (
        <div>
          <div className={cameraView} >
            <Webcam className="round-camera-view-video" audio={false} ref={webcamRef} forceScreenshotSourceSize screenshotFormat="image/jpeg" videoConstraints={{ mirrored:mirror ,facingMode }} />
          </div>
          <div className="camera-component-main">
            <button onClick={toggleCamera} className="camera-component-main-button btn buttonStyle">
              <BsArrowRepeat className="icon" />
            </button>
          </div>
          <div className="camera-content-button">
            <button className="btn fraud-file-input-button mb-4" onClick={captureImage}>
              Tomar Foto
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraComponent;

