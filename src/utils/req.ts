// type ApiResponseType<T> = {
//     data: T
// }



export async function request<T>(url: string):Promise<T> {
    const response = await fetch(url)
    const data = await response.json()
    // console.log(data)
    return data
}