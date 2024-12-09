import { fetchCacheData } from "./fetchData";

export async function checkParticipantAvailableSlots(input) {
  const { participant_ids, date_range } = input;

  const participants = await fetchCacheData("participants");
  const participantAvailability = await fetchCacheData(
    "participantAvailability"
  );
  const schedules = await fetchCacheData("schedules");

  const { start, end } = date_range;

  // Helper to generate 30-minute slots between startTime and endTime
 const generateSlots = (startTime, endTime) => {
   const slots = [];
   let start = new Date(`1970-01-01T${startTime}:00`);
   const end = new Date(`1970-01-01T${endTime}:00`);

   while (start < end) {
     const nextSlot = new Date(start.getTime() + 30 * 60 * 1000);
     if (nextSlot > end) break;

     slots.push(
       `${start.toTimeString().slice(0, 5)}-${nextSlot
         .toTimeString()
         .slice(0, 5)}`
     );
     start = nextSlot;
   }

   return slots;
 };

 // Helper to check if a time slot is available given the busy slots
 const isSlotAvailable = (slot, busySlots) => {
   const [slotStart, slotEnd] = slot.split("-");
   return !busySlots.some(
     (busySlot) =>
       (slotStart >= busySlot.start && slotStart < busySlot.end) ||
       (slotEnd > busySlot.start && slotEnd <= busySlot.end)
   );
 };

 const result = {};

 // Generate a list of all dates in the date range
 const dates = [];
 const currentDate = new Date(start);
 const endDate = new Date(end);

 while (currentDate <= endDate) {
   dates.push(currentDate.toISOString().split("T")[0]);
   currentDate.setDate(currentDate.getDate() + 1);
 }

 // Loop over each date in the date range
 for (const date of dates) {
   const dailySlots = {};

   // Loop over each participant to get their availability for that day
   participant_ids.forEach((participantId) => {
     const availability = participantAvailability[participantId];
     const dayName = new Date(date).toLocaleDateString("en-US", {
       weekday: "long",
     });

     if (availability && availability[dayName]) {
       const availableSlots = availability[dayName].flatMap(({ start, end }) =>
         generateSlots(start, end)
       );

       // Exclude any busy slots from the participant's schedule on this date
       const busySlots = schedules[participantId]?.[date] || [];
       const validSlots = availableSlots.filter((slot) =>
         isSlotAvailable(slot, busySlots)
       );

       // Store valid slots for this participant, respecting the threshold
       dailySlots[participantId] = validSlots.slice(
         0,
         participants[participantId].threshold
       );
     } else {
       dailySlots[participantId] = []; // No available slots for this participant
     }
   });

   // Find common available slots for all participants on this date, respecting thresholds
   const commonSlots = Object.values(dailySlots).reduce(
     (common, slots) =>
       common.filter(
         (slot) =>
           slots.includes(slot) &&
           participant_ids.every(
             (id) => dailySlots[id].indexOf(slot) < participants[id].threshold
           )
       ),
     Object.values(dailySlots)[0] || []
   );

   // If there are common slots, add them to the result
   if (commonSlots.length > 0) {
     result[date] = commonSlots;
   }
 }

 return result;
}
