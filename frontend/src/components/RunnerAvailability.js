import React, { useState } from 'react';

const timeBlocks = Array.from({ length: 32 }, (_, i) => {
  const hour = 6 + Math.floor(i / 2);
  const min = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${min}`;
});

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const isWithinRange = (block, start, end) => {
  return block >= start && block < end;
};

export default function RunnerAvailability({ user, onSendRequest }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (day, time) => {
    setSelected({ day, time });
  };

  const isAvailable = (day, time) => {
    return user.availability.some(avail =>
      avail.day === day && isWithinRange(time, avail.start, avail.end)
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Availability for {user.name}</h2>
      <div className="overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="w-24 text-left">Time</th>
              {days.map(day => (
                <th key={day} className="px-2 text-sm">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeBlocks.map(time => (
              <tr key={time}>
                <td className="text-sm pr-2 align-top">{time}</td>
                {days.map(day => {
                  const available = isAvailable(day, time);
                  const isSelected = selected?.day === day && selected?.time === time;
                  return (
                    <td
                      key={day + time}
                      onClick={() => available && handleSelect(day, time)}
                      className={`w-12 h-8 border cursor-pointer text-center text-xs 
                        ${available ? 'bg-green-200 hover:bg-green-300' : 'bg-gray-100'}
                        ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      {isSelected ? '✓' : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <div className="mt-4">
          <button
            onClick={() => onSendRequest(user, selected)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Request for {selected.day} at {selected.time}
          </button>
        </div>
      )}
    </div>
  );
}
