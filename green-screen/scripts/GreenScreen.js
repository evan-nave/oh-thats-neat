function GreenScreen() {
    var instance = this;
    instance.webCamSource = null;
    instance.greenScreenCanvas = null;
    instance.greenSlider = null;
    instance.blueSlider = null;
    instance.redSlider = null;
    instance.currentColor = null;
    instance.seriouslyGreenScreen = {
        seriouslyInstance : new Seriously(),
        source: null,
        target: null,
        greenScreenEffect: null
    };

    instance.requestWebCam = function () {
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then(instance.onWebCamAccess)
                .catch(instance.onWebCamError);
        } else {
            alert('This website is not supported for your browser.');
        }
    }

    instance.attachWebCamSource = function (videoElement) {
        instance.webCamSource = videoElement;
    }

    instance.attachGreenScreenCanvas = function (canvasElement) {
        instance.greenScreenCanvas = canvasElement;
        window.addEventListener('resize', instance.onWindowAdjust, true);
    }

    instance.onWindowAdjust = function(event){
        instance.seriouslyGreenScreen.target.width = window.innerWidth;
        instance.seriouslyGreenScreen.target.height = window.innerWidth; 
    }

    instance.attachColorViewer = function (divElement) {
        instance.currentColor = divElement;
    }

    instance.attachSliders = function (redInputElement, blueInputElement, greenInputElement) {
        instance.redSlider = redInputElement;
        instance.blueSlider = blueInputElement;
        instance.greenSlider = greenInputElement;
    }

    instance.onWebCamAccess = function (stream) {
        instance.webCamSource.autoplay = true;
        instance.webCamSource.srcObject = stream;
        instance.handleSafariQuirks();
    }

    instance.handleSafariQuirks = function(){
        instance.webCamSource.muted = true;
        instance.webCamSource.play();
    }

    instance.onWebCamError = function () {
        alert('There has been a problem retreiving the streams - are you running on file:/// or did you disallow access?');
    }

    instance.build = function () {
        instance.initSeriouslyGreenScreen();
        instance.makeSeriouslyNodeConnection();
        instance.seriouslyGreenScreen.seriouslyInstance.go();
        instance.greenScreenCanvas.width = 640;
        instance.greenScreenCanvas.height = 480;
        instance.bindSliders();
    }

    instance.initSeriouslyGreenScreen = function(){
        instance.seriouslyGreenScreen.source = instance.seriouslyGreenScreen.seriouslyInstance.source(instance.webCamSource);
        instance.seriouslyGreenScreen.target = instance.seriouslyGreenScreen.seriouslyInstance.target(instance.greenScreenCanvas);
        instance.seriouslyGreenScreen.greenScreenEffect = instance.seriouslyGreenScreen.seriouslyInstance.effect('chroma');
    }

    instance.makeSeriouslyNodeConnection = function(){
        instance.seriouslyGreenScreen.greenScreenEffect.source = instance.seriouslyGreenScreen.source;
        instance.seriouslyGreenScreen.target.source = instance.seriouslyGreenScreen.greenScreenEffect;
    }

    instance.rebuildGreenScreen = function(){
        
    }

    instance.bindSliders = function(){
        instance.greenSlider.addEventListener('input', instance.onSliderChangeEvent);
        instance.blueSlider.addEventListener('input', instance.onSliderChangeEvent);
        instance.redSlider.addEventListener('input', instance.onSliderChangeEvent);
    }

    instance.onSliderChangeEvent = function (event) {
        console.log(event.target.value);
        instance.seriouslyGreenScreen.greenScreenEffect.screen = [instance.redSlider.value / 255, instance.greenSlider.value / 255, instance.blueSlider.value / 255, 1];
        instance.currentColor.style.backgroundColor = 'rgb('.concat(instance.redSlider.value, ",", instance.greenSlider.value, ",", instance.blueSlider.value, ")");
    }
}