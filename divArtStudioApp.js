
// application level variable declaration:

//  lstClick() used for all left panel list items

let propPanel;
let nNextId = 0;
let dataById = [];

let chkTraceModeNd,chkShowGridNd,chkShowRulerNd,zoomResetBtnNd;
let vToolbarNd;
let lstDesignNd,lstRefArtNd,lstBackgroundNd,lstElementsNd,lstStylesNd,lstAnimationsNd;
let btnAddRefArtNd;
let saveBtnNd;
let addDesignElBtnNd,vportNd,workAreaNd,RefArtAreaNd,artBoardNd,statusInfoNd;
let lastDesignElement,lastLiElement;

let objHighlighterNd,tl_hdlNd,tm_hdlNd,tr_hdlNd,l_hdlNd,r_hdlNd,bl_hdlNd,bm_hdlNd,br_hdlNd
let dia1Nd,dia2Nd;

let currentDesign;
let cssPropLst = [];
let sEditMode = "sel"
let bDragging = false
let bDraggingHandle = false;
let bMouseDown = false
let dragInfo = {}
const DRAG_THRESHOLD = 5;

const MIN_ZOOM = .6
const MAX_ZOOM = 4;

/**
 *   APP PAGE SETUP:
 */
function pageSetup() {
  try {
    buildCssPropLst()
    propPanel = new OrvProps('ppane');
    propPanel.addEventListener("change", somethingsChanged)
  
    chkTraceModeNd = document.getElementById("chkTraceMode")
    chkShowGridNd = document.getElementById("chkShowGrid")
    chkShowRulerNd = document.getElementById("chkShowRuler")

    chkTraceModeNd.addEventListener("change",viewSettingsChange)
    chkShowGridNd.addEventListener("change",viewSettingsChange)
    chkShowRulerNd.addEventListener("change",viewSettingsChange)

    zoomResetBtnNd = document.getElementById("zoomResetBtn")
    zoomResetBtnNd.addEventListener("click",zoomReset)
    zoomResetBtnNd.style.display = "none"

    lstDesignNd = document.getElementById("lstDesign")
    lstRefArtNd = document.getElementById("lstRefArt")
    btnAddRefArtNd = document.getElementById("btnAddRefArt")
    lstBackgroundNd = document.getElementById("lstBackground")
    lstElementsNd = document.getElementById("lstElements")
    lstStylesNd = document.getElementById("lstStyles")
    lstAnimationsNd = document.getElementById("lstAnimations")
  
    vToolbarNd = document.getElementById("vToolbar")
    workAreaNd = document.getElementById("workArea")
    RefArtAreaNd = document.getElementById("RefArtArea")
    artBoardNd = document.getElementById("artBoard")
    statusInfoNd = document.getElementById("statusInfo")
    
    let nArtWidth = (screen.width * 1.5)
    let nArtHeight = (screen.height * 1.5)
    workAreaNd.style.width = (nArtWidth)+"px"
    workAreaNd.style.height = (nArtHeight)+"px"
    RefArtAreaNd.style.width = (nArtWidth)+"px"
    RefArtAreaNd.style.height = (nArtHeight)+"px"
    artBoardNd.style.width = (nArtWidth)+"px"
    artBoardNd.style.height = (nArtHeight)+"px"
  
    btnAddRefArtNd.addEventListener("click",showAddRefArt)


    saveBtnNd = document.getElementById("saveBtn")
    saveBtnNd.addEventListener("click",saveButtonClicked)
    addDesignElBtnNd = document.getElementById("addDesignElBtn")
    addDesignElBtnNd.addEventListener("click",addDesignElementBtnClicked)
  
    lstDesignNd.addEventListener("click",lstClick)
    lstRefArtNd.addEventListener("click",lstClick)
    lstBackgroundNd.addEventListener("click",lstClick)
    lstElementsNd.addEventListener("click",lstClick)
    lstStylesNd.addEventListener("click",lstClick)
    lstAnimationsNd.addEventListener("click",lstClick)

    artBoardNd.addEventListener("click",artBoardClicked)
    artBoardNd.addEventListener("mousemove",artBoardMouseMove)
    artBoardNd.addEventListener("mousedown",artBoardMouseDown)
    artBoardNd.addEventListener("mouseup",artBoardMouseUp)

    vportNd = document.getElementById("vport")
    vportNd.addEventListener("wheel",zoomInAndOut)
    
    //zoomReset
    
    //tl_hdlNd,tm_hdlNd,tr_hdlNd,l_hdlNd,r_hdlNd,bl_hdlNd,bm_hdlNd,br_hdlNd
    objHighlighterNd = document.getElementById("objHighlighter")
    tl_hdlNd = document.getElementById("tl_hdl")
    tm_hdlNd = document.getElementById("tm_hdl")
    tr_hdlNd = document.getElementById("tr_hdl")
    l_hdlNd = document.getElementById("l_hdl")
    r_hdlNd = document.getElementById("r_hdl")
    bl_hdlNd = document.getElementById("bl_hdl")
    bm_hdlNd = document.getElementById("bm_hdl")
    br_hdlNd = document.getElementById("br_hdl")

    dia1Nd = document.getElementById("dia1")
    dia2Nd = document.getElementById("dia2")
  
    // https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript
  
    setupNewDesign()
  
    const params = {}
    addDesignElement(params)

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })     
    } // end of try/catch

} // end of pageSetup()



function buildCssPropLst() {
  try {
    //cssPropLst.push({prop:"",styleName:""})
    cssPropLst.push({prop:"alignContent",styleName:"align-content"})
    cssPropLst.push({prop:"alignItems",styleName:"align-items"})
    cssPropLst.push({prop:"alignSelf",styleName:"align-self"})
    cssPropLst.push({prop:"backfaceVisibility",styleName:"backface-visibility"})
    cssPropLst.push({prop:"backgroundAttachment",styleName:"background-attachment"})
    cssPropLst.push({prop:"backgroundBlendMode",styleName:"background-blend-mode"})
    cssPropLst.push({prop:"backgroundColor",styleName:"background-color"})
    cssPropLst.push({prop:"backgroundImage",styleName:"background-image"})
    cssPropLst.push({prop:"border",styleName:"border"})
    cssPropLst.push({prop:"borderBottom",styleName:"border-bottom"})
    cssPropLst.push({prop:"borderBottomLeftRadius",styleName:"border-bottom-left-radius"})
    cssPropLst.push({prop:"borderBottomRightRadius",styleName:"border-bottom-right-radius"})
    cssPropLst.push({prop:"borderColor",styleName:"border-color"})
    cssPropLst.push({prop:"borderLeft",styleName:"border-left"})
    cssPropLst.push({prop:"borderRadius",styleName:"border-radius"})
    cssPropLst.push({prop:"borderRight",styleName:"border-right"})
    cssPropLst.push({prop:"borderStyle",styleName:"border-style"})
    cssPropLst.push({prop:"borderTop",styleName:"border-top"})
    cssPropLst.push({prop:"borderTopLeftRadius",styleName:"border-top-left-radius"})
    cssPropLst.push({prop:"borderTopRightRadius",styleName:"border-top-right-radius"})
    cssPropLst.push({prop:"borderWidth",styleName:"border-width"})
    cssPropLst.push({prop:"bottom",styleName:"bottom"})
    cssPropLst.push({prop:"boxShadow",styleName:"box-shadow"})
    cssPropLst.push({prop:"boxSizing",styleName:"box-sizing"})
    cssPropLst.push({prop:"display",styleName:"display"})
    cssPropLst.push({prop:"fontFamily",styleName:"font-family"})
    cssPropLst.push({prop:"fontSize",styleName:"font-size"})
    cssPropLst.push({prop:"fontStyle",styleName:"font-style"})
    cssPropLst.push({prop:"fontVariant",styleName:"font-variant"})
    cssPropLst.push({prop:"fontWeight",styleName:"font-weight"})
    cssPropLst.push({prop:"height",styleName:"height"})
    cssPropLst.push({prop:"left",styleName:"left"})
    cssPropLst.push({prop:"letterSpacing",styleName:"letter-spacing"})
    cssPropLst.push({prop:"lineHeight",styleName:"line-height"})
    cssPropLst.push({prop:"margin",styleName:"margin"})
    cssPropLst.push({prop:"marginBottom",styleName:"margin-bottom"})
    cssPropLst.push({prop:"marginLeft",styleName:"margin-left"})
    cssPropLst.push({prop:"marginRight",styleName:"margin-right"})
    cssPropLst.push({prop:"marginTop",styleName:"margin-top"})
    cssPropLst.push({prop:"opacity",styleName:"opacity"})
    cssPropLst.push({prop:"outline",styleName:"outline"})
    cssPropLst.push({prop:"outlineColor",styleName:"outline-color"})
    cssPropLst.push({prop:"outlineOffset",styleName:"outline-offset"})
    cssPropLst.push({prop:"outlineStyle",styleName:"outline-style"})
    cssPropLst.push({prop:"outlineWidth",styleName:"outline-width"})
    cssPropLst.push({prop:"overflow",styleName:"overflow"})
    cssPropLst.push({prop:"padding",styleName:"padding"})
    cssPropLst.push({prop:"paddingBottom",styleName:"padding-bottom"})
    cssPropLst.push({prop:"paddingLeft",styleName:"padding-left"})
    cssPropLst.push({prop:"paddingRight",styleName:"padding-right"})
    cssPropLst.push({prop:"paddingTop",styleName:"padding-top"})
    cssPropLst.push({prop:"position",styleName:"position"})
    cssPropLst.push({prop:"right",styleName:"right"})
    cssPropLst.push({prop:"textAlign",styleName:"text-align"})
    cssPropLst.push({prop:"textDecoration",styleName:"text-decoration"})
    cssPropLst.push({prop:"textIndent",styleName:"text-indent"})
    cssPropLst.push({prop:"textShadow",styleName:"text-shadow"})
    cssPropLst.push({prop:"textTransform",styleName:"text-transform"})
    cssPropLst.push({prop:"top",styleName:"top"})
    cssPropLst.push({prop:"transform",styleName:"transform"})
    cssPropLst.push({prop:"transformOrigin",styleName:"transform-origin"})
    cssPropLst.push({prop:"visibility",styleName:"visibility"})
    cssPropLst.push({prop:"width",styleName:"width"})
    cssPropLst.push({prop:"wordSpacing",styleName:"word-spacing"})
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch


} // end of buildCssPropLst() 



// **************************************
function setupNewDesign() {

  try {
    nNextId = 0; // reset id counter
    dataById = []; // clear out any previous data
  
    // object is container object for the entire desing
    // keeps track of state of certain GUI items
    // 
    currentDesign = {};
    currentDesign.appId = "DIV-Art-Studio"
    currentDesign.designId = getNextId()
    currentDesign.objType = "artDesign"
    currentDesign.createDate = new Date()
    currentDesign.updateDate = new Date()
    currentDesign.nextIdNum = 0;
    currentDesign.zoom = 1; // 1 = full size (1 to 1)
    currentDesign.traceMode = false; // trace mode allows 'tracing' of reference images
    currentDesign.showGrid = true;
    currentDesign.showRuler = true;
    currentDesign.referenceImagesByIndex = []
    currentDesign.gradientsByIndex = [];
    currentDesign.designElementsByIndex = []
    currentDesign.topLevelDesignElementsByIndex = []
    currentDesign.externalFontsByIndex = [];
    currentDesign.stylesByIndex = []
    currentDesign.keyframeAnimationsByIndex = []
    
  
    // object contains property values for the design's background
    // like background color, gradients, margin, padding
    const artworkBackground = {}
    artworkBackground.backgroundId = getNextId()
    artworkBackground.objType = "artworkBackground"
    artworkBackground.lockBackground = false
    artworkBackground.backgroundColor = "white"
    artworkBackground.domElement = artBoardNd  
    artworkBackground.liElement = document.getElementById("artBackground_ref")
    currentDesign.artworkBackground = artworkBackground
    
    // object contains top-level option settings for design
    const designSettings = {}
    designSettings.designSettingsId = getNextId()
    designSettings.objType = "designSettings"
    designSettings.designName = "CSS Artwork"
    designSettings.description = ""
    designSettings.fileName = ""
    designSettings.fileCreateDate = ""
    designSettings.fileUpdateDate = ""
    designSettings.author = ""
    designSettings.singleDivOnly = false
    currentDesign.designSettings = designSettings
   
    // object contains code build option settings for design:
    const buildCode = {}
    buildCode.buildCodeId = getNextId()
    buildCode.objType = "buildCode"
    currentDesign.buildCode = buildCode
  
  
    dataById[currentDesign.designId] = currentDesign
    dataById[designSettings.designSettingsId] = designSettings
    dataById[buildCode.buildCodeId] = buildCode
    dataById[artworkBackground.backgroundId] = artworkBackground
  
    const designSettings_refNd = document.getElementsByClassName("designSettings_ref")[0]
    designSettings_refNd.dataset.id = designSettings.designSettingsId
  
    const buildCode_refNd = document.getElementsByClassName("buildCode_ref")[0]
    buildCode_refNd.dataset.id = buildCode.buildCodeId
  
    const artBackground_refNd = document.getElementsByClassName("artBackground_ref")[0]
    artBackground_refNd.dataset.id = artworkBackground.backgroundId

    setupDesignElementToolbar()

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })      
  } // end of try/catch
    
} // end of setupNewDesign




// **************************************
// used for genning data to save user's top-level design's data...
function genDesignData(dataObj) {
  try {
    const designData = {};
    designData.designId = dataObj.designId
    designData.objType = "artDesign"
    designData.createDate = dataObj.createDate
    designData.updateDate = dataObj.updateDate
    designData.nextIdNum = dataObj.nextIdNum
    designData.zoom = dataObj.zoom
    designData.traceMode = dataObj.traceMode
    designData.showGrid = dataObj.showGrid
    designData.showRuler = dataObj.showRuler  
  
    return designData;

  } catch(err) {
      showErrInfo(err,{},function(err) {
        debugger;
      })     
  } // end of try/catch

} // end of genDesignData



// **************************************
function genGradientData(dataObj) {
  try {
    const gradientData = {};

    return gradientData;

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })     
  } // end of try/catch
  
} // end of genGradientData



