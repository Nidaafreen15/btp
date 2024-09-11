using MyService as service from '../../srv/service';
annotate service.Teacher with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'TeacherID',
                Value : TeacherID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : Name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PhoneNumber',
                Value : PhoneNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Email',
                Value : Email,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Address',
                Value : Address,
            },
            {
                $Type : 'UI.DataField',
                Value : skills,
                Label : 'skills',
            },
            {
                $Type : 'UI.DataField',
                Value : DepartmentName,
                Label : 'DepartmentName',
            },
            {
                $Type : 'UI.DataField',
                Value : Degree,
                Label : 'Degree',
            },
            {
                $Type : 'UI.DataField',
                Value : age,
                Label : 'age',
            },
            {
                $Type : 'UI.DataField',
                Value : dob,
                Label : 'dob',
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
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'TeacherID',
            Value : TeacherID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : Name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'PhoneNumber',
            Value : PhoneNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Email',
            Value : Email,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Address',
            Value : Address,
        },
    ],
    UI.LineItem #tableView5 : [
    ],
    UI.SelectionPresentationVariant #tableView6 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView5',
            ],
            GroupBy : [
                Address,
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Rejected',
    },
    UI.LineItem #tableView6 : [
        {
            $Type : 'UI.DataField',
            Value : rejectedby,
            Label : 'rejectedby',
        },
        {
            $Type : 'UI.DataField',
            Value : Name,
            Label : 'Name',
        },
        {
            $Type : 'UI.DataField',
            Value : DepartmentName,
            Label : 'DepartmentName',
        },
    ],
    UI.SelectionPresentationVariant #tableView7 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView6',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'rejected',
                        },
                    ],
                },
            ],
        },
        Text : 'Rejected',
    },
    UI.LineItem #tableView7 : [
        {
            $Type : 'UI.DataField',
            Value : TeacherID,
            Label : 'TeacherID',
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
    ],
    UI.SelectionPresentationVariant #tableView8 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView7',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Pending',
                        },
                    ],
                },
            ],
        },
        Text : 'Pending',
    },
);

annotate service.Teacher with {
    Name @Common.FieldControl : #Mandatory
};
annotate service.Teacher with {
    PhoneNumber @Common.FieldControl : #Mandatory
};
annotate service.Teacher with {
    Email @Common.FieldControl : #Mandatory
};
annotate service.Teacher with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : TeacherID,
        },
        TypeName : '',
        TypeNamePlural : '',
    }
);
annotate service.Teacher with @(
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Approved',
    },
    UI.LineItem #tableView : [
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View 1',
    }
);
annotate service.Teacher with @(
    UI.LineItem #tableView1 : [
    ],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View 2',
    }
);
annotate service.Teacher with @(
    UI.LineItem #tableView2 : [
    ],
    UI.SelectionPresentationVariant #tableView3 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView2',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Table View 3',
    }
);
annotate service.Teacher with @(
    UI.LineItem #tableView3 : [
    ],
    UI.SelectionPresentationVariant #tableView4 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView3',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Rj',
                        },
                    ],
                },
            ],
        },
        Text : 'Rejected',
    }
);
annotate service.Teacher with @(
    UI.LineItem #tableView4 : [
    ],
    UI.SelectionPresentationVariant #tableView5 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView4',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Pending',
                        },
                    ],
                },
            ],
        },
        Text : 'Pending',
    }
);
annotate service.Teacher with {
    age @Common.FieldControl : #ReadOnly
};

annotate service.Teacher with {
    DepartmentName @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Department',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : DepartmentName,
                    ValueListProperty : 'DepartmentName',
                },
            ],
            Label : 'drop',
        },
        Common.ValueListWithFixedValues : true
)};

