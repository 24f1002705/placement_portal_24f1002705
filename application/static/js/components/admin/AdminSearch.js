export default {

    props: [
        "navigate",
        "routeData"
    ],

    data() {

        return {

            loading: true,

            error: "",

            entities: {},

            entity: ""

        }

    },

    computed: {

        statuses() {

            return Object.keys(this.groups)

        },

        actionMap() {

            return {

                company: {

                    registered: [

                        {
                            label: "View",
                            handler: this.viewCompany,
                            class: "btn-primary"
                        },

                        {
                            label: "Approve",
                            handler: this.approveCompany,
                            class: "btn-success"
                        },

                        {
                            label: "Reject",
                            handler: this.rejectCompany,
                            class: "btn-danger"
                        },
                        {
                            label:"Blacklist",
                            handler: this.blacklistCompany,
                            class: "btn-dark"
                        }

                    ],

                    approved: [

                        {
                            label: "View",
                            handler: this.viewCompany,
                            class: "btn-primary"

                        },

                        {
                            label: "Blacklist",
                            handler: this.blacklistCompany,
                            class: "btn-dark"
                        }

                    ]

                },

                drives: {

                    registered: [

                        {
                            label: "View",
                            handler: this.viewDrive,
                            class: "btn-primary"
                        },

                        {
                            label: "Approve",
                            handler: this.approveDrive,
                            class: "btn-success"
                        },

                        {
                            label: "Reject",
                            handler: this.rejectDrive,
                            class: "btn-danger"
                        }

                    ],
                                        
                    approved: [
                        {
                            label:"View",
                            handler: this.viewDrive,
                            class: "btn-primary"
                        }
                    ]

                },

                student: {
                    approved: [
                        {
                            label: "View",
                            handler: this.viewStudent,
                            class: "btn-primary"
                        },
                        {
                            label: "blacklist",
                            handler: this.blacklistStudent,
                            class: "btn-dark"
                        },
                        {
                            label: "deactivate",
                            handler: this.deactivateStudent,
                            class: "btn-danger"
                        }
                    ]
                }

            }

        }

    },

    async mounted() {

        console.log(this.routeData)

        await this.searchQuery()

    },

    methods: {

        async searchQuery() {

            this.loading = true

            const query = this.routeData.search

            try {

                console.log("search " + query)

                const response = await fetch(
                    `/api/admin/search/${query}`
                )

                const result = await response.json()

                if (!result.success) {

                    this.error = result.message
                    return

                }

                this.entities = result.data

            }

            catch(err) {

                this.error = err.message

            }

            finally {

                this.loading = false

            }

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

        viewStudent(id) {
            this.navigate("admin_entity", {id: id, entity: 'students'})
        },

        viewApplication(id) {
            this.navigate("admin_entity", {id: id, entity: 'applications'})
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

        // company actions
        async approveCompany(id) {
            this.action_entity('companies', 'approve', id)
        },

        async  rejectCompany(id) {
            this.action_entity('companies', 'reject', id)
        },

        async blacklistCompany(id) {
            this.action_entity('companies', 'blacklist', id)
        },

        // drive actions
        async approveDrive(id) {
            this.action_entity('drives', 'approve', id)
        },

        async rejectDrive(id) {
            this.action_entity('drives', 'reject', id)
        },

        // student actions
        async blacklistStudent(id) {
            this.action_entity('students', 'blacklist', id)
        },

        async deactivateStudent(id) {
            this.action_entity('students', 'deactivate', id)
        },

        // helper functions
        getActions(status, entity) {

        return (
            this.actionMap[
                entity
            ]?.[
                status
            ] || []
        )

    }
    },

    template: `

    <div>

        <!-- NAVBAR -->

        <nav
            class="navbar navbar-expand-lg navbar-dark bg-dark">

            <div class="container-fluid">

                <ul
                    class="navbar-nav me-auto">

                    <li class="nav-item">

                        <a
                            class="nav-link"
                            @click="viewDashboard">

                            Dashboard

                        </a>

                    </li>

                    <li class="nav-item">

                        <a
                            class="nav-link"
                            :class="{
                                active:
                                entity==='companies'
                            }"
                            @click="viewCompanies">

                            Companies

                        </a>

                    </li>

                    <li class="nav-item">

                        <a
                            class="nav-link"
                            :class="{
                                active:
                                entity==='drives'
                            }"
                            @click="viewDrives">

                            Drives

                        </a>

                    </li>

                    <li class="nav-item">

                        <a
                            class="nav-link"
                            :class="{
                                active:
                                entity==='students'
                            }"
                            @click="viewStudents">

                            Students

                        </a>

                    </li>

                    <li class="nav-item">

                        <a
                            class="nav-link"
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

                        A

                    </button>

                    <ul class="dropdown-menu dropdown-menu-end">
                    
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

                Search Results

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
                v-for="(rows, entityName) in entities"
                :key="entityName"
                class="card mb-4">

                <div class="card-header">

                    {{ entityName }}

                </div>

                <div class="card-body">

                    <table class="table">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Status</th>

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

                                    {{ row.name || row.drive_name || row.company_name }}

                                </td>

                                <td> 
                                    {{ row.status }}
                                </td>

                                <td>

                                    <button

                                        v-for="
                                            action
                                            in getActions(row.status, entityName)
                                        "

                                        :key="action.label"

                                        :class="'btn btn-sm me-2 ' + action.class"

                                        @click="
                                            action.handler(row.id)
                                        ">

                                        {{ action.label }}

                                    </button>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>
        </div>

    </div>

    `
}