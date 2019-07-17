# QHangout
NOTE: STILL A WORK IN PROGRESS, EXPECIALLY IN THE FRONT-END

CURRENTLY WORKING ON:
- WORK ON FRONT-END:
    - Refactor current placeholder bootstrap lines
    - implement styling with SASS

BACKLOGGED TODO:
- FINISH UP BACK-END:
    - Finishup remaining api routes for:
        - delete User
        - delete Event
        - delete Venue
- TESTING
    - Incorperate testing Framework:
        - Jest or Mocha

<hr>

Hangout Planner App Built on the MERN Stack with Yelp Fusion API
- React.js
- Redux
- Node.js
- Express.js
- MongoDB

Implements JMT Authentication When Logging In with an Existing Account or Registering a New Accout
The Logging in will send a request to a backend auth route and generated a token that will be sent to the front end.
- Login requires: user Email Address, Password
- Registering a New User requires: Username, Email, Password, and Password verification
<img src="/readMeImages/Login.png" width="400">
<img src="/readMeImages/Register.png" width="400">


After Logging In, you are redirected to the Select Events tabe.
- You can create a New Event and a modal will appear for data input for the Name of the Event, Deadline for Voting, and the actual date of the event.
<img src="/readMeImages/CreateEvent.png" width="400">
- From here, you can select an event, then a new option for the "Current Event" should appear in the NavBar
- A User can also see what Events they are also particpating in as well
<img src="/readMeImages/SelectEvents.png" width="400">



 Going to the Add Venues tab:
- Users are able to Search for Venues through Yelp's Services by locations and search terms
- When a User selects a Venue they like, they can add it to the Event
    Dependency: An Event must be selected before being able to Add Venues to it
<img src="/readMeImages/AddVenue.png" width="450">


Going to the Current Event Tab:
 - can add participants by adding their account Username
 - select Venues to and click on Vote to send a Vote Request that will decide where the Participants' Event will be held. (Note: Each Participant is only allowed to vote 3 times max)
 - If the event is past the deadline, Participants can no longer vote. Participants are Presented with the Venue for Event. (STILL HAVE TO WORK ON THE FINAL EVENT COMPONENT.....)
 <img src="/readMeImages/EventBuilder.png" width="450">
 <img src="/readMeImages/FinalEventProto.png" width="400">

