FlowRouter.notFound = {
  action() {
    BlazeLayout.render('layout', {top: 'header', main: 'pageNotFound' });
  },
};
FlowRouter.route('/', {
  name: 'home',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {top: 'header', main:'hasBlocked', targetTemplate :'home', footer: 'footer'});
  },
  subscriptions: function(params, queryParams) {
    this.register('status', Meteor.subscribe('userStatus'));
    this.register('learnings', Meteor.subscribe('learnings'));
    this.register('hangouts', Meteor.subscribe('hangouts'));
  }
});

FlowRouter.route('/hangout/:hangoutId', {
  name: 'hangout',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {top: 'header', main: 'hasBlocked', targetTemplate : 'hangout', footer: 'footer'});
  }
});

FlowRouter.route('/about', {
  name: 'about',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {top: 'header', main: 'about', footer: 'footer'});
  }
});

FlowRouter.route('/faq', {
  name: 'faq',
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {top: 'header', main: 'faq', footer: 'footer'});
  }
});

FlowRouter.route('/profile/:name/:userId', {
  name: 'profile',
  triggersEnter: [function(context, redirect) {
    if (!Meteor.userId()) {
      redirect('/');
    }
  }],
  action: function(params, queryParams) {
    BlazeLayout.render('layout', {top: 'header', main: 'hasBlocked', targetTemplate :'profile', footer: 'footer'});
  },
  subscriptions: function(params, queryParams) {
    this.register('learnings', Meteor.subscribe('ownLearnings'));
    this.register('hangouts', Meteor.subscribe('hangoutsJoined'));
  }
});

var sys = FlowRouter.group({
  prefix: "/admin",
});

sys.route('/', {
  name: 'admin',
  action: function() {
    BlazeLayout.render('sysLayout',{top: 'sysHeader', main: 'adminLanding'});
  }
});

sys.route('/dashboard', {
  name: 'stats',
  action: function() {
    BlazeLayout.render('sysLayout',{top: 'header', main: 'hasPermission', targetTemplate: 'dashboard'})
  }
});
sys.route('/dashboard/:sortUserAs', {
  name: 'dashboard',
  action: function() {
    BlazeLayout.render('sysLayout',{top: 'header', main: 'hasPermission', targetTemplate: 'sortUserAs'})
  }
});
sys.route('/manage-users', {
  name: 'manage user',
  action: function() {
    BlazeLayout.render('sysLayout',{top: 'header', main: 'hasPermission', targetTemplate: 'manageUser'})
  }
});
sys.route('/users/:role', {
  name: 'user by role',
  action: function() {
    BlazeLayout.render('sysLayout',{top: 'header', main: 'hasPermission', targetTemplate: 'usersByRole'})
  }
});
sys.route('/user/:userId', {
  name: 'user by id',
  action: function() {
    BlazeLayout.render('sysLayout',{top: 'header', main: 'hasPermission', targetTemplate: 'userById'})
  }
});
sys.route('/notifications', {
  name: 'notifications',
  action: function() {
    BlazeLayout.render('sysLayout',{top: 'header', main: 'hasPermission', targetTemplate: 'allNotification'})
  }
});