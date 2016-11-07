package com.jitesh.service;

import com.jitesh.repository.EmployeeRepository;
import com.jitesh.data.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by RaghavendraKulkarni on 1/21/2015.
 */
@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    public Employee getEmployeeByName(String firstName){
        return employeeRepository.findEmployeeByFirstName(firstName);
    }
    public Employee getEmployeeById(String empId ){
        return employeeRepository.findEmployeeByEmpId(empId);
    }
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public void addEmployee(Employee employee){
        employeeRepository.save(employee);
    }
    public void removeEmployee(String id){
        employeeRepository.delete(id);
    }
}
