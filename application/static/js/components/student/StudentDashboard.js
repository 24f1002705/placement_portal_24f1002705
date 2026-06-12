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
                stats: {
                    applied: 0,
                    shortlisted: 0,
                    interviews: 0,
                    offers: 0
                },

                list: {
                    eligible_drives: {},
                    recent_applications: {}
                }

            }

        }

    },

    computed: {

        actionMap() {
            return {
                companies: {
                    label: "View",
                    handler: this.viewDrivesOfCompany,
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

        viewDrivesOfCompany(companyId) {
            this.navigate("student_view", {entity: "drives", company_id: companyId})
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
            this.navigate("student_entity", { id: id, antity: 'application'})
        },

        // application
        applyToDrive(drive_id) {
            
  
        },

        acceptOffer(id) {

        },

        rejectOffer(id) {

        }




    },


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

                                <button
                                    class="btn btn-primary"
                                    @click="">

                                    View All

                                </button>

                            </div>

                        </div>

                    </div>

                    <!-- Shortlisted -->

                    <div class="col-md-3">

                        <div class="card text-center">

                            <div class="card-body">

                                <h5>Shortlisted</h5>

                                <h2>
                                    {{ dashboard.stats.shortlisted }}
                                </h2>

                                <button
                                    class="btn btn-primary"
                                    @click="">

                                    View All

                                </button>

                            </div>

                        </div>

                    </div>

                    <!-- Interviews -->

                    <div class="col-md-3">

                        <div class="card text-center">

                            <div class="card-body">

                                <h5>Interviews</h5>

                                <h2>
                                    {{ dashboard.stats.interviews }}
                                </h2>

                                <button
                                    class="btn btn-primary"
                                    @click="">

                                    View All

                                </button>

                            </div>

                        </div>

                    </div>

                    <!-- Offers -->

                    <div class="col-md-3">

                        <div class="card text-center">

                            <div class="card-body">

                                <h5>Offers</h5>

                                <h2>
                                    {{ dashboard.stats.offers }}
                                </h2>
                                
                                <button
                                    class="btn btn-primary"
                                    @click="">

                                    View All

                                </button>

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
                                                :v-if="offer"
                                                @click="acceptOffer(application.id)">

                                                Accept

                                            </button>

                                            <button
                                                class="btn btn-danger btn-sm"
                                                :v-if="offer"
                                                @click="rejectOffer(drive.id)">

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