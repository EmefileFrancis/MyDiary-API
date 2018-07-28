# MyDiary-API
[![Build Status](https://travis-ci.org/EmefileFrancis/MyDiary-API.svg?branch=develop)](https://travis-ci.org/EmefileFrancis/MyDiary-API)
[![Coverage Status](https://coveralls.io/repos/github/EmefileFrancis/MyDiary-API/badge.svg?branch=feature%2Ffetch-all-entries)](https://coveralls.io/github/EmefileFrancis/MyDiary-API?branch=feature%2Ffetch-all-entries)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
[![Coverage Status](https://coveralls.io/repos/github/EmefileFrancis/MyDiary-API/badge.svg)](https://coveralls.io/github/EmefileFrancis/MyDiary-API)
[![Coverage Status](https://coveralls.io/repos/github/EmefileFrancis/MyDiary-API/badge.svg?branch=features%2Ffetch-entry-by-id)](https://coveralls.io/github/EmefileFrancis/MyDiary-API?branch=features%2Ffetch-entry-by-id)

### Introduction
This app is a project worked on during Andela's Bootcamp. It enables users to pen down thoughts which they would like to remember sometime in the future. The project compromises of both the UI and the API endpoints. Users, when using the app, can colour-code each diary entry by checking any of the colourful radio buttons.

### Technology
HTML, CSS for the UI.
Node.js for the Backend.
Express
Postgres for the Database.
Mocha, Chai and Supertest for testing.
Travis for Continuous Integration.

### Features
1. Users can sign-up using their email, password and choose a username.
2. Users can add new diary entry by entering a title, a body, selecting their preferred color and clicking the save button.
3. On saving, the new entry enters the database, and it is displayed in a list on the right hand side of the screen.
4. From the list, users can click on an entry to view it, and can modify it.
5. Users can view their profile, which shows the total number of entries they have, and select whether they would like to be reminded daily to add a new diary entry.
6. All the features- signup, login, add new entry, modify entry e.t.c are all powered by API endpoints.

### To Contribute
Contributions are welcomed. Code should conform to the Airbnb Javascript Coding Style guide.
1. Make a fork of the repository
2. Create a branch in this format - features/new-features
3. Make changes
4. Test and build changes
5. Make a Pull Request again the develop branch

### Author
Emefile Francis F.
