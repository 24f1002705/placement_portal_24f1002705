export default {

    props: [
        "navigate",

        "logout",

        "viewProfile",

        "changePassword"
    ],

    data() {

        return {

            dashboard: {
                status: "",
                stats: {
                    applied: 0,
                    rejected: 0,
                    interview: 0,
                    offer: 0    
                },

                list: {
                    eligible_drives: {},
                    recent_applications: {}
                },

                placed: {
                    drive: {},
                    company: {}
                }

            }

        }

    },

    computed: {

        actionMap() {
            return {
                companies: {
                    label: "View",
                    handler: this.viewCompany,
                    class: "btn-primary"
                },
                drives: [
                    {
                        label: "View",
                        handler: this.viewDrive,
                        class: "btn-primary"
                    },
                    {
                        label: "Apply",
                        handler: this.applyToDrive,
                        class: "btn-success"
                    }
                ],
                applications: {
                    label: "View",
                    handler: this.viewApplication
                }
            }
        }
    },


    // --------------------------------------------------
    // LIFECYCLE METHOD
    // --------------------------------------------------

    // mounted() automatically runs
    // when component appears on screen.

    async mounted() {
        this.studentDash()
    },

    methods: {
        // all student methods
        // get student_dash
        async studentDash() {
            const response = await fetch("api/student/dashboard")

            const result = await response.json()

            this.dashboard = result.data
        },
        
        // view groups of entities
        viewDashboard() {
            this.navigate('student_dashboard')
        },

        viewCompanies() {
            this.navigate("student_view", {entity: 'companies'})
        },

        viewDrives() {
            this.navigate("student_view", {entity: "drives"})
        },

        viewApplications() {
            this.navigate("student_view", {entity: 'applications'})
        },

        // view single entity functions for admin
        viewCompany(id) {
            this.navigate("student_entity", { id: id, entity: 'companies' })
        },

        viewDrive(id) {
            this.navigate("student_entity", { id: id, entity: 'drives' })
        },

        viewApplication(id) {
            this.navigate("student_entity", { id: id, entity: 'applications'})
        },

        // action_entity function
        async action_entity(entity, action, id) {
            const response = await fetch(
                `/api/student/${entity}/${action}/${id}`
            )
            const result = await response.json()

            if (result.success) {
                alert(`${entity.charAt(0).toUpperCase() + entity.slice(1)} ${action}d successfully!`)
                this.studentDash()
            }
            else {
                alert(result.message || `Failed to ${action} ${entity}.`)
            }
        },

        // application actions
        async applyToDrive(drive_id) {
            this.action_entity('drives', 'apply', drive_id)
        },

        async acceptOffer(application_id) {

            const confirmation = prompt(
                `WARNING

                Accepting this offer will:

                • Mark you as PLACED
                • Withdraw all your other applications
                • Prevent you from applying to any future drives
                • Permanently lock your placement status

                THIS ACTION CANNOT BE UNDONE.

                Type ACCEPT to continue.`
            )

            if (confirmation !== "ACCEPT") {

                alert("Offer acceptance cancelled.")

                return

            }

            const response = await fetch(
                `/api/student/applications/accept/${application_id}`
            )

            const result = await response.json()

            if (result.success) {

                alert(result.message)

                this.studentDash()

            }

            else {

                alert(result.message)

            }

        },

        async rejectOffer(application_id) {

            const confirmation = prompt(
                `WARNING

                Rejecting this offer will:

                • Permanently reject this offer
                • Remove your ability to accept this offer later

                THIS ACTION CANNOT BE UNDONE.

                Type REJECT to continue.`
            )

            if (confirmation !== "REJECT") {

                alert("Offer rejection cancelled.")

                return

            }

            const response = await fetch(
                `/api/student/applications/reject/${application_id}`
            )

            const result = await response.json()

            if (result.success) {

                alert(result.message)

                this.studentDash()

            }

            else {

                alert(result.message)

            }

        },

        // search
        async search() {
            if (!this.searchText.trim()) {
                
                alert("Please enter a search term")

                return

            }
            console.log(this.searchText)
            this.navigate(
                "student_search",
                {
                    search: this.searchText
                }
            )
        }

    },


    template: `
        <!-- IF BLACKLISTED OF DEACTIVATED -->
        <div
            v-if="dashboard.status === 'blacklisted' || dashboard.status === 'deactivated'">
            <div class="container mt-4">
                <div class="p-4 bg-light border rounded">

                    <h2>
                        Dear Student
                    </h2>

                    <p>
                        Your account is  {{ dashboard.status }}, please contact admin@portal.com for further help.
                    </p>

                </div>
            </div>
        </div>

        <!-- IF PLACED -->
        <div
            v-if="dashboard.status === 'placed'">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

                <div class="container-fluid">
                                        <ul class="navbar-nav me-auto">


                    </ul>

                    <div class="dropdown">

                        <button
                            class="btn btn-outline-light rounded-circle"
                            style="
                                width:42px;
                                height:42px;
                            "
                            data-bs-toggle="dropdown">

                            S

                        </button>

                        <ul class="dropdown-menu dropdown-menu-end">

                            <li>

                                <a
                                    class="dropdown-item"
                                    @click="manageProfile('student')">

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
            <div class="container mt-4">
                <div class="p-4 bg-light border rounded">

                    <h2>
                        Welcome Student
                    </h2>

                    <p>
                        CONGRATULATIONS on your placement! 🥳🎉
                    </p>
                </div>
            </div>
            <div class="container mt-4">

                <div class="row">

                    <!-- company placed at -->

                    <div class="col-md-6">

                        <div class="card">

                            <div class="card-header">

                                <div
                                    class="d-flex justify-content-between">

                                    <h5>
                                        Company Details
                                    </h5>

                                </div>

                            </div>

                            <div class="card-body">

                                <div
                                    v-for="(value,key) in dashboard.placed.company"
                                    :key="key"
                                    class="mb-2">

                                    <strong>{{ key }}</strong> :
                                    {{ value }}

                                </div>

                            </div>

                        </div>

                    </div>

                    <!-- Drive Details -->

                    <div class="col-md-6">

                        <div class="card">

                            <div class="card-header">

                                <div
                                    class="d-flex justify-content-between">

                                    <h5>
                                        Drive Details
                                    </h5>

                                </div>

                            </div>

                            <div class="card-body">

                                <div
                                    v-for="(value,key) in dashboard.placed.drive"
                                    :key="key"
                                    class="mb-2">

                                    <strong>{{ key }}</strong> :
                                    {{ value }}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>

        <!-- IF APPROVED -->
        <div
            v-if="dashboard.status === 'approved'">

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

                            S

                        </button>

                        <ul class="dropdown-menu dropdown-menu-end">

                            <li>

                                <a
                                    class="dropdown-item"
                                    @click="manageProfile('student')">

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
                        Welcome Student
                    </h2>

                    <p>
                        Here are the latest updates.
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

                    <!-- Applied -->

                    <div class="col-md-3">

                        <div class="card text-center">

                            <div class="card-body">

                                <h5>Applied</h5>

                                <h2>
                                    {{ dashboard.stats.applied }}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <!-- Shortlisted -->

                    <div class="col-md-3">

                        <div class="card text-center">

                            <div class="card-body">

                                <h5>Rejected</h5>

                                <h2>
                                    {{ dashboard.stats.rejected }}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <!-- Interviews -->

                    <div class="col-md-3">

                        <div class="card text-center">

                            <div class="card-body">

                                <h5>Interviews</h5>

                                <h2>
                                    {{ dashboard.stats.interview }}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <!-- Offers -->

                    <div class="col-md-3">

                        <div class="card text-center">

                            <div class="card-body">

                                <h5>Offers</h5>

                                <h2>
                                    {{ dashboard.stats.offer }}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <div class="container mt-4">

                <div class="row">

                    <!-- Eligible Drives -->

                    <div class="col-md-6">

                        <div class="card">

                            <div class="card-header">

                                <div
                                    class="d-flex justify-content-between">

                                    <h5>
                                        Eligible Drives
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
                                    v-for="drive in dashboard.list.eligible_drives"
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
                                                @click="applyToDrive(drive.id)">

                                                Apply

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <!-- Applications -->

                    <div class="col-md-6">

                        <div class="card">

                            <div class="card-header">

                                <div
                                    class="d-flex justify-content-between">

                                    <h5>
                                        Recent Applications
                                    </h5>

                                    <button
                                        class="btn btn-sm btn-primary"
                                        @click="viewApplications">

                                        View All

                                    </button>

                                </div>

                            </div>

                            <div class="card-body">

                                <div
                                    v-for="application in dashboard.list.recent_applications"
                                    :key="application.id"
                                    class="border-bottom py-3">

                                    <div
                                        class="d-flex justify-content-between align-items-center">

                                        <div>

                                            <strong>
                                                {{ application.drive_name }}
                                            </strong>

                                            <br>

                                            <small class="text-muted">
                                                {{ application.company_name }}
                                            </small>

                                        </div>

                                        <div
                                            class="d-flex gap-2 flex-shrink-0">

                                            <button
                                                class="btn btn-primary btn-sm"
                                                @click="viewApplication(application.id)">

                                                View

                                            </button>

                                            <button
                                                class="btn btn-success btn-sm"
                                                v-if="application.status==='offer'"
                                                @click="acceptOffer(application.id)">

                                                Accept

                                            </button>

                                            <button
                                                class="btn btn-danger btn-sm"
                                                v-if="application.status==='offer'"
                                                @click="rejectOffer(application.id)">

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
    `
}