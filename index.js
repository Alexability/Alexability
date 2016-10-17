'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = "amzn1.echo-sdk-ams.39145b84-cb6b-47ef-a692-40b11479a949"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'Cornell';

/**
 * Array containing space facts.
 */
var FACTS = [
    "You can limit your negative emotions by participating in activities you’re good at. This will help you feel more competent, self-confident and in control. Would you like me to call Karen so you can ask her to go for a run?"
];
var CornellFact = [
    "You will feel better if you take your medication. Let's do a breting excercise together in the meantime."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Clara: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'GetCornellIntent': function () {
        this.emit('GetCornellFact');
    },
    'GetCornellFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * CornellFact.length);
        var randomFact = CornellFact[factIndex];

        // Create speech output
        var speechOutput = "Clara: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};