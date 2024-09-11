namespace db;
using {managed} from '@sap/cds/common'; 

entity Department {
    key uuid           : UUID;
    key DepartmentID   : String default '' @readonly;
        DepartmentName : String;
        deptToStudent  : Composition of many Student
                             on deptToStudent.studToDepartment = $self;
        deptToTeacher  : Composition of many TeacherDetails
                             on deptToTeacher.teachToDept = $self;
}

entity Student {
    key suuid            : UUID;
    key StudentID        : String default '' @readonly;
        DepartmentID     : String;
        Name             : String;
        PhoneNumber      : String;
        Email            : String;
        Address          : String;
        studToDepartment : Association to one Department
                               on studToDepartment.DepartmentID = DepartmentID;
}

entity Teacher {
    key ttuuid         : UUID;
     TeacherID      : String default '' @readonly;
        Name           : String;
        PhoneNumber    : String;
        Email          : String;
        Address        : String;
        Degree         : String;
        DepartmentName : String;
        skills         : String;
        status         : String default 'Pending';
        rejectedby : String;
        dob : Date;
        age : String;
        teatofile : Composition of  many Files on  teatofile.filtotea = $self
}

entity TeacherDetails {
    key Tuuid        : UUID;
    key TeacherID    : String;
        DepartmentID : String;
        Name         : String;
        PhoneNumber  : String;
        Email        : String;
        Address      : String;
        status : String default 'Approved';
        teachToDept  : Association to many Department
                           on teachToDept.DepartmentID = DepartmentID;
}


entity Sequence {
    key Name  : String;
        Value : Integer;
}

entity authorisation {
    key Email : String;
        role  : String;
        DepartmentName : String;
}


entity parent{
   key id:String;
    name:String;
}

entity Files: managed{
    key id : UUID;
    fkey : UUID;

    @Core.MediaType : mediaType
    content: LargeBinary;

    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    filtotea : Association to one Teacher on filtotea.ttuuid = fkey; 
}