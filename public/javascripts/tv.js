/**
 * Created by wangxiaottt on 13-11-7.
 */
(function(){

    var _body = document.body,
        _slide = document.getElementsByClassName('m-slide')[0],
        _hex = document.getElementsByClassName('m-hex')[0],
        _ctrl = document.getElementsByClassName(('m-ctrl'))[0];

    _slide.addEventListener('click', function(_event){
        var _midEl = document.getElementsByClassName('z-crt')[0],
            _leftEl = document.getElementsByClassName('z-left')[0],
            _rightEl = document.getElementsByClassName('z-right')[0];

        delClass(_midEl, 'z-crt');
        addClass(_midEl, 'z-small');
        addClass(_midEl, 'z-left');                           ;

        delClass(_leftEl, 'z-left');
        addClass(_leftEl, 'z-right');

        delClass(_rightEl, 'z-small');
        delClass(_rightEl, 'z-right');
        addClass(_rightEl, 'z-crt');
    },false)

    _ctrl.addEventListener('click', function(_event){
        var _el = _event.srcElement;

        var _action = _el.getAttribute('data-action');
        switch(_action){
            case '1':
                _hex.style.display = 'none'
                _slide.style.display = 'block';
                break;
            case '2':
                _slide.style.display = 'none';
                _hex.style.display = 'block';
                break;
        }
    },false)



    //工具类函数
    function hasClass(_object,_clsname){
        var _clsname = _clsname.replace(".","");
        var _sCls = " "+(_object.className)+" ";
        return (_sCls.indexOf(" "+_clsname+" ") != -1) ? true : false;
    }
    function toClass(_str){
        var _str = _str.toString();
        _str = _str.replace(/(^\s*)|(\s*$)/g,"");
        _str = _str.replace(/\s{2,}/g," ");
        return _str;
    }
    function addClass(_object,_clsname){
        var _clsname = _clsname.replace(".","");
        if(!hasClass(_object,_clsname)){
            _object.className = toClass(_object.className+(" "+_clsname));
        }
    }
    function delClass(_object,_clsname){
        var _clsname = _clsname.replace(".","");
        if(hasClass(_object,_clsname)){
            _object.className = toClass(_object.className.replace(new RegExp("(?:^|\\s)"+_clsname+"(?=\\s|$)","g")," "));
        }
    }


})()




