import React, { useContext } from "react";

import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import CryptoContext from "../context/crypto-context";

export default function Chart() {
  const { myCrypto } = useContext(CryptoContext);

  const mappedData = myCrypto.map((crypto) => {
    return {
        id: crypto.id, 
        value: crypto.totalAmount,
        label: crypto.name
    }
});

  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label}`,
          arcLabelMinAngle: 45,
          data: mappedData,
          innerRadius: 10,
          outerRadius: 200,
          paddingAngle: 5,
          cornerRadius: 15,
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
      }}
    />
  );
}
