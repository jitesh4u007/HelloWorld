//===================Employee Model================================================

var Employee = Backbone.Model.extend({
	url:"/controller/employee",
	idAttribute:"id"
});

var Employees = Backbone.Collection.extend({
	model:Employee,
	url:"/controller/employee",

});
//=====================Rendering Employees View=====================================
var EmployeeView = Backbone.View.extend({
	tagName:"tr",
	render:function(){
		this.$el.append("<td>"+this.model.get("empId")+"</td>"+
						"<td>"+this.model.get("firstName")+"</td>"+
						"<td>"+this.model.get("lastName")+"</td>"+
						"<td>"+this.model.get("gender")+"</td>"+
						"<td>"+new Date(this.model.get("date")).toDateString()+"</td>"+
						"<td>"+this.model.get("deptName")+"</td>");
		return this;
	}
});

var EmployeesView = Backbone.View.extend({
	el:"#tablecontainer",
	render:function(){
		var self=this;
		this.$el.html("");
		this.$el.html(" <tr><th>EmployeeId</th><th>Employee FirstName</th><th>Employee LastName</th><th>Employee Gender</th><th>Employee DOB</th><th>Employee DeptName</th></tr>");
		this.model.each(function(emp){
			var empView = new EmployeeView({model:emp});
			self.$el.append(empView.render().$el);
		});
		return this;
	}
});
//===================Rendering Operations View========================================
var Operation = Backbone.Model.extend();

var Operations = Backbone.Collection.extend({
	model: Operation
});

var OperationView = Backbone.View.extend({
	tagName: "li",

	initialize: function(options){
		this.bus = options.bus;
	},

	events: {
		"click": "onClick",
	},

	onClick: function(){
		this.bus.trigger("operationSelected", this.model);
	},

	render: function(){
		this.$el.html(this.model.get("name"));
		return this;
	}
});

var OperationsView = Backbone.View.extend({
	tagName: "ul",

	id: "operations",

	initialize: function(options){
		this.bus = options.bus;
	},

	render: function(){
		var self = this;

		this.model.each(function(operation){
			var view = new OperationView({ model: operation, bus: self.bus });
			self.$el.append(view.render().$el);
		});

		return this;
	}
});

var MapView = Backbone.View.extend({
	el: "#map-container",

	initialize: function(options){
		this.bus = options.bus;

		this.bus.on("operationSelected", this.onOperationSelected, this);
	},
	events:{
		"click #insert":"insertEmployee",
		"click #delete":"deleteEmployee",
		"change .deletechoice":"displayField"
	},
	displayField:function(){
			$("#deletechoicedisp").html("<th align='left'>Enter the "+$( 'select option:selected').attr("value")+"&nbspyou want to remove"+
			"</th><td align='left'><input type='text'' id='deleteempchoice'></td>");
	},
	insertEmployee:function(){
		var emp=new Employee();
		var str=$("#date").val();
        var date=Date.parse(str.replace(/-/g,"/"));
		emp.set({"empId":parseInt($("#empId").val())});
		emp.set({"firstName":$("#fName").val()});
		emp.set({"lastName":$("#lName").val()});
		emp.set({"deptName":$( "select option:selected").val()});
		emp.set({"gender":$( "input:radio[name=sex]:checked" ).val()})
		emp.set({"date":date});
		console.log(emp);
		emp.save(null,{success:function(result){
			alert("Insertion Successful");
			$("#empId").val("");
			$("#fName").val("");
			$("#lName").val("");
			$("#dName").val("");
			$("#date").val("");
			ds_ce.style.display = 'none';
			$('input[name="sex"]').attr('checked', false);
		},
		error:function(e){
			console("Insertion Failed"+e);
		}});
		},
	deleteEmployee:function(){
					var emp=new Employee({"firstName":$("#deleteempchoice").val()});
					emp.fetch({url:'/controller/employee/' + emp.get("firstName"),
								success:function(e){
										var emp1=new Employee();
										emp.destroy({url:'/controller/employee/' + e.id,
													success:function(result){
															console.log("Employee deleted");
													},
													error:function(e){
                                                     		console(e);
                                                     		}
						});
					}
				});
		},
	onOperationSelected: function(operation){
		this.model = operation;
		this.render();
	},

	render: function(){
		if(this.model){
			if (this.model.get("name")==="Insert Employee")
			{
				ds_ce.style.display = 'none';
				$("#tablecontainer").css("display","none");
				$("#operation-name").css("display","block");
				var template = _.template( $("#form-template").html(), {} );
				this.$("#operation-name").html(template);
			}
			else if (this.model.get("name")==="Delete Employee")
			{
				ds_ce.style.display = 'none';
				$("#tablecontainer").css("display","none");
				$("#operation-name").css("display","block");
				var template = _.template( $("#delete-template").html(), {} );
				this.$("#operation-name").html(template);
			}
			else if (this.model.get("name")==="List Employee")
			{
				ds_ce.style.display = 'none';
				var emp=new Employees();
				emp.fetch({async:false});
				console.log(emp);
				var empView=new EmployeesView({model:emp});
			//	this.$("#tablecontainer").append(empView.render().$el);
				empView.render();
				$("#tablecontainer").css("display","block");
				$("#operation-name").css("display","none");
			}
			return this;
		}
			
	}
})

var bus = _.extend({}, Backbone.Events);

var operations = new Operations([
	new Operation({ name: "Insert Employee" }),
	new Operation({ name: "Delete Employee" }),
	new Operation({ name: "List Employee" })
	]);

var operationsView = new OperationsView({ model: operations, bus: bus });
$("#operations-container").html(operationsView.render().$el);

var mapView = new MapView({ bus: bus });
mapView.render();

//var Employees=new Employees({new Employee("title":)});
//var empView=new EmployeesView({});