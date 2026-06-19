export default {
    props: [
        "navigate",

        "logout",

        "routeData",

        "manageProfile",

        "changePassword"
    ],
    
    data() {
        return {
            loading: 1,
            error: "",
            entity: "",
            data: {}

        }
    },

    computed: {

        actionMap() {
            return {
                companies: [
                    {
                        label: "View",
                        handler: this.viewCompany,
                        class: "btn-primary"
                    }
                ],
                drives: [

                    {
                        label: "View",
                        handler: this.viewDrive,
                        class: "btn-primary"
                    },
                    //{
                    //    label: "Apply",
                    //    handler: this.applyToDrive,
                    //    class: "btn-success"
                    //}
                ],
                applications: [
                    {
                        label: "View",
                        handler: this.viewApplication,
                        class: "btn-primary"

                    }
                ]
            }
        }
    },


    // --------------------------------------------------
    // LIFECYCLE METHOD
    // --------------------------------------------------

    // mounted() automatically runs
    // when component appears on screen.

    async mounted() {
        this.studentView()
    },

    methods: {
        // all student methods
        // get student_dash
        async studentView() {
            this.loading = true

            try {
                this.entity = this.routeData.entity

                const response = await fetch(`api/student/${this.entity}`)

                const result = await response.json()

                if (!result.success) {
                    this.error = result.message
                    return
                }

                this.data = result.data
            }

            catch(err) {
                this.error = err.message
            }

            finally {
                this.loading = false
            }
        },

        getActions() {
            return this.actionMap[this.entity] || []
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
                this.loadDashboard()
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

                this.viewDashboard()

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

                this.viewDashboard()

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
        },

        async exportData() {
            const response = await fetch(
                `/api/student/export`
            )

            const result = await response.json()

            if (result.success) {
                alert("Your Application history is being compiled and will be sent to your email-ID")
            }

            this.studentView()
        }

    },


    template: `

        <div>

            <!-- NAVBAR -->
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">

                <div class="container-fluid">

                    <ul class="navbar-nav me-auto">

                        <li class="nav-item">
                            <a class="nav-link"
                                @click="viewDashboard">
                                Dashboard
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link"
                            :class="{
                                active:
                                entity==='companies'
                            }"
                            @click="viewCompanies">
                                Companies
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link"
                            :class="{
                                active:
                                entity==='drives'
                            }"
                            @click="viewDrives">
                                Drives
                            </a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link"
                            :class="{
                                active:
                                entity==='applications'
                            }"
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

            <div class="container mt-4">

                <h2
                    class="mb-4 text-capitalize">

                    {{ entity }}

                </h2>

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

                <!-- ALL VIEW -->

                <div
                    class="card mb-4">

                    <div class="card-header">
                        <div class="d-flex justify-content-between">

                            <h5>
                                {{ entity }}
                            </h5>

                            <button
                                v-if="entity==='applications'"
                                class="btn btn-sm btn-primary"
                                @click="exportData">

                                Export

                            </button>

                        </div>
                    </div>

                    <div class="card-body">

                        <table class="table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Name</th>
                                    
                                    <th>Company</th>

                                    <th
                                        v-if="entity==='applications'">
                                        Status
                                    </th>
                                    

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr
                                    v-for="row in data"
                                    :key="row.id">

                                    <td>

                                        {{ row.id }}

                                    </td>

                                    <td>

                                        {{ row.name || row.drive_name || row.company_name }}

                                    </td>

                                    <td> 
                                        
                                        {{ row.company_name }}
                                        
                                    </td>

                                    <td
                                        v-if="entity==='applications'">
                                        {{ row.status }}
                                    </td>

                                    <td>

                                        <button

                                            v-for="
                                                action
                                                in getActions()
                                            "

                                            :key="action.label"

                                            :class="'btn btn-sm me-2 ' + action.class"

                                            @click="
                                                action.handler(row.id)
                                            ">

                                            {{ action.label }}

                                        </button>

                                        <button
                                            v-if="row.status==='offer'"
                                            @click="acceptOffer(row.id)"
                                            class="btn btn-sm me-2 btn-success">
                                            Accept
                                        </button>

                                        <button
                                            v-if="row.status==='offer'"
                                            @click="rejectOffer(row.id)"
                                            class="btn btn-sm me-2 btn-danger">
                                            Reject
                                        </button>

                                        <button
                                            v-if="entity==='drives' && row.eligibility"
                                            @click="applyToDrive(row.id)"
                                            class="btn btn-sm me-2 btn-success">
                                            Apply
                                        </button>

                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    </div>
    `
}
// if company, only show active companies, 
// with the option to view the company, 
// and at the bottom of the details
// show all the drives of the company, active at the top, 
// finished at the bottom, entitled hiring history
// plus the option of 

// if viewing drive, all the data 
// plus apply button if two conditions, eligible and open


// StudentView here is for lists
// company page: split into two
// Actively Hiring and Past Hiring

// Drives page: split into two
// Eligible Drives (active)
// Other Drives

// Application History page: 
// Offers  
// Schedule for Interview (shortlisted)
// Rejected
