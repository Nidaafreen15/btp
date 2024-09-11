sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('project1.ext.controller.Teacontroller', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf project1.ext.controller.Teacontroller
             */
			onInit: function () {
                debugger
// 				// You can access the Fiori elements extensionAPI via this.base.getExtensionAPI
			var oModel = this.base.getExtensionAPI().getModel();
			},

			routing: {
                onBeforeBinding: async function (oParameter) {
					debugger
                     var oUser = new sap.ushell.services.UserInfo().getEmail();
                     var oUser = 'nida.afreen@peolsolutions.com';
                     var inputs = this.base.getView().findAggregatedObjects(true, function (control) {
                        return control.isA("sap.m.DatePicker") && control.getId().includes("dob") ;    });

                     var today = new Date();
                     var maxDate = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
                     
                     inputs[0].setMaxDate(maxDate);
                     
                   
                     
				// 	var sId;
				// 	await this.base.getView().getContent()[0].getFooter().mAggregations.content.getContent().forEach(element => {
				// 		// if(element.getText())
				// 			var text;
				// 			try {
				// 			 text = element.getText()
				// 			} catch (error) {
				// 			 text = null;
				// 			}
				// 		// var text =element.getText();
				// 		if(text == 'Create'){
				// 			sId = element.sId;
				// 			// element.setText("Send for Approval");
                //         }
                        
				// 	});
				// 	setTimeout(() => {
				// 		sap.ui.getCore().byId(sId).setText("Send for Approval");
				// 	}, 800);
                
                //    var oModel = this.base.getExtensionAPI().getModel();

                //     if (!oModel) {
                //         console.error('Model is not available.');
                //         return;
                //     }

                //     var sServiceUrl;
                //     if (typeof oModel.getServiceUrl === "function") {
                //         sServiceUrl = oModel.getServiceUrl(); // For V4 OData models
                //         console.log('Service URL:', sServiceUrl);
                //     } else {
                //         console.error('Unable to determine the service URL.');
                //         return;
                //     }

                //     this.adjustUIControls();
                //     await this.fetchAndProcessData(sServiceUrl);
       
         },
        adjustUIControls: function () {
            var that = this;
            setTimeout(function () {
                that.base.getView().findAggregatedObjects(true, function (control) {
                    return control.isA("sap.m.Button") ||
                        control.isA("sap.m.DatePicker") ||
                        control.isA("sap.m.Input") ||
                        control.isA("sap.m.TextArea") ||
                        control.isA("sap.m.ComboBox");
                }).forEach(function (oControl) {
                    var controlId = oControl.getId();
                             
                    if (oControl.isA("sap.m.Button") && controlId.includes("Save")) {
                        oControl.setText("Send for approval");
                    }                   
                    //   if (oControl.isA("sap.m.Input") && controlId.includes("Age")) {
                    //     oControl.setEditable(false); 
                    // }
                    // if (oControl.isA("sap.m.DatePicker") && controlId.includes("Dob")) {

                    //     oControl.attachChange(function () {
                    //         var dobValue = oControl.getDateValue();  
                    //         if (dobValue) {
                    //             var age = that.calculateAge(dobValue);  
                    //             that.setAgeField(age); 
                    //         }
                    //     });

                      
                    //     var dobValue = oControl.getDateValue();  
                    //     if (dobValue) {
                    //         var age = that.calculateAge(dobValue);  
                    //         that.setAgeField(age); 
                    //     }
                    // }

                    // if (oControl.isA("sap.m.Input") && controlId.includes("Age")) {
                    //     var dobControl = that.base.getView().byId("nwteacher::TeacherObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::DOB::Field-edit");
                    //     if (dobControl) {
                    //         var dobValue = dobControl.getDateValue();  
                    //         if (dobValue) {
                    //             var age = that.calculateAge(dobValue);  
                    //             oControl.setValue(age);  
                    //         }
                    //     }
                    // }

                }.bind(that));
            }.bind(that), 500); 
        },

        // calculateAge: function (dob) {
        //     var today = new Date();
        //     console.log("Calculating age...");
        //     var birthDate = new Date(dob);
        //     var age = today.getFullYear() - birthDate.getFullYear();
        //     var m = today.getMonth() - birthDate.getMonth();
        //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        //         age--;
        //     }
        //     return age;
        // },

        // setAgeField: function (age) {
        //     var that = this;
        //     setTimeout(function () {
        //         that.base.getView().findAggregatedObjects(true, function (control) {
        //             return control.isA("sap.m.Input") && control.getId().includes("Age");
        //         }).forEach(function (oControl) {
        //             oControl.setValue(age);  
        //             console.log("Age field set to:", age);  
        //         });
        //     }.bind(that), 500);  
        // },

        fetchAndProcessData: async function (sServiceUrl) {
            var that = this;

                    try {
                        //  var useremail = 'sakshi.jha@peolsolutions.com'; // Replace with actual logged-in user email

                        const authResponse = await new Promise((resolve, reject) => {
                            jQuery.ajax({
                                url: sServiceUrl + "/authorisation",
                                method: "GET",
                                dataType: "json",
                                success: function (data) {
                                    resolve(data);
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    reject(new Error(textStatus + ': ' + errorThrown));
                                }
                            });
                        });

                     

                        const deptResponse = await new Promise((resolve, reject) => {
                            jQuery.ajax({
                                url: sServiceUrl + "/Department",
                                method: "GET",
                                dataType: "json",
                                success: function (data) {
                                    resolve(data);
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    reject(new Error(textStatus + ': ' + errorThrown));
                                }
                            });
                        });

                        debugger;
                        console.log('Fetched auth data:', authResponse);
                        console.log('Fetched dept data:', deptResponse);

                        if (authResponse && authResponse.value && Array.isArray(authResponse.value) &&
                            deptResponse && deptResponse.value && Array.isArray(deptResponse.value)) {

                            var userAuth = authResponse.value.find(auth => auth.Email === useremail);
                            if (!userAuth) {
                                debugger;
                                console.error('User not found in authorisation data.');
                                return;
                             }



                            var userRole = userAuth.role; // User's role
                             console.log(`User Role: ${userRole}`);

                            var oEvent = this.getView().getBindingContext(); // Example: getting the binding context
                            var objPath = oEvent.getPath(); // Gets the full path from the context
                            var departmentID = null;

                            var match = objPath.match(/DepartmentID='([^']+)'/);
                            if (match && match[1]) {
                                departmentID = match[1];
                            }

							if (userRole !== departmentID && userRole !== 'Admin') {
                                // Hide "Create" and "Delete" buttons if the user's role does not match department ID or is not an admin
                                this.base.getView().findAggregatedObjects(true, function (control) {
                                    return control.isA("sap.m.Button");
                                }).forEach(function (oButton) {
                                    if (oButton.getId().includes("Edit") || oButton.getId().includes("Delete") || oButton.getId().includes("Create")) {
                                        oButton.setVisible(false);
                                    }
                                    
                                });
                            }
                            if (userRole !== 'Admin') {
                                debugger
                                // Find all input controls bound to the 'DepartmentName' property
                                this.base.getView().findAggregatedObjects(true, function (control) {
                                    return control.isA("sap.m.Input") && control.getBindingPath("value") === "DepartmentName";
                                }).forEach(function (oInput) {
                                    // Make each of these input fields non-editable
                                    oInput.setEditable(false);
                                });
                            }
                        }
                    } catch (error) {
                        console.error('Error fetching data', error);
                               
                }
            },

            onAfterBinding: async function (oParameter) {
                debugger
                var sId;
                var text = null;
                var sidd = this.base.getView().getContent()[0].getSections()[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.sId;
                await this.base.getView().getContent()[0].getSections()[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.setUploadEnabled(false);
                var footerId = null;

                try {
                    footerId = await this.getView().getContent()[0].mAggregations.footer.sId;
                } catch (error) {
                    footerId = null;
                }

                debugger
                setTimeout(async () => {
                    sap.ui.getCore().byId(footerId).mAggregations.content.mAggregations.content.forEach(async element => {
                        if (element.getVisible()) {
                            if (element.getText() == "Discard Draft") {
                                await sap.ui.getCore().byId(sidd).setUploadEnabled(true);
                                await sap.ui.getCore().byId(sidd).mAggregations.items.forEach(async element => {
                                    element.setEnabledRemove(true);
                                    element.setEnabledEdit(true);
                                });
                            }
                        }
                    });
                }, 400);
            
             
              
            }
        },

    _delay: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
});

});

















