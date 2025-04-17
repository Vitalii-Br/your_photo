"use server"
import { instance } from "@/app/axios.interceptor";
import { errorMessage } from "@/app/axios.inperceptor_helper";
import { DataRoleI } from "@/type/type-role/interface-role";

export  async function getAllRole ():Promise<DataRoleI> {
    try {
            const roles = await instance({
            url:'/API-photo/role/allRoles',
            method:'GET'
        })

 if(!roles) throw new Error('Данные о ролях с бэкэнда не пришли ')

 return {data: roles.data}  
} catch (error:any) {
    const roleError =  errorMessage(error)
    // console.log('Role-Error =', roleError)
    // console.log('Role-Error-Status =', error?.status)
  return { 
   errors: {
   message: roleError || "Авторизуйтесь",
   status: error?.status
    }
  }  
}
}