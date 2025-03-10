"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { FC, PropsWithChildren } from "react";
import { FormLoginDto } from "@/type/type-form/type_login.form";
import axios from "axios";
import styles from "./page.module.css";


const Formlogin = () => {
  const {
    register: AuthRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = await axios.post("/api/authUser/login", data);
    return response
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form_login}>
        <input
          {...AuthRegister("name", {
            required: "name не валидный",
            // pattern:{
            // value:" Ok",
            //   message:''
            // }
          })}
          type="text"
          placeholder="name"
          className={styles.form_login_input}
          //onError = {errors.name?.message}
        />

        <input
          {...AuthRegister("email", {
            required: true,
          })}
          type="email"
          placeholder="email"
          //error={errors.email?.message}
          className={styles.form_login_input}
        />

        <input
          {...AuthRegister("password", {
            required: true,
          })}
          placeholder="password"
          type="password"
          className={styles.form_login_input}
          //error = {errors.password?.message}
        />

        <button 
        type="submit"
        className={styles.form_login_button}
        >отправить</button>
      </form>
    </div>
  );
};

export default Formlogin;
