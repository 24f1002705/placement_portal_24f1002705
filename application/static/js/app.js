import { routes } from "./router.js"


const app = Vue.createApp({


    // --------------------------------------------------
    // GLOBAL FRONTEND STATE
    // --------------------------------------------------

    data() {

        return {

            currentRoute: "login"

        }

    },


    // --------------------------------------------------
    // GLOBAL METHODS
    // --------------------------------------------------

    methods: {

        // Change visible page/component.
        navigate(routeName) {

            this.currentRoute = routeName

        }

    },


    // --------------------------------------------------
    // COMPUTED VALUES
    // --------------------------------------------------

    computed: {

        // Return component object
        // matching current route.

        currentComponent() {

            return routes[this.currentRoute]

        }

    },


    // --------------------------------------------------
    // INITIAL APP LOAD
    // --------------------------------------------------

    async mounted() {

        // Check if user already logged in.

        const response = await fetch("/api/auth/auth-verify")

        const data = await response.json()


        // Restore dashboard route
        // if session already exists.

        if (data.success) {
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

    },


    // --------------------------------------------------
    // MAIN APP TEMPLATE
    // --------------------------------------------------

    template: `

    <component
        :is="currentComponent"
        :navigate="navigate"
    />

    `
})


app.mount("#app")