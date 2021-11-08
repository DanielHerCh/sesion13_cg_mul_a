//Daniel Hernández Chávez_6000487
var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material)
    {
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    scene.add(cube);
    return(cube);
}
function init() {

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);
   
    Cubo = []; //define un array unidimensional
    dim = 20; //valor inicial de las dimensiones de los cubos
    angulo = Math.PI/4; //valor del angulo de giro
    del = dim/2; //valor de la mitad de la dimensión del cubo
    dia = Math.sqrt(Math.pow(del, 2)+Math.pow(del, 2));//variable para hallar la diagonal del área de la cara del cubo
    ndel = (Math.cos((Math.PI/4)-angulo))*dia;//transalación según la dimensión y angulo de  giro del cubo
    n=(dim*33)/100;

    Cubo.push(cubo(dim, dim, dim, 0xFF0000, 'Physical', false));
    Cubo.push(cubo(dim, dim, dim, 0xFFDD00, 'Physical', false));
    Cubo.push(cubo(dim, dim, dim, 0x0000FF, 'Physical', false));

    //un ciclo for para optimizar la creación de los cubos y hacer sus respectivas transformaciones
    for(i=0; i < 3; i++){
        Cubo[i].translateX(ndel); //translada el cubo en el eje x las unidades nesesarias para que el vértice del primer cubo toque el eje x según el ángulo rotado
        Cubo[i].translateY(del); //translada el cubo en el eje y según la variable del
        Cubo[i].translateZ(ndel); //translada el cubo en el eje z las unidades necesarias para que el vértice del primer cubo toque el eje z según el ángulo rotado
    }

    for(i=1; i < 3; i++){
        tam=((1)/(dim/(del/i)));//varaible para definir la mitad del tamaño del cubo anterior
        al=((del-2)*(1+i));//variable que se usará para transaladar en el eje y los cubos
        Cubo[i].scale.set(tam, tam, tam);//el cubo se escala según el tamaño (tam)  
        Cubo[i].translateY(al);//se translada el cubo en el eje y según la altura (al)
    }

    for(i=0; i < 3; i++){
        if(i==0 || i==2){
            Cubo[i].rotateY(angulo); //rota el cubo en el eje y según el angulo
        }
    }

    Cubo[1].translateY(dim/6);
    Cubo[2].translateY(dim/4);

    light = new THREE.PointLight(0xFFFFFF);
    light2 = new THREE.PointLight(0xFFFFFF);
                                        
    light.position.set(-10, 20, 10);
    light2.position.set(10, 50, -10);
    scene.add( light );
    scene.add( light2 ); 

    camera.position.set(-dim*n, dim, dim);
    camera.lookAt(scene.position);

    document.getElementById("webgl-output").appendChild(renderer.domElement);

    renderer.render(scene, camera);
}