package com.coder.Employee.Management.App.service;

import com.coder.Employee.Management.App.model.Employee;

import java.util.List;

public interface EmployeeService {
    public Employee saveEmployee(Employee employee);
    public List<Employee> getAllEmployees();
    public Employee  updateEmployee(int id, Employee employeeDetails);
    public void deleteEmployee(int id);
}
