// import auth pages
import LoginPage from "./components/auth/LoginPage.js"

import RegisterPage from "./components/auth/RegisterPage.js"

import ChangePasswordPage from "./components/auth/ChangePassword.js"

import ProfilePage from "./components/auth/ManageProfile.js"

// admin imports
import AdminDashboard from "./components/admin/AdminDashboard.js"

import AdminView from "./components/admin/AdminView.js"

import AdminEntity from "./components/admin/AdminEntity.js"

import AdminSearch from "./components/admin/AdminSearch.js"

// student imports
import StudentDashboard from "./components/student/StudentDashboard.js"

import StudentView from "./components/student/StudentView.js"

import StudentEntity from "./components/student/StudentEntity.js"

import StudentSearch from "./components/student/StudentSearch.js"

// company imports
import CompanyDashboard from "./components/company/CompanyDashboard.js"

import CompanyView from "./components/company/CompanyView.js"

import CompanyEntity from "./components/company/CompanyEntity.js"

import CompanyCreate from "./components/company/CompanyCreate.js"


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

    admin_search: AdminSearch,

    // student routes
    student_dashboard: StudentDashboard,

    student_view: StudentView,

    student_entity: StudentEntity,

    student_search: StudentSearch,


    // company routes
    company_dashboard: CompanyDashboard,

    company_view: CompanyView,

    company_entity: CompanyEntity,

    company_create: CompanyCreate

}