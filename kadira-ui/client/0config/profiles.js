Meteor.startup(function() {
    Meteor.call('getProfilesUrl', (error, result) => {
        if (result) {
            Meteor._localStorage.setItem('debug.profiler.url', result);
        } else {
            Meteor._localStorage.setItem('debug.profiler.url', null);
        }
    });
});
