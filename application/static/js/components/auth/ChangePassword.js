export default {

    // Props are functions/data
    // passed from parent app.

    props: [

        "navigate"

    ],


    // --------------------------------------------------
    // FRONTEND STATE
    // --------------------------------------------------

    data() {

        return {

            old_password: "",

            new_password: "",

            error: ""

        }
    },


    // --------------------------------------------------
    // COMPONENT METHODS
    // --------------------------------------------------

    methods: {

        async changePassword() {

            // Send password change request to Flask.

            const response = await fetch("/api/auth/change-password", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    old_password: this.old_password,

                    new_password: this.new_password

                })

            })


            // Convert response JSON into JS object.
            const data = await response.json()


            // Login successful.
            if (data.success) {
                alert(data.message)

                // Change frontend route.
                // Vue rerenders dashboard.
                if (data.data.user_type === "admin") {
                    this.navigate("admin_dashboard")
                }

                if (data.data.user_type === "student") {
                    this.navigate("student_dashboard")
                }

                if (data.data.user_type === "company") {
                    this.navigate("company_dashboard")
                }

            }

            // Login failed.
            else {
                alert(data.message)
                this.error = data.message

            }

        },
        async goBack() {
            // Send password change request to Flask.

            const response = await fetch("/api/auth/auth-verify")


            // Convert response JSON into JS object.
            const data = await response.json()


            // Login successful.
            if (data.success) {

                // Change frontend route.
                // Vue rerenders dashboard.
                if (data.data.user_type === "admin") {
                    this.navigate("admin_dashboard")
                }

                if (data.data.user_type === "student") {
                    this.navigate("student_dashboard")
                }

                if (data.data.user_type === "company") {
                    this.navigate("company_dashboard")
                }

            }

            // Login failed.
            else {
                alert(data.message)
                this.error = data.message

            }
        }

    },


    // --------------------------------------------------
    // COMPONENT HTML TEMPLATE
    // --------------------------------------------------

    template: `

    <body class="d-flex justify-content-center align-items-center vh-100">
        <div class="position-relative">
            <button
                class="btn btn-outline-secondary position-absolute top-0 start-0"
                @click="goBack">
                ← Back
            </button>
        </div>
        <div class="card p-4 shadow-lg" style="width: 450px;">
            <div class="p-4">
                <h1 class="text-center">Welcome to Password Management</h1>
            </div>
            <h3 class="text-center">Change Password</h3>
            <form>
                <div class="mb-3">
                    <label for="old_password" class="form-label">Old Password</label>
                    <input
                        v-model="old_password"
                        type="password"
                        class="form-control mb-3"
                        placeholder="Old Password"
                    >
                </div>

                <div class="mb-3">
                    <label for="new_password" class="form-label">New Password</label>
                    <input
                        v-model="new_password"
                        type="password"
                        class="form-control mb-3"
                        placeholder="New Password"
                    >
                </div>

                <div class="d-grid gap-2">
                    <button
                        type="button"
                        @click="changePassword"
                        class="btn btn-primary"
                    >
                        Change Password
                    </button>
                    <button
                        type="button"
                        @click="goBack"
                        class="btn btn-outline-secondary"
                    >
                        ← Back
                    </button>
                    <p class="text-danger mt-3 text-center">
                        {{ error }}
                    </p>
                </div>
            </form>
        </div>
    </body>
    `
}