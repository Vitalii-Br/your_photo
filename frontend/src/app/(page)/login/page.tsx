import Formlogin from "@/component/form/form.login";

const Login = () => {
  // useEffect(() => {
  //   const performLogin = async () => {
  //     try {
  //       const response = await fetch("/api/auth/login", { // Используем проксированный путь
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           name: "Elena",
  //           email: "elena@mail.ru",
  //           password: "1234567e",
  //         }),
  //         credentials: "include", // Можно оставить для совместимости
  //       });
  //       const data = await response.json();
  //       console.log('Login response:', data);
  //     } catch (error) {
  //       console.error('Login error:', error);
  //     }
  //   };
  //   performLogin();
  // }, []);

  return (
    <div>
      <h4>Login</h4>
      <Formlogin/>
    </div>
  );
};

export default Login;