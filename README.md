# QHangout
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

After Logging In, you are redirected to the Select Events tabe.
- You can create a New Event and a modal will appear for data input for the Name of the Event, Deadline for Voting, and the actual date of the event.
- From here, you can select an event, then a new option for the "Current Event" should appear in the NavBar
- A User can also see what Events they are also particpating in as well

Going to the Current Event Tab:
 - can add participants by adding their account Username
 - select Venues to and click on Vote to send a Vote Request that will decide where the Participants' Event will be held. (Note: Each Participant is only allowed to vote 3 times max)
 - If the event is past the deadline, Participants can no longer vote. Participants are Presented with the Venue for Event

 Going to the Add Venues tab:
- Users are able to Search for Venues through Yelp's Services by locations and search terms
- When a User selects a Venue they like, they can add it to the Event
    Dependency: An Event must be selected before being able to Add Venues to it