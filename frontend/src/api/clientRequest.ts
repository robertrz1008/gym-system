import { Client, ClientsParam } from "../interfaces/autInterface";
import axios from "./axios"

export const getClientsRequest = () => axios.get("/getClients")
export const getMembersRequest = () => axios.get("/getMembers")
export const getMembersByFilterRequest = (filter: string) => axios.get(`/getMembers/${filter}`)
export const getClientsByFilterRequest = (filter: string) => axios.get(`/getClients/${filter}`)
export const getClientsListedRequest = (clientParam: ClientsParam) => axios.post(`/getClientsListed`, clientParam)
export const createClientsRequest = (client: Client) => axios.post("/createClient", client)
export const deleteClientsRequest = (id: number) => axios.delete(`/deleteClient/${id}`)
export const updateClientsRequest = (client: Client) => axios.put(`/updateClient`, client)
export const createImagesRequest = (img: FormData) => axios.post("/createImage", img)
export const getImageByIdRequest = (id: number) => axios.get(`/getImage/${id}`)

type IdUser = { id: number}
export const changeImagesRequest = (id: number, idUser: IdUser) => axios.put(`/changeImage/${id}`, idUser)

export const deleteImageRequest = (id: number) => axios.delete(`/deleteImage/${id}`)