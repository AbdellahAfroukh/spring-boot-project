import Login from "../components/LoginComponent";

function LoginPage() {
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
      <Login />
    </div>
  );
}

export default LoginPage;
