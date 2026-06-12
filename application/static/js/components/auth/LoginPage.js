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

            email: "",

            password: "",

            error: ""

        }
    },


    // --------------------------------------------------
    // COMPONENT METHODS
    // --------------------------------------------------

    methods: {

        async login() {

            // Send login request to Flask.

            const response = await fetch("/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: this.email,

                    password: this.password

                })

            })


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

                this.error = data.message

            }

        }

    },


    // --------------------------------------------------
    // COMPONENT HTML TEMPLATE
    // --------------------------------------------------

    template: `

    <body class="d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-lg" style="width: 450px;">
            <div class="p-4">
                <h1 class="text-center">Welcome to Placement Portal</h1>
            </div>
            <h3 class="text-center">Please Login</h3>
            <form>
                <div class="mb-3">
                    <label for="username" class="form-label">Username (E-mail)</label>
                    <input
                        v-model="email"
                        class="form-control mb-3"
                        placeholder="Email"
                    >
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input
                        v-model="password"
                        type="password"
                        class="form-control mb-3"
                        placeholder="Password"
                    >
                </div>

                <div class="d-grid">
                    <button
                        type="button"
                        @click="login"
                        class="btn btn-primary"
                    >
                        Login
                    </button>
                    <p class="text-danger mt-3">
                        {{ error }}
                    </p>
                </div>
                <div class="text-center mt-3">

                    <span>
                        Don't have an account?
                    </span>

                    <a
                        href="#"
                        @click.prevent="navigate('register')">

                        Register here

                    </a>

                </div>
            </form>
        </div>
    </body>
    `
}