/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.FilmPass = function( noiseIntensity, scanlinesIntensity, scanlinesCount, grayscale ) {

	var shader = THREE.ShaderUtils.lib[ "film" ];

	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	this.material = new THREE.MeshShaderMaterial( {

		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader

	} );

	if ( grayscale !== undefined )	this.uniforms.grayscale.value = grayscale;
	if ( noiseIntensity !== undefined ) this.uniforms.nIntensity.value = noiseIntensity;
	if ( scanlinesIntensity !== undefined ) this.uniforms.sIntensity.value = scanlinesIntensity;
	if ( scanlinesCount !== undefined ) this.uniforms.sCount.value = scanlinesCount;

	this.renderToScreen = false;

};

THREE.FilmPass.prototype = {

	render: function ( renderer, renderTarget, delta ) {

		this.uniforms[ "tDiffuse" ].texture = renderTarget;
		this.uniforms[ "time" ].value += delta;

		THREE.EffectComposer.quad.materials[ 0 ] = this.material;

		if ( this.renderToScreen ) {

			renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera );

		} else {

			renderer.render( THREE.EffectComposer.scene, THREE.EffectComposer.camera, renderTarget, false );

		}

	}

};