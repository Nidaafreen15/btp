sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'department/departmentapp/test/integration/FirstJourney',
		'department/departmentapp/test/integration/pages/DepartmentList',
		'department/departmentapp/test/integration/pages/DepartmentObjectPage'
    ],
    function(JourneyRunner, opaJourney, DepartmentList, DepartmentObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('department/departmentapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDepartmentList: DepartmentList,
					onTheDepartmentObjectPage: DepartmentObjectPage
                }
            },
            opaJourney.run
        );
    }
);