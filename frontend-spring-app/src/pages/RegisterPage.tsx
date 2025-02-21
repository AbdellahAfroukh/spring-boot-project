import Login from "../components/LoginComponent";
import Register from "../components/RegisterComponent";

function RegisterPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        width: "100%",
      }}
    >
      <Register />
    </div>
  );
}

export default RegisterPage;
