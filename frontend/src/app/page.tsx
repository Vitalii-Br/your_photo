import Formlogin from "@/component/form/form.login";
import FormRegister from "@/component/form/form.register";
import style from './page.module.css'

export default function Home() {
  return (

    <div className={style.container_home} >
      <h3 className={style.container_home_content} >Главнвя страница Next</h3>
      <div className={style.container_home_form} >
        <FormRegister/>
        <Formlogin/>
      </div>

    </div>
   
  )
}
