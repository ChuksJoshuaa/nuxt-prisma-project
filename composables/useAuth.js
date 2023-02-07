export default () => {
    const useAuthToken = () => useState('auth_token')
    const useAuthUser = () => useState('auth_user')

    const setToken = (newToken) => {
        const useAuthToken = useAuthToken();

        useAuthToken.value = newToken
    }

    const setUser = (newUser) => {
        const useAuthUser = useAuthUser();

        useAuthUser.value = newUser
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

                console.log(data)
                setToken(data.access_token)
                setUser(data.user)

                resolve(true)
            }
            catch (error) {
                reject(error)
            }
        })
    }

    return {
        login,
        useAuthToken,
        useAuthUser
    }
}