"use client";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";
import { dataFormAuth } from "@/server/action/server-auth.action";
import { useEffect, useState } from "react";

interface UserError {
  error?: string | undefined;
  user?: string[] | undefined;
  role?: string[] | undefined;
}

const Formlogin = () => {
  const [login, setlogin] = useState("login");
  const [user, setUser] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const dataUser: UserError = await dataFormAuth(data, login);
           const { error } = dataUser;
      if (error) {
        setUser(error[0]);
        reset()
      
      } else {
        setUser("регистрация прошла успешно");
        reset()
      }
    } catch (error) {
      console.error("В Formlogin(onSubmit) не передал данные", error);
    }
  };

  return (
    <div className={styles.form_container}>
      <h4 className={styles.form_context}>форма для логирования</h4>

      <div className={styles.form_container_fon}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form_login}>
          <input
            {...register("name", {
              required: "name не валидный",
            })}
            type="text"
            placeholder="name"
            className={styles.form_login_input}
          />

          <input
            {...register("surname", {
              required: "surname не валиден",
            })}
            type="text"
            placeholder="surname"
            className={styles.form_login_input}
          />

          <input
            {...register("email", {
              required: "email не валидный",
            })}
            type="email"
            placeholder="email"
            className={styles.form_login_input}
          />

          <input
            {...register("password", {
              required: "password не валидный",
            })}
            placeholder="password"
            type="password"
            className={styles.form_login_input}
          />
          <button type="submit" className={styles.form_login_button}>
            отправить
          </button>
          <p>{user}</p>
        </form>
      </div>
    </div>
  );
};

export default Formlogin;

/*
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function restoreToken() {
      try {
        const newToken = await refreshAccessToken();
        setAccessToken(newToken.accessToken);
      } catch (error) {
        console.error("В Formlogin(useEffect) не обновился accessToken",error)
        setError("необходимо залогинется");
      }
    }

    if (!accessToken) {
        restoreToken();
    };
  }, []);

 */

/*
import { SubmitHandler, useForm } from "react-hook-form";
import { FC, PropsWithChildren, useEffect } from "react";
import { FormLoginDto } from "@/type/type-form/type_login.form";
import axios from "axios";
import styles from "./page.module.css";
//import { getAccessToken } from "@/server/cookie/server-get.token";
import { dataFormLogin } from "@/server/action/server-login.action";

const Formlogin = () => {
  const {
    register: AuthRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {

      const result = await dataFormLogin(data)
      console.log("Login response =", result);
   

      reset();
    } catch (error) {
      console.error("Ошибка при логировании в форме", error);
    }
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
         {errors.name && <p>{errors.name.message}</p>} 

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

        <button type="submit" className={styles.form_login_button}>
          отправить
        </button>
      </form>
    </div>
  );
};

export default Formlogin;

*/

// ======================

/*
      const coookieData = await fetch("/API-photo/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!coookieData.ok) {
        throw new Error("данные при логировании из бэкэнда не пришли ");
      }

      const response = await coookieData.json();
      console.log("form login - response =", response);

      // const token = await getAccessToken();
      // console.log("Token 2 =", token);
    */
