// type ApiResponseType<T> = {
//     data: T
// }

export async function request<T>(
    url:string,
    method: 'GET' | 'PUT' | 'PUTCH' | 'POST' | 'DELETE',
    body?: unknown):Promise<T> {
    const response = await fetch(url,{
        headers:{
            'Content-Type' : 'application/json'
        } ,
        method: method,
        body: body ? JSON.stringify(body) : undefined
    })
    const data = await response.json()
    // console.log(data)
    return data
}