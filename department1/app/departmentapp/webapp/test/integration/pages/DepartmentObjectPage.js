sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'department.departmentapp',
            componentId: 'DepartmentObjectPage',
            contextPath: '/Department'
        },
        CustomPageDefinitions
    );
});