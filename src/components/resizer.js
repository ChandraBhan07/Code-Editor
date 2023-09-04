function initResizerFn(resizer, wrapper, axis = 'x') {

    let pos, posParsed;
 
    function mouseDownHandler(e) {
       pos = axis === 'x' ? e.clientX : e.clientY;
 
       const computed = axis === 'x'
          ? window.getComputedStyle(wrapper).width
          : window.getComputedStyle(wrapper).height;
 
       posParsed = parseInt(computed, 10);
 
       document.addEventListener("mousemove", mouseMoveHandler);
       document.addEventListener("mouseup", mouseUpHandler);
    }
 
    function mouseMoveHandler(e) {
       const diff = axis === 'x' ? e.clientX - pos : e.clientY - pos;
       const computed = posParsed + diff;
       const windowProp = axis === 'x' ? window.innerWidth * 1 : window.innerHeight * 1;
 
       if (computed < 0.7 * windowProp && computed >= 0.25 * windowProp) {
          axis === 'x' ? wrapper.style.width = `${computed}px` : wrapper.style.height = `${computed}px`;
       }
    }
 
    function mouseUpHandler() {
       document.removeEventListener("mouseup", mouseUpHandler);
       document.removeEventListener("mousemove", mouseMoveHandler);
    }
 
    resizer.addEventListener("mousedown", mouseDownHandler);
 }
 const resizerH = document.querySelector(".resizer-h"),
    editorWrapper = document.querySelector(".editor-wrapper");
 initResizerFn(resizerH, editorWrapper);
 
 const resizerV = document.querySelector(".resizer-v"),
    codecellWrapper = document.querySelector(".codecell-wrapper");
 initResizerFn(resizerV, codecellWrapper, axis = 'y');