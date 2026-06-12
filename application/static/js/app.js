import { routes } from "./router.js"


const app = Vue.createApp({


    // --------------------------------------------------
    // GLOBAL FRONTEND STATE
    // --------------------------------------------------

    data() {

        return {

            currentRoute: "login",
            routeData: {} // passed to components when navigating.

        }

    },


    // --------------------------------------------------
    // GLOBAL METHODS
    // --------------------------------------------------

    methods: {

        // Change visible page/component.
        navigate(routeName, data = {}) {

            this.currentRoute = routeName
            this.routeData = data

        },

        manageProfile(role) {
            this.navigate('profile', {role: role})
        },

        changePassword() {
            this.navigate('change_password')
        },

        async logout() {
            const response = await fetch("/api/auth/logout")

            const result = await response.json()

            if (result.success) {
                this.navigate("login")
            } 
            else {
                alert("Logout failed. Please try again.")
            }
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
                this.navigate("admin_dashboard", data.data)
            }

            if (data.data.user_type === "student") {
                this.navigate("student_dashboard", data.data)
            }

            if (data.data.user_type === "company") {
                this.navigate("company_dashboard", data.data)
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
        :routeData="routeData"
        :key="JSON.stringify(routeData)"
        :manageProfile="manageProfile"
        :changePassword="changePassword"
        :logout="logout"
    />

    `
})


app.mount("#app")