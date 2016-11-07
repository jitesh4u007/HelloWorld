package com.jitesh.data;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

/**
 * Created by RaghavendraKulkarni on 1/21/2015.
 */
@Data
@Document(collection = "employee")
public class Employee {

    @Id
    private String id;
    private String empId;
    private String firstName;
    private String lastName;
    private String deptName;
    private String gender;
    private Date date;

}
