// sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
// 	'use strict';
// 	// var useremail;

// 	return ControllerExtension.extend('department.departmentapp.ext.controller.Objectcontroller', {
// 		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
// 		override: {
// 			/**
//              * Called when a controller is instantiated and its View controls (if available) are already created.
//              * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
//              * @memberOf department.departmentapp.ext.controller.Objectcontroller
//              */
// 			onInit: function () {
// 				debugger
// 				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
// 			 	// (repeated )  var oModel = this.base.getExtensionAPI().getModel();
//                  var useremail = 'nida.afreen@peolsolutions.com'; 
// 			 	// var oUser = new sap.ushell.services.UserInfo().getEmail();
//                  useremail = oUser;
//              console.log(oUser);
//               console.log(useremail);
// 			},
// 			/**
// 				 * Called before the view is rendered.
// 				 * This is a suitable place to execute code before binding occurs.
// 				 */
// 			routing: {
//                 onBeforeBinding: async function () {
//                     debugger;
//                     // var oModel = this.base.getExtensionAPI().getModel();

//                     if (!oModel) {
//                         console.error('Model is not available.');
//                         return;
//                     }

//                     var sServiceUrl;
//                     if (typeof oModel.getServiceUrl === "function") {
//                         sServiceUrl = oModel.getServiceUrl(); // For V4 OData models
//                         console.log('Service URL:', sServiceUrl);
//                     } else {
//                         console.error('Unable to determine the service URL.');
//                         return;
//                     }

//                     try {
//                         //  var useremail = 'sakshi.jha@peolsolutions.com'; // Replace with actual logged-in user email

//                         const authResponse = await new Promise((resolve, reject) => {
//                             jQuery.ajax({
//                                 url: sServiceUrl + "/authorisation",
//                                 method: "GET",
//                                 dataType: "json",
//                                 success: function (data) {
//                                     resolve(data);
//                                 },
//                                 error: function (jqXHR, textStatus, errorThrown) {
//                                     reject(new Error(textStatus + ': ' + errorThrown));
//                                 }
//                             });
//                         });

//                         const deptResponse = await new Promise((resolve, reject) => {
//                             jQuery.ajax({
//                                 url: sServiceUrl + "/Department",
//                                 method: "GET",
//                                 dataType: "json",
//                                 success: function (data) {
//                                     resolve(data);
//                                 },
//                                 error: function (jqXHR, textStatus, errorThrown) {
//                                     reject(new Error(textStatus + ': ' + errorThrown));
//                                 }
//                             });
//                         });

//                         debugger;
//                         console.log('Fetched auth data:', authResponse);
//                         console.log('Fetched dept data:', deptResponse);

//                         if (authResponse && authResponse.value && Array.isArray(authResponse.value) &&
//                             deptResponse && deptResponse.value && Array.isArray(deptResponse.value)) {

//                             var userAuth = authResponse.value.find(auth => auth.Email === useremail);
//                             if (!userAuth) {
//                                 debugger;
//                                 console.error('User not found in authorisation data.');
//                                 return;
//                             }

//                             var userRole = userAuth.role; // User's role
//                             console.log(`User Role: ${userRole}`);

//                             var oEvent = this.getView().getBindingContext(); // Example: getting the binding context
//                             var objPath = oEvent.getPath(); // Gets the full path from the context
//                             var departmentID = null;

//                             var match = objPath.match(/DepartmentID='([^']+)'/);
//                             if (match && match[1]) {
//                                 departmentID = match[1];
//                             }

// 							if (userRole !== departmentID && userRole !== 'Admin') {
//                                 // Hide "Create" and "Delete" buttons if the user's role does not match department ID or is not an admin
//                                 this.base.getView().findAggregatedObjects(true, function (control) {
//                                     return control.isA("sap.m.Button");
//                                 }).forEach(function (oButton) {
//                                     if (oButton.getId().includes("Edit") || oButton.getId().includes("Delete") || oButton.getId().includes("Create")) {
//                                         oButton.setVisible(false);
//                                     }
//                                 });
//                             }
//                             if (userRole !== 'Admin') {
//                                 debugger
//                                 // Find all input controls bound to the 'DepartmentName' property
//                                 this.base.getView().findAggregatedObjects(true, function (control) {
//                                     return control.isA("sap.m.Input") && control.getBindingPath("value") === "DepartmentName";
//                                 }).forEach(function (oInput) {
//                                     // Make each of these input fields non-editable
//                                     oInput.setEditable(false);
//                                 });
//                             }
//                         }
//                     } catch (error) {
//                         console.error('Error fetching data', error);
//                     }
//                 }
//             }
//         }
//     });
// });





sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var useremail = 'nida.afreen@peolsolutions.com';

    var useremail ;
	return ControllerExtension.extend('department.departmentapp.ext.controller.Objectcontroller', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf lec.ext.controller.Objectteacher
             */
			onInit: function () {
				debugger
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				// var oUser = new sap.ushell.services.UserInfo().getEmail();
                // useremail = oUser;
                // alert(oUser);
            //     console.log(oUser);
            //   console.log(useremail);
			},
			/**
				 * Called before the view is rendered.
				 * This is a suitable place to execute code before binding occurs.
				 */




			routing: {
                onBeforeBinding: async function (oUrl) {

debugger ;

                    var oUIModel = this.getView().getModel("ui");
					var bIsEditMode = oUIModel.oData.editMode;
					var oUploadSet = this.base.getView().byId("lec::TeacherObjectPage--fe::CustomSubSection::Att--uploadSet");
					var oBindingInfo = oUploadSet.getBindingInfo("items");
					var oTemplate = oBindingInfo.template;

					if(bIsEditMode == 'Editable') {
						oUploadSet.setUploadButtonInvisible(false);
						oTemplate.setVisibleRemove(true);
						oTemplate.setVisibleEdit(true);
					    oUploadSet.setUploadEnabled(true);
					} else {
						oUploadSet.setUploadButtonInvisible(true);
						oTemplate.setVisibleRemove(false);
						oTemplate.setVisibleEdit(false);
					    oUploadSet.setUploadEnabled(false);
					}
                    debugger;
                    var oModel = this.base.getExtensionAPI().getModel();

                    if (!oModel) {
                        console.error('Model is not available.');
                        return;
                    }

                    const oView = this.base.getView();
					const oControl = oView.mAggregations.content[0];
debugger;
                    const buttons1 = oControl.findAggregatedObjects(true, function (control) {
                        return control.isA("sap.m.Button") && (control.getId().includes("Save") || control.getId().includes("Edit") || control.getId().includes("Delete"));
                    });
                    const editButton = buttons1[0];
                    const deleteButton = buttons1[1];
                    const createButton = buttons1[2];
                   
                    setTimeout(function() {
                        debugger
                            if (createButton.getText().includes("Create")) {
                                createButton.setText("Send for Approval");
                            }
                    }.bind(this), 1000);
                   
                   
            
                    var sServiceUrl;
                    if (typeof oModel.getServiceUrl === "function") {
                        sServiceUrl = oModel.getServiceUrl(); // For V4 OData models
                        console.log('Service URL:', sServiceUrl);
                    } else {
                        console.error('Unable to determine the service URL.');
                        return;
                    }
                    debugger
                    


                    this.adjustUIControls();
                    await this.fetchAndProcessData(sServiceUrl);
                }
            }
            
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
                             
                    // if (oControl.isA("sap.m.Button") && controlId.includes("Save")) {
                    //     oControl.setText("Send for approval");
                    // }                   
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

                    if (oControl.isA("sap.m.Button") && controlId.includes("Save") && oControl.getVisible() === true) {
						debugger;
						
						// Get the current view
						var oView = this.base.getView(); // Use `this.getView()` if this code is in the controller
						
						// Get all controls within the view
						var aAllControls = oView.findAggregatedObjects(true);
						
						var aUploadkaSets = aAllControls.filter(function(oControl) {
							return oControl.getId().includes("uploadSet-uploader");
						});

						aUploadkaSets.forEach(function(oControl) {
							oControl.setVisible(true);
						});
					
						// Filter out UploadSet controls
						var aUploadSets = aAllControls.filter(function(oControl) {
							return oControl.getId().includes("uploadSet");
						});
					
						// Loop through each UploadSet control
						aUploadSets.forEach(function(oControl) {
							// Print control details
							console.log("Control ID:", oControl.getId());
							console.log("Control Type:", oControl.getMetadata().getName());
							
							// Make the control visible and optionally enabled
							if (oControl.isA("sap.m.Button") && oControl.getId().includes("deleteButton")) {
								oControl.setVisible(true);
								oControl.setEnabled(true); // Optional: Enable the button as well
							}
						});
					}
                    


                    if (oControl.isA("sap.m.Button") && controlId.includes("Save") && oControl.getVisible() === false) {
						debugger;
						
						// Get the current view
						var oView = this.base.getView(); // Use `this.getView()` if this code is in the controller
						
						// Get all controls within the view
						var aAllControls = oView.findAggregatedObjects(true);
						
						var aUploadkaSets = aAllControls.filter(function(oControl) {
							return oControl.getId().includes("uploadSet-uploader");
						});

						aUploadkaSets.forEach(function(oControl) {
							oControl.setVisible(false);
						});
					
						// Filter out UploadSet controls
						var aUploadSets = aAllControls.filter(function(oControl) {
							return oControl.getId().includes("uploadSet");
						});
					
						// Loop through each UploadSet control
						aUploadSets.forEach(function(oControl) {
							// Print control details
							console.log("Control ID:", oControl.getId());
							console.log("Control Type:", oControl.getMetadata().getName());
							
							// Make the control visible and optionally enabled
							if (oControl.isA("sap.m.Button") && oControl.getId().includes("deleteButton")) {
								oControl.setVisible(false);
								oControl.setEnabled(false); // Optional: Enable the button as well
							}
						});
					}
                    if (oControl.isA("sap.m.Input") && controlId.includes("Age")) {
                        var dobControl = that.base.getView().byId("nwteacher::TeacherObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::DOB::Field-edit");
                        if (dobControl) {
                            var dobValue = dobControl.getDateValue();  
                            if (dobValue) {
                                var age = that.calculateAge(dobValue);  
                                oControl.setValue(age);  
                            }
                        }
                    }

                }.bind(that));
            }.bind(that), 500); 
        },

        calculateAge: function (dob) {
            var today = new Date();
            var birthDate = new Date(dob);
        
            // Check if birthDate is in the future
            if (birthDate > today) {
                alert("Birthdate is in the future. Age cannot be calculated.");
                console.log("Birthdate is in the future. Age cannot be calculated.");
                return null; // or any other value to indicate that the age can't be calculated
            }
        
            // Calculate initial age
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
        
            // Adjust age if the birthday has not yet occurred this year
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
        
            // Only return age if the person is 18 or older; otherwise, return null
            if (age >= 18) {
                return age;
            } else {
                alert("You must be at least 18 years old.");
                return null;
            }
        },
        
        
      
        setAgeField: function (age) {
            var that = this;
            setTimeout(function () {
                that.base.getView().findAggregatedObjects(true, function (control) {
                    return control.isA("sap.m.Input") && control.getId().includes("Age");
                }).forEach(function (oControl) {
                    oControl.setValue(age);  
                    console.log("Age field set to:", age);  
                });
            }.bind(that), 500);  
        },

        fetchAndProcessData: async function (sServiceUrl) {
            var that = this;

                    try {
                      
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
                    }
                    
                    
                    catch (error) {
                        console.error('Error fetching data', error);
               
            }
            try {


                var wur = window.location.href;
                var hashPart = wur.split('#')[1];
                console.log(hashPart);

                var ttuuid = hashPart.match(/ttuuid=([^,]+)/)[1];
                console.log(ttuuid);

                const ApprovedResponse = await new Promise((resolve, reject) => {
                    jQuery.ajax({
                        url: `${sServiceUrl}/Teacher(ttuuid=${ttuuid},IsActiveEntity=true)`, // Corrected URI
                        method: "GET",
                        dataType: "json",
                        success: function (data) {
                            resolve(data);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.error("Error fetching role data", jqXHR, textStatus, errorThrown);
                            reject(new Error(textStatus + ': ' + errorThrown));
                        }
                    });
                });

                // Process the ApprovedResponse as needed
                console.log(ApprovedResponse);






                // console.log('Fetched Authorization data:', ApprovedResponse);

                var userRole;
                if (ApprovedResponse && ApprovedResponse.Status) {
                    console.log(ApprovedResponse.Status);
                    if (ApprovedResponse.Status === "Approved") {
                        userRole = ApprovedResponse.Status;
                        console.log("userRole: ", userRole);
                    }
                } else {
                    console.log('No data found or invalid response format');
                }

                this.base.getView().findAggregatedObjects(true, function (control) {
                    return control.isA("sap.m.Button");
                }).forEach(function (oButton) {
                    if (oButton.getId().includes("Edit") || oButton.getId().includes("Delete")) {
                        if (userRole === "Approved") {
                            oButton.setVisible(true);
                            oButton.setEnabled(true);
                        } else {
                            oButton.setVisible(false);
                            oButton.setEnabled(false);
                        }
                    }
                });

            } catch (error) {
                console.error('Error fetching role data', error);
            }

        }
    });
});


