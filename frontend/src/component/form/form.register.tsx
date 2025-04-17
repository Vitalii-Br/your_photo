"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { dataFormAuth } from "@/server/action/server-auth.action"; // Импортируем серверную функцию
import styles from "./page.module.css";


const FormRegister = () => {
  
  const [register, setRegister] = useState('register')
 const {
  register: registerForm,
  handleSubmit,
  formState,
  reset
          } = useForm()

   const onSubmit =  async (data:any) => {
    try {
     await  dataFormAuth(data,register)    
      reset()
    } catch (error) {
      
    }   
   }       


  return (
    <div  className={styles.form_container }  >
      <h4 className={styles.form_context }>форма для регистрации</h4>
      <div  className={styles.form_container_fon} >

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form_login}
      >
        <input
        {...registerForm("name",{
          required:'name  не валидный'
        })}
          type="text"
          placeholder="name"
          className={styles.form_login_input}
        />

        <input
        {...registerForm('surname',{
          required:'surname не валидный'
        })}
          type="text"
          placeholder="surname"
          className={styles.form_login_input}
        />

        <input
          {...registerForm('email',{
            required:'email не валидный'
          })}
          type="email"
          placeholder="email"
          className={styles.form_login_input}
        />

      

        <input
          {...registerForm('password',{
            required:'password не валидный'
          })}
          placeholder="password"
          type="password"
          className={styles.form_login_input}
        />
        <button type="submit" className={styles.form_login_button}>
          отправить
        </button>
      </form>

      </div>



    </div>
  );
};

export default FormRegister;
// name: dto.name,
// surname: dto.surname,
// email: dto.email,
// garden: dto.garden,
// group: dto.group,
// password: await hash(dto.password),
