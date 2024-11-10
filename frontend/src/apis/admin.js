const getData = async () => {
  try {
    const response = await fetch("http://localhost:5000/admin/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getData };
