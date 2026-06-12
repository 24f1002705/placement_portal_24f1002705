export default {

    data() {

        return {

            username: "",

            role: "",

            applications: 0

        }

    },


    // --------------------------------------------------
    // LIFECYCLE METHOD
    // --------------------------------------------------

    // mounted() automatically runs
    // when component appears on screen.

    async mounted() {

        const response = await fetch("/api/company/dashboard")

        const data = await response.json()


        // Unauthorized user.
        if (!data.success) {

            return

        }


        // Update frontend state.
        this.username = data.username

        this.role = data.role

        this.applications = data.applications

    },


    template: `

    <div class="container mt-5">

        <h1>Dashboard</h1>

        <p>
            Username: {{ username }}
        </p>

        <p>
            Role: {{ role }}
        </p>

        <p>
            Applications: {{ applications }}
        </p>

    </div>

    `
}