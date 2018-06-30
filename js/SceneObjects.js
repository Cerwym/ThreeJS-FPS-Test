/**
 * Created with JetBrains WebStorm.
 * User: Peter
 * Date: 02/05/13
 * Time: 17:52
 * To change this template use File | Settings | File Templates.
 */

var SkyBox2 = function()
{
    THREE.Object3D.call(this);
    // axes
    var axes = new THREE.AxisHelper(100);
    var materialArray = [];
    materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-xpos.png'), emissive: 1}));
    materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-xneg.png'), emissive: 1}));
    materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-ypos.png'), emissive: 1}));
    materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-yneg.png' ), emissive: 1 }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-zpos.png' ), emissive: 1 }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/dawnmountain-zneg.png' ), emissive: 1 }));
    for (var i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;
    var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );

    var skyboxGeom = new THREE.CubeGeometry( 300, 300, 300, 1, 1, 1 );

    this.mesh = new THREE.Mesh( skyboxGeom, skyboxMaterial );
    //scene.add(skybox);

    this.add(this.mesh);

    this.update = function(pos)
    {
        /*
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
        */
        this.mesh.position = pos;
    }
}

SkyBox2.prototype = Object.create(THREE.Object3D.prototype);

var SkyBox = function(path, format, scene)
{

    THREE.Object3D.call(this);

    var urls = [path + 'right1' + format, path + 'left2' + format, path + 'top3' + format, path + 'bottom4' + format, path + 'front5' + format, path + 'back6' + format];
    var texture = THREE.ImageUtils.loadTextureCube(urls);
    var shader = THREE.ShaderLib["cube"];

    var uniforms  = THREE.UniformsUtils.clone(shader.uniforms);
    uniforms["tCube"].texture = texture;

    var material = new THREE.ShaderMaterial({
        fragmentShader  :   shader.fragmentShader,
        vertexShader    :   shader.vertexShader,
        uniforms        :   shader.uniforms,
        depthWrite      : false,
        side            : THREE.BackSide
    });

    this.mesh = new THREE.Mesh(new THREE.CubeGeometry(300, 300, 300, 1, 1, 1), material);
    scene.add(this.mesh);
    //this.add(this.mesh);
};

//SkyBox.prototype = Object.create(THREE.Object3D.prototype);

var Cube = function(w, h, d, x, y, z)
{
    THREE.Object3D.call(this);

    var width = w;
    var height = h;
    var depth = d;

    var cube = new THREE.CubeGeometry(w, h, d );
    var position = new CANNON.Vec3(x, y, z);

    this.x = x;
    this.y = y;
    this.z = z;

    //var material = new THREE.MeshBasicMaterial( { color: 0xff0000, shading: true } );
    this.mesh = new THREE.Mesh( cube, material );
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
    this.add(this.mesh);

    this.rotate = function(ax, ay, az)
    {
        this.mesh.rotation.x += ax;
        this.mesh.rotation.y += ay;
        this.mesh.rotation.z += az;
    }

    this.applyTexture = function(texture)
    {
        var tex = THREE.ImageUtils.loadTexture(texture);// location
        var material = new THREE.MeshPhongMaterial({map: tex});
        this.mesh.material = material;
    }

    this.createPhysicsBody = function(world)
    {
        var halfExtents = new CANNON.Vec3(width /2, height /2, depth/2);
        var box = new CANNON.Box(halfExtents);
        this.pBody = new CANNON.RigidBody(0, box);
        this.pBody.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
    }

    this.Position = function()
    {
        return position;
    }
}
Cube.prototype = Object.create(THREE.Object3D.prototype);

Floor = function()
{
    THREE.Object3D.call(this);

    var floor = new THREE.PlaneGeometry( 300, 300, 50, 50 );
    floor.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
    var material = new THREE.MeshLambertMaterial( { color: 0xFF0000, wireframe:true } );

    this.mesh = new THREE.Mesh( floor, material );
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.add(this.mesh);
}

Floor.prototype = Object.create(THREE.Object3D.prototype);

// Too many parameters, yay!
function MakeWall(x, y, z, w, h,scene, world)
{
    THREE.AreaLight.call(this);

    function toRadians (angle) { return angle * (Math.PI / 180); }

    var light = new THREE.AreaLight(0x33ff66, 1.5);
    light.position.set(x, y, z);
    //light.rotation.set(toRadians(rx), toRadians(ry), toRadians(rz));
    light.width = w;
    light.height = h;
    //light.depth = 10;

    scene.add(light);
    var meshEmitter = createAreaEmitter(light, world);
    scene.add(meshEmitter);
}

function createAreaEmitter( light, world)
{
    var size = new CANNON.Vec3(light.width, light.height, light.depth);
    var geometry = new THREE.CubeGeometry(size.x * 2, size.y * 2, size.z * 2);
    var box = new CANNON.Box(size);
    var material = new THREE.MeshBasicMaterial( { color: light.color.getHex(), vertexColors: THREE.FaceColors } );

    var backColor = 0x222222;

    geometry.faces[ 5 ].color.setHex( backColor );
    geometry.faces[ 4 ].color.setHex( backColor );
    geometry.faces[ 2 ].color.setHex( backColor );
    geometry.faces[ 1 ].color.setHex( backColor );
    geometry.faces[ 0 ].color.setHex( backColor );

    var mesh = new THREE.Mesh( geometry, material );

    mesh.position = light.position;
    // mesh.rotation = light.rotation;
    // mesh.useQuaternion = true;

    var body = new CANNON.RigidBody(0, box);

    world.add(body);
    return mesh;
}

var LampObject = function(scene,xpos, ypos, zpos)
{
    THREE.Object3D.call(this);
    var texture = new THREE.Texture();

    var loader = new THREE.ImageLoader();
    loader.addEventListener( 'load', function ( event ) {

        texture.image = event.content;
        texture.needsUpdate = true;
    } );
    loader.load('models/lamp_mat.png');

    // model
    var loader = new THREE.OBJLoader();
    loader.addEventListener( 'load', function ( event ) {

        var object = event.content;

        object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

                child.material.map = texture;

            }

        } );
        object.scale.x = .1;
        object.scale.y = .1;
        object.scale.z = .1;
        object.position.x = xpos;
        object.position.y = 0;
        object.position.z = zpos;
        this.object = object;
        var map = object.children[0].material.map;

    });
    loader.load( 'models/Lamp.obj' );

    var torch = new THREE.PointLight( 0xffffff, 3.0, 10);
    torch.position.x = xpos;
    torch.position.y = ypos;
    torch.position.z = zpos;

    this.light = torch;
    this.add(this.light);
    this.add(this.object);
    console.log("Lamp created @" + torch.position.x + ","+ torch.position.y + ","+ torch.position.z );
}
LampObject.prototype = Object.create(THREE.Object3D.prototype);

