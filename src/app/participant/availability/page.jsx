"use client";
import AvailableSlot from "@/components/AvailableSlots";
import CheckSlotForm from "@/components/CheckSlotForm";
import { useState } from "react";

export default function AvailabilityPage() {
  const [availableSlots, setAvailableSlots] = useState({});

  return (
    <div className="p-4 flex justify-center">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Check Availability
        </h1>
        <div className="flex justify-center items-center w-full">
          <CheckSlotForm setAvailableSlots={setAvailableSlots} />
        </div>
        <div className="mt-3">
          <AvailableSlot availableSlots={availableSlots} />
        </div>
      </div>
    </div>
  );
}
