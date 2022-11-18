const header = document.querySelector("header");
window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 100);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');


menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navlist.classList.toggle('open');
};

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navlist.classList.remove('open');

}


$('.telegram-form').on('submit', function (event) {

    event.stopPropagation();
    event.preventDefault();

    let form = this,
        submit = $('.submit', form),
        data = new FormData(),
        files = $('input[type=file]')


    $('.submit', form).val('Отправка...');
    $('input, textarea', form).attr('disabled','');

    data.append( 'name', 		$('[name="name"]', form).val() );
    data.append( 'phone', 		$('[name="phone"]', form).val() );
    data.append( 'email', 		$('[name="email"]', form).val() );
    data.append( 'text', 		$('[name="text"]', form).val() );
    data.append( 'file', 		$('[name="file"]', form).val() );
   

    files.each(function (key, file) {
        let cont = file.files;
        if ( cont ) {
            $.each( cont, function( key, value ) {
                data.append( key, value );
            });
        }
    });
    
    $.ajax({
        url: 'ajax.php',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        xhr: function() {
            let myXhr = $.ajaxSettings.xhr();

            if ( myXhr.upload ) {
                myXhr.upload.addEventListener( 'progress', function(e) {
                    if ( e.lengthComputable ) {
                        let percentage = ( e.loaded / e.total ) * 100;
                            percentage = percentage.toFixed(0);
                        $('.submit', form)
                            .html( percentage + '%' );
                    }
                }, false );
            }

            return myXhr;
        },
        error: function( jqXHR, textStatus ) {
            // Тут выводим ошибку
        },
        complete: function() {
            // Тут можем что-то делать ПОСЛЕ успешной отправки формы
            console.log('Complete')
            form.reset() 
        }
    });

    return false;
});

$(function(){
    //2. Получить элемент, к которому необходимо добавить маску
    $("#phone").mask("8(999) 999-9999");
  });

  var renderer = new THREE.WebGLRenderer({ canvas : document.getElementById('canvas'), antialias:true});
  // default bg canvas color //
  renderer.setClearColor(0x202020 );
  //  use device aspect ratio //
  renderer.setPixelRatio(window.devicePixelRatio / 2);
  // set size of canvas within window //
  renderer.setSize(window.innerWidth /3, window.innerHeight / 3);
  
  
  
  
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 5;
  
  
  var sphere_geometry = new THREE.SphereGeometry(1, 128, 128);
  var material = new THREE.MeshNormalMaterial();
  
  var sphere = new THREE.Mesh(sphere_geometry, material);
  scene.add(sphere);
  
  
  var update = function() {
  
    // change '0.003' for more aggressive animation
    var time = performance.now() * 0.003;
    //console.log(time)
  
    //go through vertices here and reposition them
    
    // change 'k' value for more spikes
    var k = 3;
    for (var i = 0; i < sphere.geometry.vertices.length; i++) {
        var p = sphere.geometry.vertices[i];
        p.normalize().multiplyScalar(1 + 0.3 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
    }
    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;
  sphere.geometry.verticesNeedUpdate = true;
  
  
  }
  
  function animate() {
    //sphere.rotation.x += 0.01;
    //sphere.rotation.y += 0.01;
  
    update();
    /* render scene and camera */
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);