import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";

const AvailableSlot = ({ availableSlots }) => {
  return (
    <div className="flex justify-center items-center bg-[#F5F0E6] rounded-3xl">
      <div className="bg-beige-50 p-6 shadow-md w-full rounded-3xl">
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-4 underline">
          Available Slot
        </h2>
        <div className="space-y-4">
          {Object.entries(availableSlots).map(([slot, time], index) => (
            <div key={index} className="flex items-center w-full">
              <span className="text-gray-700 font-medium w-32">{slot} : </span>
              <div className="flex flex-wrap gap-2">
                {time.map((time, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-3xl hover:bg-indigo-700 transition flex justify-center items-center gap-1"
                  >
                    <AccessAlarmsIcon />
                    <span>{time}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableSlot;
