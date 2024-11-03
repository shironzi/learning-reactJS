const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      return data;
    } else {
      console.log("Failed to login", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const register = async (
  email,
  password,
  confirmPassword,
  firstName,
  lastName
) => {
  try {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.log("Failed to register", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const logout = async () => {
  try {
    const response = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("token");
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

export { login, register, logout };
