const axios = require('axios');
const cds = require('@sap/cds');
module.exports = cds.service.impl(async function () {
  const { Department, Teacher, Sequence, Student, TeacherDetails, MYSERVICE_STUDENT_DRAFTS,  authorisation, Files } = this.entities;
//   function calculateAge(dob) {
//     const today = new Date();
//     const birthDate = new Date(dob);
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDifference = today.getMonth() - birthDate.getMonth();

//     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//     }

//     return age;
// }

// function calculateAge(dob) {
//   const today = new Date();
//   const birthDate = new Date(dob);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDifference = today.getMonth() - birthDate.getMonth();

//   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//       age--;
//   }

//   if (age < 18 || age > 70) {
//       return { error: "Please enter a valid date of birth that results in an age between 18 and 70 years." };
//   }

//   return { age };
// }

  // Handle CREATE operation for Department
  
//   async function generateToken() {

  
//     const tokenUrl = 'https://3e1cae61trial.authentication.us10.hana.ondemand.com/oauth/token';
//     const clientId = 'sb-cf669328-c590-4369-a9f3-40cb053f89bb!b308800|xsuaa!b49390';
//     const clientSecret = 'a496d0f2-821c-40ab-92c6-bf18ae2256bc$WWD6n2Sp42odnXvlmYM0inOeL8J2gn-3qundhMf7OgQ=';

//   try {
//       const response = await axios.post(tokenUrl, null, {
//           params: {
//               grant_type: 'client_credentials'
//           },
//           auth: {
//               username: clientId,
//               password: clientSecret
//           }
//       });

//       const token = response.data.access_token;
//       console.log('Generated Token:', token);
//       return token;
//   } catch (error) {
//       console.error('Error generating token:', error.response ? error.response.data : error.message);
//   }
// }


  this.before('CREATE', 'Department', async (req) => {
    // Trim and format department name
    const trimmedDepartmentName = req.data.DepartmentName.trim().toLowerCase();

    // Check if a department with the same name (case-insensitive) already exists
    const existingDepartment = await SELECT.one.from(Department)
      .where({ DepartmentName: { like: trimmedDepartmentName } });

    if (existingDepartment) {
      req.error(400, `The department name '${req.data.DepartmentName}' already exists with ID '${existingDepartment.DepartmentID}'.`);
    }

    // Get the current sequence value for DepartmentID
    let departmentSequence = await SELECT.one.from(Sequence).where({ Name: 'DepartmentID' });

    // If no sequence exists, initialize it
    if (!departmentSequence) {
      departmentSequence = { Name: 'DepartmentID', Value: 0 };
      await INSERT.into(Sequence).entries(departmentSequence);
    }

    // Generate new DepartmentID
    const newId = departmentSequence.Value + 1;
    req.data.DepartmentID = `D${newId}`;

    // Update the sequence value
    await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'DepartmentID' });

    const tx = cds.transaction(req);

    // Handle StudentID generation if there are students in deptToStudent
    if (req.data.deptToStudent && Array.isArray(req.data.deptToStudent) && req.data.deptToStudent.length > 0) {
      // Get the current sequence value for StudentID
      let studentSequence = await SELECT.one.from(Sequence).where({ Name: 'StudentID' });

      // If no sequence exists, initialize it
      if (!studentSequence) {
        studentSequence = { Name: 'StudentID', Value: 0 };
        await INSERT.into(Sequence).entries(studentSequence);
      }

      // Process each student
      for (const student of req.data.deptToStudent) {
        if (student.StudentID) {
          // Check if StudentID already exists in Student table or draft table
          const existingStudent = await tx.read(Student).where({ StudentID: student.StudentID });
          const existingDraft = await tx.read('MYSERVICE_STUDENT_DRAFTS').where({ StudentID: student.StudentID });

          if (existingStudent.length > 0 || existingDraft.length > 0) {
            continue; // Skip ID generation if exists
          }
        }

        // Validate PhoneNumber and Email
        if (student.PhoneNumber && !/^\d{10}$/.test(student.PhoneNumber)) {
          req.error(400, `Phone number ${student.PhoneNumber} is invalid. It must be exactly 10 digits.`);
          return;
        }

        if (student.PhoneNumber) {
          const existingPhoneSameDept = await tx.read(Student).where({ PhoneNumber: student.PhoneNumber, DepartmentID: req.data.DepartmentID });
          const existingPhone = await tx.read(Student).where({ PhoneNumber: student.PhoneNumber });
          const existingPhoneInDrafts = await tx.read('MYSERVICE_STUDENT_DRAFTS').where({ PhoneNumber: student.PhoneNumber });
          const teacherWithPhone = await tx.read(Teacher).where({ PhoneNumber: student.PhoneNumber });

          if (existingPhoneSameDept.length > 0 || existingPhone.length > 0 || existingPhoneInDrafts.length > 1 || teacherWithPhone.length > 0) {
            req.error(409, `Phone number ${student.PhoneNumber} already exists.`);
            return;
          }
        }

        if (student.Email && !student.Email.toLowerCase().endsWith('@gmail.com')) {
          req.error(400, `Email ${student.Email} is invalid. It must end with '@gmail.com'.`);
          return;
        }

        if (student.Email) {
          const existingEmailSameDept = await tx.read(Student).where({ Email: student.Email, DepartmentID: req.data.DepartmentID });
          const existingEmail = await tx.read(Student).where({ Email: student.Email });
          const existingEmailInDrafts = await tx.read('MYSERVICE_STUDENT_DRAFTS').where({ Email: student.Email });
          const teacherWithEmail = await tx.read(Teacher).where({ Email: student.Email });

          if (existingEmailSameDept.length > 0 || existingEmail.length > 0 || existingEmailInDrafts.length > 1 || teacherWithEmail.length > 0) {
            req.error(409, `Email ${student.Email} already exists.`);
            return;
          }
        }

        // Generate new StudentID
        const newStudentId = studentSequence.Value + 1;
        student.StudentID = `S${newStudentId}`;

        // Update the sequence value
        await UPDATE(Sequence).set({ Value: newStudentId }).where({ Name: 'StudentID' });

        // Increment sequence for the next student
        studentSequence.Value = newStudentId;
      }
    } else {
      console.error('deptToStudent is not in the expected format in req.data');
    }

    if (req.data.deptToTeacher && Array.isArray(req.data.deptToTeacher) && req.data.deptToTeacher.length > 0) {
      const tx = cds.transaction(req);
      let existingTeacherDraftIDs = [];

      // Collect all existing TeacherIDs in the draft table
      if (req.data.deptToTeacher.length > 1) {
        const existingTeacherDrafts = await tx.read('MYSERVICE_TEACHERDETAILS_DRAFTS').columns(['TeacherID']);
        existingTeacherDraftIDs = existingTeacherDrafts.map(teacher => teacher.TeacherID);

        // Check for duplicates within the request
        const teacherIDsInRequest = req.data.deptToTeacher.map(teacher => teacher.TeacherID);
        const uniqueTeacherIDsInRequest = new Set(teacherIDsInRequest);
        const hasRequestDuplicates = teacherIDsInRequest.length !== uniqueTeacherIDsInRequest.size;
        const hasDraftDuplicates = teacherIDsInRequest.some(id => existingTeacherDraftIDs.includes(id));

        if (hasRequestDuplicates && hasDraftDuplicates) {
          req.error(409, 'Duplicate TeacherID detected.');
          return;
        }
      }

      for (const teacher of req.data.deptToTeacher) {
        if (teacher.TeacherID) {
          // Check if TeacherID already exists in the Department
          const existingTeacherInDept = await tx.read('MYSERVICE_TEACHERDETAILS')
            .where({ TeacherID: teacher.TeacherID, DepartmentID: req.data.DepartmentID });
          if (existingTeacherInDept.length > 0) {
            req.error(409, `Teacher ID ${teacher.TeacherID} already exists in department ${req.data.DepartmentID}.`);
            return;
          }
        }
      }
    }
  });
  //update
  this.before('UPDATE', 'Department', async (req) => {
    debugger;
    const tx = cds.transaction(req);

    // Handle StudentID generation if there are students in deptToStudent
    if (req.data.deptToStudent && Array.isArray(req.data.deptToStudent) && req.data.deptToStudent.length > 0) {
      // Get the current sequence value for StudentID
      let studentSequence = await SELECT.one.from(Sequence).where({ Name: 'StudentID' });

      // If no sequence exists, initialize it
      if (!studentSequence) {
        studentSequence = { Name: 'StudentID', Value: 0 };
        await INSERT.into(Sequence).entries(studentSequence);
      }

      // Collect phone numbers and email addresses across all students and drafts
      const phoneMap = new Map();
      const emailMap = new Map();

      // Check existing students
      const existingStudents = await tx.read(Student);
      existingStudents.forEach(student => {
        if (student.PhoneNumber) {
          phoneMap.set(student.PhoneNumber, (phoneMap.get(student.PhoneNumber) || 0) + 1);
        }
        if (student.Email) {
          emailMap.set(student.Email, (emailMap.get(student.Email) || 0) + 1);
        }
      });

      // Check existing drafts
      const existingDrafts = await tx.read('MYSERVICE_STUDENT_DRAFTS');
      existingDrafts.forEach(draft => {
        if (draft.PhoneNumber) {
          phoneMap.set(draft.PhoneNumber, (phoneMap.get(draft.PhoneNumber) || 0) + 1);
        }
        if (draft.Email) {
          emailMap.set(draft.Email, (emailMap.get(draft.Email) || 0) + 1);
        }
      });

      // Check existing teachers
      const existingTeachers = await tx.read(Teacher);
      existingTeachers.forEach(teacher => {
        if (teacher.PhoneNumber) {
          phoneMap.set(teacher.PhoneNumber, (phoneMap.get(teacher.PhoneNumber) || 0) + 1);
        }
        if (teacher.Email) {
          emailMap.set(teacher.Email, (emailMap.get(teacher.Email) || 0) + 1);
        }
      });

      // Check existing teacher drafts
      const existingTeacherDrafts = await tx.read('MYSERVICE_TEACHERDETAILS_DRAFTS');
      existingTeacherDrafts.forEach(draft => {
        if (draft.PhoneNumber) {
          phoneMap.set(draft.PhoneNumber, (phoneMap.get(draft.PhoneNumber) || 0) + 1);
        }
        if (draft.Email) {
          emailMap.set(draft.Email, (emailMap.get(draft.Email) || 0) + 1);
        }
      });

      // Define validation patterns
      const phonePattern = /^\d{10}$/; // Exactly 10 digits
      const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Ends with @gmail.com

      // Process each student
      for (const student of req.data.deptToStudent) {
        // Skip validation if the student is already in the database (update case)
        if (student.StudentID) {
          const existingStudent = existingStudents.find(s => s.StudentID === student.StudentID);
          if (existingStudent) {
            // Remove current student's phone number and email from validation
            phoneMap.delete(existingStudent.PhoneNumber);
            emailMap.delete(existingStudent.Email);
          }
        }

        // Validate phone number
        if (student.PhoneNumber) {
          if (!phonePattern.test(student.PhoneNumber)) {
            req.error(400, `Invalid phone number '${student.PhoneNumber}'. It must be exactly 10 digits.`);
            return; // Exit function since error occurred
          }

          if (phoneMap.get(student.PhoneNumber) > 0) {
            req.error(409, `Phone number ${student.PhoneNumber} already exists.`);
            return; // Exit function since error occurred
          }
        }

        // Validate email address
        if (student.Email) {
          if (!emailPattern.test(student.Email)) {
            req.error(400, `Invalid email address '${student.Email}'. It must end with '@gmail.com'.`);
            return; // Exit function since error occurred
          }

          if (emailMap.get(student.Email) > 0) {
            req.error(409, `Email address ${student.Email} already exists.`);
            return; // Exit function since error occurred
          }
        }

        // Generate new StudentID
        const newId = studentSequence.Value + 1;
        student.StudentID = `S${newId}`;

        // Update the sequence value
        await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'StudentID' });

        // Increment sequence for the next student
        studentSequence.Value = newId;
      }
    } else {
      console.error('deptToStudent is not in the expected format in req.data');
    }

    // Check for duplicates in the draft teacher records
    const draftTeachers = await tx.read('MYSERVICE_TEACHERDETAILS_DRAFTS')
      .where({ DepartmentID: req.data.DepartmentID });

    // Create a Set to track seen TeacherID and DepartmentID combinations
    const seenTeachers = new Set();

    // Check for duplicates in the draft table
    for (const draftTeacher of draftTeachers) {
      const key = `${draftTeacher.TEACHERID}|${draftTeacher.DEPARTMENTID}`;

      if (seenTeachers.has(key)) {
        // If the combination is already seen, issue an error
        req.error(409, `Teacher ID '${draftTeacher.TEACHERID}' is already present for this department '${draftTeacher.DEPARTMENTID}'.`);
        return;
      }

      // Add the combination to the Set
      seenTeachers.add(key);
    }
  });



  //create teacher

   this.before('CREATE', 'Teacher', async (req) => {
    // Validate Phone Number
    debugger
    // if (req.data.teatofile) {
    //   for (const stud of req.data.teatofile ) {

    //     stud.url = `/Files(ID=${stud.ID},IsActiveEntity=true)/content`

      // }
    // }
    if (req.data.PhoneNumber) {
      if (!/^\d{10}$/.test(req.data.PhoneNumber)) {
        req.error(400, 'Phone number must be exactly 10 digits long.');
        return; // Exit if validation fails
      }

      const existingPhone = await SELECT.one.from(Teacher).where({ PhoneNumber: req.data.PhoneNumber });
      if (existingPhone) {
        req.error(409, `Phone number ${req.data.PhoneNumber} already exists.`);
        return; // Exit if validation fails
      }
    }

    // Validate Email
    if (req.data.Email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.data.Email) || !req.data.Email.endsWith('@gmail.com')) {
        req.error(400, 'Email must end with @gmail.com.');
        return; // Exit if validation fails
      }

      const existingEmail = await SELECT.one.from(Teacher).where({ Email: req.data.Email });
      if (existingEmail) {
        req.error(409, `Email ${req.data.Email} already exists.`);
        return; // Exit if validation fails
      }
    }
    
    
    req.data.TeacherID = '';
    req.data.status = "Pending";
    debugger
  //   const oauthToken = await generateToken();
  //  var token = `Bearer ${oauthToken}`;
    const phoneNumber = Number(req.data.PhoneNumber);
    if (isNaN(phoneNumber)) {
      req.error(400, 'Phone number must be a valid number.');
      return;
    }
    const Ad = await SELECT.one.from(authorisation).where({ role: 'Admin' });
      debugger
      if (Ad) {
        adminmail = Ad.Email;
      }
    let emailForRejected = '';
    const inputdepartmentname = req.data.DepartmentName ;
    let userData = await SELECT.one.from(authorisation ).where({ DepartmentName: inputdepartmentname });
    console.log(userData);
    if (userData) {
      emailForRejected = userData.Email;
    }
    else {
      const Admin = await SELECT.one.from(authorisation).where({ DepartmentName: 'others' });
      console.log(Admin);
      if (Admin) {
        emailForRejected = Admin.Email;
      } 
    }

   
    

