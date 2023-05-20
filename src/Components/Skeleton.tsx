import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const HEIGHT_HEADER = 30;
const HEIGHT = 200;
const WIDTH = 400;

export default function Variants() {
  return (
    <Stack
      className="skeletons"
      spacing={1}
      style={{ margin: "auto", maxWidth: "90%", marginTop: "10px" }}
    >
      <Skeleton
        variant="rounded"
        animation="wave"
        height={HEIGHT_HEADER}
        width={WIDTH}
      />
      <Skeleton variant="rounded" width={WIDTH} height={HEIGHT} />
      <Skeleton
        variant="rounded"
        animation="wave"
        height={HEIGHT_HEADER}
        width={WIDTH}
      />
      <Skeleton variant="rounded" width={WIDTH} height={HEIGHT} />
    </Stack>
  );
}
