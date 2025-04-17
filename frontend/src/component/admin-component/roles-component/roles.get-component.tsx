"use client";
import { useEffect, useState, Fragment } from "react";
import { getAllRole } from "@/server/admin/role-server/get.role-server";
import styles from "./page.module.css";
import {RoleI,PermissionsI} from "@/type/type-role/interface-role";
import { useRouter } from "next/navigation";

const RolesGetComponent = () => {
  const [allRoles, setAllRoles] = useState<RoleI[] | null>(null);
  const [roleError, setRoleError] = useState<string>();
  const router = useRouter()

  useEffect(() => {
    async function allRoless() {
      const response = await getAllRole()
      try {
        if (response.data) setAllRoles(response.data);

        if (response.errors) {
          if (response.errors.status === 401) {
            setRoleError(response.errors.message);
             setTimeout(()=>{ router.push('/')},5000)
             
            throw new Error(
              `${response.errors.message}, status:${response.errors.status}`
            );

          } else if(response.errors.status === 400){
            setRoleError(response.errors.message);
            throw new Error(
              `${response.errors.message}, status:${response.errors.status}`
            );
          } else if (response.errors.status === 404){
            setRoleError(response.errors.message);
            throw new Error(
              `${response.errors.message}, status:${response.errors.status}`
            );
          }
        }
      } catch (error: any) {
        console.error("Error =", error);
      }
    }
    allRoless();
  }, []);
 

  return (
    <div className={styles.container_role}>
      <h4 className={styles.container_role_text}>Список ролей</h4>

      <div>
        {allRoles ? (
          <div className={styles.container_role_table}>
            <div className={styles.container_table_hedar}>ID</div>
            <div className={styles.container_table_hedar}>Name</div>
            <div className={styles.container_table_hedar}>Permissions</div>
            {allRoles?.map((ell: RoleI) => (
              <Fragment key={ell.id}>
                <div className={styles.container_table_body}>
                  <span className={styles.container_table_body_span}>
                    {ell.id}
                  </span>
                </div>
                <div className={styles.container_table_body}>
                  <span className={styles.container_table_body_span}>
                    {ell.name}
                  </span>
                </div>
                <div
                  className={`${styles.container_table_body}  ${styles.container_table_permissions}`}
                >
                  <div className={styles.container_table_permissions_hedar}>
                    actions
                  </div>
                  <div className={styles.container_table_permissions_hedar}>
                    id
                  </div>
                  <div className={styles.container_table_permissions_hedar}>
                    resours
                  </div>

                  {ell.permissions?.map((perm: PermissionsI) => (
                    <Fragment key={perm.id}>
                      <div className={styles.container_table_permissions_body}>
                        {
                          <div>
                            <span>
                              {Object.values(perm.actions).join(", ")}
                            </span>
                          </div>
                        }
                      </div>
                      <div className={styles.container_table_permissions_body}>
                        {perm.id}
                      </div>
                      <div className={styles.container_table_permissions_body}>
                        {perm.resource}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>
        ) : (
          <p>{roleError}</p>
        )}
      </div>
    </div>
  );
};

export default RolesGetComponent;
