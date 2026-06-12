export default {

    props: [
        "navigate",
        "routeData"
    ],

    data() {

        return {

            entity: null,

            id: null,

            entityData: null,

            loading: true

        }

    },

    computed: {

        actionMap() {

            return {

                companies: {

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

                students: {
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

        this.entity = this.routeData.entity

        this.id = this.routeData.id

        await this.loadEntity()

        console.log('mounted')

    },

    methods: {

        async loadEntity() {

            this.loading = true

            try {

                const response = await fetch(
                    `/api/admin/${this.entity}/${this.id}`
                )

                const result = await response.json()

                if (!result.success) {

                    this.error = result.message
                    return

                }

                const key = Object.keys(result.data)[0]

                this.entityData = result.data[key][0]

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
        getActions(status) {

        return (
            this.actionMap[
                this.entity
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

            </div>

        </nav>


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


            <div
                v-if="entityData"
                class="card">

                <div class="card-header">

                    <h4 class="mb-0">

                        {{ entity }}

                    </h4>

                </div>

                <div class="card-body">

                    <!-- ALL FIELDS -->

                    <div
                        v-for="(value, key) in entityData"
                        :key="key"
                        class="row mb-3">

                        <div class="col-3">

                            <strong>

                                {{ key }}

                            </strong>

                        </div>

                        <div class="col-9">

                            {{ value }}

                        </div>

                    </div>


                    <hr>


                    <!-- ACTION BUTTONS -->

                    <div class="d-flex flex-wrap gap-2">

                        <button

                            v-for="
                                action
                                in getActions(
                                    entityData.status
                                )
                            "

                            :key="action.label"

                            :class="'btn btn-sm me-2 ' + action.class"

                            @click="
                                action.handler(entityData.id)
                            ">

                            {{ action.label }}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>

    `
}