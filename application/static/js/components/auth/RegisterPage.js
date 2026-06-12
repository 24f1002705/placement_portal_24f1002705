export default {

    props: [
        "navigate"
    ],

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

            for(let year = 2010; year <= 2030; year++) {

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
                this.student.degree
            ] || []

        }

    },

    data() {

        return {

            role: "student",

            email: "",
            username: "",
            password: "",

            student: {

                name: "",
                degree: "",
                department: "",
                year: "",
                graduation_batch: "",
                gpa: "",
                resume_link: ""

            },

            company: {

                company_name: "",
                logo: "",
                description: "",
                website: "",
                hr_contact_name: "",
                hr_contact_number: ""

            },

            error: ""

        }

    },

    methods: {

        async register() {

            const payload = {

                role: this.role,

                email: this.email,

                username: this.username,

                password: this.password

            }

            if (this.role === "student") {

                payload.student = this.student

            }

            else {

                payload.company = this.company

            }

            const response = await fetch(
                "/api/auth/register",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(payload)

                }
            )

            const result =
                await response.json()

            if (result.success) {

                alert(
                    "Registration successful"
                )

                this.navigate("login")

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
            class="card p-4 shadow">

            <h2
                class="mb-4">

                Register

            </h2>

            <div
                class="mb-3">

                <label
                    class="form-label">

                    Account Type

                </label>

                <select
                    v-model="role"
                    class="form-select">

                    <option value="student">

                        Student

                    </option>

                    <option value="company">

                        Company

                    </option>

                </select>

            </div>

            <hr>

            <div
                class="mb-3">

                <label
                    class="form-label">

                    Email

                </label>

                <input
                    v-model="email"
                    class="form-control">

            </div>

            <div
                class="mb-3">

                <label
                    class="form-label">

                    Username

                </label>

                <input
                    v-model="username"
                    class="form-control">

            </div>

            <div
                class="mb-3">

                <label
                    class="form-label">

                    Password

                </label>

                <input
                    v-model="password"
                    type="password"
                    class="form-control">

            </div>

            <!-- STUDENT FORM -->

            <div
                v-if="role === 'student'">

                <h4
                    class="mt-4">

                    Student Details

                </h4>

                <input
                    v-model="student.name"
                    class="form-control mb-2"
                    placeholder="Name">

                <select
                    v-model="student.degree"
                    @change="student.year=''"
                    class="form-select mb-2">

                    <option disabled value="">
                        Select Degree
                    </option>

                    <option>BSc</option>

                    <option>BSc(H)</option>

                    <option>MSc</option>

                    <option>B.Tech/BE</option>

                    <option>M.Tech/ME</option>

                    <option>PhD</option>

                </select>

                <select
                    v-model="student.department"
                    class="form-select mb-2">

                    <option disabled value="">
                        Select Department
                    </option>

                    <option
                        v-for="department in departments"
                        :key="department">

                        {{ department }}

                    </option>

                </select>

                <select
                    v-model="student.year"
                    class="form-select mb-2">

                    <option disabled value="">
                        Select Year
                    </option>

                    <option
                        v-for="year in availableYears"
                        :key="year"
                        :value="year">

                        {{ year }}

                    </option>

                </select>

                <select
                    v-model="student.graduation_batch"
                    class="form-select mb-2">

                    <option disabled value="">
                        Select Graduation Batch
                    </option>

                    <option
                        v-for="year in graduationYears"
                        :key="year"
                        :value="year">

                        {{ year }}

                    </option>

                </select>

                <input
                    v-model="student.gpa"
                    class="form-control mb-2"
                    placeholder="GPA">

                <input
                    v-model="student.resume_link"
                    class="form-control mb-2"
                    placeholder="Resume Link">

            </div>

            <!-- COMPANY FORM -->

            <div
                v-if="role === 'company'">

                <h4
                    class="mt-4">

                    Company Details

                </h4>

                <input
                    v-model="company.company_name"
                    class="form-control mb-2"
                    placeholder="Company Name">

                <input
                    v-model="company.logo"
                    class="form-control mb-2"
                    placeholder="Logo URL">

                <textarea
                    v-model="company.description"
                    class="form-control mb-2"
                    placeholder="Description">
                </textarea>

                <input
                    v-model="company.website"
                    class="form-control mb-2"
                    placeholder="Website">

                <input
                    v-model="company.hr_contact_name"
                    class="form-control mb-2"
                    placeholder="HR Contact Name">

                <input
                    v-model="company.hr_contact_number"
                    class="form-control mb-2"
                    placeholder="HR Contact Number">

            </div>

            <div
                class="mt-3">

                <button
                    type="button"
                    @click="register"
                    class="btn btn-primary">

                    Register

                </button>

            </div>

            <p
                class="text-danger mt-3">

                {{ error }}

            </p>

        </div>

    </div>

    `
}