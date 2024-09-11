sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project1/test/integration/FirstJourney',
		'project1/test/integration/pages/teacherList',
		'project1/test/integration/pages/teacherObjectPage'
    ],
    function(JourneyRunner, opaJourney, teacherList, teacherObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheteacherList: teacherList,
					onTheteacherObjectPage: teacherObjectPage
                }
            },
            opaJourney.run
        );
    }
);