function Dot(htmlElement){
    var instance = this;
    instance.x = 0;
    instance.y = 0;
    instance.max_x = window.screen.width;
    instance.max_y = window.screen.height;
    instance.htmhNode = htmlElement;

    instance.move = function(pixels){
        instance.x += pixels;
        instance.y += pixels;
    }
}