function genGradientColorStopData(dataObj) {
  try {
    const gradientColorStopData = {};
    gradientColorStopData.objType = "gradientColorStop"

    return gradientColorStopData;

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })      
  } // end of try/catch   
  
} // end of genGradientColorStopData


// **************************************
function genBackgroundData(dataObj) {
  try {
    const backgroundData = {};
    backgroundData.objType = "artBackground"
    return backgroundData;

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })    
  } // end of try/catch   
  
} // end of genBackgroundData



// **************************************
function genDesignSettingsData(dataObj) {
  try {
    const designSettingsData = {};

    return designSettingsData;

  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    })    
  } // end of try/catch
  
} // end of genDesignSettingsData



// **************************************
function genBuildCodeData(dataObj) {
  try {
    const buildCodeData = {};

    return buildCodeData;
  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    })     
  } // end of try/catch   

} // end of genBuildCodeData


function genRefImageData(dataObj) {
  try {
    const refImageData = {};

    return refImageData;
  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    }) 
  } // end of try/catch
   

} // end of genRefImageData


function genDesignElementData(dataObj) {
  try {
    const designElementData = {};

    return designElementData;
  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    }) 
  } // end of try/catch
   
} // end of genDesignElementData



// **************************************
function genExternalFontData(dataObj) {
  try {
    const externalFontData = {};

    return externalFontData;

  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    })     
  } // end of try/catch   
  
} // end of genExternalFontData



function genStyleSelectorData(dataObj) {
  try {
    const styleSelectorData = {};

    return styleSelectorData;

  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    })   
  } // end of try/catch   

} // end of genStyleSelectorData



function genKeyframeAnimationData(dataObj) {
  try {
    const keyframeAnimationData = {};

    return keyframeAnimationData;
  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    })   
  } // end of try/catch   

} // end of genKeyframeAnimationData



function buildSaveArraySection(params) {
  try {
    const dataObjsToAdd = params.dataObjsToAdd
    const arrayToAddTo = params.arrayToAddTo
  
    const nMax = dataObjsToAdd.length;
  
    for (let n=0; n < nMax; n++) {
      const dataObj = dataObjsToAdd[n];
      switch(dataObj.objType) {
        case "artDesign":
          arrayToAddTo.push(genDesignData(dataObj) )
          break;
        case "gradientColorStop":
          arrayToAddTo.push(genGradientColorStopData(dataObj) )
          break;
        case "gradient":
          arrayToAddTo.push(genGradientData(dataObj) )
          break;
        case "artBackground":
          arrayToAddTo.push(genBackgroundData(dataObj) )
          break;
        case "designSettings":
          arrayToAddTo.push(genDesignSettingsData(dataObj) )
          break;
        case "buildCode":
          arrayToAddTo.push(genBuildCodeData(dataObj) )
          break;
        case "refImage":
          arrayToAddTo.push(genRefImageData(dataObj) )
          break;
        case "designElement":
          arrayToAddTo.push(genDesignElementData(dataObj) )
          break;
        case "externalFont":
          arrayToAddTo.push(genExternalFontData(dataObj) )
          break;
        case "styleSelector":
          arrayToAddTo.push(genStyleSelectorData(dataObj) )
          break;
        case "keyframeAnimation":
          arrayToAddTo.push(genKeyframeAnimationData(dataObj) )
          break;        
      } // end switch()
    } // next n

  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    })     
  } // end of try/catch

} // end of buildSaveArraySection()



function saveButtonClicked() {
  try {
    genDesignFile()
  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    })      
  } // end of try/catch   
  
} // end of saveButtonClicked()



function genDesignFile() {
  try {
    const dataArray = []; // single dimension array to store design data in...

    const designSettings = currentDesign.designSettings
    const artBackground = currentDesign.artBackground
  
    if (designSettings.fileName === "") {
      designSettings.fileName = "sample.div_art"
      designSettings.fileCreateDate = new Date()
      // will flesh this out later on!
    } // end if
  
    designSettings.fileUpdateDate = new Date()
  
    dataArray.push(designSettings)
    buildSaveArraySection({dataObjsToAdd:[currentDesign],arrayToAddTo:dataArray})
    buildSaveArraySection({dataObjsToAdd:[artBackground],arrayToAddTo:dataArray})
    buildSaveArraySection({dataObjsToAdd:[designSettings],arrayToAddTo:dataArray})
    buildSaveArraySection({dataObjsToAdd:currentDesign.referenceImagesByIndex,arrayToAddTo:dataArray})
    buildSaveArraySection({dataObjsToAdd:currentDesign.designElementsByIndex,arrayToAddTo:dataArray})
    buildSaveArraySection({dataObjsToAdd:currentDesign.externalFontsByIndex,arrayToAddTo:dataArray})
    buildSaveArraySection({dataObjsToAdd:currentDesign.stylesByIndex,arrayToAddTo:dataArray})
    buildSaveArraySection({dataObjsToAdd:currentDesign.keyframeAnimationsByIndex,arrayToAddTo:dataArray})
  
    const sData = JSON.stringify(dataArray)
    const sFileName = designSettings.fileName
  
    downloadFile(sData, sFileName, "text/plain") 

  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    }) 
  } // end of try/catch   
  
} // end of genDesignFile()


function downloadFile(data, sFileName, sFileType) {
  try {
    let blob = new Blob([data], {type : sFileType});
    let sURL = URL.createObjectURL(blob);
    let a = document.createElement("a");
    
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = sURL;
    a.download = sFileName;
    a.click();
    window.URL.revokeObjectURL(sURL);
  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    })    
  } // end of try/catch   
  
} // end of function downloadFile()



function somethingsChanged(evt) {
  try {
   
    const prop = evt.propertyObj;  // Property object (describes various attributes of a property)
    const dataObj = prop.propsObj  // object that the property belongs to
  
    // the property value of what kind of object change?
    // based on the object type, execute the correct
    // function to handle special cases
    switch(dataObj.objType) {
      case "artDesign":
        break;
      case "artBackground":
        break;
      case "designSettings":
        break;
      case "buildCode":
        break;
      case "refImage":
        break;
      case "designElement":
        designElementPropValueChanged(evt, dataObj) 
        break;
      case "externalFont":
        break;
      case "styleSelector":
        break;
      case "keyframeAnimation":
        break;  
      default:
        break;    
    } // end switch()
  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    })    
  } // end of try/catch

} // end of somethingsChanged()





function designElementPropValueChanged(evt, designElement) {
  try {
    const sPropName = evt.propertyName;

    if (sPropName === "title") {
      designElement.liElement.innerText = evt.newValue;
      return;
    } // end if
  
    positionHandlesOn(designElement.domElement) 
  } catch(err) {
      showErrInfo(err,{},function(err) {
        debugger;
      })     
  } // end of try/catch

} // end of designElementPropValueChanged



/**
 * 
 * User clicked on a list item in list panel
 * on left of page...
 */
function lstClick(evt) {
  try {
    let el = evt.srcElement || evt.originalTarget;
    if (el.tagName === "BUTTON") {
      const sId = el.dataset.id
      addChildDesignElementBtnClicked(sId)
      evt.preventDefault()
      return;
    } // end if

    if (el.tagName === "LI") {
      unselectLastListItem()
      
      const sId = el.dataset.id; // do BEFORE little tricky move below...

      let ulList = el.getElementsByTagName("UL")
      if (ulList.length>0) {
        el = el.getElementsByTagName("DIV")[0]
      } // end if

      if (!el.classList.contains("lnSel"))  {
        el.classList.add("lnSel")
      } // end if
      
      

      dataObj = dataById[sId]
      switch(dataObj.objType) {
        case "designSettings":
          showDesignSettingsPanel(dataObj)
          break;
        case "buildCode":
          showCodeBuildPanel(dataObj)
          break;
        case "refArt":
          selectRefArt(dataObj)
          break;
        case "artworkBackground":
          selectArtworkBackgroundNode()
          break;
        case "designElement":
          selectDesignElement(dataObj) 
          break;
      } // end switch()
  
      lastLiElement = el;
    } // end if (el.tagName === "LI")
    
  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    })      
  } // end of try/catch
  
} // end of lstClick()




function selectRefArt(refArt) {
  try {
    artBoardNd.style.display = "none"
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch

} // end of selectRefArt


function selectArtworkBackgroundNode() {
  try {
    hideHighlight()
    artBoardNd.style.display = "block"
    //unselectLastListItem()
    //lastLiElement = currentDesign.liElement
    //artworkBackground
    lastLiElement = currentDesign.artworkBackground.liElement
    lastLiElement.classList.add("lnSel")
    setupArtworkBackgroundPropertyPanel()
  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    }) 
  } // end of try/catch
  
} // end of selectArtworkBackgroundNode()


function unselectLastListItem() {
  try {
    if (lastLiElement !== null && typeof lastLiElement !== "undefined") {
      let el = lastLiElement

      let ulList = el.getElementsByTagName("UL")
      if (ulList.length>0) {
        el = el.getElementsByTagName("DIV")[0]
      } // end if

      if (el.classList.contains("lnSel")) {
        el.classList.remove("lnSel")
      } // end if
    } // end if
  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    }) 
  } // end of try/catch    

} // end of unselectLastListItem


/**
 * 
 * 
 * Called by:    vportNd.addEventListener("wheel",zoomInAndOut)
 */
function zoomInAndOut(evt) {
  let n = -1;
  const nZoomInc = .02;

  try {
    if (evt.deltaY < 0) {
      n = 1
    } // end if / else
  
    currentDesign.zoom = currentDesign.zoom + (nZoomInc * n)
  
    if (currentDesign.zoom < MIN_ZOOM) {
      currentDesign.zoom = MIN_ZOOM
    } // end if
  
    if (currentDesign.zoom > MAX_ZOOM) {
      currentDesign.zoom = MAX_ZOOM
    } // end if
  
    //const retObj = orvCore.getMousePosInCntr("artBoard",evt)

    //evt.clientX
    //let nXPct = (evt.offsetX / workAreaNd.clientWidth) * 100
    //let nYPct = (evt.offsetY / workAreaNd.clientHeight) * 100
    let nXPct = (evt.clientX / workAreaNd.clientWidth) * 100
    let nYPct = (evt.clientY / workAreaNd.clientHeight) * 100

    //let nXPct = (retObj.x / workAreaNd.clientWidth) * 100
    //let nYPct = (retObj.y / workAreaNd.clientHeight) * 100
  
    workAreaNd.style.transformOrigin = (nXPct)+"% "+(nYPct)+"%"
    workAreaNd.style.transform = "scale("+currentDesign.zoom+")"
    //console.log("scale("+currentDesign.zoom+")")
  
    if (currentDesign.zoom === 1) {
      zoomResetBtnNd.style.display = "none"
    } else {
      zoomResetBtnNd.style.display = "inline"
    } // end if/else
  
    evt.preventDefault()
  } catch(err) {
    orvCore.displayErrMsg(err,{},function(err) {
      debugger;
    }) 
  } // end of try/catch  
  
} // end of zoomInAndOut()


/**
 * 
 *  checkboxes where checked/unchecked for view settings
 *  save values in {currentDesign} and perform the 
 *  proper changes to the UI for the particular setting.
 */
function viewSettingsChange(evt) {
  try {
    const el = evt.srcElement || evt.originalTarget;

    if (el.id === "chkTraceMode") {
      currentDesign.traceMode = el.checked;
      artBoardNd.style.display = "block"

      if (el.checked) {
        artBoardNd.style.opacity = ".4"
      } else {
        artBoardNd.style.opacity = "1"
      } // end if/else
      return
    } // end if

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })      
  } // end of try/catch

} // end of viewSettingsChange()




function zoomReset() {
  try {
    currentDesign.zoom = 1
    workAreaNd.style.transform = "scale(1)"
    zoomResetBtnNd.style.display = "none"
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })     
    } // end of try/catch
  
} // end of zoomReset()



