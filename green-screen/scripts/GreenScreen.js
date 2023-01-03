function GreenScreen() {
    var instance = this;
    instance.webCamSource = null;
    instance.greenScreenCanvas = null;
    instance.greenSlider = null;
    instance.blueSlider = null;
    instance.redSlider = null;
    instance.greenscreenEffect = null;
    instance.currentColor = null;

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
    }

    instance.onWebCamError = function () {
        alert('There has been a problem retreiving the streams - are you running on file:/// or did you disallow access?');
    }

    instance.build = function () {
        var seriously, // the main object that holds the entire composition
            webcamsrc, // a wrapper object for our source image
            target; // a wrapper object for our target canvas

        // the seriously lib
        seriously = new Seriously();

        // connect to webcam src.
        webcamsrc = seriously.source(instance.webCamSource);

        // connect to greenscreen canvas
        target = seriously.target(instance.greenScreenCanvas);

        //add effect
        instance.greenscreenEffect = seriously.effect('chroma');
        instance.greenscreenEffect.source = webcamsrc;
        target.source = instance.greenscreenEffect;
        seriously.go();

        instance.bindSliders();
    }

    instance.bindSliders = function(){
        instance.greenSlider.addEventListener('input', instance.onSliderChangeEvent);
        instance.blueSlider.addEventListener('input', instance.onSliderChangeEvent);
        instance.redSlider.addEventListener('input', instance.onSliderChangeEvent);
    }

    instance.onSliderChangeEvent = function (event) {
        console.log(event.target.value);
        instance.greenscreenEffect.screen = [instance.redSlider.value / 255, instance.greenSlider.value / 255, instance.blueSlider.value / 255, 1];
        instance.currentColor.style.backgroundColor = 'rgb('.concat(instance.redSlider.value, ",", instance.greenSlider.value, ",", instance.blueSlider.value, ")");
    }
}