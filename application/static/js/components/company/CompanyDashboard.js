export default {

    props: [
        "navigate",

        "logout",

        "viewProfile",

        "changePassword",

        "routeData"
    ],

    data() {

        return {

                    dashboard: {

                        length: {
                            current: 0,
                            awaiting: 0
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

        createDrive() {

            this.navigate(
                "company_drive", {
                    mode: "create"
                }
            )

        },
        
        async editDrive(id) {

            const warning = `
        WARNING

        Editing a drive will automatically place it back into the approval queue.

        The drive may become unavailable to students until it is re-approved by an administrator.

        Students who have already applied will NOT automatically be re-evaluated for eligibility.

        As a result:

        • Previously eligible students may become ineligible.
        • Previously ineligible students may become eligible.
        • Existing applications may no longer reflect the updated eligibility criteria.

        This action is irreversible.

        Type EDIT to acknowledge and continue.
        `

            const confirmation =
                prompt(warning)

            if (confirmation !== "EDIT") {

                alert(
                    "Drive modification cancelled."
                )

                return

            }

            this.navigate(
                "company_drive",
                {
                    mode: "edit",
                    id: id
                }
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
        },

        
        // action entity
        async action_entity(entity, action, id) {
            const response = await fetch(
                `/api/company/${entity}/${action}/${id}`
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

        async shortlistApplication(id) {
            
            await this.action_entity(
                'applications', 
                'interview', 
                id
            )
        },

        async rejectApplication(applicationId) {

            await this.actionEntity(
                "applications",
                "reject",
                applicationId
            )

        },

        async offerApplication(applicationId) {

            await this.actionEntity(
                "applications",
                "offer",
                applicationId
            )

        },

        scheduleInterview(applicationId,email) {

            window.location.href =
                `mailto:${email}`

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

                                    Awaiting Approval Drives

                                </h5>

                                <h2>

                                    {{ dashboard.length.awaiting }}

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
                                        <div class="d-flex gap-2">

                                            <button
                                                class="btn btn-primary btn-sm"
                                                @click="viewDrive(drive.id)">

                                                View

                                            </button>
                                            <button
                                                class="btn btn-success btn-sm"
                                                @click="editDrive(drive.id)">
                                                Edit
                                            </button>

                                            <button
                                                class="btn btn-danger btn-sm"
                                                @click="closeDrive(drive.id)">
                                                
                                                Close

                                            </button>

                                        </div>

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