function artBoardMouseMove(evt) {
  try {
    const el = evt.srcElement || evt.originalTarget;
    statusInfoNd.innerText = "Mouse Pos: "+evt.layerX+"px, "+evt.layerY+"px"

    if (bMouseDown && !bDragging) {

      if (dragInfo.el.classList.contains("handle") && !dragInfo.el.classList.contains("handleDisabled")) {
        startHandleDrag(dragInfo.el,evt)
        return
      } // end if

      if (evt.clientX>dragInfo.clientX+DRAG_THRESHOLD ||evt.clientX<dragInfo.clientX-DRAG_THRESHOLD) {
        bDragging = true;
      } else if (evt.clientY>dragInfo.clientY+DRAG_THRESHOLD ||evt.clientY<dragInfo.clientY-DRAG_THRESHOLD) {
        bDragging = true;
      } // end if/else if

      if (bDragging) {
        const designElement = dataById[dragInfo.el.dataset.id]

        // you are not allowed to drag locked design elements
        if (typeof designElement === "undefined") {
          console.log("cannot find id: "+dragInfo.el.dataset.id+" in dataById[]")
          bDragging = false
          return
        } // end if

        if (designElement.lockElement === true) {
          bDragging = false
          return
        } // end if
        dragInfo.designElement = designElement
        selectDesignElement(dragInfo.designElement)
      } // end if
      
    } // end if

    // strtX =10   currX = 20  xDiff=10
    // strtX =20   currX = 10  xDiff=-10
    if (bDragging) {
      const xDiff = evt.clientX -dragInfo.clientX
      const yDiff = evt.clientY -dragInfo.clientY
      let nTop = yDiff+dragInfo.offsetTop
      let nLeft = xDiff+dragInfo.offsetLeft

      if (bDraggingHandle) {
        handleDragging(evt)
        return
      } // end if

      const topProp = propPanel.getPropObjByPropName("top")
      topProp.value = (nTop)+"px"
      const leftProp = propPanel.getPropObjByPropName("left")
      leftProp.value = (nLeft)+"px"

      //dragInfo.el.style.left = (xDiff+dragInfo.offsetLeft)+"px"
      //dragInfo.el.style.top = (yDiff+dragInfo.offsetTop)+"px"
      positionHandlesOn(dragInfo.el)
    } // end if
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
} // end of artBoardMouseMove()

function artBoardMouseDown(evt) {
  try {
    const el = evt.srcElement || evt.originalTarget;


    if (el.id !== "artBoard") {
      dragInfo.clientX = evt.clientX  // mouse X pos on artBoard
      dragInfo.clientY = evt.clientY  // mouse Y pos on artBoard
      dragInfo.layerX = evt.layerX    
      dragInfo.layerY = evt.layerY
      dragInfo.el = el
      dragInfo.offsetLeft = el.offsetLeft  // left pos of element
      dragInfo.offsetTop = el.offsetTop    // top pos of element
      bMouseDown = true
      bDragging = false
      bDraggingHandle = false
    } // end if
    
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
} // end of artBoardMouseDown()


function artBoardMouseUp(evt) {
  try {
    bMouseDown = false
    bDraggingHandle = false
    bDragging = false;
        
    const el = evt.srcElement || evt.originalTarget;
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
} // end of artBoardMouseUp()


// begin resize handle drag (dragging of a resize handle):
// called from: artBoardMouseMove()
function startHandleDrag(el,evt) {
  try {
    dragInfo.startWidth = lastDesignElement.domElement.offsetWidth
    dragInfo.startHeight = lastDesignElement.domElement.offsetHeight
    dragInfo.handleEl = el;
    dragInfo.el = objHighlighterNd
    dragInfo.designElementDomEl = lastDesignElement.domElement

    dragInfo.offsetLeft = objHighlighterNd.offsetLeft  // left pos of thing we're resizing
    dragInfo.offsetTop = objHighlighterNd.offsetTop    // top pos of thing we're resizing
    dragInfo.adjustLeftPos = false;
    dragInfo.adjustTopPos = false;

    switch(el.id) {
      case "tl_hdl":        // top-left
        dragInfo.widthMultiplier = -1
        dragInfo.heightMultiplier = -1
        dragInfo.adjustLeftPos = true;
        dragInfo.adjustTopPos = true;
        break;
      case "tm_hdl":        // top-middle
        dragInfo.widthMultiplier = 0
        dragInfo.heightMultiplier = -1
        dragInfo.adjustTopPos = true;
        break;
      case "tr_hdl":        // top-right
        dragInfo.widthMultiplier = 1
        dragInfo.heightMultiplier = -1
        dragInfo.adjustTopPos = true;
        break;
      case "l_hdl":         // left
        dragInfo.widthMultiplier = -1
        dragInfo.heightMultiplier = 0
        dragInfo.adjustLeftPos = true;
        break;  
      case "r_hdl":         // right
        dragInfo.widthMultiplier = 1
        dragInfo.heightMultiplier = 0
        break;   
      case "bl_hdl":        // bottom-left
        dragInfo.widthMultiplier = -1
        dragInfo.adjustLeftPos = true;
        dragInfo.heightMultiplier = 1
        break;   
      case "bm_hdl":        // bottom-middle
        dragInfo.widthMultiplier = 0
        dragInfo.heightMultiplier = 1
        break;   
      case "br_hdl":        // bottom-right
        dragInfo.widthMultiplier = 1
        dragInfo.heightMultiplier = 1
        break;                                              
    } // end of switch()

    bDragging = true;
    bDraggingHandle = true;
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // end of startHandleDrag



function handleDragging(evt) {
  try {
    
    const xDiff = evt.clientX -dragInfo.clientX
    const yDiff = evt.clientY -dragInfo.clientY
    let nNewWidth,nTop
    let nNewHeight,nLeft
    let nOffbyX = 0
    let nOffbyY = 0
    let nMinSize = 4
    const domEl = dragInfo.designElementDomEl

    // dragInfo.widthMultiplier = -1
    //     dragInfo.heightMultiplier = -1
    //     dragInfo.adjustLeftPos = true;
    //     dragInfo.adjustTopPos = true;
    
    if (dragInfo.widthMultiplier !==0) {
      console.log("xDiff="+xDiff)
      nNewWidth = dragInfo.startWidth + (xDiff * dragInfo.widthMultiplier)
      console.log("nNewWidth="+nNewWidth)
      if (nNewWidth < nMinSize) {
        nOffbyX = nMinSize - nNewWidth
        nNewWidth = nMinSize        
      } // end if

      const widthProp = propPanel.getPropObjByPropName("width")
      widthProp.value = (nNewWidth)+"px"
    } // end if

    if (dragInfo.heightMultiplier !==0) {
      console.log("yDiff="+yDiff)
      nNewHeight = dragInfo.startHeight + (yDiff * dragInfo.heightMultiplier)
      console.log("nNewHeight="+nNewHeight)
      if (nNewHeight < nMinSize) {
        nOffbyY = nMinSize - nNewHeight
        nNewHeight = nMinSize        
      } // end if

      const heightProp = propPanel.getPropObjByPropName("height")
      heightProp.value = (nNewHeight)+"px"
    } // end if

    if (dragInfo.adjustTopPos) {
      nTop = yDiff+dragInfo.offsetTop-nOffbyY
      const topProp = propPanel.getPropObjByPropName("top")
      topProp.value = (nTop)+"px"
    } // end if

    if (dragInfo.adjustLeftPos) {
      nLeft = xDiff+dragInfo.offsetLeft-nOffbyX
      const leftProp = propPanel.getPropObjByPropName("left")
      leftProp.value = (nLeft)+"px"
    } // end if
          
    positionHandlesOn(dragInfo.designElementDomEl)

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // end of handleDragging


function artBoardClicked(evt) {
  try {
    const el = evt.srcElement || evt.originalTarget;

   

    if (sEditMode==="sel") {
      doSelection(el, evt)
    } else {
      addQuickDesignElement(el, evt)
    } // end if/else

    
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })    
  } // end of try/catch   
  
} // end of artBoardClicked()


function blankOutPropertyPanel() {
  try {
    propPanel.clear()
    propPanel.displayPanel();
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
  
} // end of blankOutPropertyPanel()

let lastToolbarBtn
let toolbarBtnsByIndex = []

function addToolbarBtn(params) {
  let btnNd,nTop;
  let bSel = false;
  try {
    const btnObj = {}
    btnObj.fn = params.fn

    btnNd = document.createElement("div")
    btnNd.className = "toolbarBtn"
    btnNd.dataset.idx = toolbarBtnsByIndex.length
    nTop = 38 * toolbarBtnsByIndex.length + 4
    btnNd.style.top = (nTop)+"px"
    if (typeof params.selected === "boolean") {
      if (params.selected === true) {
        btnNd.className = btnNd.className + " toolbarBtnSel"
        bSel = true;
      } // end if
    } // end if

    btnNd.title = params.title

    vToolbarNd.appendChild(btnNd)
    toolbarBtnsByIndex.push(btnObj)

    if (typeof params.fn === "function") {
      btnNd.addEventListener("click", toolbarBtnClicked)
    } // end if

    if (bSel) {
      lastToolbarBtn = btnNd
    } // end if
    
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // end of addToolbarBtn



function toolbarBtnClicked(evt) {
  let el

  try {
    el = evt.srcElement || evt.originalTarget;

    if (typeof lastToolbarBtn !== "undefined" && lastToolbarBtn !== null) {
      lastToolbarBtn.className = "toolbarBtn"
    } // end if

    el.className = "toolbarBtn toolbarBtnSel"
    let idx = el.dataset.idx - 0;
    btnObj = toolbarBtnsByIndex[idx]

    if (typeof btnObj.fn === "function") {
      btnObj.fn()
    } // end if

    lastToolbarBtn = el
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  

} // end of toolbarBtnClicked


function clearToolbar() {
  try {
    lastToolbarBtn = undefined;
    vToolbarNd.innerHTML = "";
    toolbarBtnsByIndex = []
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
  
} // end of clearToolbar


function pickQuickAddTool() {
  sEditMode = "quickAdd"
  artBoardNd.style.cursor = "crosshair"
} // end of pickSelTool

function pickSelTool() {
  sEditMode = "sel"
  artBoardNd.style.cursor = ""
} // end of pickSelTool


function setupDesignElementToolbar() {
  try {
    clearToolbar()
    addToolbarBtn({title:"select tool",selected:true,fn:pickSelTool})
    addToolbarBtn({title:"quick add tool",fn:pickQuickAddTool})

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // setupDesignElementToolbar()

function doSelection(el, evt) {
  try {
    if (el.dataset.designel === "designElement") {
      const designElement = dataById[el.dataset.id]
      unselectLastListItem()
  
      if (!designElement.liElement.classList.contains("lnSel"))  {
        designElement.liElement.classList.add("lnSel")
        lastLiElement = designElement.liElement
      } // end if
  
      selectDesignElement(designElement)
      evt.preventDefault()
      return;
    } // end if
  
  
    //if (el.id === "artBoard" && typeof lastDesignElement !== "undefined") {     
    if (el.id === "artBoard") {       
      //hideHighlight()
      //blankOutPropertyPanel()
      selectArtworkBackgroundNode()
    } // end if
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
  

} // end of doSelection



function selectDesignElement(designElement) {
  try {
    artBoardNd.style.display = "block"
    lastDesignElement = designElement
    const dv = lastDesignElement.domElement
    positionHandlesOn(dv)  
    setupElementPropertyPanel(lastDesignElement)

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })    
  } // end of try/catch   
  
} // end of selectDesignElement



function addDesignElementBtnClicked(evt) {
  try {
    const params = {};
    params.siblingArray = currentDesign.designElementsByIndex
    designElement = addDesignElement(params)

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })   
  } // end of try/catch   
  
} // end of addDesignElementBtnClicked


/**
 * 
 */
function addChildDesignElementBtnClicked(sParentId) {
  try {
    const parentDesignElementObj = dataById[sParentId]
    const params = {};
    params.parentDesignElementObj = parentDesignElementObj
    designElement = addDesignElement(params)

    artBoardNd.style.display = "block"

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })
  } // end of try/catch   
  
} // end of addChildDesignElementBtnClicked




function addQuickDesignElement(el, evt) {
  const params = {}

  try {
    params.width = 60
    params.height = 40

    if (typeof el.dataset.id !== "undefined") {
      sParentId = el.dataset.id
      const parentDesignElementObj = dataById[sParentId]
      params.parentDesignElementObj = parentDesignElementObj
      params.width = 20
      params.height = 15
    } // end if

    params.left = evt.layerX
    params.top = evt.layerY

    const designElement = new DesignElement(params)
  
    lastDesignElement = designElement;

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch

} // end of addQuickDesignElement




/**
 * 
 *   Called By:
 *     addDesignElementBtnClicked()
 *     addChildDesignElementBtnClicked()
 * 
 */
function addDesignElement(params) {
  try {
    const designElement = new DesignElement(params)
  
    lastDesignElement = designElement;
    artBoardNd.style.display = "block"

    return designElement;
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })
    
  } // end of try/catch
  
} // end of addDesignElement()




/**
 * #dd
 * 
 * Called by:   addDesignElement()
 */
function DesignElement(params) {
  try {
    const designElement = this;
     
    designElement.elementId = getNextId()
      
    let sTitle = "Design Element "+(currentDesign.designElementsByIndex.length+1);
    let sPosition = "absolute"
    let sTagName = "div"
    let sBackgroundColor = "#eaf8fe"
    let sBorderColor = "#74a7fe"
    let parentId = "";
    let nTop = 100;
    let nLeft = 100;
    let nWidth = 400;
    let nHeight = 200;
    let nIndentLevel = 0;
    
    let lastCreatedDesignElement;
//topLevelDesignElementsByIndex
    let bHasParentObj = false;
    parentDesignElementObj = params.parentDesignElementObj    
    if (typeof parentDesignElementObj !== "undefined") {
      // this design element is a CHILD of a PARENT design element
      // **********************************************************
      bHasParentObj = true;
      nWidth = 50
      nHeight = 40
      parentId = parentDesignElementObj.elementId;
      nIndentLevel = parentDesignElementObj.indentLevel + 1
      let nSize = parentDesignElementObj.childrenByIndex.length+1;
      nTop = 20 * nSize
      nLeft = 20 * nSize  
      sTitle = "Design Element "+(nIndentLevel+1)+"-"+(nSize)
    } else {
      // this element is a TOP-LEVEL design element (no parent)
      const nTopLevelCount = currentDesign.topLevelDesignElementsByIndex.length
      if (nTopLevelCount>0) {
        const lastTopLevelDesignElement = currentDesign.topLevelDesignElementsByIndex[nTopLevelCount-1]
        nTop = lastTopLevelDesignElement.startTop + 20;
        nLeft = lastTopLevelDesignElement.startLeft + 20
      } // end if
      currentDesign.topLevelDesignElementsByIndex.push(designElement)
      sTitle = "Design Element "+(nIndentLevel+1)+"-"+(nTopLevelCount+1)
    } // end if

    // add to overall design's dataset... both by index and elementId
    currentDesign.designElementsByIndex.push(designElement)
    dataById[designElement.elementId] = designElement;
    
    if (typeof params.top === "number") {
      nTop = params.top
    } // end if

    if (typeof params.left === "number") {
      nLeft = params.left
    } // end if

    if (typeof params.width === "number") {
      nWidth = params.width
    } // end if

    if (typeof params.left === "number") {
      nHeight = params.height
    } // end if

    designElement.lockElement = false
    designElement.showElement = true
    designElement.objType = "designElement"
    designElement.deleted = false;
    designElement.tagName = sTagName
    designElement.title = sTitle
    designElement.backgroundColor = sBackgroundColor
    designElement.border = "solid "+sBorderColor+" 1px"
    designElement.childrenByIndex = [];
    designElement.startTop = nTop
    designElement.startLeft = nLeft
    designElement.lastTop = nTop
    designElement.leftLeft = nLeft
    designElement.top = nTop+"px";
    designElement.left = nLeft+"px";
    designElement.width = nWidth+"px";
    designElement.height = nHeight+"px";
    designElement.parentId = parentId;
    designElement.position = sPosition;
    designElement.indentLevel = nIndentLevel

    designElement.gradientsByIndex = [];
    
    const dv = document.createElement("div")
    dv.innerText = ""
    dv.dataset.id = designElement.elementId
    dv.dataset.designel = "designElement"; // redundant... not very original (sigh)
    dv.style.boxSizing = "border-box"
    dv.style.backgroundColor = sBackgroundColor;
    dv.style.border = "solid "+sBorderColor+" 1px"
    dv.style.position = sPosition;
    dv.style.left = (nLeft)+"px";
    dv.style.top = (nTop)+"px";
    dv.style.width = (nWidth)+"px";
    dv.style.height = (nHeight)+"px";
    
    designElement.domElement = dv;
    
    if (parentId === "") {
      artBoardNd.appendChild(dv)      
    } else {
      parentDesignElementObj.domElement.appendChild(dv)
      parentDesignElementObj.childrenByIndex.push(designElement)
    } // end if/else

    positionHandlesOn(dv)
    
    if (typeof lastLiElement !== "undefined") {    
      lastLiElement.className = ""
    } // end if
    
    let ul2;
    const li = document.createElement("li")
    let s=[];
    // s.push("")
    s.push("<div class='liCntr'>")
    s.push(sTitle);
    s.push("<button class='btnR' ")
    s.push("data-id='"+designElement.elementId+"'")
    s.push(">Add</button>")
    s.push("</div>")
    li.innerHTML = s.join("");
    li.classList.add("lnSel");
    li.dataset.id = designElement.elementId

    if (!bHasParentObj) {
      lstElementsNd.appendChild(li)
    } else {
      //debugger
      if (parentDesignElementObj.childrenByIndex.length === 1) {
        ul2 = document.createElement("ul")
        ul2.className = "childLi"
        parentDesignElementObj.ulElement = ul2
        parentDesignElementObj.liElement.appendChild(ul2)
      } else {
        ul2 = parentDesignElementObj.ulElement
      } // end if

      ul2.appendChild(li)
    } // end if/else
    
    designElement.liElement = li
    lastLiElement = li  
    lastDesignElement = designElement
    setupElementPropertyPanel(designElement)
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })    
  } // end of try/catch
   

} // end of DesignElement() Constructor


/**
 * 
 */
function getNextId() {
  try {
    nNextId = nNextId + 1;
    currentDesign.nextIdNum = nNextId
    return "K"+nNextId;
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })    
  } // end of try/catch   
  
} // getNextId()


/**
 * 
 */
function getPositionOptSet() {
  try {
    const optSet = []
    optSet.push({caption:"...",value:""})
    optSet.push({caption:"static",value:"static"})
    optSet.push({caption:"relative",value:"relative"})
    optSet.push({caption:"fixed",value:"fixed"})
    optSet.push({caption:"absolute",value:"absolute"})
    optSet.push({caption:"sticky",value:"sticky"})
    return optSet;
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })    
  } // end of try/catch   
  
} // end of getPositionOptSet()



