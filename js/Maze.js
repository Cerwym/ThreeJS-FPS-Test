/**
 * Created with JetBrains WebStorm.
 * User: peterlockett
 * Date: 03/05/2013
 * Time: 09:42
 * To change this template use File | Settings | File Templates.
 */
function MazeManager2()
{
    var manager = new MazeManager();
    var objInScene=[];
    var physInScene=[];
    var sceneExit=[];
    this.Exit = new Cube(1,1,1, -100, -100, -100);

    console.log("Height is " + manager.GetHeight() + "Width " + manager.GetWidth());
    this.constructMaze = function(scene, physicsworld)
    {
        var level = manager.GetLevel();
        for (var x = 0; x <= manager.GetHeight(); x++){
            for (var y = 0; y <= manager.GetWidth(); y++){
                var tile = level[x][y];
                if (tile == 1){ // Wall segment
                    var wall = new Cube(8,8,8, 8 * x, 4, 8 * y);
                    wall.applyTexture("./images/diffus.png");
                    wall.createPhysicsBody(physicsworld)
                    physInScene.push(wall.pBody);
                    objInScene.push(wall);
                }
                if (tile == 2){ // Light object
                    var torch = new THREE.PointLight( 0xfffff, 3.0, 10);
                    torch.position.set(8*x, 4, 8*y);
                    var c = new Cube(1,1,1, 8*x, 4, 8*y);
                    objInScene.push(torch);
                    objInScene.push(c);
                }
                if (tile == 9){ // Exit
                    /*
                     var lamp = new LampObject(8 * x, 2.75, 8 * y);
                     //console.log("Lamp @ " + lamp.object.position);
                     objInScene.push(lamp.object);
                     objInScene.push(lamp.light); */
                    var torch = new THREE.PointLight( 0xfffff, 3.0, 10);
                    torch.position.set(8*x, 4, 8*y);
                    var c = new Cube(1,1,1, 8*x, 4, 8*y);
                    objInScene.push(torch);
                    this.Exit.x = 8 * x;
                    this.Exit.y = 4;
                    this.Exit.z = 8 * y
                    console.log("Exit is at " + this.Exit.x + "," + this.Exit.y + "," + this.Exit.z);
                }
            }}
        for (var i = 0; i < objInScene.length; i++)
            scene.add(objInScene[i]);
        for (var i = 0; i < physInScene.length; i++)
            physicsworld.add(physInScene[i]);
    };

    this.getOBJinScene = function(){return objInScene;};

    this.DeleteLevel = function(scene, world)
    {
        console.log("Level Deleted");
        for (var i = 0; i < objInScene.length; i++)
        {
            scene.remove(objInScene[i]);
            delete(objInScene[i]);
        }
        objInScene =[];
        for (var i = 0; i < physInScene.length; i++)
        {
            world.remove(physInScene[i]);
            delete(physInScene[i]);
        }
        physInScene=[];
    };
}

function MazeManager()
{
    //var maz;
    this.MazeHeight = 0;
    this.MazeWidth = 0;
    this.maze1 =
        [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 1, 2, 0, 2, 0, 3, 2, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 3, 1],
            [1, 3, 1, 3, 1, 1, 2, 1, 0, 1],
            [1, 2, 1, 0, 1, 9, 0, 1, 3, 1],
            [1, 0, 1, 2, 1, 1, 0, 1, 2, 1],
            [1, 2, 1, 0, 3, 0, 3, 1, 3, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 2, 3, 0, 2, 0, 2, 0, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    this.maze2 =
            [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 2, 0, 0, 0, 0, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 2, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 2, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 9, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

}

MazeManager.prototype =
{
    GetLevel: function()
    {
        if (Player.Level == 1)
        {
            return this.maze1;
        }
        if (Player.Level == 2)
        {
            return this.maze2;
        }
    },
    GetWidth: function()
    {
        if (Player.Level == 1)
            return 9;
        if (Player.Level == 2)
            return 19;
        if (Player.Level == 3)
            return 99;
    },
    GetHeight: function()
    {
        if (Player.Level == 1)
            return 9;
        if (Player.Level == 2)
            return 19;
        if (Player.Level == 3)
            return 9;
    }
};
