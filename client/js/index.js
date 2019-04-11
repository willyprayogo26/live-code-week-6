const baseUrl = 'http://localhost:3000'

var app = new Vue({
    el: '#app',
    data: {
        isLogin: false,
        inputEmail: '',
        inputPassword: '',
        joke: {},
        favorites: []
    },
    created() {
        if (localStorage.getItem('access_token')) {
            this.isLogin = true
            this.getContent()
        } else {
            this.isLogin = false
            this.getLoginForm()
        }
    },
    methods: {
        getLoginForm() {
            this.isLogin = false
            localStorage.clear()
        },
        getContent() {
            this.isLogin = true
            this.getJoke()
            this.getFavorite()
        },
        toLogin() {
            let User = {
                email: this.inputEmail,
                password: this.inputPassword
            }
            
            axios
                .post(`${baseUrl}/login`, User)
                .then(({ data }) => {
                    localStorage.setItem('access_token', data.access_token)
                    localStorage.setItem('id', data.id)
                    localStorage.setItem('email', data.email)

                    this.inputEmail = ''
                    this.inputPassword = ''

                    this.getContent()
                })
                .catch(err => {
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        getJoke() {
            axios
                .get(`${baseUrl}/jokes`, { headers: { "access_token": localStorage.getItem('access_token') } })
                .then(({ data }) => {
                    this.joke = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getFavorite() {
            axios
                .get(`${baseUrl}/`, { headers: { "access_token": localStorage.getItem('access_token') } })
                .then(({ data }) => {
                    this.favorites = data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addJoke(string) {
            let data = {
                "joke": `${string}`,
                "userId": localStorage.getItem('id')
            }

            axios({
                method: 'POST',
                url: `${baseUrl}/favorites`,
                data,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(({ data }) => {
                    this.favorites.push(data)

                    Swal.fire({
                        type: 'success',
                        title: 'Successfully add favorite',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.getJoke()
                })
                .catch(err => {
                    Swal.fire({
                        title: err.response.data.message,
                        animation: false,
                        customClass: {
                            popup: 'animated swing'
                        }
                    })
                })
        },
        removeFavorite(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios({
                        method: 'DELETE',
                        url: `${baseUrl}/favorites/${id}`,
                        headers: {
                            access_token: localStorage.getItem('access_token')
                        }
                    })
                        .then(() => {
                            Swal.fire({
                                type: 'success',
                                title: 'Successfully delete favorite',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            
                            this.getFavorite()
                        })
                        .catch(err => {
                            Swal.fire({
                                title: err.response.data.message,
                                animation: false,
                                customClass: {
                                    popup: 'animated swing'
                                }
                            })
                        })
                }
            })
        }
    }
})