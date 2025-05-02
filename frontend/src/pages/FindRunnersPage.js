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
      <h1 className="text-center">Matched Runners</h1>

      {/* Filter Preview */}
      <div
        className="filter-preview-bubble"
        onClick={() => navigate("/landing/set-filter", { state: filters })}
      >
        {filters.preference || "Any"} | {filters.gender || "Any"} | {filters.day || "Any Day"} {filters.startTime && filters.endTime ? `| ${filters.startTime}-${filters.endTime}` : ""}
      </div>

      <div className="flex flex-col gap-6">
        {filteredUsers.map((user) => (
          <Expandable
            key={user.id}
            expandDirection="vertical"
            expandBehavior="replace"
          >
            <ExpandableTrigger>
              <ExpandableCard className="runner-card-box compact-box">
              <ExpandableCardHeader>
                <div className="flex items-center text-sm">
                  {`${user.name}  •  ${user.gender}  •  ${user.availability[0].day} ${user.availability[0].start}-${user.availability[0].end}`}
                </div>
              </ExpandableCardHeader>

                <ExpandableCardContent>
                  <ExpandableContent preset="slide-up">
                    <div className="text-sm space-y-1">
                      <div><strong>Distance:</strong> {user.distance} km</div>
                      <div><strong>Preference:</strong> {user.preference}</div>
                      <div><strong>Goal:</strong> {user.goal}</div>
                      <div><strong>Pace:</strong> {user.pace} min/km</div>
                      <div>
                        <strong>Availability:</strong>
                        <ul className="ml-4 list-disc">
                          {user.availability.map((slot, idx) => (
                            <li key={idx}>{slot.day} {slot.start}–{slot.end}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ExpandableContent>
                </ExpandableCardContent>

                <ExpandableCardFooter>
                  <button
                    className="schedule-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(user);
                    }}
                  >
                    Schedule
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