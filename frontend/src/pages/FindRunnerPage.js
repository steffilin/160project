import React, { useState } from 'react';
import users from '../users.json';
import FilterSidebar from '../components/FilterSidebar';
import RunnerCard from '../components/RunnerCard';
import RunnerAvailability from '../components/RunnerAvailability';

export default function FindRunnerPage() {
  const [filters, setFilters] = useState({ preference: '', gender: '' });
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user => {
    return (
      (filters.preference === '' || user.preference === filters.preference) &&
      (filters.gender === '' || user.gender === filters.gender)
    );
  });

  const handleSendRequest = (user, selected) => {
    alert(`Request sent to ${user.name} for ${selected.day} at ${selected.time}`);
  };

  return (
    <div className="flex h-full">
      <FilterSidebar filters={filters} setFilters={setFilters} />

      <div className="w-3/4 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Matched Runners</h1>
        <div className="grid grid-cols-2 gap-4">
          {filteredUsers.map(user => (
            <RunnerCard key={user.id} user={user} onSelect={setSelectedUser} />
          ))}
        </div>

        {selectedUser && (
          <div className="mt-8 border-t pt-4">
            <RunnerAvailability user={selectedUser} onSendRequest={handleSendRequest} />
          </div>
        )}
      </div>
    </div>
  );
}
