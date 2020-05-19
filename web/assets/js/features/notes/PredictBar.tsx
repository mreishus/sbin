import React, { useState, useCallback, useRef, useEffect } from "react";
interface Props {
  predictions: Array<Array<any>>; // [["javascript", 0.22], ["ruby", 0.11]]
  setLanguage: any; // (string) => void
}

const fmtPercent = (num: number) => {
  return num.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 1,
  });
};

export const PredictBar = (props: Props) => {
  const { setLanguage } = props;
  let { predictions } = props;
  // Only care about predictions > 5%
  predictions = predictions.filter(([_lang, per]) => per > 0.05);
  if (predictions.length === 0) {
    return null;
  }
  return (
    <div>
      {predictions.map(([lang, prob]) => (
        <div
          key={lang}
          className="inline-block mr-2 bg-blue-800 hover:bg-blue-700 rounded p-1 cursor-pointer"
          onClick={() => setLanguage(lang)}
        >
          {fmtPercent(prob)} {lang}
        </div>
      ))}
    </div>
  );
};
export default PredictBar;
