# Gdocs presence app backend 

The frontend of the gdocs presence app is built using react js.

 ### The architecture is as follows
 
 ![image](https://user-images.githubusercontent.com/24207790/88471236-68aa8780-cf24-11ea-9c55-33bdc7b5d5c1.png)

# Feature list

  - Login
  - Register
  - View file list
  - Create dummy file
  - View dummy file
  - View other users 
### Login
In login the react app uses the /login endpoint to send user credentials to the node js where the password is hashed using the node js crypto library and compared the to the hash in the db.

### Register
In register the credentials are sent to the /register endpoint where the password is hashed, a unique id is generated and the credentials are added to the database

### View file list

Here we send a GET request to /document which retrieves all the documents available and returns is at the response body in the form of an array.

### Create dummy file

We use the /document/create endpoint to create the new file.

### View file

When we view the file we use the /document/users endpoint to get the list of availble users for that particular document.

## How the Presence system works

For the presence system I have implemented a custom polling system which consist of 3 parts:
- getFileUserService
- activePollingService
- cleanupService

#### getFileUserService

This service gets the number of active users on a particular file. The API is called at an interval of 1 second.

#### activePollingService

This service is called to tell the server the client is alive and is called every 2 seconds

#### cleanupService

This service is called to tell the server to check for any inactive users an clean up accordingly.


