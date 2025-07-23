import React from "react";
import ParticipantDashboardOverview from "../ParticipantDashboardOverview/ParticipantDashboardOverview";
import OrganizerDashboardOverview from "../OrganizerDashboardOverview/OrganizerDashboardOverview";
import useAuth from "../../Utils/Hooks/useAuth";

const Overview = () => {
  const { user } = useAuth();

  return (
    <div>
      {user.role === "participant" ? (
        <ParticipantDashboardOverview />
      ) : (
        <OrganizerDashboardOverview />
      )}
    </div>
  );
};

export default Overview;