// Continue with the rest of your logic using emailForRejected

const workflowContent = {
  "definitionId": "us10.25820971trial.nida.afreen",
  "context": {
    "_name": req.data.Name,
    "departmentname": req.data.DepartmentName,
    "address": req.data.Address ,
    "skills": req.data.skills,
    "uuid": req.data.ttuuid,
    "tid": req.data.TeacherID,
    "phonenumber": req.data.PhoneNumber,
    "email": req.data.Email,
    "degree": req.data.Degree,
    "field1": emailForRejected,
    "field2": adminmail,
    "dob": req.data.dob,
    "age": req.data.age
  }
};
 


var SPA_API = await cds.connect.to('BpaDest');
var response1 = await SPA_API.get('/workflow/rest/v1/workflow-instances');
var response = await SPA_API.post('/workflow/rest/v1/workflow-instances', workflowContent);
console.log(response);

    // const response = await axios.post(
    //   "https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances",
    //   data,
    //   {
    //     headers: {
    //       "Accept-Language": "en",
    //       "DataServiceVersion": "2.0",
    //       "Accept": "application/json",
    //       "Content-Type": "application/json",
    //       "Authorization": token
    //     }
    //   }

    // );

  });

  // this.after('UPDATE', 'Teacher', async (req) => {
  //   debugger
  //   //   // const tx = cds.transaction(req);
  //   if (req.status === 'Approved' && !req.TeacherID) {
  //     let teacherSequence = await SELECT.one.from(Sequence).where({ Name: 'TeacherID' });
  //     if (!teacherSequence) {
  //       teacherSequence = { Name: 'TeacherID', Value: 0 };
  //       await INSERT.into(Sequence).entries(teacherSequence);
  //     }
  //     const newId = teacherSequence.Value + 1;
  //     const newTID = `T${newId}`;
  //     var idha = req.ttuuid;
  //     await cds.update(Teacher).set({ TeacherID: newTID }).where({ ttuuid: idha });
      
  //     await cds.update(Sequence).set({ Value: newId }).where({ Name: 'TeacherID' });
  //   }
  //   // var tid = 'T99';

  // });



  this.before('UPDATE', Teacher, async (req) => {
    if(req.data.status == 'Approved' && !req.data.TeacherID){
  
      teacherSequence = await SELECT.one.from(Sequence).where({ Name: 'TeacherID' });
  
      // If no sequence exists, initialize it
      if (!teacherSequence) {
         teacherSequence = { Name: 'TeacherID', Value: 0 };
         await INSERT.into(Sequence).entries(teacherSequence);
     }
  
     const newId = teacherSequence.Value + 1;
      req.data.TeacherID = `T${newId}`;
  
      await UPDATE(Sequence).set({ Value: newId }).where({ Name: 'TeacherID' });

  
    }
  });






  //update teacher
  this.before('UPDATE', 'Teacher', async (req) => {
    const tx = cds.transaction(req);

    // Validate Phone Number
    if (req.data.PhoneNumber) {
      if (!/^\d{10}$/.test(req.data.PhoneNumber)) {
        req.error(400, 'Phone number must be exactly 10 digits long.');
        return; // Exit if validation fails
      }

      const existingPhone = await SELECT.one.from(Teacher)
        .where({ PhoneNumber: req.data.PhoneNumber, TeacherID: { '!=': req.data.TeacherID } });
      if (existingPhone) {
        req.error(409, `Phone number ${req.data.PhoneNumber} already exists.`);
        return; // Exit if validation fails
      }
    }

    // Validate Email
    // if (req.data.Email) {
    //   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.data.Email) || !req.data.Email.endsWith('@gmail.com')) {
    //     req.error(400, 'Email must end with @gmail.com.');
    //     return; // Exit if validation fails
    //   }

    //   const existingEmail = await SELECT.one.from(Teacher)
    //     .where({ Email: req.data.Email, TeacherID: { '!=': req.data.TeacherID } });
    //   if (existingEmail) {
    //     req.error(409, `Email ${req.data.Email} already exists with ID '${existingEmail.TeacherID}'.`);
    //     return; // Exit if validation fails
    //   }
    // }
    
  });
 

  
