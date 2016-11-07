package com.jitesh.controller;

import com.jitesh.data.Employee;
import com.jitesh.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
@RequestMapping("/controller/employee")
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;

	@RequestMapping(method = RequestMethod.GET, produces = "application/json") @ResponseBody
	public List<Employee> findAll() {
		return employeeService.getAllEmployees();
	}

	@RequestMapping(value = "{firstName}",method = RequestMethod.GET ) @ResponseBody

	public final Employee get( @PathVariable( "firstName" ) final String firstName ){
		System.out.println("hi");
		String pattern = "(\\d+)";
		Pattern r = Pattern.compile(pattern);
		Matcher m = r.matcher(firstName);
		if (m.find( )) {
			return this.employeeService.getEmployeeById(firstName);
		}
		else {
			return this.employeeService.getEmployeeByName(firstName);
		}
	}
	@RequestMapping(method = RequestMethod.POST ,consumes = "application/json")
	@ResponseBody Employee addEmployee(@RequestBody Employee employee) {
		System.out.println(employee);
		employeeService.addEmployee(employee);
		System.out.println(employee);
		return employee;
	}
	@RequestMapping(value = "{id}",method = RequestMethod.DELETE, produces = "application/json") @ResponseStatus(HttpStatus.OK)
	@ResponseBody String deleteEmployee(@PathVariable String id){
		System.out.println("In Controller delete method");
		System.out.println(id);
		employeeService.removeEmployee(id);
		return "success";
	}


//	@RequestMapping(value="/displayEmp")
//	public @ResponseBody Employee showMessage(@RequestParam(value = "name") String name) {
//		System.out.println("in con");
//		/*HashMap<String,Employee> emp= new HashMap<String,Employee>();
//		emp.put("Raghav",new Employee());
//		emp.put("Saurav",new Employee());
//		Employee empobj=emp.get(name);
//		empobj.setUId(12);
//		empobj.setDeptName("CSE");
//		ModelAndView mv = new ModelAndView("helloworld");
//		mv.addObject("uId",empobj.getUId());
//		mv.addObject("firstName", name);
//		mv.addObject("deptName",empobj.getDeptName());
//		return mv;*/
//		System.out.println(employeeService.getEmployeeByName(name).getUId());
//		return employeeService.getEmployeeByName(name);
//	}
//
//	@RequestMapping(value="/listAllEmp")
//	public @ResponseBody
//	List<Employee> showMessage() {
//		System.out.println("in list con");
//		return employeeService.getAllEmployees();
//	}

}
