<template>
    <div class="page-content">
        <div class="page-info">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <router-link to="/">Dashboard</router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Course Manager</li>
                </ol>
            </nav>
        </div>
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">All Courses:</h5>
                    <button class="btn btn-primary" data-toggle="modal"
                            data-target="#AddCourseModal">Add New Course
                    </button>
                    <div class="modal fade" id="AddCourseModal" tabindex="-1" role="dialog"
                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Add New Course</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <i class="material-icons">close</i>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label>Course Title</label>
                                            <input v-model="new_course.title" type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-12">
                                            <label>Department</label>
                                            <select v-model="new_course.department" class="form-control custom-select">
                                                <option :value="department.id + '.' + department.abbreviation"
                                                        v-for="department in departments">
                                                    {{ department.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Abbreviation</label>
                                            <input v-model="newAbbreviation" type="email" class="form-control" readonly>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Course Number</label>
                                            <input v-model="new_course.number" type="number" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-12">
                                            <label>Capacity</label>
                                            <input v-model="new_course.capacity" type="number" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button id="mod_close" type="button" class="btn btn-secondary"
                                            data-dismiss="modal">
                                        Close
                                    </button>
                                    <button @click="add_course" type="button" class="btn btn-primary">Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 p-0 my-4">
                        <input v-model="search" class="form-control" type="text" placeholder="Search course">
                    </div>
                    <div class="modal fade" id="EditModal" tabindex="-1" role="dialog"
                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Edit Course</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <i class="material-icons">close</i>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-row">
                                        <div class="form-group col-md-12">
                                            <label>Course Title</label>
                                            <input v-model="edit_course.title" type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-12">
                                            <label>Department</label>
                                            <select v-model="edit_course.department" class="form-control custom-select">
                                                <option :value="department.id + '.' + department.abbreviation"
                                                        v-for="department in departments">
                                                    {{ department.name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Abbreviation</label>
                                            <input v-model="editAbbreviation" class="form-control" readonly>
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label>Course Number</label>
                                            <input v-model="edit_course.number" type="number" class="form-control">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-12">
                                            <label>Capacity</label>
                                            <input v-model="edit_course.capacity" type="number" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button id="edit_close" type="button" class="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                    <button type="button" @click="editCourse()" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="DeleteModal" tabindex="-1" role="dialog"
                         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Delete Confirmation</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <i class="material-icons">close</i>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p>You want to delete {{ this.delete_course.title }} course?</p>
                                </div>
                                <div class="modal-footer">
                                    <button id="delete_close" type="button" class="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                    <button type="button" @click="deleteCourse()" class="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">Course Title</th>
                            <th scope="col">Abbreviation</th>
                            <th scope="col">Department</th>
                            <th scope="col">Capacity</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(course, i) in filteredCourses" :key="i">
                            <th scope="row">{{ course.title }}</th>
                            <td>{{ course.abbreviation }}</td>
                            <td>{{ course.department.name }}</td>
                            <td>{{ course.capacity }}</td>
                            <td>
                                <button data-toggle="modal" @click="editHelper(course.id, course.title, course.abbreviation, course.department.id + '.' + course.department.abbreviation, course.capacity, i)"
                                        data-target="#EditModal" class="btn btn-warning btn-sm">Edit
                                </button>
                                <button class="btn btn-danger btn-sm" data-toggle="modal"
                                        data-target="#DeleteModal" @click="deleteHelper(course.id, course.title, i)">Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user'],
    data() {
        return {
            courses: null,
            errors: [],
            search: '',
            departments: '',
            new_course: {
                title: '',
                department: '',
                capacity: '',
                number: ''
            },
            edit_course: {
                id: '',
                title: '',
                department: '',
                capacity: '',
                number: ''
            },
            delete_course: {
                id: '',
                title: ''
            },
            block_index: -1
        }
    },
    mounted() {
        this.renderPage();
    },
    methods: {
        renderPage() {
            axios.get('/api/all-courses')
                .then(response => {
                    this.courses = response.data;
                }).catch(e => {
                this.errors.push(e);
            });
            axios.get('/api/all-departments/')
                .then(response => {
                    this.departments = response.data;
                }).catch(e => {
                this.errors.push(e)
            });
        },
        add_course() {
            axios.post('/api/add-course/', {
                title: this.new_course.title,
                abbreviation: this.newAbbreviation + this.new_course.number,
                department: this.new_course.department.split(".")[0],
                capacity: this.new_course.capacity
            })
                .then(response => {
                    console.log(response.data);
                    this.courses.push(response.data);
                    $("#mod_close").click();
                    this.$toast.open({
                        message: 'New course was added',
                        type: 'success',
                        position: 'top-right'
                    });
                })
                .catch(e => {
                    this.errors.push(e);
                    this.$toast.open({
                        message: 'Can not add this course',
                        type: 'error',
                        position: 'top-right'
                    });
                });
        },
        editHelper(id, title, abbreviation, department, capacity, index) {
            this.edit_course.title = title;
            this.edit_course.id = id;
            this.edit_course.department = department;
            this.edit_course.capacity = capacity;
            this.edit_course.number = abbreviation.replace(/\D/g, "");
            this.block_index = index;
        },
        deleteHelper(id, title, index) {
            this.delete_course.title = title;
            this.delete_course.id = id;
            this.block_index = index;
        },
        editCourse() {
            axios.post('/api/edit-course', {
                title: this.edit_course.title,
                course_id: this.edit_course.id,
                abbreviation: this.editAbbreviation + this.edit_course.number,
                department: this.edit_course.department.split(".")[0],
                capacity: this.edit_course.capacity
            })
                .then(response => {
                    this.renderPage();
                    $("#edit_close").click();
                    this.$toast.open({
                        message: response.data.title + ' course was edited',
                        type: 'success',
                        position: 'top-right'
                    });
                })
                .catch(e => {
                    this.$toast.open({
                        message: 'Can not edit this course',
                        type: 'error',
                        position: 'top-right'
                    });
                });

        },
        deleteCourse() {
            axios.post('/api/delete-course', {course_id: this.delete_course.id})
                .then(respwonse => {
                    this.renderPage();
                    $("#delete_close").click();
                    this.$toast.open({
                        message: this.delete_course.title + ' course was successfully deleted',
                        type: 'success',
                        position: 'top-right'
                    });

                })
                .catch(e => {
                    this.$toast.open({
                        message: 'Can not delete this course',
                        type: 'error',
                        position: 'top-right'
                    });
                });
        }
    },
    computed: {
        filteredCourses() {
            if (this.search) {
                return this.courses.filter(course => {
                    const res = course.title + course.abbreviation;
                    return res.toLowerCase().includes(this.search.toLowerCase());
                });
            } else {
                return this.courses;
            }
        },
        newAbbreviation() {
            return this.new_course.department.split(".")[1];
        },
        editAbbreviation() {
            return this.edit_course.department.split(".")[1];
        }
    }
}
</script>
