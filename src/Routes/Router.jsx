import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import JoinUs from "../Pages/JoinUs/JoinUs";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Overview from "../Pages/Overview/Overview";
import Analytics from "../Pages/Analytics/Analytics";
import ManageCamps from "../Pages/ManageCamps/ManageCamps";
import ManageRegisteredCamps from "../Pages/ManageRegisteredCamps/ManageRegisteredCamps";
import AddCamp from "../Pages/AddCamp/AddCamp";
import OrganizerProfile from "../Pages/OrganizerProfile/OrganizerProfile";
import PaymentHistory from "../Pages/PaymentHistory/PaymentHistory";
import RegisteredCamps from "../Pages/RegisteredCamps/RegisteredCamps";
import ParticipantProfile from "../Pages/ParticipantProfile/ParticipantProfile";
import PrivateRoute from "../Private/PrivateRoute";
import CampDetails from "../Pages/CampDetails/CampDetails";
import Spinner from "../Shared/Spinner";
import UserRoleParticipent from "../Private/UserRoleParticipent";
import UserRoleOrganizer from "../Private/UserRoleOrganizer";
import Payment from "../Pages/Payment/Payment";
import Feedback from "../Pages/Feedback/Feedback";
import UpdateCamp from "../Pages/UpdateCamp/UpdateCamp";
import ContactUS from "../Pages/ContactUS/ContactUS";
import AboutUS from "../Pages/AboutUS/AboutUS";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error navbar={true}/>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/available-camps",
        Component: AvailableCamps,
      },
      {
        path: "/camp-details/:id",
        Component: CampDetails,
        hydrateFallbackElement: <Spinner />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/camp-details/${params.id}`),
      },
      {
        path: "/join-us",
        Component: JoinUs,
      },
      {
        path: "/contact-us",
        Component: ContactUS,
      },
      {
        path: "/about-us",
        Component: AboutUS,
      },
      {
        path: "/payment/:id",
        Component: Payment,
      },
    ],
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "overview",
        Component: Overview,
      },
      {
        path: "analytics",
        Component: Analytics,
      },
      {
        path: "feedback/:id",
        Component: Feedback,
      },
      {
        path: "participant-profile",
        element: (
          <UserRoleParticipent>
            <ParticipantProfile />
          </UserRoleParticipent>
        ),
      },
      {
        path: "registered-camps",
        Component: RegisteredCamps,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "organizer-profile",
        element: (
          <UserRoleOrganizer>
            <OrganizerProfile />
          </UserRoleOrganizer>
        ),
      },
      {
        path: "add-camp",
        Component: AddCamp,
      },
      {
        path: "/update-camp/:campId",
        Component: UpdateCamp,
      },
      {
        path: "manage-camps",
        Component: ManageCamps,
      },
      {
        path: "manage-registered",
        Component: ManageRegisteredCamps,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
