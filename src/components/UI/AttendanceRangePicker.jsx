import { DateRange } from "react-date-range";
import { useState } from "react";
import { isWeekend } from "date-fns";

const AttendanceRangePicker = ({ range, setRange, handleSelect }) => {
  return (
    <DateRange
      ranges={range}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      editableDateInputs={false}
      showSelectionPreview
      dragSelectionEnabled={true}
      disabledDay={(date) => isWeekend(date)}
    />
  );
};

export default AttendanceRangePicker;
