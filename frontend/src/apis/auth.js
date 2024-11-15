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

export function setToken(token, expiresIn) {
  const expirationTime = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", expirationTime);
}

export function getToken() {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");
  if (new Date().getTime() > expirationTime) {
    logout();
    return null;
  }
  return token;
}

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
      localStorage.removeItem("expirationTime");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
    }
    return response;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    console.error("Logout error:", error);
    throw error;
  }
};

export async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  if (!token) {
    await logout();
    return;
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
    await logout();
  }

  return response;
}

export { login, register, logout };
