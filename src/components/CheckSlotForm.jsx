"use client";

import { checkParticipantAvailableSlots } from "@/utils/checkParticipantAvailableSlots";
import { fetchCacheData } from "@/utils/fetchData";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CheckSlotForm({ setAvailableSlots }) {
  const [participants, setParticipants] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isDropdownVisible, setIsDropDownVisible] = useState(false)

  useEffect(() => {
    const loadParticipants = async () => {
      const data = await fetchCacheData("participants");
      setParticipants(data);
    };
    loadParticipants();
  }, []);

  const handleCheckSlots = async () => {
    const input = {
      participant_ids: selectedParticipants?.map((item) => Number(item)),
      date_range: dateRange,
    };

    
    const result = await checkParticipantAvailableSlots(input);
    console.log({result,input})
    setAvailableSlots(result);
  };

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    setSelectedParticipants((prev) => {
      if (checked) {
        return [...prev, parseInt(value)];
      } else {
        return prev.filter((id) => id !== parseInt(value));
      }
    });
  };

  if (!participants) return <p>Loading...</p>;

  return (
    <form className="w-[200px]">
      <div>
        <label
          className="flex mb-2 font-medium bg-[#EBEBEB] p-2 w-full justify-between cursor-pointer"
          onClick={() => setIsDropDownVisible((prev) => !prev)}
        >
          Select Participants <ExpandMoreIcon />
        </label>
        {isDropdownVisible &&
          Object.entries(participants).map(([id, participant]) => (
            <div key={id} className="bg-[#EBEBEB] p-2">
              <input
                type="checkbox"
                value={id}
                onChange={handleCheckboxChange}
                id={`participant-${id}`}
                className="cursor-pointer"
              />
              <label
                htmlFor={`participant-${id}`}
                className="ml-2 cursor-pointer"
              >
                {participant.name}
              </label>
            </div>
          ))}
      </div>
      <div className="mt-2">
        <label className="block mb-2 font-medium">Start Date</label>
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange({ ...dateRange, start: e.target.value })
          }
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div className="mt-2">
        <label className="block mb-2 font-medium">End Date</label>
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <button
        type="button"
        onClick={handleCheckSlots}
        className="bg-indigo-600 text-white px-4 py-2 rounded mt-5 w-full"
      >
        Check Slots
      </button>
    </form>
  );
}
