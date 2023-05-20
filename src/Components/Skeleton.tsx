import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const HEIGHT = 100;
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
        height={HEIGHT}
        style={{ width: "90%" }}
      />
      <Skeleton variant="rounded" height={HEIGHT} style={{ width: "90%" }} />
      <Skeleton
        variant="rounded"
        animation="wave"
        height={HEIGHT}
        style={{ width: "90%" }}
      />
      <Skeleton variant="rounded" height={HEIGHT} style={{ width: "90%" }} />
      <Skeleton
        variant="rounded"
        animation="wave"
        height={HEIGHT}
        style={{ width: "90%" }}
      />
      <Skeleton variant="rounded" height={HEIGHT} style={{ width: "90%" }} />
    </Stack>
  );
}
