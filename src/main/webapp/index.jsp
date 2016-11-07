<%@ page language="java" contentType="text/html; charset=ISO-8859-1"

pageEncoding="ISO-8859-1"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <title>Employee Management</title>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js"></script>
    </head>
    <body>
    <header>Employee Management</header>
    <section>
        <div id="container">
            <div id="operations-container"></div>
            <div id="map-container">
                <span id="operation-name"></span>
                <table id="tablecontainer" border="border" style="display:none;">

                </table>
            </div>
        </div>
        <table class="ds_box" cellpadding="0" cellspacing="0" id="ds_conclass" style="display: none;">
                <tr><td id="ds_calclass">
                    </td>
                </tr>
        </table>
    </section>
    <script type="text/template" id="form-template">
            <div id="insertemp">
                <center>
                    <form>
                        <table cellspacing="5px" cellpadding="5px">
                        <caption><h3>Insertion of Employee</h3></caption><br/>
                            <tr>
                                <th align="left"><label>EmployeeId&nbsp:</label></th><td><input type="text" id="empId"></td>
                            </tr>
                            <tr>
                                <th align="left"><label>FirstName&nbsp&nbsp&nbsp&nbsp:</label></th><td><input type="text" id="fName"></td>
                                <th><label>LastName :</label></th><td><input type="text" id="lName"></td>
                            </tr>
                            <tr>
                                 <th align="left"><label>Gender&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:</label></th>
                                 <td><input type="radio" name="sex" value="male">Male
                                     <input type="radio" name="sex" value="female">Female
                                 </td>
                            </tr>
                            <tr>
                                 <th align="left">Date of Birth:</th>
                                 <td><input id="date" onclick="ds_sh(this);" name="date" readonly="readonly" style="cursor: text" /></td>
                                 <th align="left"><label>DeptName&nbsp&nbsp&nbsp :</label></th>
                                 <td><select>
                                       <option value="Development">Development</option>
                                       <option value="Testing">Testing</option>
                                       <option value="Design">Design</option>
                                       <option value="HRD">HRD</option>
                                     </select>
                                 </td>
                            </tr>
                        </table>
                        <br>
                        <hr/>
                        <input type="button" id="insert" value="Save">
                        <input type="reset" id="cancel" value="Reset">
                    </form>
                </center>
            <div>
        </script>
        <script type="text/template" id="delete-template">
            <div id="deleteemp">
                <center>
                    <form>
                        <table  cellspacing="5px" cellpadding="5px">
                        <caption><h3>Deletion of Employee</h3></caption><br/>
                            <tr>
                                <th align="left">Select the <i>field</i> by which you want to perform remove employee </th>
                                <td>
                                    <select class="deletechoice">
                                        <option  value="not selected" disabled selected>select the field</option>
                                        <option  value="empId">EmployeeId</option>
                                        <option  value="firstName">FirstName</option>
                                    </select>
                                </td>
                            </tr>
                            <tr id="deletechoicedisp">
                            </tr>
                        </table>
                        <hr/>
                        <input type="button" id="delete" value="Delete">
                    </form>
                </center>
            <div>
        </script>
        <script src="<c:url value="/resources/main.js" />"></script>
        <script src="<c:url value="/resources/date.js" />"></script>
        <link rel="stylesheet" href="<c:url value="/resources/main.css" />" />
        <link rel="stylesheet" href="<c:url value="/resources/normalize.css" />" />
        <link rel="stylesheet" href="<c:url value="/resources/normalize.min.css" />" />
        <link rel="stylesheet" href="<c:url value="/resources/styles.css" />" />
    </body>
</html>
