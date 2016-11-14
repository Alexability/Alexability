"use strict";


module.change_code = 1;
var _ = require("lodash");
var Skill = require("alexa-app");
var skillService = new Skill.app("jobseek");
var JobSeekHelper = require("./jobseek_helper");
var JOB_SEEK_SESSION_KEY = "jobseek_builder";
var getJobSeekHelper = function(request) {
  var jobSeekHelperData = request.session(JOB_SEEK_SESSION_KEY);
  if (jobSeekHelperData === undefined) {
    jobSeekHelperData = {};
  }
  console.log("jobSeekHelperData is: "+ jobSeekHelperData)
  return new JobSeekHelper(jobSeekHelperData);
};
var cancelIntentFunction = function(request, response) {
  response.say("Goodbye!").shouldEndSession(true);
};

skillService.intent("AMAZON.CancelIntent", {}, cancelIntentFunction);
skillService.intent("AMAZON.StopIntent", {}, cancelIntentFunction);

skillService.launch(function(request, response) {
  var prompt = "Welcome to Job Seek. "
    + "To create a new Job Seek Profile, say create a jobseek résumé";
  response.say(prompt).shouldEndSession(false);
});

skillService.intent("AMAZON.HelpIntent", {},
  function(request, response) {
    var jobSeekHelper = getJobSeekHelper(request);
    var help = "Welcome to Job Seek. "
      + "To create a new resume, say create a Job Seek Profile"
      + "You can also say stop or cancel to exit.";
    if (jobSeekHelper.started) {
      help = jobSeekHelper.getStep().help;
    }
    response.say(help).shouldEndSession(false);
  });

skillService.intent("jobSeekIntent", {
  "slots": {
    "STEPVALUE": "STEPVALUES",
    "Year" : "AMAZON.FOUR_DIGIT_NUMBER",
    "Number" : "AMAZON.NUMBER",
    "FirstName" : "AMAZON.US_FIRST_NAME",
    "City" : "AMAZON.US_CITY"
    //"State" : "AMAZON.US_STATE"
  },
  "utterances": ["{new|start|create|begin|build} {|a|the} jobSeek", "{-|STEPVALUE|Year}"]
},
  function(request, response) {
    console.log("HELLO I am here")
    var jobSeekHelper = getJobSeekHelper(request);
    console.log("Shit"+ jobSeekHelper.getType())
    if (jobSeekHelper.getType() == "Year")
    {
      console.log("I am at the year")
      var stepValue = request.slot("Year");
    }
    else
    {
      console.log("I am at the else")
      var stepValue = request.slot("STEPVALUE");
    }
    jobSeekHelper.started = true;
    if (stepValue !== undefined) {
      jobSeekHelper.getStep().value = stepValue;
    }
    if (jobSeekHelper.completed()) {
      var completedJobSeek = jobSeekHelper.buildJobSeek();
      response.card(jobSeekHelper.currentJobSeek().title, completedJobSeek);
      response.say("Here is what I have for your resume: " + completedJobSeek + " Would you like to make any changes?");
      response.shouldEndSession(true);
    } else {
      if (stepValue !== undefined) {
        jobSeekHelper.currentStep++;
      }
      response.say("Tell me " + jobSeekHelper.getPrompt());
      response.reprompt("I didn't hear anything. Tell me " + jobSeekHelper.getPrompt() + " to continue.");
      response.shouldEndSession(false);
    }
    console.log(stepValue)
    response.session(JOB_SEEK_SESSION_KEY, jobSeekHelper);
  }
);
module.exports = skillService;





