"use client";
import { useState } from "react";
import { JSX } from "react/jsx-runtime";
import Link from "next/link";
import styles from "./page.module.css";
// ------------------ авторизация  -----------------------
import AuthCreateComponent from "../admin-component/auth-component/auth.create-component";
import AuthDeleteComponent from "../admin-component/auth-component/auth.delete-component";
import AuthGetComponent from "../admin-component/auth-component/auth.get-component";
import AuthUpdateComponent from "../admin-component/auth-component/auth.update-component";
//------------------ пользователи  -----------------------
import UserCreateComponent from "../admin-component/user-component/user.create-component";
import UserDeleteComponent from "../admin-component/user-component/user.delete-component";
import UserGetComponent from "../admin-component/user-component/user.get-component";
import UserUpdateComponent from "../admin-component/user-component/user.update-component";
//------------------ роли  -----------------------
import RolesCreateComponent from "../admin-component/roles-component/roles.create-component";
import RolesGetComponent from "../admin-component/roles-component/roles.get-component";
import RolesUpdateComponent from "../admin-component/roles-component/roles.update-component";
import RolesDeleteComponent from "../admin-component/roles-component/roles.delete-component";

const NavBar = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const components: { [key: string]: JSX.Element } = {
    // ------------------ авторизация  -----------------------
    "auth-create": <AuthCreateComponent />,
    "auth-delete": <AuthDeleteComponent />,
    "auth-get": <AuthGetComponent />,
    "auth-update": <AuthUpdateComponent />,
    //------------------ пользователи  -----------------------
    "user-create": <UserCreateComponent />,
    "user-delete": <UserDeleteComponent />,
    "user-get": <UserGetComponent />,
    "user-update": <UserUpdateComponent />,
    //------------------ роли  -----------------------
    "roles-create": <RolesCreateComponent />,
    "roles-get": <RolesGetComponent />,
    "roles-update": <RolesUpdateComponent />,
    "roles-delete": <RolesDeleteComponent />,
  };

  return (
    <div  className={styles.container} >
      <div className={styles.container_navBar}>

        <nav className={styles.container_teg_nav}>
          <ul className={styles.teg_nav_container_ul}>
                            <p>Boss</p>
            {/* ------------------ авторизация  ----------------------- */}
            <li className={styles.container_ul_teg_li}>
              <span className={styles.container_ul_teg_li_span}>
                авторизация
              </span>

              <ul
                className={`
              ${styles.navBar_container_methob}
               ${styles.navBar_container_methob_ZIndex_auth}
              `}
              >
                <li className={styles.container_methob_create}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("auth-create")}
                  >
                    создать
                  </button>
                </li>
                <li className={styles.container_methob_get}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("auth-get")}
                  >
                    найти
                  </button>
                </li>
                <li className={styles.container_methob_update}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("auth-update")}
                  >
                    обновить
                  </button>
                </li>
                <li className={styles.container_methob_delete}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("auth-delete")}
                  >
                    удалить
                  </button>
                </li>
              </ul>
            </li>
            {/* ------------------ пользователи  ----------------------- */}

            <li className={styles.container_ul_teg_li}>
              <span className={styles.container_ul_teg_li_span}>
                пользователи
              </span>
              <ul
                className={`${styles.navBar_container_methob}
               ${styles.navBar_container_methob_ZIndex_user}
              `}
              >
                <li className={styles.container_methob_create}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("user-create")}
                  >
                    создать
                  </button>
                </li>
                <li className={styles.container_methob_get}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("user-get")}
                  >
                    найти
                  </button>
                </li>
                <li className={styles.container_methob_update}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("user-update")}
                  >
                    обновить
                  </button>
                </li>
                <li className={styles.container_methob_delete}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("user-delete")}
                  >
                    удалить
                  </button>
                </li>
              </ul>
            </li>

            {/* ------------------ роли  ----------------------- */}

            <li className={styles.container_ul_teg_li}>
              <span className={styles.container_ul_teg_li_span}>роли</span>

              <ul
                className={`${styles.navBar_container_methob}
               ${styles.navBar_container_methob_ZIndex_role}`}
              >
                <li className={styles.container_methob_create}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("roles-create")}
                  >
                    создать
                  </button>
                </li>
                <li className={styles.container_methob_get}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("roles-get")}
                  >
                    найти
                  </button>
                </li>
                <li className={styles.container_methob_update}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("roles-update")}
                  >
                    обновить
                  </button>
                </li>
                <li className={styles.container_methob_delete}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("roles-delete")}
                  >
                    удалить
                  </button>
                </li>
              </ul>
            </li>

            {/* ------------------ сад  ----------------------- */}

            <li className={styles.container_ul_teg_li}>
              <span className={styles.container_ul_teg_li_span}>сад</span>

              <ul
                className={`${styles.navBar_container_methob} 
              ${styles.navBar_container_methob_ZIndex_garden}`}
              >
                <li className={styles.container_methob_create}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("roles-create")}
                  >
                    создать
                  </button>
                </li>
                <li className={styles.container_methob_get}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("roles-get")}
                  >
                    найти
                  </button>
                </li>
                <li className={styles.container_methob_update}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("roles-update")}
                  >
                    обновить
                  </button>
                </li>
                <li className={styles.container_methob_delete}>
                  <button
                    className={styles.container_methob_button}
                    onClick={() => setActiveSection("roles-delete")}
                  >
                    удалить
                  </button>
                </li>
              </ul>
            </li>

            {/* ------------------ сад  ----------------------- */}

            {/* ------------------ группа ----------------------- */}
          </ul>
        </nav>
       
      </div>

      <div className={styles.container_navBar_content}>
          {activeSection ? (
            components[activeSection]
          ) : (
            <p className={styles.container_navBar_content_p}>
              выберите действие из списка
            </p>
          )}
        </div>
    </div>
  );
};

export default NavBar;

// <div className="min-h-screen">
//         {/* NavBar */}
//         <nav className="bg-gray-800 text-white p-4">
//           <ul className="flex space-x-6">
//             <li className="relative group">
//               <span className="cursor-pointer">Авторизация</span>
//               <ul className="absolute hidden group-hover:block bg-gray-700 p-2 rounded shadow-lg">
//                 <li>
//                   <button onClick={() => setActiveSection('auth-create')} className="block p-2 hover:bg-gray-600">
//                     Create
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => setActiveSection('auth-delete')} className="block p-2 hover:bg-gray-600">
//                     Delete
//                   </button>
//                 </li>
//               </ul>
//             </li>
//             <li className="relative group">
//               <span className="cursor-pointer">Пользователь</span>
//               <ul className="absolute hidden group-hover:block bg-gray-700 p-2 rounded shadow-lg">
//                 <li>
//                   <button onClick={() => setActiveSection('user-create')} className="block p-2 hover:bg-gray-600">
//                     Create
//                   </button>
//                 </li>
//                 <li>
//                   <button onClick={() => setActiveSection('user-delete')} className="block p-2 hover:bg-gray-600">
//                     Delete
//                   </button>
//                 </li>
//               </ul>
//             </li>
//             {/* Добавьте остальные пункты: Роли, Товары */}
//           </ul>
//         </nav>

//         {/* Контент */}
//         <div className="p-6">
//           {activeSection ? (
//             components[activeSection] || <p>Компонент не найден</p>
//           ) : (
//             <p>Выберите действие в меню</p>
//           )}
//         </div>
//       </div>
