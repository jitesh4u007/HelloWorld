package com.jitesh.repository;

import com.jitesh.data.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by RaghavendraKulkarni on 1/21/2015.
 */
@Repository
public interface EmployeeRepository extends MongoRepository<Employee,String> {
    public Employee findEmployeeByFirstName(String firstName);
    public Employee findEmployeeByEmpId(String empId);
}
