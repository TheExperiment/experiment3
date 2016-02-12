
var winW = window.innerWidth;
var winH = window.innerHeight;
var currX = 0;
var currY = 0;

var scene = new THREE.Scene({background: 0x00ff00});
var camera = new THREE.PerspectiveCamera( 85, winW / winH, 0.1, 1000 );
var directionalLight, pointLight;
var lightAdded = false;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( winW, winH );
renderer.setClearColorHex( 0x000000, 1 );
document.body.appendChild( renderer.domElement );

var shape = new THREE.Object3D();

var plane1_material = new THREE.MeshDepthMaterial({ 
  // map:THREE.ImageUtils.loadTexture('images/person.jpg'), transparent: true
  map: plane1_material
})
var plane1Geo = new THREE.BoxGeometry(100, 150, 3)
var plane1 = new THREE.Mesh(plane1Geo,plane1_material);

shape.add(plane1);

var plane2_material = new THREE.MeshDepthMaterial({ 
  map: plane2_material
});
var plane2Geo = new THREE.BoxGeometry(100, 150, 3)
var plane2 = new THREE.Mesh(plane2Geo,plane2_material);

plane1.callback = function() { alert( this.name ); }

shape.add(plane2);

var plane3_material = new THREE.MeshDepthMaterial({
  // map:THREE.ImageUtils.loadTexture('images/person.jpg'), transparent: true
  map: plane3_material
})
var plane3Geo = new THREE.BoxGeometry(100, 150, 3)
var plane3 = new THREE.Mesh(plane1Geo,plane3_material);

shape.add(plane3);

scene.add(shape);

plane2.rotation.x = 1.5708
plane2.rotation.y = 1.5708

plane3.rotation.x = 1.5708
plane3.rotation.z = 1.5708

camera.position.z = 290;
camera.position.y = 14;

var domEvents   = new THREEx.DomEvents(camera, renderer.domElement)
domEvents.addEventListener(plane1, 'mouseover', function(event){
    console.log('you clicked on the mesh')
}, false)

function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );

  plane3.scale.y = xpos/40
  plane2.scale.y = xpos/40
  plane1.scale.y = xpos/40
  plane3.scale.x = ypos/100
  plane2.scale.x = ypos/100
  plane1.scale.x = ypos/100

  // canvas.style.WebkitFilter = 'blur('+(Math.abs(xpos)-114)/300+'px)'

  shape.rotation.y = xpos/300
  shape.rotation.x = ypos/300
}
function initLights() {
  var light = new THREE.DirectionalLight( 0xcccccc );
  light.position.set( -10, 5, 5 ).normalize();
  var light2 = new THREE.DirectionalLight( 0x666676 );
  light2.position.set( -22, -21.5, 0 ).normalize();
  scene.add( light,light2 );
}
var position
var target
var robotTouched;
function moveCamera(){
  // target = { rotX: -xpos/3000, rotY: -ypos/3000 };
  // camera.position.x = (target.rotX*2000)-(winW/2)/3000
}
initLights();
var canvas = document.getElementsByTagName('canvas')[0]
render();


/// PUBNUB

var xpos = 0;
var ypos = 0;

var synced;
var channel = window.location.hash.substr(1);
var uuid = Math.floor(Math.random()*100000)

var PUBNUB_demo = PUBNUB.init({
    publish_key: 'pub-c-41820907-d521-41e5-b0d5-5234155fa474',
    subscribe_key: 'sub-c-9238ce12-d0d8-11e5-b522-0619f8945a4f'
});

$(function() { // INITIALIZE AFTER JQUERY IS LOADED
  PUBNUB_demo.subscribe({
    channel: channel,
    message: function(m){
      if(m.uuid != uuid){
        if(m.present){
          console.log(m.uuid)
          synced = true;
        }
      }
    }
  });
  var WIN = $(window);
  var DOC = $(document);
  if(winW < 1000){
    present('phone');
    setInterval(function(){present('Phone')},1000)
  }else{
    setInterval(function(){present('Computer')},1000)
  }

  function clear () {
    $('#clr').removeClass('drawn')
    PUBNUB_demo.publish({
      channel: channel,
      message: {
        'clear':'clear',
        'uuid':uuid
      }
    });
  }
  function present (device) {
    PUBNUB_demo.publish({
      channel: channel,
      message: {
        'present':device,
        'uuid':uuid
      }
    });
  }
  DOC.on('scroll',function(e){
    e.preventDefault()
  })


  window.addEventListener("mousemove", function (e) {
      findxy('move', e)
  }, false);
  window.addEventListener("mousedown", function (e) {
    touched = true;
      findxy('down', e)
  }, false);
  window.addEventListener("mouseup", function (e) {
      findxy('up', e)
  }, false);
  var touchDownInterval;
  DOC.on('touchstart',function(e){
    touched = true;
    if(e.target.type != 'button' ){
      e.preventDefault()
      findxy('down', e)
      touching = true;
      $('#clr').addClass('drawn')
    }
  })
  DOC.on('touchmove',function(e){
    e.preventDefault()
    findxy('move', e)
  })
  DOC.on('touchend',function(e){
    clearInterval(touchDownInterval);
    touching = false;
    findxy('up', e)
  })

  window.addEventListener('deviceorientation',function(e){
    rotX = e.beta;
    rotY = e.gamma;
  })
})

function findxy(res, e) {

      var touchMove = e; // .originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      xpos = touchMove.pageX - winW/2;
      ypos = touchMove.pageY - winH/2;
      prevX = currX;
      prevY = currY;
      currX = xpos;
      currY = ypos;
      moveCamera()
}
