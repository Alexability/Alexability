'use strict';
module.change_code = 1;
var _ = require('lodash');
function JobSeekHelper (obj) {
  this.started = false;
  this.jobSeekIndex = 0;
  this.currentStep = 0;
  this.jobSeek = [
    {
      title: 'Your Resume',
      template: 'Your Name is ${firstname} ${lastname}. Your email address is ${email}. The latest education you obtained was a ${degree_obtained} from ${latest_school} completed in ${graduation_year}.',
      // template: 'Your Name is ${firstname} ${lastname}. The latest education you obtained was a ${degree_obtained} from ${latest_school} in ${graduation_year}. ',
      steps: [
        {
          value: null,
          template_key: 'firstname',
          prompt: 'your first name',
          help: 'Please speak your first name',
          type: 'String'
        },
        {
          value: null,
          template_key: 'lastname',
          prompt: 'your last name',
          help: 'Please speak your last name',
          type: 'String'
        },
        {
          value: null,
          template_key: 'email',
          prompt: 'your email address',
          help: 'Please speak your email address',
          type: 'String'
        },
        {
          value: null,
          template_key: 'latest_school',
          prompt: 'the last school you attended',
          help: 'Please speak the last school you attended',
          type: 'String'
        },
        {
          value: null,
          template_key: 'degree_obtained',
          prompt: 'degree obtained',
          help: 'What was the last degree you obtained?',
          type: 'String'
        },
        {
          value: null,
          template_key: 'graduation_year',
          prompt: 'the graduation year',
          help: 'Please speak your the graduation year',
          type: 'Year'
        }
      ]
    }
  ];
  console.log("OBJ" + obj);
  for (var prop in obj) this[prop] = obj[prop];
}

JobSeekHelper.prototype.completed = function() {
  return this.currentStep === (this.currentJobSeek().steps.length - 1);
};

JobSeekHelper.prototype.getPrompt = function() {
  return this.getStep().prompt;
};
JobSeekHelper.prototype.getType = function() {
  return this.getStep().type;
};

JobSeekHelper.prototype.getStep = function() {
  return this.currentJobSeek().steps[this.currentStep];
};

JobSeekHelper.prototype.buildJobSeek= function() {
  var currentJobSeek = this.currentJobSeek();
  var templateValues = _.reduce(currentJobSeek.steps, function(accumulator, step) {
    accumulator[step.template_key] = step.value;
    return accumulator;
  }, {});
  var compiledTemplate = _.template(currentJobSeek.template);
  return compiledTemplate(templateValues);
};

JobSeekHelper.prototype.stepValue= function(valueIndex) {
  return this.jobSeek[this.jobSeekIndex].steps[valueIndex].value;
};


JobSeekHelper.prototype.currentJobSeek = function() {
  return this.jobSeek[this.jobSeekIndex];
};

module.exports = JobSeekHelper;


