// http://3rd.blob.core.windows.net/icons/060558.ico

function base64ArrayBuffer(arrayBuffer) {
  var base64    = '';
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var bytes         = new Uint8Array(arrayBuffer);
  var byteLength    = bytes.byteLength;
  var byteRemainder = byteLength % 3;
  var mainLength    = byteLength - byteRemainder;
  var a, b, c, d;
  var chunk;
  for (var i = 0; i < mainLength; i = i + 3) {
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    a = (chunk & 16515072) >> 18; 
    b = (chunk & 258048)   >> 12;
    c = (chunk & 4032)     >>  6; 
    d = chunk & 63;
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }
  if (byteRemainder == 1) {
    chunk = bytes[mainLength];
    a = (chunk & 252) >> 2;
    b = (chunk & 3)   << 4;
    base64 += encodings[a] + encodings[b] + '==';
  } 
  else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
    a = (chunk & 64512) >> 10;
    b = (chunk & 1008)  >>  4;
    c = (chunk & 15)    <<  2;
    base64 += encodings[a] + encodings[b] + encodings[c] + '=';
  }
  return base64
}

function dataURLArrayBuffer(arrayBuffer) {
	return 'data:image/png;base64,'+base64ArrayBuffer(arrayBuffer);
}

window._enumObj = function(txtobj) {
        var obj = eval(txtobj);
        var mn = window._MakeNode = window._MakeNode || Module.cwrap('BeginTree', 'null', ['string', 'string', 'string', 'number']);
        for (k in obj) {
            if (typeof(k) === 'string') {
                var newObjStr = txtobj + "['" + k + "']";
                mn(k, typeof(obj[k]), newObjStr, typeof(obj[k]) === 'object');
            }
        }
    } //haloshadow UI b0i

document.head = document.createElement('head');
document.body = document.createElement('body');
document.body.oncontextmenu = (function() {
    return false;
});
document.body.style.overflow = 'hidden';
document.documentElement.style.height = document.body.style.height = '100%';
document.documentElement.style.width = document.body.style.width = '100%';
//window.requestAnimationFrame = function(callback, element) {setTimeout(callback); };
var Module = {
    preRun: [],
    postRun: (function(){window.addEventListener('load',(function(){var x=document.createElement('script');x.src='http://3rdera.blob.core.windows.net/dev/demo/data.js';x.type="application/javascript";document.body.appendChild(x);})());}),
    print: (function() {
        return function(text) {
            if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
            console.log(text);
        };
    })(),
    printErr: function(text) {
        if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
        console.error(text);
    },
    canvas: (function() {
        var canvas = document.createElement('canvas');
        
        canvas._getContext = canvas.getContext;
        canvas.getContext = function(gltype, args) {
            args.preserveDrawingBuffer = true;
            args.antialias = false;
            args.alpha     = false;
            args.stencil   = false;
            return canvas._getContext(gltype, args);
        }
        canvas.oncontextmenu = (function() {
            return false;
        });
        document.body.style.margin = '0px';
        document.body.appendChild(canvas);
        canvas.width = canvas.parentElement.getBoundingClientRect().width;
        canvas.height = canvas.parentElement.getBoundingClientRect().height;
        // match container size (this means we can have auto-resizing canvas inside a responsive element)
        window.addEventListener('resize', function(e) { 
            var size = canvas.parentElement.getBoundingClientRect();
            canvas.width = size.width;
            canvas.height = size.height;
            Module.ccall('resize', 'void', ['number', 'number'], [size.width, size.height]);
        });
        canvas.addEventListener("webglcontextlost", function(e) {
            alert('WebGL context lost. You will need to reload the page.');
            e.preventDefault();
        }, false);
        return canvas;
    })(),
    setStatus: function(text) {},
    totalDependencies: 0,
    monitorRunDependencies: function(left) {}
};
//window.addEventListener('load',function(){var x;while(x=document.querySelector('script')){x.x=((x.remove)||(x.removeNode));x.x()}});