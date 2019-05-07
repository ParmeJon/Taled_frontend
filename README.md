# TaleD Frontend

TaleD is a blog geared towards solo travelers. With the increase of solo travels over the years the dangers and worry for our friends have increased as well. TaleD services as both a way to keep your friends and family updated through a Concern Meter and a blog for your trip.

## Backend Link

https://github.com/ParmeJon/Taled_backend

## Installation

```
npm i
```
## Environment Variables

Create an account with [DeveloperHere](https://developer.here.com/) and request an API APP ID and APP CODE.
Create a .env file containing the following:


```
REACT_APP_GEOLOCATION_APP_ID=YOUR APP ID
REACT_APP_GEOLOCATION_APP_CODE=YOUR APP CODE
```

## Run

Start up frontend server after your backend server.

```
npm start
```

## Features

### Concern Meter
- Goes down to 0% after 25 hours of not posting.
- Updates to 100% based on the most recent post creation time compared to current time.
- Visually indicates user when to upload again for friends and family to know you're safe.

### Geolocation
- Developer Here API used for grabbing specific location name for your post based on coordinates.

### Friends
- Search bar created to search for other users.
- Friend request can be sent and accepted.
- Friends Page displays all accepted friends and their concern meter bar.

### In Progress
- Flushing out Action Cable to send over the "accept" Friendship action information without refresh to the requesting User.
- Friends' show pages.
- Dry out code.
- Geolocation MAP visual.

## Built With

- React - Javascript Library
- Redux to manage states and actions
- React Bootstrap for some CSS


## Created By

Jonathan Chan [Github](http://www.github.com/ParmeJon)
