const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = http.Server(app);
server.listen(port, () => {
    console.log(`listening to port ${port}`);
});

// socket routes
const io = socketIO(server);
// crating my custom client collection
let myClientList = [];

io.on('connection', (socket) => {
    // console.info(`Client connected [id=${socket.id}]`);

    socket.on('addId', data => {
        for (var i = 0; i < myClientList.length; i++) {
            if (myClientList[i].name === data.name) {
                myClientList.splice(i, 1);
            }
        }
        myClientList.push(data);
        // console.log(myClientList)
    });

    // receive msg
    socket.on('messageIn', data => {
        let deliverTo = "", arr = [], msg;

        // console.log(data);
        let array = data[1].split(" ");
        // console.log(array)
        for (var i in array) {
            if (array[i].startsWith('@')) {
                deliverTo = array[i].substring(1);
                continue;
            }
            arr.push(array[i]);
        }

        const dataToShow = {
            sender: data[0],
            msg: arr.join(" ")
        };
        // console.log(dataToShow, "line 54", deliverTo)
        if (deliverTo !== "") {
            const index = myClientList.findIndex(client => client.name === deliverTo);
            // console.log(index)
            socket.join(myClientList[index].id);
            io.sockets.to(myClientList[index].id).emit('messageOut', {dataToShow})
        } else {
            io.emit("messageOut", dataToShow)
        }

    });

    // disconnect user
    socket.on("disconnect", () => {
        myClientList = myClientList.filter(obj => obj.id !== socket.id);
        // console.log('disconnected');
        // console.log(myClientList)
    });

});