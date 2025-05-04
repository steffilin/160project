import React, { useState } from "react";
import "../styles/FindRunnersPage.css";
import users from "../data/users.json";

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
  const [filters] = useState(() => ({
    preference: location.state?.preference || "",
    gender: location.state?.gender || "",
    day: location.state?.day || "",
    startTime: location.state?.startTime || "",
    endTime: location.state?.endTime || "",
  }));

  // Map to store which availability slot matched for each user
  const userMatchingSlots = new Map();

  const handleScheduleRun = (user, slot) => {
    // Format the runner data for the schedule page
    const runnerData = {
      id: user.id,
      name: user.name,
      gender: user.gender,
      pace: user.pace + " min/km",
      distance: user.distance + " km",
      preferredRunType: user.preference,
      goal: user.goal,
      // Include the specific selected availability slot
      availabilitySlot: {
        day: slot.day,
        startTime: slot.start,
        endTime: slot.end
      }
    };
    
    // Navigate to schedule page with the runner data
    navigate('/landing/schedule-run', {
      state: { 
        runner: runnerData,
        day: slot.day,
        startTime: slot.start,
        endTime: slot.end
      }
    });
  };

  const filteredUsers = users.filter((user) => {
    // First check basic filters (preference and gender)
    const basicFilterPass =
      (filters.preference === "" || user.preference === filters.preference) &&
      (filters.gender === "" || user.gender === filters.gender);

    // If basic filters don't pass or no time filters are set, return basic result
    if (
      !basicFilterPass ||
      !filters.day ||
      !filters.startTime ||
      !filters.endTime
    ) {
      return basicFilterPass;
    }

    // Check if any of the user's availability slots match the time filter
    let matchingSlotIndex = -1;
    const timeFilterPass = user.availability.some((slot, index) => {
      // Day must match exactly if specified
      if (filters.day !== "" && filters.day !== slot.day) {
        return false;
      }

      // If no time range specified, day match is sufficient
      if (!filters.startTime || !filters.endTime) {
        matchingSlotIndex = index;
        return true;
      }

      // Convert times to comparable minutes
      const convertTimeToMinutes = (timeStr) => {
        if (!timeStr) return 0;
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + (minutes || 0);
      };

      // Calculate minutes for comparison
      const slotStartMinutes = convertTimeToMinutes(slot.start);
      const slotEndMinutes = convertTimeToMinutes(slot.end);
      const filterStartMinutes = convertTimeToMinutes(filters.startTime);
      const filterEndMinutes = convertTimeToMinutes(filters.endTime);

      // Time must be a complete overlap - filter must be contained within slot
      const isMatch =
        slotStartMinutes <= filterStartMinutes &&
        slotEndMinutes >= filterEndMinutes;

      if (isMatch) {
        matchingSlotIndex = index;
      }

      return isMatch;
    });

    // Store the matching slot index if the user passes all filters
    if (basicFilterPass && timeFilterPass) {
      userMatchingSlots.set(user.id, matchingSlotIndex);
    }

    return basicFilterPass && timeFilterPass;
  });

  return (
    <div className="find-runner-container">
      <h2 className="text-center">Matched Runners</h2>

      {/* Filter Preview */}
      <div
        className="filter-preview-bubble"
        onClick={() => navigate("/landing/set-filter", { state: filters })}
      >
        {filters.preference || "Any"} | {filters.gender || "Any"} |{" "}
        {filters.day || "Any Day"}{" "}
        {filters.startTime && filters.endTime
          ? `| ${filters.startTime}-${filters.endTime}`
          : ""}
      </div>

      <div className="flex flex-col gap-10">
        {filteredUsers.map((user) => {
          // Get the matching slot or default to first slot if no specific match
          const matchingSlotIndex = userMatchingSlots.get(user.id) || 0;
          const displaySlot = user.availability[matchingSlotIndex];

          return (
            <Expandable
              key={user.id}
              expandDirection="vertical"
              expandBehavior="replace"
              transitionDuration={0.4}
            >
              <ExpandableTrigger>
                <ExpandableCard
                  className="runner-card-box compact-box"
                  collapsedSize={{ width: "100%" }}
                  expandedSize={{ width: "100%", height: "auto" }}
                  data-user-id={user.id}
                >
                  <ExpandableCardHeader>
                    <div className="flex items-center text-sm">
                      {`${user.name}  •  ${user.gender}  •  ${displaySlot.day} ${displaySlot.start}-${displaySlot.end}`}
                    </div>
                  </ExpandableCardHeader>

                  <ExpandableCardContent className="overflow-hidden">
                    <ExpandableContent preset="slide-up" stagger={false}>
                      <div className="text-sm space-y-1">
                        <div>
                          <strong>Distance:</strong> {user.distance} km
                        </div>
                        <div>
                          <strong>Preference:</strong> {user.preference}
                        </div>
                        <div>
                          <strong>Goal:</strong> {user.goal}
                        </div>
                        <div>
                          <strong>Pace:</strong> {user.pace} min/km
                        </div>
                        <div>
                          <strong>Availability:</strong>
                          <ul className="ml-4 list-disc">
                            {user.availability.map((slot, idx) => (
                              <li key={idx}>
                                {slot.day} {slot.start}-{slot.end}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </ExpandableContent>
                  </ExpandableCardContent>

                  <ExpandableCardFooter className="pb-4 border-t pt-2 mt-2">
                    <button
                      className="schedule-btn w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(user);
                        handleScheduleRun(user, displaySlot);
                      }}
                    >
                      Schedule
                    </button>
                  </ExpandableCardFooter>
                </ExpandableCard>
              </ExpandableTrigger>
            </Expandable>
          );
        })}
      </div>

      {selectedUser && <div className="mt-8 border-t pt-4"></div>}
    </div>
  );
}