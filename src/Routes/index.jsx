import React from 'react';
import LoginPage from '../Page/Login';
import SignUpForm from '../Page/SignUp';
import Dashboard from '../Page/Dashboard';
import Staff from '../Page/Staff';
import List_Of_Pa from '../Page/List_Of_Pa';
import Patient_Page from '../Page/Patient_Page';
import Create_Staff from '../Page/Create_Staff';
import Book_Appointment from '../Page/Book_Appointment';
import Patient_Registration from '../Page/Patient_Registration';
import FormsPage from '../Page/Forms_Page';
import NextOfKinPage from '../Page/Next-of-Kin';

const routes = [
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignUpForm />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/stafflist", // Relative path for Staff list
    element: <Staff />
  },
  {
      path: "/dashboard/patient-appointment", // Relative path for Staff list
      element: <List_Of_Pa />,
  },
  {
    path: "/patient_page",
    element: <Patient_Page/>
  },
  {
    path: "/create_staff",
    element: <Create_Staff />
  },
  {
    path: "/book-appointment",
    element: <Book_Appointment />
  },
  {
    path: "/dashboard/forms",
    element: <FormsPage />
  },
  {
    path: "/patient-registration",
    element: <Patient_Registration />
  },
  {
    path: "/next-of-kin",
    element: <NextOfKinPage/>
  }
];

export default routes;
