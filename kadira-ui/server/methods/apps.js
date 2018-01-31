const BUSINESS_PLAN = 'business';

/*eslint-disable new-cap*/
Meteor.methods({
  "apps.create": function(appName, pricingType) {
    check(appName, String);
    check(pricingType, Match.OneOf("free", "paid"));
    Validations.checkAppName(appName);

    if(!this.userId){
      throw new Meteor.Error(403, "user must login to create app");
    }
    var shard = KadiraData.mongoCluster.pickShard();
    var subShard = Math.floor(Math.random() * 128);

    var app = {
      name: appName,
      created: new Date(),
      owner: this.userId,
      secret: Meteor.uuid(),
      plan: BUSINESS_PLAN,
      shard: shard,
      subShard: subShard,
      pricingType: pricingType
    };

    return Apps.insert(app);
  },
  "apps.updateName": function(appId, appName) {
    check(appId, String);
    check(appName, String);
    Validations.checkAppName(appName);
    Apps.update({_id: appId, owner: this.userId}, {$set: {name: appName}});
  },
  "apps.regenerateSecret": function(appId) {
    check(appId, String);
    var appSecret = Meteor.uuid();
    Apps.update({_id: appId, owner: this.userId}, {$set: {secret: appSecret}});
  },
  "apps.delete": function(appId){
    check(appId, String);
    Apps.remove({_id:appId, owner: this.userId});
    Alerts.remove({"meta.appId": appId});
  }
});
