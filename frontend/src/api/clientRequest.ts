import { Client } from "../interfaces/autInterface";
import axios from "./axios"

export const getClientsRequest = () => axios.get("/getClients")
export const getClientsByFilterRequest = (filter: string) => axios.get(`/getClients/${filter}`)
export const createClientsRequest = (client: Client) => axios.post("/createClient", client)
export const deleteClientsRequest = (id: number) => axios.delete(`/deleteClient/${id}`)
export const updateClientsRequest = (client: Client) => axios.put(`/updateClient`, client)
export const createImagesRequest = (img: FormData) => axios.post("/createImage", img)
export const getImageByIdRequest = (id: number) => axios.get(`/getImage/${id}`)

type IdUser = { id: number}
export const changeImagesRequest = (id: number, idUser: IdUser) => axios.put(`/changeImage/${id}`, idUser)

export const deleteImageRequest = (id: number) => axios.delete(`/deleteImage/${id}`)