export default {

    props: [
        "navigate",
        "routeData"
    ],

    data() {

        return {

            mode: "create",

            driveId: null,

            loading: false,

            error: "",

            drive: {

                id: null,

                drive_name: "",

                company_id: null,

                company_name: "",

                description: "",

                salary: "",

                location: "",

                application_deadline: "",

                no_of_openings: "",

                eligibility_branches: [],

                eligibility_degree: [],

                eligibility_batch: "",

                status: ""

            },

            branches: [ 
                "Computer Science and Engineering",
                "Electrical Engineering",
                "Electronics and Communication Engineering",
                "Mechanical Engineering",
                "Civil Engineering",
                "Chemical Engineering",
                "Aerospace Engineering",
                "Industrial Engineering",
                "Engineering Physics",
                "Materials Engineering",
                "Biotechnology",
                "Physics",
                "Chemistry",
                "Mathematics",
                "Statistics",
                "Data Science",
                "Economics",
                "Management Studies",
                "English",
                "History",
                "Philosophy",
                "Psychology",
                "Political Science",
                "Sociology"
            ],

            degrees: [

                "BSc",

                "BSc(H)",

                "B.Tech",

                "MSc",

                "M.Tech",

                "PhD"

            ]

        }

    },

    computed: {

        batchYears() {

            let years = []

            for (let i = 2025; i <= 2035; i++) {

                years.push(i)

            }

            return years

        }

    },

    async mounted() {

        this.mode =
            this.routeData?.mode || "create"

        if (this.mode === "edit") {

            this.driveId =
                this.routeData.id

            await this.loadDrive()

        }

    },

    methods: {

        async loadDrive() {

            this.loading = true

            try {

                const response =
                    await fetch(
                        `/api/company/drives/${this.driveId}`
                    )

                const result =
                    await response.json()

                if (!result.success) {

                    this.error =
                        result.message

                    return

                }

                const drive =
                    result.data.drive

                this.drive = {

                    ...drive,

                    eligibility_branches:
                        drive.eligibility_branches
                            ? drive.eligibility_branches.split(",")
                            : [],

                    eligibility_degree:
                        drive.eligibility_degree
                            ? drive.eligibility_degree.split(",")
                            : []

                }

            }

            catch(err) {

                this.error =
                    err.message

            }

            finally {

                this.loading = false

            }

        },

        async submitDrive() {

            const payload = {

                ...this.drive,

                eligibility_branches:
                    this.drive.eligibility_branches.join(","),

                eligibility_degree:
                    this.drive.eligibility_degree.join(",")

            }

            let endpoint = ""

            if (this.mode === "create") {

                endpoint =
                    "/api/company/drives/create"

            }

            else {

                endpoint =
                    `/api/company/drives/edit/${this.driveId}`

            }

            const response =
                await fetch(
                    endpoint,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(payload)
                    }
                )

            const result =
                await response.json()

            if (result.success) {

                alert(
                    this.mode === "create"
                        ? "Drive created successfully"
                        : "Drive updated successfully"
                )

                this.navigate(
                    "company_dashboard"
                )

            }

            else {

                this.error =
                    result.message

            }

        },

        viewDashboard() {

            this.navigate(
                "company_dashboard"
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

        <!-- FORM -->

        <div class="container mt-4">

            <div class="card">

                <div class="card-header">

                    <h4>

                        {{ mode === "create"
                            ? "Create Drive"
                            : "Edit Drive" }}

                    </h4>

                </div>

                <div class="card-body">

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

                    <div class="mb-3">

                        <label class="form-label">

                            Drive Name

                        </label>

                        <input
                            v-model="drive.drive_name"
                            class="form-control">

                    </div>

                    <div class="mb-3">

                        <label class="form-label">

                            Description

                        </label>

                        <textarea
                            v-model="drive.description"
                            rows="4"
                            class="form-control">
                        </textarea>

                    </div>

                    <div class="mb-3">

                        <label class="form-label">

                            Salary

                        </label>

                        <input
                            v-model="drive.salary"
                            type="number"
                            class="form-control">

                    </div>

                    <div class="mb-3">

                        <label class="form-label">

                            Location

                        </label>

                        <input
                            v-model="drive.location"
                            class="form-control">

                    </div>

                    <div class="mb-3">

                        <label class="form-label">

                            Application Deadline

                        </label>

                        <input
                            v-model="drive.application_deadline"
                            type="date"
                            class="form-control">

                    </div>

                    <div class="mb-3">

                        <label class="form-label">

                            Number Of Openings

                        </label>

                        <input
                            v-model="drive.no_of_openings"
                            type="number"
                            class="form-control">

                    </div>

                    <div class="mb-3">

                        <label class="form-label">

                            Eligible Degrees

                        </label>

                        <div
                            v-for="degree in degrees"
                            :key="degree"
                            class="form-check">

                            <input
                                type="checkbox"
                                class="form-check-input"
                                :value="degree"
                                v-model="drive.eligibility_degree">

                            <label
                                class="form-check-label">

                                {{ degree }}

                            </label>

                        </div>

                    </div>

                    <div class="mb-3">

                        <label class="form-label">

                            Graduation Batch

                        </label>

                        <select
                            v-model="drive.eligibility_batch"
                            class="form-select">

                            <option
                                v-for="year in batchYears"
                                :key="year"
                                :value="year">

                                {{ year }}

                            </option>

                        </select>

                    </div>

                    <div class="mb-3">

                        <label class="form-label">

                            Eligible Branches

                        </label>

                        <div
                            v-for="branch in branches"
                            :key="branch"
                            class="form-check">

                            <input
                                type="checkbox"
                                class="form-check-input"
                                :value="branch"
                                v-model="drive.eligibility_branches">

                            <label
                                class="form-check-label">

                                {{ branch }}

                            </label>

                        </div>

                    </div>

                    <button
                        class="btn btn-success"
                        @click="submitDrive">

                        {{ mode === "create"
                            ? "Create Drive"
                            : "Update Drive" }}

                    </button>

                </div>

            </div>

        </div>

    </div>

    `
}