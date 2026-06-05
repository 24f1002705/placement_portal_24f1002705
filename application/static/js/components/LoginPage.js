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

    <div class="container mt-5">

        <h1>Login</h1>

        <input
            v-model="email"
            class="form-control mb-3"
            placeholder="Email"
        >

        <input
            v-model="password"
            type="password"
            class="form-control mb-3"
            placeholder="Password"
        >

        <button
            @click="login"
            class="btn btn-primary"
        >
            Login
        </button>

        <p class="text-danger mt-3">

            {{ error }}

        </p>

    </div>

    `
}