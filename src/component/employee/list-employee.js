import React, { useEffect, useState } from "react";

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = "http://localhost:8000/api/employees";
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setEmployees(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Simbanic Employees List</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Experience</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(employees) && employees.length > 0 ? (
            employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.age}</td>
                <td>{employee.experience}</td>
                <td>{employee.language}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
