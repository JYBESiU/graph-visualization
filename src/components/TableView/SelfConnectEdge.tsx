import React from "react";
import {
  BaseEdge,
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
} from "reactflow";

function SelfConnectEdge(props: EdgeProps) {
  // we are using the default bezier edge when source and target ids are different
  if (props.source !== props.target) {
    return <BezierEdge {...props} />;
  }

  const {
    sourceX,
    sourceY,
    targetX,
    targetY,
    id,
    markerEnd,
    label,
  } = props;

  const radiusX = 120;
  const radiusY = 50;
  const edgePath = `M ${sourceX} ${sourceY} 
    A ${radiusX} ${radiusY}
    0 1 0 ${targetX} ${targetY}`;

  const labelX = sourceX + radiusX * 1.5;
  const labelY = (sourceY + targetY) / 2;

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: "#fff",
            fontSize: 10,
          }}
        >
          {label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default SelfConnectEdge;
