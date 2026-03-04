export const getToken = () =>{
    if(typeof window !== 'undefined'){
        return sessionStorage.getItem('token')
    }
    return null
}