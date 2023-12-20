import React, { useEffect, useState } from "react";
import GetAPiCall from "../../service/getApiCall";

const ListEmployee = (flag) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const data = await GetAPiCall("employees", accessToken);
        setEmployees(data.data);
      } catch (error) {
        console.error(error);
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
