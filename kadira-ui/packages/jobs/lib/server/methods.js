Meteor.methods({
  createOrUpdateJob: _createOrUpdateJob,
  deleteJob: _deleteJob,
  getProfilesUrl: _getProfilesUrl
});

function _deleteJob(jobId){
  check(jobId, String);
  var job = JobsCollection.findOne({_id: jobId}, {fields: {appId: 1}});
  if(!job){
    throw new Meteor.Error(403, 'jobId ' + jobId + ' not found');
  }

  var userId = Meteor.userId();
  var isAllowed = PermissionsMananger.roles.isAllowed("profiler", job.appId, userId);
  var isAdmin = Utils.isAdmin(Meteor.user());

  if(!isAllowed && !isAdmin){
    throw new Meteor.Error(403, i18n('permissions.profiler_delete_denied_msg'));
  }

  JobsCollection.remove(jobId);
}

function _createSomeUrl(jobId) {
  return `${process.env.DEBUG_PROFILER_URL}/kadira/profile/${jobId}_${Date.now()}`;
}

function _createOrUpdateJob (jobId, jobInfo) {
  check(jobId, String);
  check(jobInfo, Object);
  check(jobInfo.appId, String);
  check(jobInfo["data.name"], String);
  check(jobInfo["data.duration"], Match.Optional(Match.Integer));
  check(jobInfo.type, String);

  var isValidName = Validations.checkName(jobInfo["data.name"]);
  if(!isValidName){
    throw new Meteor.Error(403, i18n('alerts.invalid_job_name'));
  }

  var plan = Utils.getPlanForTheApp(jobInfo.appId);
  if(!PlansManager.allowFeature('profiler', plan)){
    throw new Meteor.Error(403, i18n('profiler.profiler_denied_msg'));
  }

  var userId = Meteor.userId();
  var isAllowed = PermissionsMananger.roles.isAllowed('profiler', jobInfo.appId, userId);
  var isAdmin = Utils.isAdmin(Meteor.user());
  if(!isAllowed && !isAdmin){
    throw new Meteor.Error(403, i18n('profiler.not_authorized'));
  }

  var createdAt = new Date();
  jobInfo.updatedAt = new Date();

  var url = _createSomeUrl(jobId);
  jobInfo['data.uploadUrl'] = url;
  var fields = { $set: jobInfo, $setOnInsert: {"createdAt": createdAt}};
  JobsCollection.update({_id :jobId}, fields, {upsert: true});
}

function _getProfilesUrl() {
    return `${process.env.DEBUG_PROFILER_URL}`;
}
