export default {

    props: [
        "navigate",

        "logout",

        "routeData",

        "viewProfile",

        "changePassword"
    ],

    computed: {
        actionMap() {
            return {

                applied: [
                    {
                        label:"View",
                        handler: this.viewApplication,
                        class: "btn-primary"
                    },

                    {
                        label: "Interview",
                        class: "btn-success",
                        handler: this.shortlistApplication
                    },

                    {
                        label: "Reject",
                        class: "btn-danger",
                        handler: this.rejectApplication
                    }

                ],

                interviewed: [
                    {
                        label:"View",
                        handler: this.viewApplication,
                        class: "btn-primary"
                    },

                    {
                        label: "Schedule Interview",
                        class: "btn-secondary",
                        handler: this.scheduleInterview
                    },

                    {
                        label: "Offer",
                        class: "btn-success",
                        handler: this.offerApplication
                    },

                    {
                        label: "Reject",
                        class: "btn-danger",
                        handler: this.rejectApplication
                    }

                ],

                offer: [],

                accepted: [],

                rejected: [],

                withdrawn: []

            }
        }
    },

    data() {

        return {

            loading: true,
            error: "",

            entity: "",
            id: null,

            data: {},

            drive: {},
            applications: {},

            application: {}
        }

    },


    // --------------------------------------------------
    // LIFECYCLE METHOD
    // --------------------------------------------------

    // mounted() automatically runs
    // when component appears on screen.

    async mounted() {
        
        console.log('mounted')
        this.loadEntity()

    },

    methods: {
        async loadEntity() {

            try {

                this.entity = this.routeData.entity
                this.id = this.routeData.id

                console.log(this.entity, this.id)

                let endpoint = `/api/company/${this.entity}/${this.id}`


                const response =
                    await fetch(endpoint)

                const result =
                    await response.json()

                if (!result.success) {
                    this.error = result.message
                    return
                }
                this.data =
                    result.data

                if (this.entity==="drives"){
                    this.drive = this.data.drive

                    this.applications = this.data.applications
                }

                if (this.entity==="applications"){
                    this.application = this.data.application
                }
            }

            catch(err) {
                this.error = err.message
            }

            finally {
                this.loading = false
            }

        },

        viewDashboard() {

            this.navigate(
                "company_dashboard"
            )

        },

        createDrive() {

            this.navigate(
                "company_drive",
                {
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
                this.loadEntity()
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

            await this.action_entity(
                "applications",
                "reject",
                applicationId
            )

        },

        async offerApplication(applicationId) {

            await this.action_entity(
                "applications",
                "offer",
                applicationId
            )

        },

        async closeDrive(id) {
            await this.action_entity(
                "drives",
                "close",
                id
            )
        },

        scheduleInterview(applicationId,email) {

            window.location.href =
                `mailto:${email}`

        },

        getActions(status) {

            return this.actionMap[status] || []

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
                                class="nav-link"
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

            <!-- DRIVE VIEW -->

            <div class="container mt-4">
                <div
                    v-if="loading"
                    class="alert alert-info">

                    Loading...

                </div>

                <div
                    v-if="error"
                    class="alert alert-danger">

                    {{ error }}

                </div>

                <!-- DRIVE DETAILS -->

                <div
                    v-if="entity === 'drives'"
                    class="card mb-4">

                    <div class="card-header">

                        Drive Details

                    </div>

                    <div class="card-body">

                        <div
                            v-for="(value,key) in drive"
                            :key="key"
                            class="mb-2">

                            <strong>{{ key }}</strong> :
                            {{ value }}

                        </div>

                        <div class="d-flex gap-2">

                            <button
                                class="btn btn-success btn-sm"
                                v-if="drive.status==='approved'"
                                @click="editDrive(drive.id)">
                                Edit
                            </button>

                            <button
                                class="btn btn-danger btn-sm"
                                v-if="drive.status==='approved'"
                                @click="closeDrive(drive.id)">

                                Close

                            </button>
                        </div>

                    </div>
                </div>

                <!-- APPLICATION TABLES -->


                <div
                    v-if="entity === 'drives'"
                    v-for="(rows,status) in applications"
                    :key="status"
                    class="card mb-4">

                    <div class="card-header text-capitalize">

                        {{ status }}

                        ({{ rows.length }})

                    </div>

                    <div class="card-body">

                        <table
                            v-if="rows.length"
                            class="table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Name</th>

                                    <th>Department</th>

                                    <th>Degree</th>

                                    <th>GPA</th>

                                    <th>Resume</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr
                                    v-for="row in rows"
                                    :key="row.id">

                                    <td>

                                        {{ row.id }}

                                    </td>

                                    <td>

                                        {{ row.student.name }}

                                    </td>

                                    <td>

                                        {{ row.student.department }}

                                    </td>

                                    <td>

                                        {{ row.student.degree }}

                                    </td>

                                    <td>

                                        {{ row.student.gpa }}

                                    </td>

                                    <td>

                                        <a
                                            :href="row.student.resume_link"
                                            target="_blank">

                                            Resume

                                        </a>

                                    </td>

                                    <td>

                                        <button

                                            v-for="
                                                action
                                                in getActions(status)
                                            "

                                            :key="action.label"

                                            :class="'btn btn-sm me-2 ' + action.class"

                                            @click="action.handler(row.id)">

                                            {{ action.label }}

                                        </button>

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                        <div
                            v-else
                            class="text-muted">

                            No applications.

                        </div>

                    </div>

                </div>

            </div>

            <!--  application view -->
            <div class="container mt-4">

                <div
                    v-if="entity === 'applications'"
                    class="card mb-4">

                    <div class="card-header">

                        Application Details

                    </div>

                    <div class="card-body">

                        <div
                            class="mb-2">

                            <div
                                v-for="(value, key) in application.student"
                                class="mb-2">

                                <strong>{{ key }}</strong> :
                                {{ value }}
                            </div>

                            <strong> Application Status </strong> :
                                {{ application.status }}

                        </div>



                        <button
                            v-for="
                                action
                                in getActions(application.status)
                            "

                            :key="action.label"

                            :class="'btn btn-sm me-2 ' + action.class"

                            @click="action.handler(row.id)">

                            {{ action.label }}

                        </button>

                    </div>
                </div>

            </div>

        </div>
    `


}