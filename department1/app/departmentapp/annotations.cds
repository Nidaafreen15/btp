using MyService as service from '../../srv/service';
annotate service.Department with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'DepartmentID',
                Value : DepartmentID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'DepartmentName',
                Value : DepartmentName,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student',
            ID : 'Student',
            Target : 'deptToStudent/@UI.LineItem#Student',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Teacher',
            ID : 'Teacher',
            Target : 'deptToTeacher/@UI.LineItem#Teacher',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'DepartmentID',
            Value : DepartmentID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'DepartmentName',
            Value : DepartmentName,
        },
    ],
);

annotate service.Student with @(
    UI.LineItem #Student : [
        {
            $Type : 'UI.DataField',
            Value : StudentID,
            Label : 'StudentID',
        },{
            $Type : 'UI.DataField',
            Value : PhoneNumber,
            Label : 'PhoneNumber',
        },{
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },{
            $Type : 'UI.DataField',
            Value : Email,
            Label : 'Email',
        },{
            $Type : 'UI.DataField',
            Value : DepartmentID,
            Label : 'DepartmentID',
        },{
            $Type : 'UI.DataField',
            Value : Address,
            Label : 'Address',
        },]
);
annotate service.TeacherDetails with @(
    UI.LineItem #Teacher : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'TeacherID',
        },{
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },{
            $Type : 'UI.DataField',
            Value : PhoneNumber,
            Label : 'PhoneNumber',
        },{
            $Type : 'UI.DataField',
            Value : Email,
            Label : 'Email',
        },{
            $Type : 'UI.DataField',
            Value : Address,
            Label : 'Address',
        },{
            $Type : 'UI.DataField',
            Value : DepartmentID,
            Label : 'DepartmentID',
        },]
);
annotate service.TeacherDetails with {
    Name @Common.FieldControl : #Mandatory
};
annotate service.TeacherDetails with {
    PhoneNumber @Common.FieldControl : #Mandatory
};
annotate service.TeacherDetails with {
    Email @Common.FieldControl : #Mandatory
};
annotate service.Student with {
    Name @Common.FieldControl : #Mandatory
};
annotate service.Student with {
    Email @Common.FieldControl : #Mandatory
};
annotate service.Student with {
    PhoneNumber @Common.FieldControl : #Mandatory
};
annotate service.TeacherDetails with {
    TeacherID @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Teacher',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : TeacherID,
                    ValueListProperty : 'TeacherID',
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'Name',
                    LocalDataProperty : Name,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'PhoneNumber',
                    LocalDataProperty : PhoneNumber,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'Email',
                    LocalDataProperty : Email,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'Address',
                    LocalDataProperty : Address,
                },
                {
                    $Type : 'Common.ValueListParameterIn',
                    ValueListProperty : 'status',
                    LocalDataProperty : status,
                },
            ],
            Label : 'Teacher',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.Department with @(
    UI.HeaderInfo : {
        TypeName : 'DEPARTMENT APP',
        TypeNamePlural : '',
        Title : {
            $Type : 'UI.DataField',
            Value : DepartmentID,
        },
    }
);
annotate service.TeacherDetails with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Teacher',
            ID : 'Teacher',
            Target : 'teachToDept/@UI.LineItem#Teacher',
        },
    ]
);
annotate service.Department with @(
    UI.LineItem #Teacher : [
        {
            $Type : 'UI.DataField',
            Value : deptToTeacher.teachToDept.deptToTeacher.Address,
            Label : 'Address',
        },{
            $Type : 'UI.DataField',
            Value : deptToTeacher.teachToDept.deptToTeacher.Email,
            Label : 'Email',
        },{
            $Type : 'UI.DataField',
            Value : deptToTeacher.teachToDept.deptToTeacher.Name,
            Label : 'Name',
        },{
            $Type : 'UI.DataField',
            Value : deptToTeacher.teachToDept.deptToTeacher.PhoneNumber,
            Label : 'PhoneNumber',
        },{
            $Type : 'UI.DataField',
            Value : deptToTeacher.teachToDept.deptToTeacher.TeacherID,
            Label : 'TeacherID',
        },]
);
annotate service.Student with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'student details',
            ID : 'studentdetails',
            Target : '@UI.FieldGroup#studentdetails',
        },
    ],
    UI.FieldGroup #studentdetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : StudentID,
                Label : 'StudentID',
            },{
                $Type : 'UI.DataField',
                Value : PhoneNumber,
                Label : 'PhoneNumber',
            },{
                $Type : 'UI.DataField',
                Value : Name,
                Label : 'Name',
            },{
                $Type : 'UI.DataField',
                Value : Email,
                Label : 'Email',
            },{
                $Type : 'UI.DataField',
                Value : DepartmentID,
                Label : 'DepartmentID',
            },{
                $Type : 'UI.DataField',
                Value : Address,
                Label : 'Address',
            },],
    }
);
annotate service.Student with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : StudentID,
        },
        TypeName : '',
        TypeNamePlural : '',
    }
);
