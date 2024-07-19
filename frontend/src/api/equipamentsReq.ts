import { Equipment, Product } from "../interfaces/autInterface";
import axios from "./axios"

export const getEquipamentsRequest = () => axios.get("/getEquipaments")
export const getEquipamentsByFilterRequest = (filter: string) => axios.get(`/getEquipaments/${filter}`)
export const createEquipamentRequest = (pr: Equipment) => axios.post("/createEquipament", pr)
export const deleteEquipamentRequest = (id: number) => axios.delete(`/deleteEquipament/${id}`)
export const updateEquipamentRequest = (pr: Equipment) => axios.put(`/updateEquipament`, pr)
export const changeEquipamentImgRequest = (imgId: number, equiId: number) => axios.put(`/changeImgEquipament/${equiId}/${imgId}`)