/***************************************************************************

   simpleParallax.js
   
   Author:   Orville Chomer
   
   Simple Paralax for web page.
   A non-accurate (just going for relatively good looking),
   very easy to use library for adding paralax effect to your web page.
   
   
   Usage Example:
   
      let simpleParallax;
      
      simpleParallax = new SimpleParallax();

 ***************************************************************************/


function SimpleParallax(params) {
  console.log("SimpleParallax() Constructor called")
  const simpleParallax = this
  let MAX_MOVEMENT = getVal(params,"maxMovement",80);
  const EDGE_THICKNESS = Math.floor(MAX_MOVEMENT / 2);
  const MOVEMENT_DAMPER_VALUE_X = 0.2;
  const MOVEMENT_DAMPER_VALUE_Y = 0.3;
  
  
  let layersByIndex = [];
    
  let nPivotLayer = -1;
  let bResizingLayers = false;
  let bNeedToResizeAgain = false;
  

  
  simpleParallax.addLayer = function(nInpZindex) {
    try {
      const layer = {};
      //layer.idx = layersByIndex.length;
      let nZIndex = layersByIndex.length + 1;
      
      if (typeof nInpZindex === "number") {
        nZIndex = nInpZindex;
      } // end if
      
      layer.zIndex = nZIndex
      
      const layerNd = document.createElement('div');
      layerNd.style.zIndex = nZIndex+"";
      layerNd.style.position = "absolute";
      layerNd.style.left = (-EDGE_THICKNESS)+"px"
      layerNd.style.top = (-EDGE_THICKNESS)+"px"
      layerNd.style.margin = "0px";
      layerNd.style.padding = "0px";
      layerNd.style.boxSizing = "border-box";
      
      
      document.body.appendChild(layerNd);
      
      layer.domNode = layerNd;
      
      layersByIndex.push(layer)
      nPivotLayer = -1;
      
      return layer;
    } catch(err) {
      logErr(err)
    } // end of try/catch block
    
  } // end of simpleParalax.addLayer()
  
  
  function pageLoaded(evt) {
    console.log("pageLoaded() called")
    try {      
      window.addEventListener("resize", resizeLayers)
      document.addEventListener("mousemove", handleMouseMovement);
      document.addEventListener("mouseout", resetParallaxEffect);     
      
    } catch(err) {
      debugger
      logErr(err)
    } // end of try/catch
    
  } // end of pageLoaded()
  
  
  function resetParallaxEffect() {
    try {
      const nMax = layersByIndex.length;
      
      for (let n=0;n<nMax;n++) {
        const layer = layersByIndex[n];
        const layerNd = layer.domNode
        layerNd.style.transform = "translate(0px,0px)"
      } // next n
    } catch(err) {
      logErr(err)
    } // end if try/catch
    
  } // end if resetParallaxEffect
  
  
  function resizeLayer(layer) {
    try {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const layerNd = layer.domNode;
      layerNd.style.width = (w+MAX_MOVEMENT)+"px"
      layerNd.style.height = (h+MAX_MOVEMENT)+"px"
      
    } catch(err) {
      logErr(err)
      bResizingLayers = false;
      bNeedToResizeAgain = false;
    } // end if try/catch
    
    
  } // end of resizeLayer()
  
  
  
  function resizeLayers(evt) {
    try {
      
      if (bResizingLayers=== true) {
        
        return;
      } // end if
      
      bResizingLayers = true;
      const nMax = layersByIndex.length;
      
      for (let n=0;n<nMax;n++) {
        const layer = layersByIndex[n];
        resizeLayer(layer);
      } // next n
      
      bResizingLayers = false;
      
      if (bNeedToResizeAgain===true) {
        bNeedToResizeAgain = false;
        resizeLayers(evt)
      } // end if
      
      bNeedToResizeAgain = false;
    } catch(err) {
      logErr(err)
      bResizingLayers = false;
      bNeedToResizeAgain = false;
    } // end of try/catch block
    
  } // end of resizeLayers()
  
  
  function handleMouseMovement(evt) {
    
    try {
      const el = evt.srcElement || evt.originalTarget;
      const x = evt.pageX;
      const y = evt.pageY;
      
      doParallaxEffect(x, y)
    } catch(err) {
      logErr(err)
    } // end try/catch
    
    
  } // end of handleMouseMovement()
  
  
  /*
   */
  function doParallaxEffect(x, y) {
    try {      
      if (layersByIndex.length <3) {
        return; // not enough layers to do a parallax effect
      } // end if
      
      const w = window.innerWidth;
      const h = window.innerHeight;
      let xPct = EDGE_THICKNESS / w - MOVEMENT_DAMPER_VALUE_X;
      let yPct = EDGE_THICKNESS / h - MOVEMENT_DAMPER_VALUE_Y;
      
      let nMaxXOffset = x * xPct;
      let nMaxYOffset = y * yPct;
      
      if (nPivotLayer === -1) {
        nPivotLayer = Math.floor(layersByIndex.length / 2)
      } // end if
      
      const pivotLayer = layersByIndex[nPivotLayer];
      
      // handle layers Behind the pivot layer:
      for (let n=0;n<nPivotLayer;n++) {
        const layer = layersByIndex[n];
        const layerNd = layer.domNode
        
        let nLayerDiff = pivotLayer.zIndex -layer.zIndex;
        
        let x2,y2;
                
        x2 = nMaxXOffset - nLayerDiff;
        y2 = nMaxYOffset - nLayerDiff;
        
        x2 = Math.floor(x2)
        y2 = Math.floor(y2)
        
        layerNd.style.transform = "translate("+x2+"px,"+y2+"px)"
      } // next n
      
      // handle layers in Front of the pivot layer:
      for (let n=nPivotLayer+1;n<layersByIndex.length;n++) {
        const layer = layersByIndex[n];
        const layerNd = layer.domNode
        
        let nLayerDiff = pivotLayer.zIndex + layer.zIndex;
        
        let x2,y2;
        x2 = (nMaxXOffset - nLayerDiff) * -1
        y2 = (nMaxYOffset - nLayerDiff) * -1
        
        layerNd.style.transform = "translate("+x2+"px,"+y2+"px)"
      } // next n
      
    } catch(err) {
      logErr(err)
    } // end of try/catch
    
  } // end of doParallaxEffect()
  
  
  function getVal(params,sParam,defVal) {
		if (!params) {
			params = {};
		} // end if

		if (params[sParam]) {
			return params[sParam];
		} else {
            if (typeof params[sParam] === "boolean") {
                return params[sParam];
            } // end if

			return defVal;
		} // if / else

  } // end of function getVal()
  
   /*************************************************************************
    *************************************************************************/	
    function logErr(err) {
        console.group();
        console.error(err.message)
        console.error("line: "+err.line)
        console.groupEnd();
    } // end of logErr()
  
  
  window.addEventListener('load', pageLoaded);
  console.log("'load' event listener set")
} // end of SimpleParallax() Constructor
