/**
 * Created with JetBrains WebStorm.
 * User: Peter
 * Date: 16/05/13
 * Time: 14:14
 * To change this template use File | Settings | File Templates.
 */

function Player(scene, phys_world, collisionMaterial)
{
    this.HP = 100; // public variable
    var physicsObject;// Creating a variable with var will make the variable private
    this.Level = 1;
    var position = new CANNON.Vec3(10, 0, 10);

    this.buildPhysicsObject = function()
    {
        // DOC : this WILL have access to var phys
        console.log("Player physics object was created");
        var mass = 3, radius = 2.5;
        var sphereShape = new CANNON.Sphere(radius);
        physicsObject = new CANNON.RigidBody(mass, sphereShape, collisionMaterial);
        physicsObject.position = position;
        physicsObject.linearDamping = 0.9;
        phys_world.add(physicsObject);
    };
    this.getPhysOBJ = function()
    {
        // DOC : this will be able to return the private variable, physicsObject
        return physicsObject;
    };
    this.SetPosition = function(x, y, z)
    {
        position.x = x;
        position.y = y;
        position.z = z;
    }
    this.Position = function()
    {
        //console.log("Position is ->" + physicsObject.position.toString());
        return position;
    };
    this.buildPhysicsObject();
}

Player.prototype =
{
    Update: function()
    {
        // Do Stuff
        //console.log("2 was called");
        //console.log("HP is " + this.HP);
        //this.Torch.position = this.Position();
        //console.log(this.Torch.position);
    }, // public method, will NOT have access to var phys in the constructor
    DistanceFrom: function(point)
    {
        var xs = 0;
        var ys = 0;
        //console.log("Point x :" + point.x);
        //console.log("Player x :" + this.Position().x);
        xs = point.x - this.Position().x;
        xs = xs * xs;

        //console.log("Point z :" + point.z)
        //console.log("Player Z :" + this.Position().z);
        ys = point.z - this.Position().z;
        ys = ys * ys;

        //console.log(Math.sqrt(xs = ys));
        return Math.sqrt( xs + ys );
    }

};