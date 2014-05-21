/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DropBox = {
    errcounter: 0,
    initialize: function () {
        console.log("Trying to read Connection Object...");
        if(Connection) {
            F.explorer.getFileSystem();
        } else {
            if(DropBox.errcounter < 10) {
                DropBox.errcounter++;
                console.log("Error reading Connection Object... Trying " + DropBox.errcounter + " of 10...");
                setTimeout(function () {
                    DropBox.initialize();
                }, 300);
            } else {
                console.log("Connection time is too much to read Connection Object. Exiting...");
                Messages.error("Hubo un problema al detectar la red.");
                app.exit();
            }
        }
    }
};