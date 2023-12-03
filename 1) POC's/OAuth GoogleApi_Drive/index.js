import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { google } from 'googleapis';
import multer from 'multer';
import fs from 'fs';
import formidable, { errors as formidableErrors } from 'formidable';

// import credentials from './Credential.json' assert { type: "json" };


const app = express();


const credentials = JSON.parse(fs.readFileSync('./Credential.json'));




const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('api Running'));

// getting the getAuthURL and code using get
app.get('/getAuthURL', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE,
    })
    console.log("🚀 ~ file: index.js:38 ~ app.get ~ authUrl:", authUrl)

    return res.send(authUrl);
})

// Post getToken  {imp it only works one time if we wan tto hit the api with the server it is going to give us an error response}
app.post('/getToken', (req, res) => {
    if (req.body.code == null) {
        return res.status(404).send('invalid Request');

    }
    else {
        oAuth2Client.getToken(req.body.code, (error, token) => {
            if (error) {
                console.error("Error retriving access token: ", error);
                return res.status(400).send('error retrieving access token: ', error)
            }
            res.send(token)
        });
    }
})


// to set profile info

app.post('/getUserInfo', (req, res) => {
    if (req.body.token === null) {
        return res.status(400).send("token not found");
    }
    else {
        oAuth2Client.setCredentials(req.body.token);
        const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });

        oauth2.userinfo.get((error, response) => {
            if (error) {
                res.status(400).send(error);

            } else {
                res.status(200).send(response.data);
            }
        })
    }
})

// using Multer

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload');
    },
    filename: function (req, file, callback) {
        callback(null, "file_" + Date.now() + "_" + file.originalname);
    },

})

var upload = multer({
    storage: Storage,
}).single("file")


//  Post method to read drive
app.post('/readDrive', (req, res) => {
    if (req.body.token === null) {
        return res.status(400).send("token not found");
    }
    else {
        oAuth2Client.setCredentials(req.body.token);
        const drive = google.drive({ version: 'v3', auth: oAuth2Client });

        drive.files.list({ pageSize: 10, }, (error, response) => {
            if (error) {
                console.log("The Api returende an error" + error)
                return res.status(400).send(error);
            }
            const files = response.data.files;

            if (files.length) {
                console.log("🚀 ~ file: index.js:117 ~ drive.files.list ~ files:", files)

                files.map((file) => {
                    console.log(`File name is ${file.name}  and  ${file.id}`)
                });

            }
            else {
                console.log("No files are found")
            }

            res.send(files)
        })
    }
})


// Upload file

app.post("/fileUpload", (req, res) => {
    const form = formidable({});

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).send(err,"Invalid")
        }
        else {
            const token = JSON.parse(fields.token);
            console.log("🚀 ~ file: index.js:145 ~ form.parse ~ token:", token)

            if (token === null) {
                return res.status(404).send("token not found");
            }
            else {
                oAuth2Client.setCredentials(token);
                console.log("qwqqqqqqqqqqqqqqqqqqqqqq", oAuth2Client.setCredentials(req.body.token))
                console.log(files.file);
                const drive = google.drive({ version: 'v3', auth: oAuth2Client });
                const fileMetadata = {
                    name: files.file.name,
                }
                const media = {
                    mimeType: files.file.type,
                    body: fs.createReadStream(files.file[0].filepath)
                }

                drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: "id"
                }, (err, file) => {
                    // oAuth2Client.setCredentials(null)
                    if (err) {
                        console.log(err)
                        res.status(400).send("token not found");
                    } else {
                        res.send("success")
                    }
                })
            }

        }
    })
})
// app.post('/fileUpload', (req, res) => {
//     const form = formidable({});

//     form.parse(req, (err, fields, files) => {
//         if (err) return res.status(400).send(err);
//         const token = JSON.parse(fields.token);
//         console.log(token)
//         if (token == null) return res.status(400).send('Token not found');
//         oAuth2Client.setCredentials(token);

//         console.log("191", files.file[0].filepath);

//         const drive = google.drive({ version: "v3", auth: oAuth2Client });
//         const fileMetadata = {
//             name: files.file.name,
//         };

//         const media = {
//             mimeType: files.file.type,
//             body: fs.createReadStream(files.file[0].filepath),
//         };
//         drive.files.create(
//             {
//                 resource: fileMetadata,
//                 media: media,
//                 fields: "id",
//             },
//             (err, file) => {
//                 oAuth2Client.setCredentials(null);
//                 if (err) {
//                     console.error(err);
//                     res.status(400).send(err)
//                 } else {
//                     res.send('Successful')
//                 }
//             }
//         );
//     });
// });






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started ${PORT}`))
