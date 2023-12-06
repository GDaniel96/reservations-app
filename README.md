# Reservations App

This is an app in which users are able to select a specific date and time from a calendar implemented with the library "v-calendar", place their first and last name and a description for their reservation and that reservation will appear in the dashboard that can be found on the home page. The users will alse receive and e-mail with all the reservation details. The email service was implemented using "emailjs".

The reservations are being stored in a firebase store and the application also has an authentication in order for the users to be able to view only their reservations. The users are able to also delete their reservations and also to filter them by All/Next week/Next month.

There is also an "admin" access to this web app in which the user who has the admin role will be able to see all the reservations. 

The admin credentials for the app are:
admin@admin.com
admin123

The users also have the posibility to create a new account and log out the current account. The application also persists the user session after refreshing the page or closing and opening the browser window. 
