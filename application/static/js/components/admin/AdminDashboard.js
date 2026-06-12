export default {

    template: `

    <div>

        <!-- NAVBAR -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

            <div class="container-fluid">

                <ul class="navbar-nav me-auto">

                    <li class="nav-item">
                        <a class="nav-link active"
                            @click="viewDashboard">
                            Dashboard
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link"
                           @click="viewCompanies">
                            Companies
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link"
                           @click="viewDrives">
                            Drives
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link"
                           @click="viewStudents">
                            Students
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"
                           @click="viewApplications">
                            Applications
                        </a>
                    </li>


                </ul>

                <div class="dropdown">

                    <button
                        class="btn btn-outline-light rounded-circle"
                        style="
                            width:42px;
                            height:42px;
                        "
                        data-bs-toggle="dropdown">

                        A

                    </button>

                    <ul class="dropdown-menu dropdown-menu-end">

                        <li>

                            <a
                                class="dropdown-item"
                                @click="manageProfile('admin')">

                                Manage Profile

                            </a>

                        </li>

                        <li>

                            <a
                                class="dropdown-item"
                                @click="changePassword">

                                Change Password

                            </a>

                        </li>

                        <li>
                            <hr class="dropdown-divider">
                        </li>

                        <li>

                            <a
                                class="dropdown-item text-danger"
                                @click="logout">

                                Logout

                            </a>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

        <!-- WELCOME BANNER -->

        <div class="container mt-4">

            <div class="p-4 bg-light border rounded">

                <h2>
                    Welcome Admin
                </h2>

                <p>
                    Here are the latest highlights.
                </p>

            </div>

        </div>

        <!-- SEARCH BOX -->
        <div class="container py-4">

            <div class="row">

                <div class="col-12">

                    <div class="input-group">

                        <!-- Left Half: Search Text -->

                        <input
                            v-model="searchText"
                            type="text"
                            class="form-control"
                            placeholder="Search..."
                        >

                        <!-- Right Half Right: Search Button -->

                        <button
                            class="btn btn-primary"
                            @click="search"
                        >

                            Search

                        </button>

                    </div>

                </div>

            </div>
        
        </div>


        <!-- STATISTICS CARDS -->

        <div class="container mt-4">

            <div class="row">

                <!-- Companies -->

                <div class="col-md-3">

                    <div class="card text-center">

                        <div class="card-body">

                            <h5>Companies</h5>

                            <h2>
                                {{ dashboard.active.company }}
                            </h2>

                            <button
                                class="btn btn-primary"
                                @click="viewCompanies">

                                View All

                            </button>

                        </div>

                    </div>

                </div>

                <!-- Drives -->

                <div class="col-md-3">

                    <div class="card text-center">

                        <div class="card-body">

                            <h5>Drives</h5>

                            <h2>
                                {{ dashboard.active.drive }}
                            </h2>

                            <button
                                class="btn btn-primary"
                                @click="viewDrives">

                                View All

                            </button>

                        </div>

                    </div>

                </div>

                <!-- Students -->

                <div class="col-md-3">

                    <div class="card text-center">

                        <div class="card-body">

                            <h5>Students</h5>

                            <h2>
                                {{ dashboard.active.student }}
                            </h2>

                            <button
                                class="btn btn-primary"
                                @click="viewStudents">

                                View All

                            </button>

                        </div>

                    </div>

                </div>

                <!-- Applications -->

                <div class="col-md-3">

                    <div class="card text-center">

                        <div class="card-body">

                            <h5>Applications</h5>

                            <h2>
                                {{ dashboard.active.application }}
                            </h2>
                            
                            <button
                                class="btn btn-primary"
                                @click="viewApplications">

                                View All

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>


        <!-- PENDING APPROVALS -->

        <div class="container mt-4">

            <div class="row">

                <!-- COMPANIES -->

                <div class="col-md-6">

                    <div class="card">

                        <div class="card-header">

                            <div
                                class="d-flex justify-content-between">

                                <h5>
                                    Pending Company Approvals
                                </h5>

                                <button
                                    class="btn btn-sm btn-primary"
                                    @click="viewAllPendingCompanies">

                                    View All

                                </button>

                            </div>

                        </div>

                        <div class="card-body">

                            <div
                                v-for="company in dashboard.pending.company"
                                :key="company.id"
                                class="border-bottom py-3">

                                <div
                                    class="d-flex justify-content-between align-items-center">

                                    <div>

                                        <strong>
                                            {{ company.company_name }}
                                        </strong>

                                        <br>

                                        <small class="text-muted">
                                            {{ company.email }}
                                        </small>

                                    </div>

                                    <div
                                        class="d-flex gap-2 flex-shrink-0">

                                        <button
                                            class="btn btn-primary btn-sm"
                                            @click="viewCompany(company.id)">

                                            View

                                        </button>

                                        <button
                                            class="btn btn-success btn-sm"
                                            @click="approveCompany(company.id)">

                                            Approve

                                        </button>

                                        <button
                                            class="btn btn-danger btn-sm"
                                            @click="rejectCompany(company.id)">

                                            Reject

                                        </button>

                                        <button
                                            class="btn btn-dark btn-sm"
                                            @click="blacklistCompany(company.id)">
                                            Blacklist
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <!-- DRIVES -->

                <div class="col-md-6">

                    <div class="card">

                        <div class="card-header">

                            <div
                                class="d-flex justify-content-between">

                                <h5>
                                    Pending Drive Approvals
                                </h5>

                                <button
                                    class="btn btn-sm btn-primary"
                                    @click="viewDrives">

                                    View All

                                </button>

                            </div>

                        </div>

                        <div class="card-body">

                            <div
                                v-for="drive in dashboard.pending.drive"
                                :key="drive.id"
                                class="border-bottom py-3">

                                <div
                                    class="d-flex justify-content-between align-items-center">

                                    <div>

                                        <strong>
                                            {{ drive.drive_name }}
                                        </strong>

                                        <br>

                                        <small class="text-muted">
                                            {{ drive.company_name }}
                                        </small>

                                    </div>

                                    <div
                                        class="d-flex gap-2 flex-shrink-0">

                                        <button
                                            class="btn btn-primary btn-sm"
                                            @click="viewDrive(drive.id)">

                                            View

                                        </button>

                                        <button
                                            class="btn btn-success btn-sm"
                                            @click="approveDrive(drive.id)">

                                            Approve

                                        </button>

                                        <button
                                            class="btn btn-danger btn-sm"
                                            @click="rejectDrive(drive.id)">

                                            Reject

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
`,
    props: [
        "navigate",

        "logout",

        "viewProfile",

        "changePassword"
    ],

    data() {

        return {

            dashboard: {

                active: {

                    student: 0,
                    company: 0,
                    drive: 0,
                    application: 0

                },

                pending: {

                    company: [],
                    drive: []

                }

            },

                searchText: ""

        }

    },

    methods: {

        async loadDashboard() {

            // ==================================================
            // TODO:
            // API CALL HERE
            // GET /api/admin/dashboard
            // ==================================================
            const response = await fetch(
                "/api/admin/dashboard"
            )

            const result =
                await response.json()

            this.dashboard =
                result.data

        },

        viewDashboard() {
            this.navigate('admin_dashboard')
        },

        // view groups functions for admin
        viewCompanies() {
            this.navigate("admin_view", {entity: 'companies'})

        },

        viewDrives() {

            this.navigate("admin_view", {entity: 'drives'})

        },

        viewStudents() {

            this.navigate("admin_view", {entity: 'students'})

        },

        viewApplications() {

            this.navigate("admin_view", {entity: 'applications'})

        },

        // view single entity functions for admin
        viewCompany(id) {

            this.navigate("admin_entity", { id: id, entity: 'companies' })

        },

        viewDrive(id) {

            this.navigate("admin_entity", { id: id, entity: 'drives' })

        },

        // action entity functions

        async action_entity(entity, action, id) {
            const response = await fetch(
                `/api/admin/${entity}/${action}/${id}`
            )
            const result = await response.json()

            if (result.success) {
                alert(`${entity.charAt(0).toUpperCase() + entity.slice(1)} ${action}d successfully!`)
                this.loadDashboard()
            }
            else {
                alert(result.message || `Failed to ${action} ${entity}.`)
            }
        },

        async approveCompany(id) {
            this.action_entity('companies', 'approve', id)
        },

        async  rejectCompany(id) {
            this.action_entity('companies', 'reject', id)
        },

        async blacklistCompany(id) {
            this.action_entity('companies', 'blacklist', id)
        },

        async approveDrive(id) {
            this.action_entity('drives', 'approve', id)
        },

        async rejectDrive(id) {
            this.action_entity('drives', 'reject', id)
        },

        // search
        async search() {

            if (!this.searchText.trim()) {

                alert("Please enter a search term")

                return

            }

            console.log(this.searchText)

            this.navigate(
                "admin_search",
                {
                    search: this.searchText
                }

            )

        }
        
    },

    mounted() {

        this.loadDashboard()

    }

}