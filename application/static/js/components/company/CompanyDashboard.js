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

                        length: {
                            current: 0,
                            past: 0
                        },

                        current: [],

                        past: []

                    }

        }

    },


    // --------------------------------------------------
    // LIFECYCLE METHOD
    // --------------------------------------------------

    // mounted() automatically runs
    // when component appears on screen.

    async mounted() {

        this.loadDashboard()

    },

    methods: {
        async loadDashboard() {

            const response =
                await fetch(
                    "/api/company/dashboard"
                )

            const result =
                await response.json()

            if (result.success) {

                this.dashboard =
                    result.data

            }

        },

        viewDashboard() {

            this.navigate(
                "company_dashboard"
            )

        },

        viewDrives() {

            this.navigate(
                "company_view",
                {
                    entity: "drives"
                }
            )

        },

        createDrive() {

            this.navigate(
                "company_create_drive"
            )

        },

        viewDrive(id) {

            this.navigate(
                "company_entity",
                {
                    entity: "drives",
                    id: id
                }
            )

        },

        viewApplication(id) {
            this.navigate(
                "company_entity",
                {
                    entity: "applications",
                    id: id
                }
            )
        }
    },

    template: `
        <div>

            <!-- NAVBAR -->

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

                <div class="container-fluid">

                    <ul class="navbar-nav me-auto">

                        <li class="nav-item">

                            <a
                                class="nav-link active"
                                @click="viewDashboard">

                                Dashboard

                            </a>

                        </li>

                        <li class="nav-item">

                            <a
                                class="nav-link"
                                @click="viewDrives">

                                Drives

                            </a>

                        </li>

                    </ul>

                    <!-- ACCOUNT DROPDOWN -->
                    <div class="dropdown">

                        <button
                            class="btn btn-outline-light rounded-circle"
                            style="
                                width:42px;
                                height:42px;
                            "
                            data-bs-toggle="dropdown">

                            C

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

            <!-- WELCOME -->

            <div class="container mt-4">

                <div class="p-4 bg-light border rounded">

                    <h2>

                        Welcome Company

                    </h2>

                    <p>

                        Here are your latest hiring updates.

                    </p>

                </div>

            </div>

            <!-- STATS -->

            <div class="container mt-4">

                <div class="row">

                    <div class="col-md-6">

                        <div class="card text-center">

                            <div class="card-body">

                                <h5>

                                    Active Drives

                                </h5>

                                <h2>

                                    {{ dashboard.length.current }}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div class="col-md-6">

                        <div class="card text-center">

                            <div class="card-body">

                                <h5>

                                    Closed Drives

                                </h5>

                                <h2>

                                    {{ dashboard.length.past }}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <!-- ACTIVE DRIVES + HIRING HISTORY -->

            <div class="container mt-4">

                <div class="row">

                    <!-- ACTIVE -->

                    <div class="col-md-6">

                        <div class="card">

                            <div class="card-header">

                                <div
                                    class="d-flex justify-content-between">

                                    <h5>
                                        Active Drives
                                    </h5>

                                    <button
                                        class="btn btn-sm btn-primary"
                                        @click="createDrive">

                                        New +

                                    </button>

                                </div>

                            </div>

                            <div class="card-body">

                                <div
                                    v-for="drive in dashboard.current"
                                    :key="drive.id"
                                    class="border-bottom py-3">

                                    <div
                                        class="d-flex justify-content-between align-items-center">

                                        <div>

                                            <strong>

                                                {{ drive.drive_name }}

                                            </strong>

                                            <br>

                                            <small>

                                                {{ drive.location }}

                                            </small>

                                        </div>

                                        <button
                                            class="btn btn-primary"
                                            @click="viewDrive(drive.id)">

                                            View

                                        </button>

                                        <button
                                            class="btn btn-danger"
                                            @click="closeDrive(drive.id)">
                                            
                                            Close

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <!-- PAST -->

                    <div class="col-md-6">

                        <div class="card">

                            <div class="card-header">

                                Hiring History

                            </div>

                            <div class="card-body">

                                <div
                                    v-for="drive in dashboard.past"
                                    :key="drive.id"
                                    class="border-bottom py-3">

                                    <div
                                        class="d-flex justify-content-between align-items-center">

                                        <div>

                                            <strong>

                                                {{ drive.drive_name }}

                                            </strong>

                                            <br>

                                            <small>

                                                Closed

                                            </small>

                                        </div>

                                        <button
                                            class="btn btn-primary btn-sm"
                                            @click="viewDrive(drive.id)">

                                            View

                                        </button>

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