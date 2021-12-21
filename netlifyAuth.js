import netlifyIdentity from 'netlify-identity-widget'

const netlifyAuth = {
    isAuthenticated: false,
    user: null,
    initialize(callback) {
        window.netlifyIdentity = netlifyIdentity
        netlifyIdentity.on('init', (user) => {
            callback(user)
        })
        netlifyIdentity.init()
    },
    authenticate(callback) {
        console.log('authenticate 1')
        this.isAuthenticated = true
        console.log('authenticate 2')
        netlifyIdentity.open()
        console.log('authenticate 3')
        netlifyIdentity.on('login', (user) => {
            console.log('authenticate 4')
            this.user = user
            console.log('authenticate 5')
            callback(user)
            console.log('authenticate 6')
            netlifyIdentity.close()
            console.log('authenticate 7')
        })
        console.log('authenticate 8')
    },
    signout(callback) {
        this.isAuthenticated = false
        netlifyIdentity.logout()
        netlifyIdentity.on('logout', () => {
            this.user = null
            callback()
        })
    },
}

export default netlifyAuth
