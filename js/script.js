
  var winW = window.innerWidth;
  var winH = window.innerHeight;
  var currX = 0;
  var currY = 0;
  var xpos = 0;
  var ypos = 0;

  var camera, controls, scene, renderer, stats;
  var pointLight, pointLight2;
  var torusKnot;
  var plane1, plane2, plane3;
  var lines, lightLine, lightLine_geo;
  var cubeMaterial;
  var poly;
  var lights;

  init();
  animate();

  function init() {

    initScene();
    initMisc();

    document.body.appendChild( renderer.domElement );

  }

  function initScene() {

    camera = new THREE.PerspectiveCamera( 25, winW / winH, 1, 1000 );
    camera.position.set( 0, 0, 50 );

    scene = new THREE.Scene();
    scene.add( new THREE.AmbientLight( 0x222222 ) );

    // Lights

    function createLight( color ) {

      var pointLight = new THREE.PointLight( color, 1, 30 );
      pointLight.castShadow = true;
      pointLight.shadow.camera.near = 1;
      pointLight.shadow.camera.far = 50;
      pointLight.shadow.bias = 0.1;

      var geometry = new THREE.SphereGeometry( 0.3, 32, 32 );
      var material = new THREE.MeshBasicMaterial( { color: color } );
      var sphere = new THREE.Mesh( geometry, material );
      pointLight.add( sphere );

      return pointLight

    }

    lights = new THREE.Object3D();

    pointLight1 = createLight( 0x332333 );
    lights.add( pointLight1 );

    pointLight2 = createLight( 0x433333 );
    lights.add( pointLight2 );

    pointLight3 = createLight( 0x543444 );
    lights.add( pointLight3 );

    pointLight4 = createLight( 0x654555 );
    lights.add( pointLight4 );

    lines_material = new THREE.LineBasicMaterial({
      color: 0x999999,
      linewidth: .04,
      opacity: 0.1,
      transparent: true
    });

    lightLine_geo = new THREE.Geometry();
    lightLine_geo.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(20, 20, 10),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-15, 15, 15),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(12, -15, 15),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(15, 15, -15),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-10, -20, -20)
    )

    lightLine = new THREE.Line( lightLine_geo, lines_material );
    lights.add( lightLine );

    lightLine = new THREE.Line( lightLine_geo, lines_material );
    lights.add( lightLine );

    lights.add( lightLine )
    scene.add( lights )


    pointLight1.position.x = 20 
    pointLight1.position.y = 20
    pointLight1.position.z = 10  

    pointLight2.position.x = -15 
    pointLight2.position.y = 15
    pointLight2.position.z = 15

    pointLight3.position.x = 12 
    pointLight3.position.y = -15
    pointLight3.position.z = 15

    pointLight4.position.x = 15 
    pointLight4.position.y = 15
    pointLight4.position.z = -15


    // Meshes

    poly = new THREE.Object3D();

    var lines_geometry = new THREE.Geometry();
    lines_geometry.vertices.push(
      new THREE.Vector3( 0, 0, 10 ),
      new THREE.Vector3( 10, 0, 0 ),
      new THREE.Vector3( 0 , 10, 0 ),
      new THREE.Vector3( 0, 0, 10 ),
      new THREE.Vector3( 0, -10, 0 ),
      new THREE.Vector3( 10, 0, 0 ),
      new THREE.Vector3( 0, 10, 0 ),
      new THREE.Vector3( -10, 0, 0 ),
      new THREE.Vector3( 0, -10, 0 ),
      new THREE.Vector3( 0, 0, -10 ),
      new THREE.Vector3( -10, 0, 0 ),
      new THREE.Vector3( 0, 10, 0 ),
      new THREE.Vector3( 0, 0, -10 ),
      new THREE.Vector3( 10, 0, 0 ),
      new THREE.Vector3( 0, 10, 0 ),
      new THREE.Vector3( 0, 0, 10),
      new THREE.Vector3( -10, 0, 0)
    );

    lines1 = new THREE.Line( lines_geometry, lines_material );
    poly.add( lines1 );

    var plane_material = new THREE.MeshPhongMaterial({ 
      // map:THREE.ImageUtils.loadTexture('images/person.jpg'), transparent: true,
      color: 0x333333,
      shininess: 10,
      specular: 0xffffff,
      opacity: 0.9,
      transparent: true
    });

    var plane1Geo = new THREE.BoxGeometry(10, 15, 0.1)
    plane1 = new THREE.Mesh( plane1Geo,plane_material );
    plane1.castShadow = true;
    plane1.receiveShadow = true;

    var plane2Geo = new THREE.BoxGeometry(10, 15, 0.1)
    plane2 = new THREE.Mesh( plane2Geo, plane_material );
    plane2.castShadow = true;
    plane2.receiveShadow = true;

    var plane3Geo = new THREE.BoxGeometry(10, 15, 0.1)
    plane3 = new THREE.Mesh( plane1Geo,plane_material );
    plane3.castShadow = true;
    plane3.receiveShadow = true;

    poly.add( plane1, plane2, plane3 );
    scene.add(poly);

    plane2.rotation.x = 1.5708
    plane2.rotation.y = 1.5708

    plane3.rotation.x = 1.5708
    plane3.rotation.z = 1.5708

    plane1.position.y = 30
    plane2.position.z = 30
    plane3.position.x = 30

  }

  function initMisc() {

    renderer = new THREE.WebGLRenderer({ antialiasing: true });
    renderer.setClearColor( 0x010101 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    controls = new THREE.OrbitControls( camera );
    controls.addEventListener( 'change', render );

  }

  function animate() {

    requestAnimationFrame( animate );
    
    poly.rotation.y += -.001
    poly.rotation.x += -.001
    poly.rotation.z += -.001
    // camera.rotation.x += .01

    plane1.position.y += .02*(0-plane1.position.y)
    plane2.position.z += .02*(0-plane2.position.z)
    plane3.position.x += .02*(0-plane3.position.x)
    controls.update();
    render();
    
    lights.rotation.x = currY/500
    lights.rotation.y = currX/500
    lights.rotation.z = currX/500

  }

  function render() {
    renderer.render( scene, camera );
  }


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

  function findxy(res, e) {

    var touchMove = e; // .originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    xpos = touchMove.pageX - winW/2;
    ypos = touchMove.pageY - winH/2;
    currX = xpos;
    currY = ypos;
  }