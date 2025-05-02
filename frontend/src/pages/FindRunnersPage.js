import React, { useState } from "react";
import "../styles/FindRunnersPage.css";
import users from "../data/users.json";
import RunnerAvailability from "../components/RunnerAvailability";
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableTrigger,
  ExpandableContent,
} from "../components/ui/RunnerExpandableCard";
import { Clock, MapPin, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";


export default function FindRunnerPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();


  const location = useLocation();
  const [filters, setFilters] = useState(() => ({
    preference: location.state?.preference || "",
    gender: location.state?.gender || "",
    day: location.state?.day || "",
    startTime: location.state?.startTime || "",
    endTime: location.state?.endTime || "",
  }));

  const filteredUsers = users.filter((user) => {
    return (
      (filters.preference === "" || user.preference === filters.preference) &&
      (filters.gender === "" || user.gender === filters.gender)
    );
  });

  const handleSendRequest = (user, selected) => {
    alert(
      `Request sent to ${user.name} for ${selected.day} at ${selected.time}`
    );
  };
  return (
    <div className="find-runner-container">

      {/* Filter Preview */}
      <div
  className="filter-preview-bubble"
  onClick={() => navigate("/landing/set-filter", { state: filters })}
>
  {filters.preference || "Any"} | {filters.gender || "Any"} | {filters.day || "Any Day"}{" "}
  {filters.startTime && filters.endTime
    ? `| ${filters.startTime}-${filters.endTime}`
    : ""}
</div>


      <h1 className="find-runner-title">Matched Runners</h1>

      <div className="flex flex-col gap-4">
        {filteredUsers.map((user) => (
          <Expandable
            key={user.id}
            expandDirection="vertical"
            expandBehavior="replace"
          >
            <ExpandableTrigger>
              <ExpandableCard className="runner-card">
                <ExpandableCardHeader>
                  <div className="flex justify-between items-start w-full">
                    <h3>{user.name}</h3>
                    <span>{user.preference}</span>
                    <div className="text-xs mt-1">{user.distance} km away</div>
                  </div>
                </ExpandableCardHeader>

                <ExpandableCardContent>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {user.availability[0].day} {user.availability[0].start}–
                      {user.availability[0].end}
                    </div>
                    <ExpandableContent preset="slide-up">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        Distance: {user.distance} km
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-2" />
                        Gender: {user.gender || "Not specified"}
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
          <RunnerAvailability
            user={selectedUser}
            onSendRequest={handleSendRequest}
          />
        </div>
      )}
    </div>
  );
}
