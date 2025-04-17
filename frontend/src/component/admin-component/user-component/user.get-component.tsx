"use client";
import { useState, useEffect, Fragment } from "react";
import { fetchUsers } from "@/server/admin/user-server/get.user-server";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { IDataUser } from "@/type/type-user/interfase.data-user";

const UserGetComponent = () => {
  const [allUser, setAllUser] = useState<IDataUser[] | null>(null);
  const [error, setError] = useState<string>();
  const router = useRouter();

  try {
    useEffect(() => {
      async function users() {
        const users = await fetchUsers();
        console.log("USERS =", users);
        try {
          if (users.data) setAllUser(users.data);
          if (users.errors) {
            if (users.errors.status === 401) {
              setError(users.errors.message);
              setTimeout(() => {
                router.push("/");
              }, 5000);
              throw new Error(
                `${users.errors.message} , status:${users.errors.status}`
              );
            } else if (users.errors.status === 400) {
              setError(users.errors.message);
              throw new Error(
                `${users.errors.message} , status:${users.errors.status}`
              );
            } else if (users.errors.status === 404) {
              setError(users.errors.message);
              throw new Error(
                `${users.errors.message} , status:${users.errors.status}`
              );
            }
          }
        } catch (error: any) {
          console.error("Error:", error);
        }
      }
      users();
    }, []);
  } catch (error: any) {
    console.error("функция UserGetComponent данные с бэкэнда не получила");
    setError("данные  не пришли ");
  }

  return (
    <div className={styles.container_getUser}>
      <h4 className={styles.container_getUser_h4}>Список пользователей</h4>

      <div>
        {allUser ? (
          <div className={styles.grid_container}>
            <div className={styles.grid_header}>ID</div>
            <div className={styles.grid_header}>Имя</div>
            <div className={styles.grid_header}>Фамилия</div>
            <div className={styles.grid_header}>Email</div>
            <div className={styles.grid_header}>Роль</div>

            {allUser.map((user: IDataUser) => (
              <Fragment key={user.id}>
                <div className={styles.grid_item}>{user.id}</div>
                <div className={styles.grid_item}>{user.name}</div>
                <div className={styles.grid_item}>{user.surname}</div>
                <div className={styles.grid_item}>{user.email}</div>
                <div className={styles.grid_item}>
                  {user.role?.name || "N/A"}
                </div>
              </Fragment>
            ))}
          </div>
        ) : (
          <p className={styles.grid_container_error}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default UserGetComponent;

// import { fetchUsers } from "@/server/admin/user-server/get.user-server";
// export default async function UsersPage() {
//   const users = await fetchUsers();

//   console.log("UsersPage rendered at:", Date.now());
//   return (
//       <div>
//           <h1>Список пользователей</h1>
//           <table style={{border:"1px solid #0000"}}>
//               <thead>
//                   <tr>
//                       <th>ID</th>
//                       <th>Имя</th>
//                       <th>Фамилия</th>
//                       <th>Email</th>
//                       <th>Роль</th>
//                   </tr>
//               </thead>
//               <tbody>
//                   {users.map((user:any) => (
//                       <tr key={user.id}>
//                           <td>{user.id}</td>
//                           <td>{user.name}</td>
//                           <td>{user.surname}</td>
//                           <td>{user.email}</td>
//                           <td>{user.role?.name || "N/A"}</td>
//                       </tr>
//                   ))}
//               </tbody>
//           </table>
//       </div>
//   );
// }

// ==========================
