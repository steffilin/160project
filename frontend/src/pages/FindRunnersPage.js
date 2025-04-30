import React, { useState } from 'react';
import users from '../data/users.json';
import FilterSidebar from '../components/FilterSidebar';
import RunnerAvailability from '../components/RunnerAvailability';
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableTrigger,
  ExpandableContent,
} from "../components/ui/RunnerExpandableCard";
// import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users } from 'lucide-react';

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
        <div className="flex flex-col gap-6">
          {filteredUsers.map(user => (
            <Expandable key={user.id} expandDirection="vertical" expandBehavior="replace">
              <ExpandableTrigger>
                <ExpandableCard className="w-full">
                  <ExpandableCardHeader>
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                          {user.name}
                        </h3>
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded">
  {user.preference}
</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.distance} km away
                      </div>
                    </div>
                  </ExpandableCardHeader>

                  <ExpandableCardContent>
                    <div className="flex flex-col text-sm text-gray-700 gap-1">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {user.availability[0].day} {user.availability[0].start}–{user.availability[0].end}
                      </div>
                      <ExpandableContent preset="slide-up">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          Distance: {user.distance} km
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Gender: {user.gender || 'Not specified'}
                        </div>
                      </ExpandableContent>
                    </div>
                  </ExpandableCardContent>

                  <ExpandableCardFooter>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(user);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Schedule a run
                    </button>
                  </ExpandableCardFooter>
                </ExpandableCard>
              </ExpandableTrigger>
            </Expandable>
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