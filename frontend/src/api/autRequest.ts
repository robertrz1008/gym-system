import {User} from "../interfaces/autInterface"
import axios from "./axios"

export const registerRequest = (user: User) => axios.post("/register", user)
export const loginRequest = (user: User) => axios.post("/login", user)

export const vefifyTokenRequest = () => axios.get("/verify")

export const getProfileRequest = () => axios.get("/profile")

export const updateProfileRequest = (p: {name: string, email: string}) => axios.put("/updateProfile", p)

export const logoutRequest = () => axios.post("/logout")

export const getUsersRequest = () => axios.get("/users")

export const comparePasswordRequest = (password: string) => axios.get(`/conparePassword/${password}`)

export const changeProfileImgRequest = (imgId: number, proId: number) => axios.put(`/changeProfileImg/${proId}/${imgId}`)
