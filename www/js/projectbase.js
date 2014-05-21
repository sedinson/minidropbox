/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.support.cors = true;

var _nullResponse = {
    done: function (f) {
        f(null);
        return _nullResponse;
    },
    always: function (f) {
        f();
        return _nullResponse;
    },
    error: function (f) {
        f(0, 'error', '');
        return _nullResponse;
    }
};

//var uget = function (params) {
//    var networkState = navigator.connection.type;
//    if (networkState == Connection.NONE){
//        console.log("No internet connection.");
//        return _nullResponse;
//    }else{
//       return $.ajax({
//            type: (params.type)? params.type : 'GET',
//            url: (params.url)? params.url : '',
//            data: (params.data)? params.data : {},
//            crossDomain: true
//        });
//    }
//};

var uget = function (params) {
    return $.ajax({
        type: (params.type)? params.type : 'GET',
        xhrFields: {
           withCredentials: true
        },
        url: (params.url)? params.url : '',
        data: (params.data)? params.data : {},
        crossDomain: true
     });
};

function Linker (url) {
    var baseUrl = (url.substring(url.length-1) === "/")? url.substring(0, url.length-1) : url,
        extension = '.php?';
    
    this.Url = function (controller, action, get) {
        var strget = "";

        for(var key in get) {
            if(!isNaN(key)) {
                strget += get[key] + '/';
            } else {
                strget += key + '=' + get[key] + '&';
            }
        }
        
        //strget = (strget.length > 0)? strget.substring(0, strget.length-1) : strget;
        if(controller.length > 0) {
            if(action.length > 0) {
                return baseUrl + '/' + controller + '/' + action + extension + strget;
            } else {
                return baseUrl + '/' + controller;
            }
        } else {
            return baseUrl;
        }
    };
    
    this.Absolute = function (url, get) {
        var strget = "";

        for(var key in get) {
            if(!isNaN(key)) {
                strget += get[key] + '/';
            } else {
                strget += key + '=' + get[key] + '&';
            }
        }
        
        return baseUrl + '/' + url + strget;
    };
    
    this.setBaseUrl = function (url) {
        baseUrl = (url.substring(url.length-1) === "/")? url.substring(0, url.length-1) : url;
    };
    
    this.setExtension = function (ext) {
        extension = ext;
    };
};

var Pages = {
    popup: function (resp) {
        $('#dialog-popup').popup( "open" );
        $("#dialog-popup").find(".ui-content").html(resp);
        Machine.load();
    },
    goTo: function (name) {
        $.mobile.changePage(name, {
            transition: 'none'
        });
    },
    loading: function (isLoaded) {
        if(isLoaded) {
            $.mobile.loading('hide');
        } else {
            $.mobile.loading( 'show', {
                text: 'Cargando...',
                textVisible: true,
                theme: 'a',
                html: ""
            });
        }
    }
};

var Messages = {
    error: function (message) {
        alert(message);
    }
};

var LinkPage = new Linker('http://intense-peak-5778.herokuapp.com');