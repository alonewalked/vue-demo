export function getWindowSize() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
  
    if (x < 520) {
        return {
            dimension:69.5,
            position:67
        };
    } else {
        return {
            dimension:124,
            position:121
        }; 

    }
};