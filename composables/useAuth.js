export default () => {
    const useAuthToken = () => useState('auth_token')
    const useAuthUser = () => useState('auth_user')

    const setToken = (newToken) => {
        const useAuthToken = useAuthToken();

        useAuthToken.value = newToken
    }

    const setUser = (newUser) => {
        const authUser = useAuthUser();

        authUser.value = newUser
    }
    

    const login =  ({ email, password }) => {
        return new Promise( async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: {
                        email,
                        password
                    }
                })

                setToken(data.access_token)
                setUser(data.user.name)
                resolve(true)
            }
            catch (error) {
                reject(error)
            }
        })
    }

    const refreshToken = () => {
        return new Promise( async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/refresh')
                setToken(data.access_token)
                resolve(true)
            }
            catch (error) {
                reject(error)
            }
        })
    }

    const initAuth = () => {
        return new Promise( async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/init')

                setToken(data.access_token)
                setUser(data.user.name)
                resolve(true)
            }
            catch (error) {
                reject(error)
            }
        })
    }

    return {
        login,
        // useAuthToken,
        useAuthUser
    }
}