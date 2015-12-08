// top box components
function showBox(dir){
    if(dir.el){
        dir.el.style.display = '';
    }
}
function hideBox(dir){
     if(dir.el){
        dir.el.style.display = 'none';
    }
}
function checkWin(){
    if (window.pageYOffset > 100) {
        directives.forEach(showBox);
      } else {
          directives.forEach(hideBox);
      }
}
function srcollTop(e){
    e.preventDefault();
    window.scrollTo(0,0)
};
var directives = [];
['scroll', 'resize'].forEach(function (event) {
	window.addEventListener(event, checkWin, false)
})

var _directve = {
    isEmpty: true, 
	bind: function () {
		this.vm.$on('hook:attached', checkWin)
		this.vm.$on('hook:detached', checkWin) 
		if (directives.indexOf(this) === -1) {
			directives.push(this);
            this.el.addEventListener('click',srcollTop,false);
		}
	}, 
	unbind: function () {
		this.vm.$off('hook:attached', checkWin)
		this.vm.$off('hook:detached', checkWin) 
		var index = directives.indexOf(this)
		if (index > -1) {
			directives.splice(index, 1);
            this.el.removeEventListener('click',srcollTop,false);
		}
	}
}
exports.install = function (Vue, options) {
	Vue.directive('top-box', _directve);
};