//   this.before('CREATE', 'Files', req => {
//     console.log('Create called')
//     console.log(JSON.stringify(req.data))
//     req.data.url = `/odata/v4/my/Files(${req.data.ID})/content`
// })

this.before('UPDATE', Teacher, req => {
debugger


  // if(req.data.teatofile ){
  //     for (const stud of req.data.teatofile) { 
  //         if(!stud.url) {
  //             stud.url = `/Files(id=${stud.id},IsActiveEntity=true)/content`
  //         }
  //     }
  // }    
});
// this.before('CREATE', 'Files', req => {
//   debugger
//   console.log('Create called')
//   console.log(JSON.stringify(req.data))
//   console.log("helloooooo",req.data.url);
//   req.data.url = `/Files(id=${req.data.id},IsActiveEntity=true)/content`
// })


// this.before(['CREATE', 'UPDATE'], Files.drafts, req => {
// console.log('Create Update Draft called')
// console.log(JSON.stringify(req.data))
// req.data.url = `/Files(id=${req.data.id},IsActiveEntity=true)/content`
// });

// this.on('READ', Teacher.drafts, async (req, next) => {
//   debugger
//   if(req.data.DOB){
//     var ageCal = calculateAge(req.data.DOB);
//     // req.data.Age = ageCal;
//     await cds.update(Teacher.drafts).set({ Age: ageCal }).where({ ttuuid: req.data.ttuuid});
// }
//   return next()
// });

