// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const request = require('request-promise');

const callGApps = (rssno) => {
    let url = "https://script.google.com/macros/s/A**************--******************************-*******/exec?num=" + rssno; //Google Apps URL
    var speakOutput = "";
    console.log('step 10 url:' + url);
    return request(url);
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        console.log('step 20');
	return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
	//const speakOutput = 'Welcome, you can say Hello or Help. Which would you like to try?';
        console.log('step 21');
	const speakOutputput = '1から12のどれにする？'; 

	return handlerInput.responseBuilder
	    .addDelegateDirective({
		name: 'RssIntent',
		confirmationStatus: 'NONE',
		slots: {}
	    })
	    .speak(speakOutput)
	    .reprompt(speakOutput)
	    .getResponse();
            // インテントチェーン https://developer.amazon.com/ja/blogs/alexa/post/b3939b11-5cef-4598-b2f9-c7ad904e1692/understanding-intent-chaining
    }
};

//const HelloWorldIntentHandler = {
const RssIntentHandler = {
    canHandle(handlerInput) {
        console.log('step 30');
	return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
	    && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RssIntent' 
	    && Alexa.getDialogState(handlerInput.requestEnvelope) !== 'COMPLETED';
    },
    //handle(handlerInput) {
    async handle(handlerInput) {
	//const speakOutput = 'ハローワールド!';
        console.log('step 31');
	const rssno = Alexa.getSlotValue(handlerInput.requestEnvelope, "rssno");
        console.log('rssno: '+ rssno);
	let speakOutput = "";
	await callGApps(rssno) 
	    .then(
		val => {
		    console.log( "speakOutput: " + val);
		    speakOutput = val;
		}
	    );

        console.log('step 32');
	let response = handlerInput.responseBuilder;
	if (speakOutput === "rangeerror") {
	    console.log('step 33');
	    console.log("数字範囲外");
	    handlerInput.requestEnvelope.request.intent.slots.rssno.value = undefined;
            speakOutput = '<speak><audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01"/> '+ rssno + 'は範囲外です。1から12の数を言ってね。</speak>';
            response.reprompt(speakOutput)
            .addElicitSlotDirective('rssno');
	}        

	//return handlerInput.responseBuilder
	return response 
	    .speak(speakOutput)
	    .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        console.log('step 40');
	return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
	    && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
	//const speakOutput = 'You can say hello to me! How can I help?';
        console.log('step 41');
	const speakOutput = '1から12の数字をいうと、それぞれの内容を読みますよ'; 

	return handlerInput.responseBuilder
	    .speak(speakOutput)
	    .reprompt(speakOutput)
	    .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        console.log('step 50');
	return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
	    && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
	    || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
	//const speakOutput = 'Goodbye!';
        console.log('step 51');
	const speakOutput = 'さよなら!';
	return handlerInput.responseBuilder
	    .speak(speakOutput)
	    .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        console.log('step 60');
	return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log('step 61');
	// Any cleanup logic goes here.
	return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        console.log('step 70');
	return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        console.log('step 71');
	const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
	//const speakOutput = `You just triggered ${intentName}`;
	const speakOutput = `今 ${intentName} しましたね`;

	return handlerInput.responseBuilder
	    .speak(speakOutput)
	    //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
	    .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        console.log('step 80');
	return true;
    },
    handle(handlerInput, error) {
        console.log('step 81');
	console.log(`~~~~ Error handled: ${error.stack}`);
	//const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;
	const speakOutput = `ごめんなさい。もういちどいってください。`;

	return handlerInput.responseBuilder
	    .speak(speakOutput)
	    .reprompt(speakOutput)
	    .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
	LaunchRequestHandler,
	//HelloWorldIntentHandler,
	RssIntentHandler,
	HelpIntentHandler,
	CancelAndStopIntentHandler,
	SessionEndedRequestHandler,
	IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    ).addErrorHandlers(
	ErrorHandler,
    ).lambda();

