const login = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
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

    return response;
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

    if (response.ok) {
      localStorage.removeItem("token");
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response;
  } catch (error) {
    localStorage.removeItem("token");
    console.error("Logout error:", error);
    throw error;
  }
};

export { login, register, logout };