// this.on('READ', Teacher.drafts, async (req, next) => {
//   if (req.data.DOB) {
//       const ageResult = calculateAge(req.data.DOB);

//       if (ageResult.error) {
//           // Return an error response if the age is invalid
//           return req.reject(400, ageResult.error);
//       }

//       // Update the Age if valid
//       await cds.update(Teacher.drafts).set({ Age: ageResult.age }).where({ ttuuid: req.data.ttuuid });
//   }

//   return next();
// });




this.on('READ', Teacher.drafts, async (req, next) => {
  // debugger
  if (req.data.dob) {
    var dat = req.data.dob
    var age = calculateAge(dat); // Call the function to calculate the age
    await cds.update(Teacher.drafts).set({ age: `'${age}'` }).where({ ttuuid: req.data.ttuuid });
    console.log("Age:", age); // Log the calculated age
    console.log(age)
    console.log(age)

  }
  else
    return next()
})
function calculateAge(dob) {
  debugger
  var today = new Date(); // Get the current date
  var birthDate = new Date(dob); // Convert dob to a Date object
  var age = today.getFullYear() - birthDate.getFullYear(); // Calculate the difference in years
  var monthDifference = today.getMonth() - birthDate.getMonth(); // Calculate the month difference

  // Adjust age if the birthday hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age; // Return the calculated age
}

this.before('CREATE', Files.drafts, async (req) => {
  debugger
      req.data.url = `/Files(id=${req.data.id},IsActiveEntity=true)/content`;
      return req;
  })
  this.before(['UPDATE','DELETE'], Files.drafts, async (req) => {
      debugger
      await DELETE.from(Files.drafts).where({fkey :req.ttuuid});
  })

 });



