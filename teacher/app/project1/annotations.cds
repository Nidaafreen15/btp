using ms as service from '../../srv/service';
annotate service.teacher with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'TeacherId',
                Value : TeacherId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'TeacherName',
                Value : TeacherName,
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
            Label : 'TeacherId',
            Value : TeacherId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'TeacherName',
            Value : TeacherName,
        },
    ],
);