/**
 * 
 */
function setupRefImgPropertyPanel() {
  try {
    let sDescr=""
    let sLockIcon="🔓"
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // end of setupRefImgPropertyPanel


/**
 * 
 */
function setupArtworkBackgroundPropertyPanel() {
  try {
    let sDescr=""
    let sLockIcon="🔓"

    
    const artworkBackground = currentDesign.artworkBackground

    let bBackgroundLock = artworkBackground.lockBackground

    if (bBackgroundLock) {
      sLockIcon="🔒"
    }// end if
    
    const domEl = artworkBackground.domElement
    const domStyle = domEl.style;
    propPanel.clear()
    propPanel.setMainPropsObj(artworkBackground);

    sDescr="Set property's value to <i>true</i> to prevent the accidental change of any of the rest this Background's CSS property values."
    propPanel.addProp({objPropName:"lockBackground",propName:sLockIcon+" Background Locked",onCommit:toggleBackgroundLock,
    dataType:"boolean",descr:sDescr})

    propPanel.addProp({objPropName:"",propName:"Artwork Top-Level Properties:",dataType:"section",descr:""})
    propPanel.addProp({objPropName:"className",propName:"className",readOnly:bBackgroundLock,
    additionalObj:domEl,dataType:"string",descr:"put in 1 or more CSS class names seperated by spaces."})
    setupBackgroundRelatedProps(propPanel, domStyle, bBackgroundLock, "artworkBackground")
    setupMarginRelatedProps(propPanel, domStyle, bBackgroundLock) 

    propPanel.displayPanel();
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })     
    } // end of try/catch
  
} // end of setupArtworkBackgroundPropertyPanel()


/**
 * 
 */
function toggleBackgroundLock() {
  setupArtworkBackgroundPropertyPanel()
} // end of toggleBackgroundLock


  /**
   * 
   *  #close_dia
   * 
   */
    function closeDia() {
    try {
      dia2Nd.innerHTML = "";
      dia2Nd.style.display = "none"
      const tintNd = document.getElementById("tint")
      tintNd.style.display = "none"
    } catch(err) {
        orvCore.displayErrMsg(err,{},function(err) {
          debugger;
        })    
      } // end of try/catch  
    
  } // end of closeDia()



let imageAddDialog

/**
 * 
 *   #image_add_dialog_constructor
 * 
 */
function ImageAddDialog(sDiaCaption, fniPick) {
  const imageAddDialog = this;
  let imagesAddedByIndex = [];
  let fnPick,sPickSrc;

  try {
    fnPick = fniPick; // function to run when add button is clicked and this object returns the results
    sPickSrc = "fsUploadImage"
    const s = [];
  
    // s.push("")
    
    s.push("<div class='diaTitleBar'>")
    s.push(sDiaCaption)
    s.push("</div>"); //diaTitleBar
  
    s.push("<div class='diaCntr'>")
  
    s.push("<label for='imgPckSrc'>Add Image Via:</label>")
  
    s.push("<select id='imgPckSrc'>")
    s.push("<option value='fsUploadImage'>Uploading Image File</option>")
    s.push("<option value='fsImageUrl'>Image URL</option>")
    s.push("<option value='fsRandomImage'>Surprise Image! (LorumPicsum)</option>")
    s.push("</select>")
  
    s.push("<fieldset id='fsUploadImage'>")
    s.push("<legend>Upload Your Image(s):</legend>")
    s.push("<div id='fileDropZone'>Drop your Image File(s) Here!</div>")
    s.push("<input type='file' id='imgFilePath' accept='image/*' multiple>")
    s.push("</fieldset>")
  
    s.push("<fieldset id='fsImageUrl' style='display:none;'>")
    s.push("<legend>Image URL:</legend>")
    s.push("<input type='text' id='imgFileUrl' placeholder='Put in a path like: ... https://domain.com/image-path'>")
    s.push("<button>GET IMAGE</button>")
    s.push("</fieldset>")
  

    // https://picsum.photos/256
    // set Pen:   https://codepen.io/orvilleChomer/pen/OJXEZYJ
    s.push("<fieldset id='fsRandomImage' style='display:none;'>")
    s.push("<legend>Random Image (LorumPicsum):</legend>")
    s.push("<table>")
    s.push("<tr>")
    s.push("<td><label for='imgWidth'>Optional Width (in pixels):</label></td>")
    s.push("<td><input type='text' id='imgWidth' class='imgDim'></td>")
    s.push("</tr><tr>")  
    s.push("<td><label for='imgHeight'>Optional Height (in pixels):</label></td>")
    s.push("<td colspan='2'><input type='text' id='imgHeight' class='imgDim'><button id='btnGetRndImg'>GET RANDOM IMAGE!</button></td>")
    s.push("</tr>")
    s.push("</table>")
    s.push("</fieldset>")
  
    // s.push("")

    // Where image thumbnails are displayed:
    s.push("<fieldset id='fsImgsToAdd'>")
    s.push("<legend>Images You've Picked to Add:</legend>")

    s.push("<div id='addedImgThumbnails' ")
    s.push(">")
    s.push("</div>")

    s.push("</fieldset>")



    s.push("</div>"); //diaCntr
  
    s.push("<div class='diaButtons'>")
    s.push("<button id='btnCancelAddImg'>Cancel</button>")
    s.push("<button id='btnAddImgs'>Add</button>")
    s.push("</div>"); //diaButtons
  
    dia2Nd.innerHTML = orvCore.safeMarkup(s.join(""))
    dia2Nd.style.display = "block"
    const tintNd = document.getElementById("tint")
    tintNd.style.display = "block"
  
    const imgPckSrcNd = document.getElementById("imgPckSrc")
    imgPckSrcNd.addEventListener("change", imgPckMethodChanged)
  
    const imgFilePathNd = document.getElementById("imgFilePath")
    imgFilePathNd.addEventListener("change", procFilesPicked)
  
    const btnCancelAddImgNd = document.getElementById("btnCancelAddImg")
    btnCancelAddImgNd.addEventListener("click", closeDia)    

    const btnAddImgsNd = document.getElementById("btnAddImgs")
    btnAddImgsNd.addEventListener("click", addImages)    

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //
    // @@@@@@ ImageAddDialog CONSTRUCTOR'S PRIVATE FUNCTIONS:
    //
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    /**
     * 
     *   #img_pck_method_changed
     */
    function imgPckMethodChanged(evt) {
      try {
        const imgPckSrcNd = document.getElementById("imgPckSrc")
        const oldFieldsetNd = document.getElementById(sPickSrc)
        oldFieldsetNd.style.display = "none";
        const newFieldsetNd = document.getElementById(imgPckSrcNd.value)
        newFieldsetNd.style.display = "block";
        sPickSrc = imgPckSrcNd.value
      } catch(err) {
          orvCore.displayErrMsg(err,{},function(err) {
            debugger;
          })    
        } // end of try/catch  
      
    } // end of imgPckMethodChanged()


    /**
     * 
     *  #proc_files_picked
     */
    function procFilesPicked(evt) {
      try {
        const imgFilePathNd = document.getElementById("imgFilePath")
        let nCount = 0;

        // process through list of files...
        const nMax = imgFilePathNd.files.length;
        for (let n=0;n<nMax;n++) {
          const imgFile = imgFilePathNd.files[n]
          const sFileName = imgFile.name;
          const sMimeType = imgFile.type;
          const reader = new FileReader();

          reader.addEventListener("load", function(readerEvent) {
            // reader has loaded file...
            const img = new Image();
            img.addEventListener("load", function(imageLoadedEvent) {
              // image has completed loading
              let sEncodedImageData = readerEvent.target.result
              let nFileSize = readerEvent.total
              
              procImage(img, "upload", sEncodedImageData, sFileName, sMimeType, nFileSize)
              nCount = nCount + 1

              if (nCount === nMax) {
                renderImageThumbnails() 
              } // end if
            }) // end of img 'load' event handler
      
            img.src = readerEvent.target.result
          }) // end of reader 'load' event handler
                    
          reader.readAsDataURL(imgFile); // method will encode image data into a text form
        } // next n
      } catch(err) {
          orvCore.displayErrMsg(err,{},function(err) {
            debugger;
          })   
        } // end of try/catch
      
    } // end of procFilesPicked()
    
    
    /**
     * 
     *   #proc_image
     * 
     */
    function procImage(img, sAddMethod, sEncodedImageData, sFileName,sMimeType, nFileSize) {
      try {
        const imageInfo = {}
        imageInfo.deleted = false
        imageInfo.loadDate = new Date()
        imageInfo.addMethod = sAddMethod
        imageInfo.actualWidth = img.width
        imageInfo.actualHeight = img.height
        imageInfo.width = img.width
        imageInfo.height = img.height
        imageInfo.top = 0;
        imageInfo.left = 0;
        imageInfo.src = sEncodedImageData
        imageInfo.fileName = sFileName
        imageInfo.fileSize = nFileSize
        imageInfo.mimeType = sMimeType
        imageInfo.scale = 1;
        imagesAddedByIndex.push(imageInfo)
        
      } catch(err) {
          orvCore.displayErrMsg(err,{},function(err) {
            debugger;
          }) 
      } // end of try/catch  
      
    } // end of procImage()
    

    /**
     * 
     * render_image_thumbnails
     */
    function renderImageThumbnails() {
      const s = []
      const Q = '"'
      let nMax;
      const nStartLeft = 10
      const nMaxWidth = 250
      const nMaxHeight = 160
      const nSpacingX = 20
      const nSpacingY = 20

      try {
        const addedImgThumbnailsNd = document.getElementById("addedImgThumbnails")

        nMax = imagesAddedByIndex.length
        let nTop = 10
        let nLeft = nStartLeft;

        for (let n=0;n<nMax;n++) {
          const imageInfo = imagesAddedByIndex[n]
          let nWidth,nHeight
          // s.push("")
          
          s.push("<div class='imgThumbnailBox' style="+Q)
          s.push("left:"+(nLeft)+"px;")
          s.push("top:"+(nTop)+"px;")
          s.push("width:"+(nMaxWidth)+"px;")
          s.push("height:"+(nMaxHeight)+"px;")
          s.push(Q)
          s.push(">");

          //imgThumbnailPicFrame
          s.push("<div class='imgThumbnailPicFrame' style="+Q)
          s.push("height:"+(nMaxHeight-20)+"px;")
          s.push(Q)
          s.push(">");

          s.push("<img src="+Q)
          s.push(imageInfo.src)
          s.push(Q+" ")

          if (imageInfo.actualWidth > imageInfo.actualHeight) {
            nHeight = nMaxHeight - 40

            if (imageInfo.actualHeight < nHeight) {
              nHeight = imageInfo.actualHeight
            } // end if

            s.push("height="+Q+(nHeight)+Q+" ")
            
          } else {
            nWidth = nMaxWidth - 10

            if (imageInfo.actualWidth < nWidth) {
              nWidth = imageInfo.actualWidth
            } // end if

            s.push("width="+Q+(nWidth)+Q+" ")
          } // end if/else
          s.push(">"); // close of img tag

          s.push("</div>"); // class='imgThumbnailPicFrame'

          // s.push("")

          s.push("<div class='imgThumbnailFileName'>")
          s.push(imageInfo.fileName)
          s.push("</div>") // class='imgThumbnailFileName'

          s.push("</div>"); // class='imgThumbnailBox'

          nLeft = nLeft + nMaxWidth + nSpacingX

          if (nLeft + nMaxWidth + nSpacingX > addedImgThumbnailsNd.clientWidth) {
            nLeft = nStartLeft;
            nTop = nTop + nMaxHeight + nSpacingY
          } // end if

        } // next n

        addedImgThumbnailsNd.innerHTML = orvCore.safeMarkup(s.join(""))

      } catch(err) {
          orvCore.displayErrMsg(err,{},function(err) {
            debugger;
          }) 
      } // end of try/catch

    } // end of renderImageThumbnails






    /**
     * 
     *   #add_images
     * 
     *   user clicked 'Add' button on Add Image Dialog
     */
    function addImages() {
      let nMax;

      try {
        nMax = imagesAddedByIndex.length
        for (let n=0;n<nMax;n++) {
          const imageInfo = imagesAddedByIndex[n]
          imageInfo.addDate = new Date()
          imageInfo.imageId = getNextId()
          imageInfo.objType = "imageInfo"
        } // next n

        closeDia(); // remove dialog panel from screen

        if (typeof fnPick === "function") {
          fnPick(imagesAddedByIndex);
        } // end if
      } catch(err) {
          orvCore.displayErrMsg(err,{},function(err) {
            debugger;
          }) 
      } // end of try/catch
    } // end of addImages()




    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //
    // @@@@@@ END OF: ImageAddDialog CONSTRUCTOR'S PRIVATE FUNCTIONS!
    //
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
    

    
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch

} // end of ImageAddDialog() Constructor




/**
 * 
 *  #show_add_ref_art
 */
function showAddRefArt() {
  try {
    imageAddDialog = new ImageAddDialog("Add Reference Art Image(s)", addRefArt)
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })   
    } // end of try/catch  
  
} // end of showAddRefArt()


