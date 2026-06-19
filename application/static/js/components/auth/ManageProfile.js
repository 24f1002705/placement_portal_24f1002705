export default {

    props: [
        "navigate",
        "user",
        "routeData"
    ],

    data() {

        return {

            role: "",

            profile: {},

            error: "",

            success: ""

        }

    },

    async mounted() {

        await this.loadProfile()

    },

    computed: {

        departments() {

            return [

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

            ]

        },

        graduationYears() {

            const years = []

            for(let year = 2010; year <= 2035; year++) {

                years.push(year)

            }

            return years

        },

        availableYears() {

            const yearMap = {

                "BSc": [1,2,3],
                "BSc(H)": [1,2,3,4],
                "B.Tech/BE": [1,2,3,4],
                "MSc": [1,2],
                "M.Tech/ME": [1,2],
                "PhD": [1,2,3,4,5,6]

            }

            return yearMap[
                this.profile.degree
            ] || []

        }

    },

    methods: {

        async loadProfile() {

            this.role = this.routeData.role

            const endpoint = this.routeData.role === "student"
                ? "/api/student/"
                : "/api/company/"

            const response =
                await fetch(endpoint)

            const result =
                await response.json()

            if(result.success) {

                this.role =
                    this.routeData.role

                this.profile =
                    result.data

            }

        },

        async updateProfile() {

            const endpoint = this.role === "student"
                ? "/api/student/"
                : "/api/company/"

            const response = await fetch(

                endpoint,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify(
                        this.profile
                    )

                }

            )

            const result =
                await response.json()

            if(result.success) {

                this.success =
                    "Profile updated successfully"

                alert(
                    "Profile updated successfully"
                )

                if (this.role === 'student') {
                    this.navigate('student_dashboard')
                }

                else if (this.role === 'company') {
                    this.navigate('compay_dashboard')
                }

            }

            else {

                this.error =
                    result.message

            }

        }

    },

    template: `

    <div
        class="container mt-5">

        <div
            class="card shadow p-4">

            <h2>

                Manage Profile

            </h2>

            <hr>

            <!-- STUDENT PROFILE -->

            <div
                v-if="role === 'student'">

                <input
                    v-model="profile.name"
                    class="form-control mb-2"
                    placeholder="Name">

                <select
                    v-model="profile.degree"
                    class="form-select mb-2">

                    <option>BSc</option>
                    <option>BSc(H)</option>
                    <option>B.Tech/BE</option>
                    <option>MSc</option>
                    <option>M.Tech/ME</option>
                    <option>PhD</option>

                </select>

                <select
                    v-model="profile.department"
                    class="form-select mb-2">

                    <option
                        v-for="department in departments">

                        {{ department }}

                    </option>

                </select>

                <select
                    v-model="profile.year"
                    class="form-select mb-2">

                    <option
                        v-for="year in availableYears">

                        {{ year }}

                    </option>

                </select>

                <select
                    v-model="profile.graduation_batch"
                    class="form-select mb-2">

                    <option
                        v-for="year in graduationYears">

                        {{ year }}

                    </option>

                </select>

                <input
                    v-model="profile.gpa"
                    class="form-control mb-2"
                    placeholder="GPA">

                <input
                    v-model="profile.resume_link"
                    class="form-control mb-2"
                    placeholder="Resume Link">

            </div>

            <!-- COMPANY PROFILE -->

            <div
                v-if="role === 'company'">

                <input
                    v-model="profile.company_name"
                    class="form-control mb-2"
                    placeholder="Company Name">

                <input
                    v-model="profile.logo"
                    class="form-control mb-2"
                    placeholder="Logo URL">

                <textarea
                    v-model="profile.description"
                    class="form-control mb-2">
                </textarea>

                <input
                    v-model="profile.website"
                    class="form-control mb-2"
                    placeholder="Website">

                <input
                    v-model="profile.hr_contact_name"
                    class="form-control mb-2"
                    placeholder="HR Contact Name">

                <input
                    v-model="profile.hr_contact_number"
                    class="form-control mb-2"
                    placeholder="HR Contact Number">

            </div>

            <!-- TODO:
                 Add email field if editable
                 Add username field if editable
                 Add profile image if needed
            -->

            <button

                class="btn btn-primary mt-3"

                @click="updateProfile">

                Update Profile

            </button>

            <p
                class="text-success mt-2">

                {{ success }}

            </p>

            <p
                class="text-danger mt-2">

                {{ error }}

            </p>

        </div>

    </div>

    `
}