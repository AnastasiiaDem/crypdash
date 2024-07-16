import React, { useContext } from "react";

import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import CryptoContext from "../context/crypto-context";

export default function Chart() {
  const { myCrypto } = useContext(CryptoContext);

  const mappedData = myCrypto.map((crypto) => {
    return {
      id: crypto.id,
      value: crypto.totalAmount,
      label: crypto.name,
    };
  });

  return (
    <PieChart
      colors={[
        "#E84142",
        "#FF6700",
        "#ede20e",
        "#003049",
        "#803DE1",
        "#62C4FC",
        "#EAE2B7",
        "#E6007A",
        "#a5be00",
        "#5b2333",
        "#fcff6c",
        "#ddc2ff",
        "#d3d4d9",
        "#FF5733",
        "#FFC300",
        "#FFDC00",
        "#00A8CC",
        "#9B5DE5",
        "#FF3E4D",
        "#00B4D8",
        "#FF6F61",
        "#FFD700",
        "#FF851B",
        "#01796F",
        "#C77DFF",
        "#FF1493",
        "#7FFFD4",
        "#4B0082",
        "#FFD700",
        "#32CD32",
      ]}
      series={[
        {
          arcLabel: (item) => `${item.label}`,
          arcLabelMinAngle: 25,
          data: mappedData,
          innerRadius: 10,
          outerRadius: 150,
          paddingAngle: 5,
          cornerRadius: 10,
          startAngle: -180,
          endAngle: 180,
          cx: "50%",
          cy: "50%",
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
        },
      }}
      height={400}
      slotProps={{
        legend: { hidden: true },
        noDataOverlay: {
          message: "No crypto to display",
          sx: { fill: "white" },
        },
      }}
    />
  );
}
