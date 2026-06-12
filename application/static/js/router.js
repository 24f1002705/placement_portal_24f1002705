// import auth pages
import LoginPage from "./components/auth/LoginPage.js"

import RegisterPage from "./components/auth/RegisterPage.js"

import ChangePasswordPage from "./components/auth/ChangePassword.js"

import ProfilePage from "./components/auth/ProfilePage.js"

// admin imports
import AdminDashboard from "./components/admin/AdminDashboard.js"

import AdminView from "./components/admin/AdminView.js"

import AdminEntity from "./components/admin/AdminEntity.js"

// student imports
import StudentDashboard from "./components/student/StudentDashboard.js"


// company imports
import CompanyDashboard from "./components/company/CompanyDashboard.js"




// --------------------------------------------------
// ROUTE TABLE
// --------------------------------------------------

// Keys:
// route names used in app state.
//
// Values:
// component objects.

export const routes = {
    // Auth routes
    login: LoginPage,

    register: RegisterPage,

    change_password: ChangePasswordPage,

    profile: ProfilePage,

    // admin routes
    admin_dashboard: AdminDashboard,

    admin_view: AdminView,

    admin_entity: AdminEntity,

    // student routes
    student_dashboard: StudentDashboard,

    // company routes
    company_dashboard: CompanyDashboard,

}