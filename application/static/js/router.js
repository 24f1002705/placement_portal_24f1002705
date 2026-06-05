import LoginPage from "./components/LoginPage.js"

import AdminDashboard from "./components/AdminDashboard.js"

import StudentDashboard from "./components/StudentDashboard.js"

import CompanyDashboard from "./components/CompanyDashboard.js"


// --------------------------------------------------
// ROUTE TABLE
// --------------------------------------------------

// Keys:
// route names used in app state.
//
// Values:
// component objects.

export const routes = {

    login: LoginPage,

    admin_dashboard: AdminDashboard,

    student_dashboard: StudentDashboard,

    company_dashboard: CompanyDashboard
}