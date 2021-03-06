(function () {
  'use strict';
  
  module.exports = () => {
    return { 
      restrict: 'A',
      controller: confetti,
    }
  };
  
  confetti.$inject = ['$window'];

  function confetti ($window) {
    var hasFocus = true;
    $window.onfocus = function(){
      hasFocus = true;
    }

    $window.onblur = function(){
      hasFocus = false;
    }

    // Based on http://www.openprocessing.org/visuals/?visualID=6910
    var Boid = function() {
        var vector = new THREE.Vector3(),
        _acceleration, _width = 500, _height = 500, _depth = 200, _goal, _neighborhoodRadius = 100,
        _maxSpeed = 4, _maxSteerForce = 0.1, _avoidWalls = false;
        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        _acceleration = new THREE.Vector3();
        this.setGoal = function ( target ) {
            _goal = target;
        };
        this.setAvoidWalls = function ( value ) {
            _avoidWalls = value;
        };
        this.setWorldSize = function ( width, height, depth ) {
            _width = width;
            _height = height;
            _depth = depth;
        };
        this.run = function ( boids ) {
            if ( _avoidWalls ) {
                vector.set( - _width, this.position.y, this.position.z );
                vector = this.avoid( vector );
                vector.multiplyScalar( 5 );
                _acceleration.add( vector );
                vector.set( _width, this.position.y, this.position.z );
                vector = this.avoid( vector );
                vector.multiplyScalar( 5 );
                _acceleration.add( vector );
                vector.set( this.position.x, - _height, this.position.z );
                vector = this.avoid( vector );
                vector.multiplyScalar( 5 );
                _acceleration.add( vector );
                vector.set( this.position.x, _height, this.position.z );
                vector = this.avoid( vector );
                vector.multiplyScalar( 5 );
                _acceleration.add( vector );
                vector.set( this.position.x, this.position.y, - _depth );
                vector = this.avoid( vector );
                vector.multiplyScalar( 5 );
                _acceleration.add( vector );
                vector.set( this.position.x, this.position.y, _depth );
                vector = this.avoid( vector );
                vector.multiplyScalar( 5 );
                _acceleration.add( vector );
            }/* else {
                this.checkBounds();
            }
            */
            if ( Math.random() > 0.5 ) {
                this.flock( boids );
            }
            this.move();
        };
        this.flock = function ( boids ) {
            if ( _goal ) {
                _acceleration.add( this.reach( _goal, 0.005 ) );
            }
            _acceleration.add( this.alignment( boids ) );
            _acceleration.add( this.cohesion( boids ) );
            _acceleration.add( this.separation( boids ) );
        };
        this.move = function () {
            this.velocity.add( _acceleration );
            var l = this.velocity.length();
            if ( l > _maxSpeed ) {
                this.velocity.divideScalar( l / _maxSpeed );
            }
            this.position.add( this.velocity );
            _acceleration.set( 0, 0, 0 );
        };
        this.checkBounds = function () {
            if ( this.position.x >   _width ) this.position.x = - _width;
            if ( this.position.x < - _width ) this.position.x =   _width;
            if ( this.position.y >   _height ) this.position.y = - _height;
            if ( this.position.y < - _height ) this.position.y =  _height;
            if ( this.position.z >  _depth ) this.position.z = - _depth;
            if ( this.position.z < - _depth ) this.position.z =  _depth;
        };
        //
        this.avoid = function ( target ) {
            var steer = new THREE.Vector3();
            steer.copy( this.position );
            steer.sub( target );
            steer.multiplyScalar( 1 / this.position.distanceToSquared( target ) );
            return steer;
        };
        this.repulse = function ( target ) {
            var distance = this.position.distanceTo( target );
            if ( distance < 150 ) {
                var steer = new THREE.Vector3();
                steer.subVectors( this.position, target );
                steer.multiplyScalar( 0.5 / distance );
                _acceleration.add( steer );
            }
        };
        this.reach = function ( target, amount ) {
            var steer = new THREE.Vector3();
            steer.subVectors( target, this.position );
            steer.multiplyScalar( amount );
            return steer;
        };
        this.alignment = function ( boids ) {
            var count = 0;
            var velSum = new THREE.Vector3();
            for ( var i = 0, il = boids.length; i < il; i++ ) {
                if ( Math.random() > 0.6 ) continue;
                var boid = boids[ i ];
                var distance = boid.position.distanceTo( this.position );
                if ( distance > 0 && distance <= _neighborhoodRadius ) {
                    velSum.add( boid.velocity );
                    count++;
                }
            }
            if ( count > 0 ) {
                velSum.divideScalar( count );
                var l = velSum.length();
                if ( l > _maxSteerForce ) {
                    velSum.divideScalar( l / _maxSteerForce );
                }
            }
            return velSum;
        };
        this.cohesion = function ( boids ) {
            var count = 0;
            var posSum = new THREE.Vector3();
            var steer = new THREE.Vector3();
            for ( var i = 0, il = boids.length; i < il; i ++ ) {
                if ( Math.random() > 0.6 ) continue;
                var boid = boids[ i ];
                var distance = boid.position.distanceTo( this.position );
                if ( distance > 0 && distance <= _neighborhoodRadius ) {
                    posSum.add( boid.position );
                    count++;
                }
            }
            if ( count > 0 ) {
                posSum.divideScalar( count );
            }
            steer.subVectors( posSum, this.position );
            var l = steer.length();
            if ( l > _maxSteerForce ) {
                steer.divideScalar( l / _maxSteerForce );
            }
            return steer;
        };
        this.separation = function ( boids ) {
            var posSum = new THREE.Vector3();
            var repulse = new THREE.Vector3();
            for ( var i = 0, il = boids.length; i < il; i ++ ) {
                if ( Math.random() > 0.6 ) continue;
                var boid = boids[ i ];
                var distance = boid.position.distanceTo( this.position );
                if ( distance > 0 && distance <= _neighborhoodRadius ) {
                    repulse.subVectors( this.position, boid.position );
                    repulse.normalize();
                    repulse.divideScalar( distance );
                    posSum.add( repulse );
                }
            }
            return posSum;
        }
    }

    var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    SCREEN_WIDTH_HALF = SCREEN_WIDTH  / 2,
    SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;
    var camera, scene, renderer,
    birds, bird;
    var boid, boids;
    init();
    animate();
    function init() {
        camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
        camera.position.z = 450;
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );

        birds = [];
        boids = [];

        const isMobile = SCREEN_WIDTH < 1040;
        const numberOfBoids =  isMobile ? 40 : 200;
        const boidWidth = isMobile ? 20 : 10;
        const boidHeight = isMobile ? 20 : 10;
        for ( var i = 0; i < numberOfBoids; i ++ ) {
            boid = boids[ i ] = new Boid();
            boid.position.x = Math.random() * 400 - 200;
            boid.position.y = Math.random() * 400 - 200;
            boid.position.z = Math.random() * 400 - 200;
            boid.velocity.x = Math.random() * 2 - 1;
            boid.velocity.y = Math.random() * 2 - 1;
            boid.velocity.z = Math.random() * 2 - 1;
            boid.setAvoidWalls( true );
            boid.setWorldSize( 500, 500, 400 );
            bird = birds[ i ] = new THREE.Mesh( new THREE.BoxBufferGeometry( boidWidth, boidHeight, 2 ), new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
            bird.phase = Math.floor( Math.random() * 62.83 );

            var color = bird.material.color;
            let hslColor = color.getHSL(); 
            bird.luminosity = hslColor.l + (0.95 - hslColor.l)/4;

            scene.add( bird );
        }
        renderer = new THREE.CanvasRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        document.body.appendChild( renderer.domElement );
        //
        window.addEventListener( 'resize', onWindowResize, false );
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    
    function onDocumentTouchMove( event ) {
      if(!event.touches) return;

      const clientX = (event.touches[0] || {}).clientX;
      const clientY = (event.touches[0] || {}).clientY;

      if(!clientX || !clientY) return;

      calculateUserMovement(clientX, clientY);
    }

    function onDocumentMouseMove( event ) {
      const clientX = event.clientX;
      const clientY = event.clientY;
 
      if(!clientX || !clientY) return;
      calculateUserMovement(clientX, clientY);
    }

    function calculateUserMovement(clientX, clientY) {
      var vector = new THREE.Vector3( clientX - SCREEN_WIDTH_HALF, - clientY + SCREEN_HEIGHT_HALF, 0 );
      for ( var i = 0, il = boids.length; i < il; i++ ) {
          boid = boids[ i ];
          vector.z = boid.position.z;
          boid.repulse( vector );
      }
    }

    //
    function animate() {
        requestAnimationFrame( animate );
        render();
    }
    function render() {
        if (!hasFocus) { return; }
        for ( var i = 0, il = birds.length; i < il; i++ ) {
            boid = boids[ i ];
            boid.run( boids );
            bird = birds[ i ];
            bird.position.copy( boids[ i ].position );
            let color = bird.material.color;
            let colorPercentage =  Math.abs( (( bird.position.z - 500 ) ) / 1000 ) 
            let hslColor = color.getHSL();
            
            let luminosity = bird.luminosity + (colorPercentage * Math.abs( 0.95 - bird.luminosity)); 
            
            color.setHSL(hslColor.h, hslColor.s, luminosity);
            
            bird.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
            bird.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );
            bird.phase = ( bird.phase + ( Math.max( 0, bird.rotation.z ) + 0.1 )  ) % 62.83;
        }
        renderer.render( scene, camera );
    }
  }
}());
