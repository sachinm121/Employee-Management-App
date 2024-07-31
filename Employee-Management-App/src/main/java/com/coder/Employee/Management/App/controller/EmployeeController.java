package com.coder.Employee.Management.App.controller;

import com.coder.Employee.Management.App.model.Employee;
import com.coder.Employee.Management.App.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
@CrossOrigin
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/add")
    public String add(@RequestBody Employee employee){
        employeeService.saveEmployee(employee);
        return "New Employee Added";
    }

    @GetMapping("/getAll")
    public List<Employee> getAllEmployee(){
        return employeeService.getAllEmployees();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable int id, @RequestBody Employee employee){
        System.out.println("Update controller");
        employeeService.updateEmployee(id, employee);
        return ResponseEntity.ok("Employee's Details Updated");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        System.out.println("delete controller");
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee Deleted Successfully");
    }
}
