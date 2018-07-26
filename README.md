### Configuration
- **Platform:** node
- **Framework**: express
- **Template Engine**: jade
- **CSS Framework**: bootstrap
- **CSS Preprocessor**: css
- **JavaScript Framework**: 
- **Build Tool**: none
- **Unit Testing**: none
- **Database**: mongodb
- **Deployment**: none

- How to run this project :
- 1.Setup mongoose or use mlab to save the user to database.
- 2.download this project.
- 3.open server.js and add the mongo connection details and the collection name .I have used "Demo" as collection name.
- 4.Update and install node packages .use npm install
- 5.Launch the project http://localhost:3000.
- 6.Give a name , email and choose a photograph to upload.Press the upload button.

###
- When the image file is uploaded ,i resize the file to 200 * 200 px on the client side and then use ajax to upload this file to uploads/pics/xxxxx.extn .This same path is stored in a hidden form element. 
- When the updateProfile button is clicked then a new user is created in collection and the path to the photograph /uploads/pics is stored in the mongodb.

- Once new user is created ,the image is read from the path in the mongo, it is in binary format.It is converted to base64 string and sent to the front end.The image is now displayed as a 120 *120 px photo.

- A lot of error handling is to be done ,if using this code in production.

- From this project ..you will know how to read a photo file .Resize it in client side. 
- Send it using ajax. Then rebuilding the image file from binary to base64 and back to a png/jpeg to be displayed using express and jade.

Good luck!