/*
  add one or more pieces of reference art (graphic images) picked from dialog:

  #add_ref_art

  currentDesign.referenceImagesByIndex
 */
function addRefArt(results) {
  let nMax;
  let newImages = []
  let refArtToggleNd

  try {
    nMax = results.length
    for (let n=0;n<nMax;n++) {
      const imageInfo = results[n]
      imageInfo.objType = "refArt"
      currentDesign.referenceImagesByIndex.push(imageInfo)  // add to current design   
      dataById[imageInfo.imageId] = imageInfo
      newImages.push(imageInfo)
    } // next n

    addRefArtToList(newImages)

    blankOutPropertyPanel()
    refArtToggleNd = document.getElementById("refArtToggle")
    refArtToggleNd.open = true
    
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })
    } // end of try/catch  
} // end of addRefArt()


/**
 * 
 *  #add_ref_art_to_list
 * 
 */
function addRefArtToList(refArtImages) {
  let lstRefArtNd,refArtMsgNd,nMax;

  try {
    lstRefArtNd = document.getElementById("lstRefArt")
    refArtMsgNd = document.getElementById("refArtMsg")

    nMax = refArtImages.length

    for (let n=0;n<nMax;n++) {
      const imageInfo = refArtImages[n]
      const li = document.createElement("li")
      let s=[];
      s.push("<div class='liCntr'>")
      s.push(imageInfo.fileName);
      s.push("</div>")
      li.innerHTML = s.join("");
      if (n===nMax-1) {
        unselectLastListItem()
        li.classList.add("lnSel");
        lastLiElement = li;
      } // end if
      li.dataset.id = imageInfo.imageId
      lstRefArtNd.appendChild(li)
      imageInfo.liElement = li
      const refImg = document.createElement("img")
      refImg.src = imageInfo.src
      refImg.className = "refImgCls"
      refImg.width = imageInfo.actualWidth
      refImg.height = imageInfo.actualHeight
      refImg.style.left = (imageInfo.left)+"px"
      refImg.style.top = (imageInfo.top)+"px"
      imageInfo.domElement = refImg

      RefArtAreaNd.appendChild(refImg)
    } // next n
    
    if (nMax > 0) {
      refArtMsgNd.style.display = "none"
      artBoardNd.style.display = "none"      
    } else {
      refArtMsgNd.style.display = "block"
    } // end if

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
  
} // end of addRefArtToList


let designSettingsPanel
function showDesignSettingsPanel() {

} // end of showDesignSettingsPanel()



/**
 * 
 * user clicked 'Build Code' list item
 * 
 * called from:  lstClick()  event listener function
 * 
 */
let codeBuildPanel
function showCodeBuildPanel(buildCodeInfo) {  
  try {
    blankOutPropertyPanel()
    codeBuildPanel = new CodeBuildPanel() 
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // end of showCodeBuildPanel()


let styleLookup;

function buildCode() {
  let els;

  try {
    styleLookup = [];
    styleLookupByIndex = [];

    els = currentDesign.topLevelDesignElementsByIndex
    //let els = orvCore.sortArrayOfObjects(currentDesign.designElementsByIndex,"indentLevel")
    const nMax = els.length;
    const s=[];
    const s2=[];
    let s3=[];
    const params = {}

    s2.push(buildBodyCss())

    s3.push("// Nothing to see here...")
    
    params.currClassIdx = 0;
  
    for (let n=0;n<nMax;n++) {
      const designEl = els[n]
      s.push(buildElMarkup(designEl,params)) 
    } // next n

    const nMax2 = styleLookupByIndex.length
    for (let n=0;n<nMax2;n++) {
      const styleClass = styleLookupByIndex[n]
      s2.push("")
      s2.push("."+styleClass.className+" {")
      s2.push(styleClass.settings)
      s2.push("}")
    } // next n

    const code = {}
    code.html = s.join("\n")
    code.css = s2.join("\n")
    code.js = s3.join("\n")
    return code

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
  
} // end of buildCode()


function buildBodyCss() {
  const artworkBackground = currentDesign.artworkBackground
  const s = []

  try {
    s.push("body {")

    const nMax = cssPropLst.length
    for (let n = 0;n<nMax;n++) {
      const cssProp = cssPropLst[n]

      if (typeof artworkBackground[cssProp.prop] === "string") {
        if (artworkBackground[cssProp.prop] !== "") {
          s.push("  "+cssProp.styleName+":"+artworkBackground[cssProp.prop]+";")
        }// end if
      } // end if
    } // next n2

    s.push("}")
  
    return s.join("\n")
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch

} // end of buildBodyCss()



function buildElMarkup(designEl,params) {
  try {
    const s=[];
    const styleSettings = []
    let sStyleSettings = ""
    let sClassName = "";
    //s.push("")
    let sIndent = " ".repeat((designEl.indentLevel+1) * 2)
    s.push(sIndent+"<"+designEl.tagName+" ")
  
    const nMax2 = cssPropLst.length
    for (let n2 = 0;n2<nMax2;n2++) {
      const cssProp = cssPropLst[n2]

      if (typeof designEl[cssProp.prop] === "string" || typeof designEl[cssProp.prop] === "number") {
        if (designEl[cssProp.prop] !== "") {
          styleSettings.push("  "+cssProp.styleName+":"+designEl[cssProp.prop]+";")
        }// end if
      } // end if
    } // next n2
    sStyleSettings = styleSettings.join("\n")

    //if (typeof styleLookup[sStyleSettings] === "undefined") {
      const styleClass = {}
      styleClass.settings = styleClass;
      params.currClassIdx = params.currClassIdx + 1;
      styleClass.className = "artStyle"+(params.currClassIdx)
      styleClass.settings = sStyleSettings
      styleLookup[sStyleSettings] = styleClass
      styleLookupByIndex.push(styleClass)
      sClassName = styleClass.className
    // } else {
    //   const styleClass = styleLookup[sStyleSettings]
    //   sClassName = styleClass.className
    // } // end if/else

    if ((sStyleSettings !== "" && sClassName !== "") || designEl.className !== "") {
      s.push("class='")
      if (designEl.className !== "") {
        s.push(designEl.className)
      } // end if

      if (designEl.className !== "" && sClassName !== "") {
        s.push(" ")
      } // end if

      if (sClassName !== "") {
        s.push(sClassName)
      } // end if

      s.push("'")
    } // end if

    s.push(">")

    if (designEl.childrenByIndex.length > 0) {
      const nMax = designEl.childrenByIndex.length
      for (let n=0; n<nMax;n++) {
        const childDesignEl = designEl.childrenByIndex[n]
        s.push("\n")
        s.push(buildElMarkup(childDesignEl,params))
      } // next n
      s.push("\n"+sIndent)
    } // end if

    s.push("</"+designEl.tagName+">")
    return s.join("")

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch

  
} // end of buildElMarkup()



/**
 * 
 */
function CodeBuildPanel() {
  let codeBuildPanel,designSettings
  let s=[];

  try {
    codeBuildPanel = this;
    designSettings = currentDesign.designSettings
    sDownload = "Dow<span>nload</span>"
    //s.push("")

    s.push("<div class='diaTitleBar'>")
    s.push("Build Code")
    s.push("</div>");

    s.push("<div class='diaCntr'>")

    s.push("<fieldset id='fsBuildSettings'>")
    s.push("<legend>Build Settings:</legend>")
    s.push("<label>Build Method:</label>")
    s.push("<select id='buildMethod'>")
    s.push("<option value='sample'>Sample Code</option>")
    s.push("<option value='pen'>Create Codepen 'Pen'</option>")
    s.push("<option value='htmlFile'>Single HTML File</option>")
    s.push("<option value='2files'>Separate HTML and CSS Files</option>")
    s.push("</select>")
    s.push("</fieldset>")

    s.push("<fieldset id='fsSampleCode'>")
    s.push("<legend>Sample Generated Code:</legend>")
    s.push("<div class='fsContainer'>")
    s.push("<div class='htmlLbl'>HTML</div>")
    s.push("<textarea id='htmlCode' rows='15' cols='50'></textarea>")

    s.push("<div class='cssLbl'>CSS</div>")
    s.push("<textarea id='cssCode' rows='15' cols='50'></textarea>")
    //s.push("<textarea id='jsCode' rows='15' cols='50'></textarea>")
    s.push("</div>") // fsContainer
    s.push("</fieldset>")

    s.push("<fieldset id='fsGenCodePen'>")
    s.push("<legend>Create Codepen 'Pen':</legend>")
    s.push("<form action='https://codepen.io/pen/define' method='POST' target='_blank'>")
    s.push("<input type='hidden' name='data' id='cpdata'>")
    s.push("<input type='submit' value='Generate New Pen'>")
    s.push("</form>")
    s.push("</fieldset>")

    s.push("<fieldset id='fsSingleHtmlFile'>")
    s.push("<legend>Single HTML File:</legend>")
    s.push("index.html")
    s.push("<button>"+sDownload+"</button>")
    s.push("</fieldset>")

    s.push("<fieldset id='fs2Files'>")
    s.push("<legend>Separate HTML and CSS Files:</legend>")

    s.push("")
    s.push("index.html")
    s.push("<button>"+sDownload+"</button>")
    s.push("styles.css")
    s.push("<button>"+sDownload+"</button>")

    s.push("</fieldset>")

    s.push("</div>") // diaCntr

    s.push("<div class='diaButtons'>")
    s.push("<button id='btnCloseDia'>CLOSE</button>")
    s.push("</div>"); //diaButtons

    dia2Nd.innerHTML = orvCore.safeMarkup(s.join(""))
    dia2Nd.style.display = "block"
    const tintNd = document.getElementById("tint")
    tintNd.style.display = "block"
//debugger
    const btnCloseDiaNd = document.getElementById("btnCloseDia")
    btnCloseDiaNd.addEventListener("click",closeDia)

    const code = buildCode()

    const htmlCodeNd = document.getElementById("htmlCode")
    const cssCodeNd = document.getElementById("cssCode")
    htmlCodeNd.value = code.html
    cssCodeNd.value = code.css

    // build CodePen Post value...
    // see:  https://blog.codepen.io/documentation/prefill/
    const cpData = {}
    cpData.html = code.html
    cpData.css = code.css
    cpData.js = code.js
    cpData.title = designSettings.designName
    const cpdataNd = document.getElementById("cpdata")
    cpdataNd.value = JSON.stringify(cpData)

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch

} // end of CodeBuildPanel()


function toggleShowElement(evt) {
  try {
    sShow = ""

    if (evt.newValue === false ) {
      sShow = "hidden"
      objHighlighterNd.style.display = "none"
    } else {
      positionHandlesOn(evt.additionalObj)
    } // end if

    evt.additionalObj.style.visibility = sShow
  } catch(err) {
      console.dir(err)
      debugger 
  } // end of try/catch
} // end of toggleShowElement()



function toggleElementLock(evt) {
  try {
    const designElementObj = evt.propsObj  // object that the toggled property belongs to
    setupElementPropertyPanel(designElementObj)
  } catch(err) {
      console.dir(err)
      debugger 
  } // end of try/catch
}


function setupElementPropertyPanel(designElement) {
  try {
    let sDescr=""
    let sLockIcon="🔓"
    const domEl = designElement.domElement
    const domStyle = designElement.domElement.style;
    
    propPanel.clear()
    propPanel.setMainPropsObj(designElement);
    
    let bDesignElementLock = designElement.lockElement

    if (bDesignElementLock) {
      sLockIcon="🔒"
    }// end if

    sDescr="Show or hide design element. Does not effect Build results.<br>"
    sDescr=sDescr+"Mainly used to make editing a complex design a bit easier by allowing you to hide parts of the design that you are not working on."
    
    propPanel.addProp({objPropName:"showElement",propName:"👁️ Show Element",onCommit:toggleShowElement,
    dataType:"boolean",descr:sDescr,additionalObj:domEl})

    sDescr="Set property's value to <i>true</i> to prevent the accidental change of any of the rest this Design Element's property values."
    propPanel.addProp({objPropName:"lockElement",propName:sLockIcon+" Element Locked",onCommit:toggleElementLock,
    dataType:"boolean",descr:sDescr})

    propPanel.addProp({objPropName:"",propName:"Element Related Properties:",dataType:"section",descr:""})
    propPanel.addProp({objPropName:"title",propName:"Element Title",readOnly:bDesignElementLock,
    dataType:"string",descr:"Title of this design element {meta}. \nYou can provide a title for your documentation."})
    propPanel.addProp({objPropName:"className",propName:"className",additionalObj:domEl,readOnly:bDesignElementLock,
    dataType:"string",descr:"put in 1 or more CSS class names seperated by spaces."})
    propPanel.addProp({objPropName:"id",propName:"id",additionalObj:domEl,readOnly:bDesignElementLock,
    dataType:"string",descr:"unique id of DOM element."})
  
     
    setupPositionProps(propPanel, domStyle, bDesignElementLock)
    setupBackgroundRelatedProps(propPanel, domStyle, bDesignElementLock)   
    setupMarginRelatedProps(propPanel, domStyle, bDesignElementLock)
    setupPaddingRelatedProps(propPanel, domStyle, bDesignElementLock)
    setupColorRelatedProperties(propPanel, domStyle, bDesignElementLock)
    setupTransformProps(propPanel, domStyle, bDesignElementLock)
    setupBorderRelatedProps(propPanel, domStyle, bDesignElementLock)
    setupBoxRelatedProps(propPanel, domStyle, bDesignElementLock)
    setupOutlineRelatedProps(propPanel, domStyle, bDesignElementLock)
    setupFontRelatedProps(propPanel, domStyle, bDesignElementLock)
    setupTextRelatedProps(propPanel, domStyle, domEl, bDesignElementLock)
    setupAlignmentRelatedProps(propPanel, domStyle, bDesignElementLock)
    setupVisibilityRelatedProps(propPanel, domStyle, bDesignElementLock)
  

    
    
    //propPanel.addProp({objPropName:"",propName:"CSS Animation Related Properties:",dataType:"section",descr:""})
  
    propPanel.displayPanel();
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })     
  } // end of try/catch
   

} // setupElementPropertyPanel()


/**
 * 
 */
function setupAlignmentRelatedProps(propPanel, domStyle, bDesignElementLock) {
  try {
    propPanel.addProp({objPropName:"",propName:"CSS Alignment Related Properties:",dataType:"section",descr:""})
    const alignContentOptSet = []
    alignContentOptSet.push({caption:"...",value:""})
    alignContentOptSet.push({caption:"stretch",value:"stretch"})
    alignContentOptSet.push({caption:"center",value:"center"})
    alignContentOptSet.push({caption:"flex-start",value:"flex-start"})
    alignContentOptSet.push({caption:"flex-end",value:"flex-end"})
    alignContentOptSet.push({caption:"space-between",value:"space-between"})
    alignContentOptSet.push({caption:"space-around",value:"space-around"})
    alignContentOptSet.push({caption:"initial",value:"initial"})
    alignContentOptSet.push({caption:"inherit",value:"inherit"})
    propPanel.addProp({objPropName:"alignContent",propName:"align-content",readOnly:bDesignElementLock,
    optionSet: alignContentOptSet,additionalObj:domStyle,dataType:"string",descr:""})
  
    const alignItemsOptSet = []
    alignItemsOptSet.push({caption:"...",value:""})
    alignItemsOptSet.push({caption:"stretch",value:"stretch"})
    alignItemsOptSet.push({caption:"center",value:"center"})
    alignItemsOptSet.push({caption:"flex-start",value:"flex-start"})
    alignItemsOptSet.push({caption:"flex-end",value:"flex-end"})
    alignItemsOptSet.push({caption:"baseline",value:"baseline"})
    alignItemsOptSet.push({caption:"initial",value:"initial"})
    alignItemsOptSet.push({caption:"inherit",value:"inherit"})
    propPanel.addProp({objPropName:"alignItems",propName:"align-items",optionSet: alignItemsOptSet,
    additionalObj:domStyle,readOnly:bDesignElementLock,
    dataType:"string",descr:""})
    propPanel.addProp({objPropName:"alignSelf",propName:"align-self",optionSet: alignItemsOptSet,
    readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:""})
    
    
    
    
    /* propPanel.addProp({objPropName:"",propName:"CSS Pseudo Element Related Properties:",dataType:"section",descr:""})
    propPanel.addProp({objPropName:"mc_before",propName:"use <span style='color:red;'>::BEFORE</span>",dataType:"boolean",
    descr:"Meta class BEFORE"})
    propPanel.addProp({objPropName:"mc_before_content",propName:" &nbsp;&nbsp;content",dataType:"string",disabled:true,
    descr:"BEFORE's content value."})
    propPanel.addProp({objPropName:"mc_after",propName:"use <span style='color:red;'>::AFTER</span>",
    dataType:"boolean",descr:"Meta class AFTER"})
    propPanel.addProp({objPropName:"mc_before_content",propName:" &nbsp;&nbsp;content",dataType:"string",
    disabled:true,descr:"AFTER's content value."}) */
   
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // end of setupAlignmentRelatedProps()


/**
 * 
 */
 function setupColorRelatedProperties(propPanel, domStyle, bDesignElementLock) {
  try {
    propPanel.addProp({objPropName:"",propName:"CSS Color Related Properties:",dataType:"section",descr:""})
    propPanel.addProp({objPropName:"backgroundColor",propName:"background-color",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"color",descr:"div's background color"})

    propPanel.addProp({objPropName:"color",propName:"color",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"color",descr:"color of any text contained therein"})

    propPanel.addProp({objPropName:"borderColor",propName:"border-color",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"color",descr:"color of design element's border"})

    propPanel.addProp({objPropName:"borderBottomColor",propName:"border-bottom-color",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"color",descr:"color of bottom border"})

    propPanel.addProp({objPropName:"borderLeftColor",propName:"border-left-color",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"color",descr:"color of left border"})

    propPanel.addProp({objPropName:"borderRightColor",propName:"border-right-color",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"color",descr:"color of right border"})

    propPanel.addProp({objPropName:"borderTopColor",propName:"border-top-color",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"color",descr:"color of top border"})

    propPanel.addProp({objPropName:"caretColor",propName:"caret-color",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"color",descr:"color of the cursor (caret) in inputs, textareas, or any element that is editable"})

    propPanel.addProp({objPropName:"columnRuleColor",propName:"column-rule-color",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"color",descr:"color of the rule between columns"})

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
 }// end of setupColorRelatedProperties()


/**
 * 
 */
function setupPaddingRelatedProps(propPanel, domStyle, bDesignElementLock) {
  try {
    propPanel.addProp({objPropName:"",propName:"CSS Padding Related Properties:",dataType:"section",descr:""})
    propPanel.addProp({objPropName:"padding",propName:"padding",dataType:"cssUom",
    readOnly:bDesignElementLock,additionalObj:domStyle,descr:"padding (see also margin)"})
    propPanel.addProp({objPropName:"paddingLeft",propName:"padding-left",dataType:"cssUom",
    readOnly:bDesignElementLock,additionalObj:domStyle,descr:"padding left"})
    propPanel.addProp({objPropName:"paddingRight",propName:"padding-right",dataType:"cssUom",
    readOnly:bDesignElementLock,additionalObj:domStyle,descr:"padding left"})
    propPanel.addProp({objPropName:"paddingTop",propName:"padding-top",dataType:"cssUom",
    readOnly:bDesignElementLock,additionalObj:domStyle,descr:"padding top"})
    propPanel.addProp({objPropName:"paddingBottom",propName:"padding-bottom",dataType:"cssUom",
    readOnly:bDesignElementLock,additionalObj:domStyle,descr:"padding bottom"})
    
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // setupPaddingRelatedProps()


/**
 * 
 */
function setupFontRelatedProps(propPanel, domStyle, bDesignElementLock) {
  try {
    propPanel.addProp({objPropName:"",propName:"CSS Font Related Properties:",dataType:"section",descr:""})
    propPanel.addProp({objPropName:"fontFamily",propName:"font-family",additionalObj:domStyle,dataType:"string",descr:""})
  
    const fontStyleOptSet = [];
    fontStyleOptSet.push({caption:"...",value:""})
    fontStyleOptSet.push({caption:"normal",value:"normal"})
    fontStyleOptSet.push({caption:"italic",value:"italic"})
    fontStyleOptSet.push({caption:"oblique",value:"oblique"})
    propPanel.addProp({objPropName:"fontStyle",propName:"font-style",optionSet: fontStyleOptSet,
    readOnly:bDesignElementLock,additionalObj:domStyle,dataType:"string",descr:""})
  
    const fontWeightOptSet = [];
    fontWeightOptSet.push({caption:"...",value:""})
    fontWeightOptSet.push({caption:"normal",value:"normal"})
    fontWeightOptSet.push({caption:"bold",value:"bold"})
    propPanel.addProp({objPropName:"fontWeight",propName:"font-weight",
    readOnly:bDesignElementLock,optionSet: fontWeightOptSet,additionalObj:domStyle,dataType:"string",descr:""})
  
    const fontVariantOptSet = [];
    fontVariantOptSet.push({caption:"...",value:""})
    fontVariantOptSet.push({caption:"normal",value:"normal"})
    fontVariantOptSet.push({caption:"small-caps",value:"small-caps"})
    propPanel.addProp({objPropName:"fontVariant",propName:"font-variant",
    readOnly:bDesignElementLock,optionSet: fontVariantOptSet,additionalObj:domStyle,dataType:"string",descr:""})
    
    propPanel.addProp({objPropName:"fontSize",propName:"font-size",
    readOnly:bDesignElementLock,additionalObj:domStyle,dataType:"cssUom",descr:""})
  
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
  
} // end of setupFontRelatedProps()


/**
 * 
 */
function setupTextRelatedProps(propPanel, domStyle, domEl, bDesignElementLock) {
  try {
    propPanel.addProp({objPropName:"",propName:"CSS Text Related Properties:",dataType:"section",descr:""})
    propPanel.addProp({objPropName:"innerText",propName:"innerText",additionalObj:domEl,
    readOnly:bDesignElementLock,
    dataType:"string",descr:"The text value of this DIV"})
    
    const textAlignOptSet = [];
    textAlignOptSet.push({caption:"",value:""})
    textAlignOptSet.push({caption:"center",value:"center"})
    textAlignOptSet.push({caption:"left",value:"left"})
    textAlignOptSet.push({caption:"right",value:"right"})
    textAlignOptSet.push({caption:"justify",value:"justify"})  
    propPanel.addProp({objPropName:"textAlign",propName:"text-align",optionSet: textAlignOptSet,
    readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:""})
  
    const textDecorOptSet = [];
    textDecorOptSet.push({caption:"...",value:""})
    textDecorOptSet.push({caption:"none",value:"none"})
    textDecorOptSet.push({caption:"overline",value:"overline"})
    textDecorOptSet.push({caption:"line-through",value:"line-through"})
    textDecorOptSet.push({caption:"underline",value:"underline"})
    propPanel.addProp({objPropName:"textDecoration",propName:"text-decoration",optionSet: textDecorOptSet,
    readOnly:bDesignElementLock,
                       additionalObj:domStyle,dataType:"string",descr:""})
  
    const textTransformOptSet = [];
    textTransformOptSet.push({caption:"...",value:""})
    textTransformOptSet.push({caption:"uppercase",value:"uppercase"})
    textTransformOptSet.push({caption:"lowercase",value:"lowercase"})
    textTransformOptSet.push({caption:"capitalize",value:"capitalize"})
    propPanel.addProp({objPropName:"textTransform",propName:"text-transform",optionSet: textTransformOptSet,
    readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:""})
  
    propPanel.addProp({objPropName:"textIndent",propName:"text-indent",additionalObj:domStyle,
    readOnly:bDesignElementLock,dataType:"cssUom",descr:""})
    propPanel.addProp({objPropName:"letterSpacing",propName:"letter-spacing",additionalObj:domStyle,
    readOnly:bDesignElementLock,dataType:"cssUom",descr:""})
    propPanel.addProp({objPropName:"lineHeight",propName:"line-height",additionalObj:domStyle,
    readOnly:bDesignElementLock,dataType:"cssUom",descr:""})
    propPanel.addProp({objPropName:"wordSpacing",propName:"word-spacing",additionalObj:domStyle,
    readOnly:bDesignElementLock,dataType:"cssUom",descr:""})
    propPanel.addProp({objPropName:"textShadow",propName:"text-shadow",additionalObj:domStyle,
    readOnly:bDesignElementLock,dataType:"string",descr:""})
  
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // end of setupTextRelatedProps()


/**
 * 
 */
 function setupVisibilityRelatedProps(propPanel, domStyle, bDesignElementLock) {
  try {
    propPanel.addProp({objPropName:"",propName:"CSS Visibility Related Properties:",dataType:"section",descr:""})
    const displayOptSet = [];
    displayOptSet.push({caption:"...",value:""})
    displayOptSet.push({caption:"block",value:"block"})
    displayOptSet.push({caption:"inline",value:"inline"})
    displayOptSet.push({caption:"inline-block",value:"inline-block"})
    displayOptSet.push({caption:"none",value:"none"})
    displayOptSet.push({caption:"flex",value:"flex"})
    displayOptSet.push({caption:"grid",value:"grid"})
    displayOptSet.push({caption:"inline-flex",value:"inline-flex"})
    displayOptSet.push({caption:"inline-grid",value:"inline-grid"})
    displayOptSet.push({caption:"inline-table",value:"inline-table"})
    displayOptSet.push({caption:"list-item",value:"list-item"})
    displayOptSet.push({caption:"run-in",value:"run-in"})
    displayOptSet.push({caption:"table",value:"table"})
    displayOptSet.push({caption:"table-caption",value:"table-caption"})
    displayOptSet.push({caption:"table-column-group",value:"table-column-group"})
    displayOptSet.push({caption:"table-header-group",value:"table-header-group"})
    displayOptSet.push({caption:"table-footer-group",value:"table-footer-group"})
    displayOptSet.push({caption:"table-cell",value:"table-cell"})
    displayOptSet.push({caption:"table-column",value:"table-column"})
    displayOptSet.push({caption:"table-row",value:"table-row"})
    displayOptSet.push({caption:"initial",value:"initial"})
    displayOptSet.push({caption:"inherit",value:"inherit"})
    propPanel.addProp({objPropName:"display",propName:"display",optionSet: displayOptSet,additionalObj:domStyle,dataType:"string",descr:""})
  
    const visibilityOptSet = []
    visibilityOptSet.push({caption:"...",value:""})
    visibilityOptSet.push({caption:"visible",value:"visible",readOnly:bDesignElementLock})
    visibilityOptSet.push({caption:"hidden",value:"hidden",readOnly:bDesignElementLock})
    propPanel.addProp({objPropName:"visibility",propName:"visibility",optionSet: visibilityOptSet,readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:""})
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
 } // end of setupVisibilityRelatedProps()

 

/**
 * 
 */
function setupBackgroundRelatedProps(propPanel, domStyle, bDesignElementLock,optParam) {
  try {
    let bArtworkBackground = false;

    if (typeof optParam !== "undefined") {
      if (optParam = "artworkBackground") {
        bArtworkBackground = true;
      } // end if
    } // end if

    //bDesignElementLock

    propPanel.addProp({objPropName:"",propName:"CSS Background Related Properties:",dataType:"section",descr:""})
    
    propPanel.addProp({objPropName:"background",propName:"background",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"string",descr:"Different background properties can be set in one declaration"})

    const bkAttOptSet = [];
    bkAttOptSet.push({caption:"...",value:""})
    bkAttOptSet.push({caption:"scroll",value:"scroll"})
    bkAttOptSet.push({caption:"fixed",value:"fixed"})
    bkAttOptSet.push({caption:"local",value:"local"})
    bkAttOptSet.push({caption:"initial",value:"initial"})
    bkAttOptSet.push({caption:"inherit",value:"inherit"})
    propPanel.addProp({objPropName:"backgroundAttachment",propName:"background-attachment",optionSet:bkAttOptSet,
    readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:""})

    propPanel.addProp({objPropName:"backgroundColor",propName:"background-color",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"color",descr:"div's background color"})
        
    
      
    propPanel.addProp({objPropName:"backgroundOrigin",propName:"background-origin",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"string",descr:"The origin position (of the background positioning area) of a background image."})

    propPanel.addProp({objPropName:"backgroundPosition",propName:"background-position",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"string",descr:"Sets the starting position of a background image"})

    propPanel.addProp({objPropName:"backgroundRepeat",propName:"background-repeat",additionalObj:domStyle, 
    readOnly:bDesignElementLock,
    dataType:"string",descr:"Sets if/how a background image will be repeated"})

    const bkBlendOptSet = [];
    bkBlendOptSet.push({caption:"...",value:""})
    bkBlendOptSet.push({caption:"normal",value:"normal"})
    bkBlendOptSet.push({caption:"multiply",value:"multiply"})
    bkBlendOptSet.push({caption:"screen",value:"screen"})
    bkBlendOptSet.push({caption:"overlay",value:"overlay"})
    bkBlendOptSet.push({caption:"darken",value:"darken"})
    bkBlendOptSet.push({caption:"lighten",value:"lighten"})
    bkBlendOptSet.push({caption:"color-dodge",value:"color-dodge"})
    bkBlendOptSet.push({caption:"saturation",value:"saturation"})
    bkBlendOptSet.push({caption:"color",value:"color"})
    bkBlendOptSet.push({caption:"luminosity",value:"luminosity"})
    propPanel.addProp({objPropName:"backgroundBlendMode",propName:"background-blend-mode",optionSet:bkBlendOptSet,
    readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:"Defines the blending mode of each background layer (color and/or image)"})
  
    // ***
    propPanel.addProp({objPropName:"backgroundClip",propName:"background-clip",
    readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:"Specify how far the background should extend within an element"})

    propPanel.addProp({objPropName:"backgroundImage",propName:"background-image",
    readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:""})
  
    if (!bArtworkBackground) {
      propPanel.addProp({objPropName:"opacity",propName:"opacity",dataType:"number",
      readOnly:bDesignElementLock,
      additionalObj:domStyle,descr:"div's opacity (a value between 0 and 1)"})
    } // end if
    
    const overflowOptSet = [];
    overflowOptSet.push({caption:"...",value:""})
    overflowOptSet.push({caption:"scroll",value:"scroll"})
    overflowOptSet.push({caption:"hidden",value:"hidden"})
    overflowOptSet.push({caption:"auto",value:"auto"})
    overflowOptSet.push({caption:"visible",value:"visible"})
    
    propPanel.addProp({objPropName:"overflow",propName:"overflow",dataType:"string",optionSet:overflowOptSet,
    readOnly:bDesignElementLock,
    additionalObj:domStyle,descr:"div's overflow setting."})
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })    
    } // end of try/catch

} // end of setupBackgroundRelatedProps()


function borderStyleOptSet() {
  try {
    const borderStyleOptSet = []
    borderStyleOptSet.push({caption:"...",value:""})
    borderStyleOptSet.push({caption:"dotted",value:"dotted"})
    borderStyleOptSet.push({caption:"dashed",value:"dashed"})
    borderStyleOptSet.push({caption:"solid",value:"solid"})
    borderStyleOptSet.push({caption:"double",value:"double"})
    borderStyleOptSet.push({caption:"groove",value:"groove"})
    borderStyleOptSet.push({caption:"ridge",value:"ridge"})
    borderStyleOptSet.push({caption:"inset",value:"inset"})
    borderStyleOptSet.push({caption:"outset",value:"outset"})
    borderStyleOptSet.push({caption:"none",value:"none"})
    borderStyleOptSet.push({caption:"hidden",value:"hidden"})
  
    return borderStyleOptSet
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
  
} // end of borderStyleOptSet()


function setupBorderRelatedProps(propPanel, domStyle, bDesignElementLock) {
  let sDescr = "";

  try {
    propPanel.addProp({objPropName:"",propName:"CSS Border Related Properties:",dataType:"section",descr:""})
    
    sDescr = "Shorthand property for:<br>&nbsp;&nbsp;&nbsp;<b>border-width</b>, <b>border-style</b> (required), <b>border-color</b>"
    propPanel.addProp({objPropName:"border",propName:"border",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:sDescr})

    propPanel.addProp({objPropName:"borderColor",propName:"border-color",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"color",descr:""})
    propPanel.addProp({objPropName:"borderWidth",propName:"border-width",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"cssUom",descr:""})
    propPanel.addProp({objPropName:"borderRadius",propName:"border-radius",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"cssUom",descr:""})
        
    propPanel.addProp({objPropName:"borderTop",propName:"border-top",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:""})
    
    propPanel.addProp({objPropName:"borderBottom",propName:"border-bottom",readOnly:bDesignElementLock,
    additionalObj:domStyle,
    dataType:"string",descr:"Set the style of the bottom border for different elements"})

    propPanel.addProp({objPropName:"borderBottomWidth",propName:"border-bottom-width",additionalObj:domStyle,
    readOnly:bDesignElementLock,
    dataType:"cssUom",descr:"Set a width for the bottom border"})
    propPanel.addProp({objPropName:"borderBottomColor",propName:"border-bottom-color",additionalObj:domStyle,
    readOnly:bDesignElementLock,
    dataType:"color",descr:"Set a color for the bottom border"})
    propPanel.addProp({objPropName:"borderBottomStyle",propName:"border-bottom-style",additionalObj:domStyle,
    readOnly:bDesignElementLock,
    dataType:"string",descr:"Set a style for the bottom border"})
    
    propPanel.addProp({objPropName:"borderLeft",propName:"border-left",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:""})
    propPanel.addProp({objPropName:"borderRight",propName:"border-right",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:""})
      
    propPanel.addProp({objPropName:"borderStyle",propName:"border-style",readOnly:bDesignElementLock,
    additionalObj:domStyle,optionSet: borderStyleOptSet(),dataType:"string",descr:""})
  
    propPanel.addProp({objPropName:"borderTopLeftRadius",propName:"border-top-left-radius",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"cssUom",descr:""})
    propPanel.addProp({objPropName:"borderTopRightRadius",propName:"border-top-right-radius",
    readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"cssUom",descr:""})
    propPanel.addProp({objPropName:"borderBottomLeftRadius",propName:"border-bottom-left-radius",
    readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"cssUom",descr:""})
    propPanel.addProp({objPropName:"borderBottomRightRadius",propName:"border-bottom-right-radius",
    readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"cssUom",descr:""})
  
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
  
} // end of setupBorderRelatedProps()



function setupBoxRelatedProps(propPanel, domStyle, bDesignElementLock) {
  try {
    propPanel.addProp({objPropName:"",propName:"CSS Box Related Properties:",dataType:"section",descr:""})
    const boxSizingOptSet = [];
    boxSizingOptSet.push({caption:"...",value:""})
    boxSizingOptSet.push({caption:"content-box",value:"content-box"})
    boxSizingOptSet.push({caption:"border-box",value:"border-box"})
    boxSizingOptSet.push({caption:"initial",value:"initial"})
    boxSizingOptSet.push({caption:"inherit",value:"inherit"})
    propPanel.addProp({objPropName:"boxSizing",propName:"box-sizing",readOnly:bDesignElementLock,
    optionSet: boxSizingOptSet,additionalObj:domStyle,dataType:"string",descr:"div's box sizing setting"})
    propPanel.addProp({objPropName:"boxShadow",propName:"box-shadow",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:"div's box shadow settings"})
    
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // end of setupBoxRelatedProps()



function setupOutlineRelatedProps(propPanel, domStyle, bDesignElementLock) {
  // Outline Related Properties
  try {
    propPanel.addProp({objPropName:"",propName:"CSS Outline Related Properties:",dataType:"section",descr:""})
    propPanel.addProp({objPropName:"outline",propName:"outline",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"string",descr:""})
    propPanel.addProp({objPropName:"outlineWidth",propName:"outline-width",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"cssUom",descr:""})
    propPanel.addProp({objPropName:"outlineColor",propName:"outline-color",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"color",descr:""})
    propPanel.addProp({objPropName:"outlineStyle",propName:"outline-style",readOnly:bDesignElementLock,
    additionalObj:domStyle,
      optionSet: borderStyleOptSet(),dataType:"string",descr:""})
  
    propPanel.addProp({objPropName:"outlineOffset",propName:"outline-offset",readOnly:bDesignElementLock,
    additionalObj:domStyle,dataType:"cssUom",descr:""})
  
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
  
} // end of setupOutlineRelatedProps()


// Position and dimensional related properties:
function setupPositionProps(propPanel, domStyle, bDesignElementLock) {
  try {
    propPanel.addProp({objPropName:"",propName:"CSS Positional/Dimensional Related Properties:",dataType:"section",descr:""})
    const posOptSet = getPositionOptSet()
    propPanel.addProp({objPropName:"position",propName:"position",dataType:"string",readOnly:bDesignElementLock,
    optionSet: posOptSet,descr:"how the Div element is <i>positioned</i>"})
    propPanel.addProp({objPropName:"left",propName:"left",dataType:"cssUom",readOnly:bDesignElementLock,
    additionalObj:domStyle,descr:"left position of element from container's left edge."})
    propPanel.addProp({objPropName:"right",propName:"right",dataType:"cssUom",readOnly:bDesignElementLock,
    additionalObj:domStyle,descr:"right position from container's right edge."})
    propPanel.addProp({objPropName:"top",propName:"top",dataType:"cssUom",readOnly:bDesignElementLock,
    additionalObj:domStyle,descr:"top position from container's top edge."})
    propPanel.addProp({objPropName:"bottom",propName:"bottom",dataType:"cssUom",readOnly:bDesignElementLock,
    additionalObj:domStyle,descr:"bottom position from container's bottom edge."})
    propPanel.addProp({objPropName:"width",propName:"width",dataType:"cssUom",readOnly:bDesignElementLock,
    additionalObj:domStyle,descr:"div width"})
    propPanel.addProp({objPropName:"height",propName:"height",dataType:"cssUom",
    readOnly:bDesignElementLock,additionalObj:domStyle,descr:"div height"})
    propPanel.addProp({objPropName:"zIndex",propName:"z-index",dataType:"number",readOnly:bDesignElementLock,
    additionalObj:domStyle,descr:"Specifies the stack order of design element (how it appears layered on the page)."})
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })   
  } // end of try/catch
   
} // setupPositionProps()


function setupMarginRelatedProps(propPanel, domStyle, bDesignElementLock) {
  try {
    propPanel.addProp({objPropName:"",propName:"CSS Margin Related Properties:",dataType:"section",descr:""})
    propPanel.addProp({objPropName:"margin",propName:"margin",
    dataType:"cssUom",readOnly:bDesignElementLock,
    additionalObj:domStyle,descr:"margin  (see also padding)"})
    propPanel.addProp({objPropName:"marginLeft",propName:"margin-left",dataType:"cssUom",readOnly:bDesignElementLock,
    additionalObj:domStyle,descr:"margin left"})
    propPanel.addProp({objPropName:"marginRight",propName:"margin-right",readOnly:bDesignElementLock,
    dataType:"cssUom",additionalObj:domStyle,descr:"margin right"})
    propPanel.addProp({objPropName:"marginTop",propName:"margin-top",readOnly:bDesignElementLock,
    dataType:"cssUom",additionalObj:domStyle,descr:"margin top"})
    propPanel.addProp({objPropName:"marginBottom",propName:"margin-bottom",readOnly:bDesignElementLock,
    dataType:"cssUom",additionalObj:domStyle,descr:"margin bottom"})
    
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch  
  
} // end of setupMarginRelatedProps()


/**
 * 
 *  
 */
function setupTransformProps(propPanel, domStyle, bDesignElementLock) {
  
  try {
    propPanel.addProp({objPropName:"",propName:"CSS Transform Related Properties:",dataType:"section",descr:""})

    propPanel.addProp({objPropName:"transformOrigin",propName:"transform-origin",dataType:"string",
    additionalObj:domStyle,descr:"To do a translate, scale, or rotate on the div."})

    propPanel.addProp({objPropName:"perspective",propName:"perspective",dataType:"cssUom",
    readOnly:bDesignElementLock,
    additionalObj:domStyle,descr:"give a 3D-positioned element some perspective."})

    propPanel.addProp({objPropName:"perspectiveOrigin",propName:"perspective-origin",dataType:"string",
    readOnly:bDesignElementLock,
    additionalObj:domStyle,descr:"defines at from which position the user is looking at the 3D-positioned element."})

    const backfaceVisibilityOptSet = []
    backfaceVisibilityOptSet.push({caption:"...",value:""})
    backfaceVisibilityOptSet.push({caption:"visible",value:"visible"})
    backfaceVisibilityOptSet.push({caption:"hidden",value:"hidden"})
    backfaceVisibilityOptSet.push({caption:"initial",value:"initial"})
    backfaceVisibilityOptSet.push({caption:"inherit",value:"inherit"})
    sDescr = "Defines whether or not the back face of an element should be visible when facing the user."
    propPanel.addProp({objPropName:"backfaceVisibility",propName:"backface-visibility",
    optionSet: backfaceVisibilityOptSet,additionalObj:domStyle,dataType:"string",descr:sDescr})

    sDescr = "To do a translate, scale, skew, or rotate on the div.<br>"
    sDescr = sDescr + "Uses indented 2D and 3D properties below to build composite value..."
    propPanel.addProp({objPropName:"transform",propName:"transform",additionalObj:domStyle,
    dataType:"string",readOnly:true,descr:sDescr})

    //see: https://www.w3schools.com/css/css3_2dtransforms.asp
    propPanel.addProp({objPropName:"",propName:"➥&nbsp; 2D Transformations:",dataType:"subsection",descr:""})
    propPanel.addProp({objPropName:"__translateX",propName:"&nbsp;&nbsp;&nbsp;→ translate (X)",
    readOnly:bDesignElementLock,
    dataType:"cssUom",descr:"",onCommit:setupTransformPropValue })
    propPanel.addProp({objPropName:"__translateY",propName:"&nbsp;&nbsp;&nbsp;→ translate (Y)",
    readOnly:bDesignElementLock,
    dataType:"cssUom",descr:"",onCommit:setupTransformPropValue })
    propPanel.addProp({objPropName:"__rotate_deg",propName:"&nbsp;&nbsp;&nbsp;→ rotate (by deg)",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"Rotate element by this many degrees.",onCommit:setupTransformPropValue})
    propPanel.addProp({objPropName:"__rotate_turns",propName:"&nbsp;&nbsp;&nbsp;→ rotate (by turns)",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"Rotate element by this many turns.",onCommit:setupTransformPropValue})
    propPanel.addProp({objPropName:"__scale",propName:"&nbsp;&nbsp;&nbsp;→ scale (uniformly)",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"",onCommit:setupTransformPropValue})
    propPanel.addProp({objPropName:"__scaleX",propName:"&nbsp;&nbsp;&nbsp;→ scale X",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"",onCommit:setupTransformPropValue})
    propPanel.addProp({objPropName:"__scaleY",propName:"&nbsp;&nbsp;&nbsp;→ scale Y",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"",onCommit:setupTransformPropValue})
    propPanel.addProp({objPropName:"__skew",propName:"&nbsp;&nbsp;&nbsp;→ skew",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"",onCommit:setupTransformPropValue})
    propPanel.addProp({objPropName:"__skewX",propName:"&nbsp;&nbsp;&nbsp;→ skew X",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"",onCommit:setupTransformPropValue})
    propPanel.addProp({objPropName:"__skewY",propName:"&nbsp;&nbsp;&nbsp;→ skew Y",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"",onCommit:setupTransformPropValue})

    // see:  https://www.w3schools.com/css/css3_3dtransforms.asp
    propPanel.addProp({objPropName:"",propName:"➥&nbsp; 3D Transformations:",dataType:"subsection",descr:""})
    
    propPanel.addProp({objPropName:"__translateX",propName:"&nbsp;&nbsp;&nbsp;→ translate X",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"Defines a 3D translation, using only the value for the X-axis",
    onCommit:setupTransformPropValue})
    propPanel.addProp({objPropName:"__translateY",propName:"&nbsp;&nbsp;&nbsp;→ translate Y",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"Defines a 3D translation, using only the value for the Y-axis",
    onCommit:setupTransformPropValue})
    propPanel.addProp({objPropName:"__translateZ",propName:"&nbsp;&nbsp;&nbsp;→ translate Z",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"Defines a 3D translation, using only the value for the Z-axis",
    onCommit:setupTransformPropValue})

    propPanel.addProp({objPropName:"__scale3d",propName:"&nbsp;&nbsp;&nbsp;→ scale 3D",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"Defines a 3D scale transformation",onCommit:setupTransformPropValue})

    propPanel.addProp({objPropName:"__rotateX",propName:"&nbsp;&nbsp;&nbsp;→ rotate X",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"rotates an element around its X-axis at a given degree",onCommit:setupTransformPropValue})
    propPanel.addProp({objPropName:"__rotateY",propName:"&nbsp;&nbsp;&nbsp;→ rotate Y",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"rotates an element around its Y-axis at a given degree",onCommit:setupTransformPropValue})
    propPanel.addProp({objPropName:"__rotateZ",propName:"&nbsp;&nbsp;&nbsp;→ rotate Z",
    dataType:"number",readOnly:bDesignElementLock,
    descr:"rotates an element around its Z-axis at a given degree",onCommit:setupTransformPropValue})
  
    
  
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })    
  } // end of try/catch
   
} // setupTransformProps()


/**
 * 
 * 
 * see:   https://www.w3schools.com/css/css3_2dtransforms.asp
 * 
 */
function setupTransformPropValue(evt) {
  try {
    const s=[]
    const transformProp = propPanel.getPropObjByPropName("transform")
    const _2dRotateByDegProp = propPanel.getPropObjByPropName("__rotate_deg")
    const nRotateDegValue = _2dRotateByDegProp.value
//
    if (nRotateDegValue !==0) {
      s.push("rotate("+(nRotateDegValue)+"deg)")
    }
    
    transformProp.value = s.join(" ")
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // end of setupTransformPropValue()



function setupBorderPropValue(evt) {
  try {

  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch
} // end of setupBorderPropValue()


//tl_hdlNd,tm_hdlNd,tr_hdlNd,l_hdlNd,r_hdlNd,bl_hdlNd,bm_hdlNd,br_hdlNd
function positionHandlesOn(el) {
  try {
    const positionableItem = dataById[el.dataset.id]
    const bReadOnly = positionableItem.lockElement

    objHighlighterNd.style.left = el.style.left
    objHighlighterNd.style.top = el.style.top
    objHighlighterNd.style.bottom = el.style.bottom
    objHighlighterNd.style.right = el.style.right
    objHighlighterNd.style.width = el.style.width
    objHighlighterNd.style.height = el.style.height
    objHighlighterNd.style.transform = el.style.transform

    let sDisplay = el.style.display
    if (sDisplay === "") {
      sDisplay = "block"
    } // end if

    objHighlighterNd.style.display = sDisplay

    // "handleDisabled"

    // top - left
    tl_hdlNd.style.left = "-10px"; // -6
    tl_hdlNd.style.top = "-10px"
    tl_hdlNd.style.cursor = "nwse-resize"

    if (bReadOnly) {
      tl_hdlNd.classList.add("handleDisabled")
      tl_hdlNd.style.cursor = "not-allowed"
    } else {
      tl_hdlNd.classList.remove("handleDisabled")
    } // end if/else
    
    // top - middle
    let w = el.clientWidth
    let m1 = Math.floor((w) / 2) - 5
    tm_hdlNd.style.left = (m1)+"px"
    tm_hdlNd.style.top = "-10px"
    tm_hdlNd.style.cursor = "ns-resize"

    if (bReadOnly) {
      tm_hdlNd.classList.add("handleDisabled")
      tm_hdlNd.style.cursor = "not-allowed"
    } else {
      tm_hdlNd.classList.remove("handleDisabled")
    } // end if/else
    
    // top right
    tr_hdlNd.style.right = "-10px"
    tr_hdlNd.style.top = "-10px"
    tr_hdlNd.style.cursor = "nesw-resize"

    if (bReadOnly) {
      tr_hdlNd.classList.add("handleDisabled")
      tr_hdlNd.style.cursor = "not-allowed"
    } else {
      tr_hdlNd.classList.remove("handleDisabled")
    } // end if/else

    
    // left - middle
    let h = el.clientHeight
    let m2 = Math.floor((h) / 2) - 5
    l_hdlNd.style.left = "-10px"
    l_hdlNd.style.top = (m2)+"px"
    l_hdlNd.style.cursor = "ew-resize"

    if (bReadOnly) {
      l_hdlNd.classList.add("handleDisabled")
      l_hdlNd.style.cursor = "not-allowed"
    } else {
      l_hdlNd.classList.remove("handleDisabled")
    } // end if/else
    

    // right middle
    r_hdlNd.style.right = "-10px"
    r_hdlNd.style.top = (m2)+"px"
    r_hdlNd.style.cursor = "ew-resize"

    if (bReadOnly) {
      r_hdlNd.classList.add("handleDisabled")
      r_hdlNd.style.cursor = "not-allowed"
    } else {
      r_hdlNd.classList.remove("handleDisabled")
    } // end if/else
    

    // bottom left
    bl_hdlNd.style.left = "-10px"
    bl_hdlNd.style.bottom = "-10px"
    bl_hdlNd.style.cursor = "nesw-resize"

    if (bReadOnly) {
      bl_hdlNd.classList.add("handleDisabled")
      bl_hdlNd.style.cursor = "not-allowed"
    } else {
      bl_hdlNd.classList.remove("handleDisabled")
    } // end if/else

    
    // bottom middle
    bm_hdlNd.style.left = (m1)+"px"
    bm_hdlNd.style.bottom = "-10px"
    bm_hdlNd.style.cursor = "ns-resize"

    if (bReadOnly) {
      bm_hdlNd.classList.add("handleDisabled")
      bm_hdlNd.style.cursor = "not-allowed"
    } else {
      bm_hdlNd.classList.remove("handleDisabled")
    } // end if/else

    
    // bottom right
    br_hdlNd.style.right = "-10px"
    br_hdlNd.style.bottom = "-10px"
    br_hdlNd.style.cursor = "nwse-resize"

    if (bReadOnly) {
      br_hdlNd.classList.add("handleDisabled")
      br_hdlNd.style.cursor = "not-allowed"
    } else {
      br_hdlNd.classList.remove("handleDisabled")
    } // end if/else


    // objHighlighterNd
    el.parentElement.append(objHighlighterNd)
    
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })      
  } // end of try/catch
     

} // end of positionHandlesOn()




function hideHighlight() {
  try {

    if (typeof lastDesignElement === "undefined" || lastDesignElement===null) return

    objHighlighterNd.style.display = "none"

    if (lastDesignElement.liElement.classList.contains("lnSel")) {
      lastDesignElement.liElement.classList.remove("lnSel")
    } // end if

    lastDesignElement = undefined
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      })    
  } // end of try/catch

} // end of  hideHighlight()


/**
 * 
 */
function setupSchemas() {
  try {
    orvCore.addSchema({
      objType:"appSettings",
      descr:"Web application level settings",
      fields:[
        {fieldName:"", dataType:""}
      ]
    })

    orvCore.addSchema({
      objType:"artDesign",
      descr:"Container object of the Design that the user is working on",
      fields:[
        {fieldName:"appIdent", dataType:"string",defValue:"DIV-Art-Studio"},
        {fieldName:"zoom", dataType:"number",defValue:1},
        {fieldName:"traceMode", dataType:"boolean",defValue:false},
        {fieldName:"showGrid", dataType:"boolean",defValue:true},
        {fieldName:"showRuler", dataType:"boolean",defValue:true},
        {fieldName:"referenceImagesByIndex", dataType:"array"},
        {fieldName:"gradientsByIndex", dataType:"array"},
        {fieldName:"imgInfoByIndex", dataType:"array"},
        {fieldName:"designElementsByIndex", dataType:"array"},
        {fieldName:"externalFontsByIndex", dataType:"array"},
        {fieldName:"stylesByIndex", dataType:"array"},
        {fieldName:"keyframeAnimationsByIndex", dataType:"array"}
      ]
    })

    orvCore.addSchema({
      objType:"artworkBackground",
      descr:"Style settings for the current artwork's background. ...Background color, etc.",
      fields:[
        {fieldName:"", dataType:""}
      ]
    })

    orvCore.addSchema({
      objType:"designSettings",
      descr:"Customized setting that user has made for current design.",
      fields:[
        {fieldName:"", dataType:""}
      ]
    })

    orvCore.addSchema({
      objType:"buildCode",
      descr:"Settings for how to build the code",
      fields:[
        {fieldName:"", dataType:""}
      ]
    })

    orvCore.addSchema({
      objType:"refArt",
      descr:"Define a piece of reference art user can 'trace' when making their art",
      fields:[
        {fieldName:"", dataType:""}
      ]
    })

    orvCore.addSchema({
      objType:"imgInfo",
      descr:"Define an image's info including where it came from (includes encoded version of image)",
      fields:[
        {fieldName:"fileName", dataType:"string"},
        {fieldName:"mimeType", dataType:"string"},
        {fieldName:"fileUrl", dataType:"string"},
        {fieldName:"retrievalDate", dataType:"date",descr:"date image retrieved from web or file upload"},
        {fieldName:"addDate", dataType:"date",descr:"date image added to design"},
        {fieldName:"width", dataType:"number"},
        {fieldName:"height", dataType:"number"},
        {fieldName:"title", dataType:"string"},
        {fieldName:"descr", dataType:"string"},
        {fieldName:"encodedImage", dataType:"string"}
      ]
    })

    orvCore.addSchema({
      objType:"designElement",
      descr:"Defines a DIV in the design... possibly in future could be an SVG and SVG related markup",
      fields:[
        {fieldName:"", dataType:""}
      ]
    })

    orvCore.addSchema({
      objType:"externalFont",
      fields:[
        {fieldName:"fontUrl", dataType:""},
        {fieldName:"fontFaceValue", dataType:"string"}
      ]
    })

    orvCore.addSchema({
      objType:"styleSelector",
      fields:[
        {fieldName:"", dataType:""}
      ]
    })

    orvCore.addSchema({
      objType:"keyframeAnimation",
      fields:[
        {fieldName:"", dataType:""}
      ]
    })

    orvCore.addSchema({
      objType:"animationStep",
      fields:[
        {fieldName:"", dataType:""}
      ]
    })
  } catch(err) {
      orvCore.displayErrMsg(err,{},function(err) {
        debugger;
      }) 
  } // end of try/catch

  
} // end of setupSchemas()



window.addEventListener("load", pageSetup)