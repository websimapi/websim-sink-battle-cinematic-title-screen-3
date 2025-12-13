import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { SinkComposition } from "./composition.jsx";
import { KitchenSceneStandalone } from "./scene.jsx";
const FPS = 5;
const DURATION_SEC = 95;
const DURATION_FRAMES = FPS * DURATION_SEC;
const App = () => {
  const [show3D, setShow3D] = React.useState(false);
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "`" || e.key === "~") {
        setShow3D((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  if (show3D) {
    return /* @__PURE__ */ jsxDEV(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          backgroundColor: "#111"
        },
        children: /* @__PURE__ */ jsxDEV(KitchenSceneStandalone, {}, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 34,
          columnNumber: 9
        })
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 27,
        columnNumber: 7
      }
    );
  }
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111"
      },
      children: /* @__PURE__ */ jsxDEV(
        Player,
        {
          component: SinkComposition,
          durationInFrames: DURATION_FRAMES,
          fps: FPS,
          compositionWidth: 1080,
          compositionHeight: 1920,
          controls: true,
          autoPlay: false,
          loop: true,
          style: {
            width: "100%",
            maxWidth: "540px",
            // Scaled down for desktop view, but renders at full res
            aspectRatio: "9/16",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)"
          }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 50,
          columnNumber: 7
        }
      )
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 40,
      columnNumber: 5
    }
  );
};
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 70,
  columnNumber: 51
}));
