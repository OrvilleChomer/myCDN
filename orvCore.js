/********************************************************************
 *    orvCore.js    - My 'Core' JavaScript Library
 * 
 *    Author:  Orville Chomer
 * 
 *    Version: 0.10
 * 
 *    Version History:
 *    ----------------
 * 
 *    Version#       Date            Description
 *    ========      ============    =================
 *      0.001        05/09/2021     Initial push to Github
 * 
 *    TABLE OF CONTENTS (TAGS):
 * 
 *     😎😎😎DIRECTORY OF PUBLIC INTERFACE:
 *     -----------------------------------
 *        - #orvCore_add_event_listener_method
 *        - #orvCore_display_err_msg_method
 *        - #orvCore_get_val_method
 *        - #orvCore_parse_stack_string_method
 *        - #orvCore_remove_event_listener_method
 * 
 * 
 *     🤐🤐🤐DIRECTORY OF PRIVATE FUNCTIONS:
 *     ------------------------------------
 *        - #add_orv_core_styles
 *        - #break_up_file_url
 *        - #Display_err_msg
 *     
 ********************************************************************/


// *** MAIN CONSTRUCTOR:
function OrvCore(optParams) {
    const orvCore = this;
    let nHighestZIndex = 999
    let orvCoreDomSpace
    const sOrvCoreLibClassName = "orvCoreJsLib"
    const orvCoreLibStyleBlockId = sOrvCoreLibClassName+"_style"
    let styleBlk;
    let sComponentName = ""; // blank if not a component
    let sCodePenId = "";
    let sCodePenView = "notAPen"
    let sCurrentLibVer = "0.002"
    let sLibAuthor = "Orville Paul Chomer"
    let sLibRepoPath = ""
    let bLocalHost = false;
    let sLocalAppName = "";
    let dbsByFileName = new Map(); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

    let sLastPosCntrId = "";
    let lastPosCntr;
    
    /*
       CALL SOME GENERAL INITIALIZATION/CHECKING ROUTINES...
     */
    getAnyCodePenInfo()

    if (sCodePenId === "") {
        getLocalAppName()
    } // end if
    

    /*
      ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
       😎😎😎 PUBLIC INTERFACE
      ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

          
     */

      /**
       * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
       * Definition of various Public CUSTOM PROPERTIES 
       * of orvCore library object. ....
       * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
       */


       Object.defineProperty(orvCore, "author", {
            get : function () {
                return sLibAuthor;
            } // end of custom property Getter function for "author"
        }); // end of "author" property definition      


        /**
         * returns blank string if not a Code Pen...
         */
       Object.defineProperty(orvCore, "codepenId", {
            get : function () {
              return sCodePenId;
            } // end of custom property Getter function for "codepenId"
       }); // end of "codepenId" property definition


       /**
        * returns Code Pen's 'View' if it is a Code Pen.
        * if not a Code Pen, it returns the string: "notAPen"
        */
       Object.defineProperty(orvCore, "codepenView", {
            get : function () {
                return sCodePenView;
            } // end of custom property Getter function for "codepenView"
        }); // end of "codepenView" property definition  
        
        
        /**
         * returns the current version# of this 'orvCore' library in a 
         * string format.
         */
        Object.defineProperty(orvCore, "currentVersion", {
            get : function () {
                return sCurrentLibVer;
            } // end of custom property Getter function for "currentVersion"
        }); // end of "currentVersion" property definition    



        Object.defineProperty(orvCore, "isLocalHost", {
            get : function () {
                return bLocalHost;
            } // end of custom property Getter function for "isLocalHost"
        }); // end of "isLocalHost" property definition 



        Object.defineProperty(orvCore, "repoPath", {
            get : function () {
                return sLibRepoPath;
            } // end of custom property Getter function for "repoPath"
        }); // end of "repoPath" property definition    


       // #####################################################################
       //    END OF CUSTOM PROPERTY DEFINITIONS 
       // #####################################################################


      /**
       * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
       * START OF...
       * Definition of various Public METHODS of orvCore library object. ....
       * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
       */

   /**
    * 
    * #orvCore_add_event_listener_method
    * 
    * this method is a Wrapper around regular document or DOM element 
    * addEventListener calls.
    * 
    */       
      orvCore.addEventListener = function(el,sEvent,listenerFunc) {        
        addEventListenerWrapper(el,sEvent,listenerFunc)
      } // end of orvCore.addEventListener()

    

      orvCore.addSchema = function(inpSchema) {

      } // end of orvCore.addSchema()



   /**
    * 
    * #orvCore_display_err_msg_method
    * 
    *   NOTE:  
    *    Declare all your function-level variables BEFORE your try/catch block so that:
    *      - you can check what their values were at the time of the error in the catch block
    *      - you can successfully pass them as 'variablesOfInterest' so that their values can be displayed
    *     
    */ 
    orvCore.displayErrMsg = function(err, params, inpDebugFnc) {
        const displayErrMsg = new DisplayErrMsg(err, params, inpDebugFnc)
    } // end of orvCore.displayErrMsg()



    orvCore.createDialogPanel = function(params) {
        const diaPanel = new CreateDialogPanel()
    } // end of orvCore.createDialogPanel() method



    /**
     * 
     *  #orvCore_get_db_method
     * 
     *  returns an indexDb database Wrapper object
     */
    orvCore.getDb = function(params) {
        const db = new GetDb(params)
        return db; 
    } // end of orvCore.getDb


    /**
     * 
     */
    orvCore.getMousePosInCntr = function(cntrId, evt) {
        return getMousePosInCntr(cntrId, evt)
    } // end of orvCore.getMousePosInCntr()



   /**
    * 
    * #orvCore_get_val_method
    */ 
    orvCore.getVal = function(paramObj,sParamName, defValue, optParams) {
        return getVal(paramObj,sParamName, defValue, optParams)
    } // end of orvCore.getVal()



   /**
    * 
    * #orvCore_parse_stack_string_method
    */     
    orvCore.parseStackString = function(sStackString) {
        return parseStackString(sStackString)

    } // end of orvCore.parseStackString()


   /**
    * 
    * #orvCore_remove_event_listener_method
    */      
    orvCore.removeEventListener = function(el,sEvent,listenerFunc) {
        // Just a stub for now...

    } // end of orvCore.removeEventListener()
    


    orvCore.safeMarkup = function(sInput) {
        return safeMarkup(sInput)
    } // end of orvCore.safeMarkup()




    orvCore.sortArrayOfObjects = function(arr, sOrderBy) {
        return sortArrayOfObjects(arr, sOrderBy) 

    } // end of orvCore.sortArrayOfObjects



    /*
      ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++      
       🤐🤐🤐PRIVATE FUNCTIONS
      ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++       
     */
    

    /**
     * 
     * this function is a Wrapper around regular document or DOM element 
     * addEventListener calls.
     * 
     *  can be used for:
     *   - logging
     *   - enhancing call stack info
     *   - ???  :)
     */
    function addEventListenerWrapper(el,sEvent,listenerFunc) {
        // Just a stub for now...

        try {

        } catch(err) {
            orvCore.displayErrMsg(err,{},function(err) {
              debugger;
            }) 
        } // end of try/catch

    } // end of addEventListenerWrapper()




    /**
     * 
     * 
     *   #add_orv_core_styles
     */
    function addOrvCoreStyles() {
        let s = [],s2=[];
        const o1 = "."+sOrvCoreLibClassName+" "
        let sPos

        try {
            if (typeof styleBlk !== "undefined") {
                return; // aleady set up
            } // end if

            styleBlk = document.createElement("STYLE")
            styleBlk.id = orvCoreLibStyleBlockId;


            // s.push("")

            s.push(o1+"{")
            s.push("  box-sizing:border-box;")
            s.push("  margin:0px;")
            s.push("  padding:0px;")
            s.push("}")

            s.push(o1+".bx {")
            s.push(" position:absolute;")
            s.push(" overflow:hidden;")
            s.push("}")

            s.push(o1+".tint{")
            s.push("  background-color:black;")
            s.push("  top:0px;")
            s.push("  bottom:0px;")
            s.push("  left:0px;")
            s.push("  right:0px;")
            s.push("  opacity:.6;")
            s.push("  z-index:"+(nHighestZIndex+1)+";")
            s.push("}")

            // s2.push("")
            s2 = []
            s2.push(o1+".debugIcon{")
            s2.push("  text-align:center;")  
            s2.push("  width:15px;")
            s2.push("  height:15px;")
            s2.push("  line-height:12px;")
            s2.push("  font-family:Tahoma;")
            s2.push("  font-size:11px;")
            s2.push("  padding:0px;")
            s2.push("  margin:0px;")
            s2.push("  margin-right:6px;")            
            s2.push("  color: white;")
            s2.push("  border-radius:3px;")
            s2.push("  overflow:hidden;")
            s2.push("  display:inline-block;")
            s2.push("}")
            s.push(s2.join("\n"))


            s2 = []
            s2.push(o1+".debugIconGreen{")
            s2.push("  border:solid #799876 1.5px;")
            s2.push("  text-shadow: 1px 1px #799876,-1px -1px #799876, 1px -1px #799876,-1px 1px #799876;")            
            s2.push("  background-color: #A8C9A6;")
            s2.push("}")
            s.push(s2.join("\n"))

            s2 = []
            s2.push(o1+".debugIconBlue{")
            s2.push("  border:solid #6B89A8 1.5px;")
            s2.push("  text-shadow: 1px 1px #6B89A8,-1px -1px #6B89A8, 1px -1px #6B89A8,-1px 1px #6B89A8;")            
            s2.push("  background-color: #96B9D9;")
            s2.push("}")
            s.push(s2.join("\n"))

            s2 = []
            s2.push(o1+".debugIconTan{")
            s2.push("  border:solid #CAB471 1.5px;")
            s2.push("  text-shadow: 1px 1px #CAB471,-1px -1px #CAB471, 1px -1px #CAB471,-1px 1px #CAB471;")            
            s2.push("  background-color: #F5DE97;")
            s2.push("}")
            s.push(s2.join("\n"))

            s2 = []
            s2.push(o1+".debugIconPurple{")
            s2.push("  border:solid #8C7698 1.5px;")
            s2.push("  text-shadow: 1px 1px #8C7698,-1px -1px #8C7698, 1px -1px #8C7698,-1px 1px #8C7698;")            
            s2.push("  background-color: #BDA6C9;")
            s2.push("}")
            s.push(s2.join("\n"))

            s2 = []
            s2.push(o1+".debugIconRed{")
            s2.push("  border:solid #BC6F70 1.5px;")
            s2.push("  text-shadow: 1px 1px #BC6F70,-1px -1px #BC6F70, 1px -1px #BC6F70,-1px 1px #BC6F70;")            
            s2.push("  background-color: #E9999A;")
            s2.push("}")
            s.push(s2.join("\n"))

            s2 = []
            s2.push(o1+".debugIconGray{")
            s2.push("  border:solid #999999 1.5px;")
            s2.push("  text-shadow: 1px 1px #999999,-1px -1px #999999, 1px -1px #999999,-1px 1px #999999;")            
            s2.push("  background-color: #D9D9D9;")
            s2.push("}")
            s.push(s2.join("\n"))


            // s.push("  ")
            sPos = "30px"
            s.push(o1+".dialog {")
            s.push("  background-color:silver;")
            s.push("  border:solid yellow 3px;")
            s.push("  width:700px;")
            s.push("  left:"+sPos+";")
            s.push("  top:"+sPos+";")
            s.push("  bottom:"+sPos+";")
            s.push("  z-index:"+(nHighestZIndex+2)+";")
            s.push("}")

            s.push(o1+".diaTitleBar {")
            s.push("  left:0px;")
            s.push("  right:0px;")
            s.push("  top:0px;")
            s.push("  height:35px;")
            s.push("  line-height:35px;")
            s.push("  color:white;")
            s.push("  font-size:18pt;")
            s.push("  background-color:gray;")
            s.push("  text-align:center;")  
            s.push("}")

            s.push(o1+".varArrayLen {")
            s.push("  color:gray; ")  
            s.push("  font-size:14px;")            
            s.push("}")

            s.push(o1+".varLst {")
            s.push("  list-style-type: none; ") 
            s.push("  background-color:white;")
            s.push("  border-radius:4px;")    
            s.push("  padding-left:4px;")     
            s.push("  padding-bottom:8px;")     
            s.push("}")

            s.push(o1+".varPropCntr {") 
            s.push("  margin-left:16px;")       
            s.push("}")


            // 🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵
            s.push(o1+"LI {")
            s.push("  font-family: Menlo, Monaco, 'Courier New', monospace;")
            s.push("  font-size:16px;")
            s.push("  width:655px;")
            //s.push("  background-color:lightblue;")    
            s.push("}")

            s.push(o1+".varCntr2 {")
            s.push("  font-family: Monaco, MonoSpace;")
            s.push("  width:655px;")
            s.push("  height:20px;")
            s.push("  position:relative; ") 
            s.push("  top:0px;")
            s.push("  left:0px;")
            s.push("  padding-left:17px;")
           // s.push("  background-color:lightgreen;")     
            s.push("}")

            // s.push("  ")
            s.push(o1+".dataType_lbl {")
            s.push("  position:absolute; ") 
            s.push("  right:0px;")
            s.push("  top:2px;")
            s.push("  margin-right:4px;")
            s.push("  padding-left:4px;")
            s.push("  padding-right:4px;")
            s.push("  border-radius:4px;")
            s.push("  font-size:9pt;")
            s.push("  background-color:#800000;")
            s.push("  color:white;")
            s.push("}")

      //      alert(s.join("\n"))
            s.push(o1+".codeBackground {")
            s.push("}")

            s.push(o1+".numberValue {")
            s.push("}")

            s.push(o1+".stringValue {")
            s.push("}")

            s.push(o1+".typeLabel {")
            s.push("}")

            // s.push("")
            s.push(o1+".booleanValue {")
            s.push("}")

            s.push(o1+".dateValue {")
            s.push("}")


            styleBlk.innerHTML = s.join("\n")
            document.body.append(styleBlk)

        } catch(err) {
            console.dir(err)
            debugger   
          } // end of try/catch
        //styleBlk
        
    } // end of addOrvCoreStyles()



   /**
    * 
    * #break_up_file_url
    */        
    function breakUpFileUrl(sUrl) {
        const nMax = sUrl.length;
        const result = {}

        try {
            result.path = ""
            result.fileName = sUrl
    
            for (let n=nMax-1;n>-1;n--) {
                if (sUrl.substr(n,1) === "/") {
                    result.fileName = sUrl.substr(n+1)
                    result.path = sUrl.substr(0,n+1)
                    break;
                } // end if
            } // next n
    
            return result;
        } catch(err) {
            console.dir(err)
            debugger   
        } // end of try/catch
        
    } // end of breakUpFileUrl()




    function debugIconMarkup(sLetter,sClass) {
        const s=[];

        try {
            if (typeof sClass=== "undefined") {
                sClass = 'debugIconGray'
            } // end if
    
            s.push("<div class='"+sOrvCoreLibClassName+" debugIcon "+sClass+"')")
    
            s.push(">"+sLetter+"</div>")
    
            return s.join("")
        } catch(err) {
            console.dir(err)
            debugger   
        } // end of try/catch
        
    } // end of debugIconMarkup


// ***🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒

    function CreateDialogPanel(params) {
        const createDialogPanel = this;
        let tintObscureNd,dialogPanelNd,titleBarNd,dialogPanelContentNd;
        let bMarkupBuilt = false;
        let sTitle = "";
        let applyFn,afterCloseFn,afterHideFn
        let nZIndex,sMarkup
        let inputValuesObj = {}


        try {

            Object.defineProperties(createDialogPanel, {
                "inputValues": {
                    "get": function() { 
                        return inputValuesObj;
                    }, // end of getter code!
                    "set": function(vNewValue) {
                        inputValuesObj = vNewValue
                    } // end of setter code
                }  // end of "inputValues" property definition
            }) // end of Object.defineProperties()

            createDialogPanel.close = function() {
                try {

                } catch(err) {
                    console.dir(err)
                    debugger 
                } // end of try/catch for close method

            } // end of createDialogPanel.close() method
    
    
            createDialogPanel.hide = function() {
                try {

                } catch(err) {
                    console.dir(err)
                    debugger 
                } // end of try/catch for hide method

            } // end of createDialogPanel.hide() method
    
    
            createDialogPanel.setContent = function(siMarkup) {
                try {
                    sMarkup = siMarkup
                    bMarkupBuilt = true
                } catch(err) {
                    console.dir(err)
                    debugger 
                } // end of try/catch for setContent method

            } // end of createDialogPanel.setContent()

    
            createDialogPanel.show = function() {
                try {
                    if (typeof dialogPanelNd === "undefined") {
                        buildDialogPanel()
                    } // end if

                    dialogPanelContentNd.innerHTML = safeMarkup(sMarkup)
                } catch(err) {
                    console.dir(err)
                    debugger 
                } // end of try/catch
            } // end of createDialogPanel.show() method

            // %%% CreateDialogPanel Private Functions... %%%
            function buildDialogPanel() {
                try {
                    tintObscureNd = document.createElement("div")
                    tintObscureNd.className = "dialogPanelTint"
                    dialogPanelNd = document.createElement("div")
                    tintObscureNd.className = "dialogPanel"
                    titleBarNd = document.createElement("div")
                    titleBarNd.className = "dialogPanelTitleBar"
                    dialogPanelNd.appendChild(titleBarNd)
                    dialogPanelContentNd = document.createElement("div")
                    dialogPanelContentNd.className = "dialogPanelContent"

                    document.body.appendChild(tintObscureNd)
                    document.body.appendChild(dialogPanelNd)
                } catch(err) {
                    console.dir(err)
                    debugger 
                } // end of try/catch
            } // end of buildDialogPanel()

        } catch(err) {
            console.dir(err)
            debugger 
        } // end of try/catch for CreateDialogPanel() Constructor!

    } // end of CreateDialogPanel() Constructor
    // ***🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒🍒




   /**
    * 
    * #Display_err_msg
    * 
    */     
    function DisplayErrMsg(err, params, inpDebugFnc) {
        let bHasDebugFunc = false;
        let debugFunc;
        let tintNd,debugDialogNd
        let closeBtnNd, debugBtnNd
        let errTimestamp = new Date()
        let sDescr,variablesOfInterestByIndex,stack,sPos,s,s2

        try {

            setupOrvCoreDomSpace()

            if (typeof inpDebugFnc === "function") {
                debugFunc = inpDebugFnc
                bHasDebugFunc = true;
            } // end if
    
            sDescr = getVal(params,"descr", "")
            variablesOfInterestByIndex = getVal(params,"variablesOfInterest", [])
            stack = parseStackString(err.stack) 
            
            tintNd = document.createElement("DIV")
            debugDialogNd = document.createElement("DIV")
    
            tintNd.className = sOrvCoreLibClassName+" bx tint"
            
            debugDialogNd.className = sOrvCoreLibClassName+" bx dialog"
    
            s = [];
            s2 = [];
            const Q = '"'
            // s.push("")
    
            s2 = [];
            s2.push("<span style="+Q)
            s2.push("background-color:white;")
            s2.push("color:#fa5f20;")
            s2.push("font-family: Monaco, MonoSpace;")
            s2.push("font-size:10pt;")
            s2.push("padding-right:4px;")
            s2.push("border-radius:4px;")
            s2.push(Q+">")
            const sCodeSpan = s2.join("")
    
            // Title Bar...
            s.push("<div ")
            s.push("class='"+sOrvCoreLibClassName+" bx diaTitleBar' ")
            s.push("><b>You Have Gotten An Error!</b></div>")
    
            // Content Container...
            s.push("<div style="+Q)
            s.push("position:absolute;")
            s.push("overflow:auto;")
            s.push("left:6px;")
            s.push("right:6px;")
            s.push("top:46px;")
            s.push("bottom:40px;")
            s.push("padding:10px;")
            s.push("box-sizing:border-box;")
            s.push("border:solid gray 1px;")
            s.push(Q+">")
    
            const nMax = stack.length
    
            s.push("<table>")
            s.push("<tr><td>Error: &nbsp;</td><td nowrap>"+sCodeSpan+err.message+"</span></td></tr>")
    
            if (nMax > 0) {
                s.push("<tr><td>Line:</td><td nowrap>"+stack[nMax-1].lineNum+"</td></tr>")
                s.push("<tr><td>Col:</td><td nowrap>"+stack[nMax-1].column+"</td></tr>")
                let sOutput = stack[nMax-1].funcName.replace("<", "&lt;")
                s.push("<tr><td>JS Function:&nbsp;&nbsp;&nbsp;</td><td nowrap>"+sCodeSpan+sOutput+"()</span></td></tr>")
                s.push("<tr><td>File:</td><td nowrap>"+stack[nMax-1].fileName+"</td></tr>")
            } // end if
    
            s.push("</table>")
    
            
    
            s.push("<p><details open>")
            s.push("<summary>Call Stack ("+nMax+" items)</summary>")
    
            s.push("<table style="+Q)
            s.push("margin-left:10px;")
            s.push(Q+">")
            s.push("<tr>")
            s.push("<td nowrap><b>Function</b></td>")
            s.push("<td nowrap><b>Line#&nbsp;&nbsp;</b></td>")
            s.push("<td nowrap><b>Col&nbsp;&nbsp;</b></td>")
            s.push("<td nowrap><b>File Name&nbsp;&nbsp;</b></td>")
            s.push("<td nowrap><b>Stack Depth</b></td>")
            s.push("</tr>")
            
            for (let n=0; n<nMax;n++) {
                const stackItm = stack[n]
                // s.push("")
                s.push("<tr>")
                s.push("<td nowrap>")
    
                if (stackItm.funcName !== "<i>Unknown</i>") {
                    s.push(sCodeSpan)
                } // end if
    
                let sOutput = stackItm.funcName.replace("<", "&lt;")
                s.push("&nbsp;&nbsp;"+sOutput)
                
                if (stackItm.funcName !== "<i>Unknown</i>") {
                    s.push("()")
                } // end if
    
                if (stackItm.funcName !== "<i>Unknown</i>") {
                    s.push("</span>")
                } // end if
                
    
                s.push("</td>")
    
                s.push("<td nowrap align='center'>"+stackItm.lineNum+"</td>")
                s.push("<td nowrap align='center'>"+stackItm.column+"</td>")
                s.push("<td nowrap>&nbsp;&nbsp;"+stackItm.fileName+"</td>")
                s.push("<td nowrap align='center'>"+stackItm.stackDepth+"</td>")
                s.push("</tr>")
            } // next n
    
            s.push("</table>")
            s.push("</details></p>")
            s.push("<hr>")
    
            // s.push("")
    
            if (sDescr !== "") {
                s.push("<p>"+sDescr+"</p><hr>")
            } // end if
    
            const nMax2 = variablesOfInterestByIndex.length;
            if (nMax2 > 0) {
                s.push("<h4>Variables of Interest:</h4>")
                // 🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵🔴🔵
                s.push("<ul class='"+sOrvCoreLibClassName+" varLst'>")
    
                for (let n=0;n<nMax2;n++) {
                    const varOfInterest = variablesOfInterestByIndex[n]
                    const vValue = varOfInterest.value
                    let sType = typeof vValue
                    let bExpand = false;
                    let sOpenChar = "{";
                    let sCloseChar = "}";
    
                    if (sType === "object") {
                        bExpand = true;
                        if (typeof vValue.constructor !== "undefined") {
                            if (typeof vValue.constructor.name === "string") {
                                sType = vValue.constructor.name
                            } // end if
                        } // end if 
                    } // end if
    
                    if (sType === "Array") {
                        sOpenChar = "[";
                        sCloseChar = "]";
                    } // end if
    
                    // s.push("")
                    s.push("<li>")
                    if (bExpand) {
                        s.push("<details>")
                        s.push("<summary>")
                    } else {
                        s.push("<div class='"+sOrvCoreLibClassName+" varCntr2'>")
                    } // end if
    
                    s.push(varOfInterest.name)
    
                    
    
                    if (bExpand) {
                        s.push(" "+sOpenChar)
    
                        s.push("<span >..."+sCloseChar+"</span>")
                        if (sType === "Array") {
                            //varArrayLen
                            if (typeof vValue.length === "number") {
                                s.push(" <span ")
                                s.push("title='length of array' ")
                                s.push("class='"+sOrvCoreLibClassName+" varArrayLen'>("+vValue.length+")</span>")
                            } // end if (typeof vValue.length === "number") 
                            
                        } // end if
    
                        s.push("<span class='"+sOrvCoreLibClassName+" dataType_lbl'>")
                        s.push(sType)
                        s.push("</span>")
    
                        s.push("</summary>")
                    } else {
                        s.push(" = ")
    
                        if (sType === "string") {
                            s.push("&quot;")
                        } // end if
    
                        s.push(vValue)
                        if (sType === "string") {
                            s.push("&quot;")
                        } // end if
    
     
                        s.push("<span class='"+sOrvCoreLibClassName+" dataType_lbl'>")
                        s.push(sType)
                        s.push("</span>")
                        s.push("</div>"); // closing LI containter
                    } // end if
    
                    // s.push("")
    
    
                    if (bExpand) {
                        s.push("<div class='"+sOrvCoreLibClassName+" varPropCntr'>")
    
                        // call routine to get markup for object's properties here!
                        if (sType !== "Array") {
                            s.push(propObjMarkup(vValue))
                        } // end if
    
                        s.push(sCloseChar)
                        s.push("</div>")  // closing of variable property varPropCntr ''
                        s.push("</details>")
                    } // end if
                    s.push("</li>\n")
                } // next n
    
                s.push("</ul>")
                s.push("<hr>")
            } // end if
    
            
    
            s.push("</div>") // content container End
            // #################################################
    
    
            // button Container...
            s.push("<div style="+Q)
            s.push("position:absolute;")
            s.push("left:6px;")
            
            s.push("right:6px;")
            s.push("height:27px;")
            s.push("bottom:6px;")
            s.push(Q+">")
    
            s.push("<button class='closeBtn'")
            s.push(">CLOSE</button>")
            
     
            if (bHasDebugFunc) {
                // s.push("")
                s.push("<button class='debugBtn' ")
                s.push(">DEBUG</button>")
                s.push("<small >")
                s.push("❗ You need to have the browser's Developer window/panel open to use debug feature!")
                s.push("</small>")
            } // end if
    
            s.push("</div>") // button container End
    
            debugDialogNd.innerHTML = safeMarkup(s.join(""))
            
            orvCoreDomSpace.append(tintNd)
            orvCoreDomSpace.append(debugDialogNd)
    
            // toggleVarListItm
            const detailNodes = debugDialogNd.getElementsByTagName("details")
            for (let n=0;n<detailNodes.length;n++) {
                detailNode = detailNodes[n]
                detailNode.addEventListener("toggle", toggleVarListItm)
            } // next n
            
    
            closeBtnNd = debugDialogNd.getElementsByClassName("closeBtn")[0]
            closeBtnNd.addEventListener("click", hideErrPanel)
    
            if (bHasDebugFunc) {
                debugBtnNd = debugDialogNd.getElementsByClassName("debugBtn")[0]
                debugBtnNd.addEventListener("click", debugBtnClicked)
            } // end if
            
    
            function debugBtnClicked() {
                try {
                    debugBtnNd.removeEventListener("click", debugBtnClicked)
                    hideErrPanel()
                    debugFunc(err)      
                } catch(err) {
                    console.dir(err)
                    debugger
                } // end of try/catch block
                      
            } // end of debugBtnClicked()
    
    
            function hideErrPanel() {
                let detailNodes
    
                try {
                    tintNd.remove()
    
                    detailNodes = debugDialogNd.getElementsByTagName("details")
                    for (let n=0;n<detailNodes.length;n++) {
                        detailNode = detailNodes[n]
                        detailNode.removeEventListener("toggle", toggleVarListItm)
                    } // next n
        
                    closeBtnNd.removeEventListener("click", hideErrPanel)
                    debugDialogNd.remove()
                } catch(err) {
                    console.dir(err)
                    debugger
                } // end of try/catch
    
                
            } // end of hideErrPanel()
        } catch(err) {
            console.log("function: DisplayErrMsg()")
            console.dir(err)
            debugger
        } // end of try/catch


    } // end of DisplayErrMsg()



    /**
     * 
     *   #get_any_codepen_info   sCodePenId
     * 
     *   determine if the current page is a Pen running under CodePen
     *   if it is, retrieve the Pen Id and put value in: sCodePenId
     * 
     *   if the current page is NOT a pen, sCodePenId will equal: ""
     * 
     *   if it IS a pen, it tries to set sCodePenView to a proper view value
     * 
     *   This function is run as part of the orvCore's Constructor 
     *   initialization routine.
     */
    function getAnyCodePenInfo() {
        let el,sRef,nPos,nPos2,sPenId;
        let bFoundView = false,sCheck;

        try {
            if (window.location.hostname=== 'cdpn.io') {
                sCodePenView = "unknownView"
                el = document.querySelector("link[rel='canonical']")
                if (typeof el !== "undefined" && el !== null) {
                    sRef = el.href
                    nPos = sRef.indexOf("/pen/")
                    if (nPos>-1) {
                        sPenId = sRef.substr(nPos+5)
                        nPos2 = sPenId.indexOf("?")
                        if (nPos2>-1) {
                            sPenId = sPenId.substr(0,nPos2)
                        } // end if
                        sCodePenId = sPenId; // plug pen id into instance variable of orvCore!
                        sCodePenView = "editorView"
                        bFoundView = true;
                    } // end if                        
                } else {
                    // Not the Editor View... figure out what view it is!
                    // (no canonical "link" tag)
                    sCheck = "/fullembedgrid/"
                    nPos = sRef.indexOf(sCheck)
                    if (nPos>-1) {
                        sCodePenView = "detailsView"
                        bFoundView = true;
                    } // end if

                    if (!bFoundView) {
                        sCheck = "/fullcpgrid/"
                        nPos = sRef.indexOf(sCheck)
                        if (nPos>-1) {
                            sCodePenView = "thumbnailView"
                            bFoundView = true;
                        } // end if                            
                    } // end if

                    if (!bFoundView) {
                        sCheck = "/fullembedgrid/"
                        nPos = sRef.indexOf(sCheck)
                        if (nPos>-1) {
                            sCodePenView = "popupView"
                            bFoundView = true;
                        } // end if                            
                    } // end if

                    if (!bFoundView) {
                        sCheck = "/fullpage/"
                        nPos = sRef.indexOf(sCheck)
                        if (nPos>-1) {
                            sCodePenView = "fullPageView"
                            bFoundView = true;
                        } // end if                            
                    } // end if

                    // for now, "live", "professor", "presentation" and "collab" view seems the same as full page view

                    if (!bFoundView) {
                        sCheck = "/debug/"
                        nPos = sRef.indexOf(sCheck)
                        if (nPos>-1) {
                            sCodePenView = "debugView"
                            bFoundView = true;
                        } // end if                            
                    } // end if

                    if (bFoundView) {
                        // extract the pen id for non-editor view views! ...
                        sCodePenId = sRef.substr(nPos+sCheck.length)
                    } // end if

                } // end if (typeof el !== "undefined" && el !== null) / else

            } // end if (window.location.hostname=== 'cdpn.io')
        } catch(err) {
            orvCore.displayErrMsg(err,{},function(err) {
              debugger;
            }) 
        } // end of try/catch
    } // end of getAnyCodePenInfo()


    /**
     * 
     *  #get_db_constructor
     * 
     *   see:  https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
     */
    function GetDb(params) {
        const db = this;
        let sDbName = "app.db"
        let nDbVerNum,openRequest,idxDb
        let bDbOpen = false;


        try {
            // special CodePen check...  (see: getAnyCodePenInfo() for more information)
            if (sCodePenId !== "") {
                sDbName = sCodePenId + ".db"
            } else if (sLocalAppName !== "") {
                sDbName = "localApp-"+sLocalAppName+".db"
            } // end if (sCodePenId !== "") / else if

            sDbName = getVal(params,"dbName",sDbName)
            nDbVerNum = getVal(params,"dbVersionNum",1)  // version# has to be an integer not a float!

            openRequest = indexedDB.open(sDbName, nDbVerNum)


            openRequest.onerror = function(evt) {
                // ???
            } // end of openRequest.onerror()


            openRequest.onblocked = function(evt) {

            } // end of openRequest.onblocked()


            // New Db or Version# increment...
            openRequest.onupgradeneeded = function(evt) {
                idxDb = evt.target.result
                bDbOpen = true;

                const objStores = idxDb.objectStoreNames;
                if (!objStores.contains("appData")) {
                    const objStore = idxDb.createObjectStore("appData", {keyPath:"localId", autoIncrement:false})
                    objStore.createIndex('objType', 'objType', { unique: false });
                } // end if
            } // end of openRequest.onupgradeneeded() event handler


            // opening existing db with same version as before...
            openRequest.onsuccess = function(evt) {
                idxDb = evt.target.result
                bDbOpen = true;
            } // end of openRequest.onsuccess() event handler

            // =========================
            // *** db Public Methods:
            // =========================
            
            db.get = function(params) {
                return new GetObjData(params)
            } // end of db.get() method


            db.save = function(params) {
                return new SaveObjData(params)
                
            } // end of db.save() method



        } catch(err) {
            orvCore.displayErrMsg(err,{},function(err) {
              debugger;
            }) 
        } // end of try/catch

    } // end of GetDb Constructor

    
    function GetObjData(params) {
        let objData;

        try {
            objData = this;
            const transaction = db.transaction(["appData"], "read");
            const objectStore = transaction.objectStore("appData");
        } catch(err) {
            orvCore.displayErrMsg(err,{},function(err) {
              debugger;
            }) 
        } // end of try/catch
    } // end of GetObjData() Constructor


    function getLocalAppName() {
        let sHost,sPath,nPos

        try {
            sHost = window.location.hostname
            if (sHost.indexOf(".local")>-1 || sHost==="localhost") {
                bLocalHost = true;
                sPath = window.location.pathname;

                if (sPath === "/") return;

                sPath = sPath.substr(1)
                nPos = sPath.indexOf("/")
                if (nPos>0) {
                    sLocalAppName = sPath.substr(0,nPos);
                } // end if
            } // end if
        } catch(err) {
            orvCore.displayErrMsg(err,{},function(err) {
              debugger;
            }) 
        } // end of try/catch

        
    } // end of  getLocalAppName()


    /**
     * 
     */
    function getMousePosInCntr(cntrId, evt) {
        let el
        const retObj = {}

        try {
            
            retObj.x = -1
            retObj.y = -1
            retObj.elementIsContainer = false;
            const offsets = {}
            offsets.x = 0
            offsets.y = 0

            if (cntrId==="") {
                retObj.errMsg = "Passed in a blank container Id."
                return retObj
            } // end if

            if (cntrId !== sLastPosCntrId) {
                lastPosCntr = document.getElementById(cntrId)

                if (typeof lastPosCntr === "undefined") {
                    retObj.errMsg = "Container for id returned 'undefined'."
                    return retObj
                } // end if

                if (lastPosCntr === null) {
                    retObj.errMsg = "Container for id returned a 'null' value."
                    return retObj
                } // end if

                sLastPosCntrId = cntrId                
            } // end if (cntrId !== sLastPosCntrId)

            el = evt.srcElement || evt.originalTarget
            retObj.domElementUnderMouse = el

            //debugger
            if (el.id === sLastPosCntrId) {
                retObj.elementIsContainer = true;
                retObj.x = evt.clientX
                retObj.y = evt.clientY
                return retObj
            } // end if

            getPosInCntr2(el, offsets)
            retObj.x = evt.clientX + offsets.x
            retObj.y = evt.clientY + offsets.y
            return retObj
        } catch(err) {
            console.dir(err)
            debugger
        } // end try/catch

    } // end of getMousePosInCntr()


    /**
     * 
     */
    function getPosInCntr2(el, offsets) {
        try {
            if (typeof el.id !== "undefined" ) {
                if (el.id === sLastPosCntrId) {
                    return;
                } // end if
            } // end if

            if (el.tagName === "BODY") {
                return; // prevent a possible stack overflow if element is 
                        // not a child somewhere in the container element!
            } // end if

            offsets.x = offsets.x + el.offsetLeft - el.scrollLeft
            offsets.y = offsets.y + el.offsetTop - el.scrollTop
            getPosInCntr2(el.ParentElement, offsets)
        } catch(err) {
            console.dir(err)
            debugger
        } // end of try/catch
    } // end of getPosInCntr2()



    /**
     * 
     * 
     */
    function getVal(paramObj,sParamName, defValue, optParams) {
        try {
            if (typeof paramObj === "undefined") {
                paramObj = {}
            } // end if
    
            if (typeof optParams === "undefined") {
                optParams = {}
            } // end if
    
            if (typeof optParams.dataType === "string") {
                 
            } // end if (typeof optParams.dataType === "string")
    
            if (typeof paramObj[sParamName] === "undefined") {
                return defValue
            } // end if
    
            return paramObj[sParamName]
        } catch(err) {
            console.dir(err)
            debugger
        } // end of try/catch
        
    } // end of getVal() 



    
    /**
     * 
     * see: https://codepen.io/orvilleChomer/pen/XoYKwW
     */
    function parseStackString(sStackString) {
        try {
            
            const stackDta = sStackString.split("\n");            
            let stack = [];
            const nMax = stackDta.length;
            let sValue,nPos,sValue2;
            let nMaxDepth;
            
            if (nMax>0) {
                for (let n=0;n<nMax;n++) {                    
                    sValue = stackDta[n];
                    processStackLine(sValue)                                       
                } // next n

                nMaxDepth = stack.length
                for (let n=0;n<nMaxDepth;n++) {
                    stackEntry = stack[n];
                    stackEntry.stackDepth = nMaxDepth - n;                    
                } // next n
            } // end if
            


            function processStackLine(sValue) {
                try {
                    if (sValue === "") {
                        return;
                    } // end if

                    let nPos,sValuesSplit
                    let sOriginalLineValue = sValue + ""

                    const stackEntry = {};
                    nPos = sValue.indexOf("@")
                    if (nPos > -1) {
                        stackEntry.funcName = sValue.split("@")[0];
                        sValue = sValue.split("@")[1];
                    } else {
                        nPos = sValue.indexOf(" at ")
                        if (nPos===-1) {
                            return; // Not actual stack data.
                        } // end  if

                        sValue = sValue.substr(nPos+4)
                        stackEntry.funcName = "<i>Unknown</i>"
                        nPos = sValue.indexOf(" (")
                        if (nPos > -1) {
                            sValuesSplit = sValue.split(" (")
                            stackEntry.funcName = sValuesSplit[0];
                            
                            sValue = sValuesSplit[1];
                            nPos = sValue.indexOf(")")
                            if (nPos > -1) {
                                sValue = sValue.substr(0,nPos)
                            } // end if
                        } else {

                        } // end if/else
                        
                    } // end if/else
                    
                    stackEntry.originalLineValue = sOriginalLineValue; // mainly for internal debugging
                    stackEntry.jsFileUrl = "";
                    
                    nPos = sValue.indexOf("?");
                    
                    if (nPos > -1) {
                        stackEntry.jsFileUrl = sValue.substr(0,nPos);
                    } // end if
                    
                    
                    sValue = sValue.split(":");
                    
                    if (stackEntry.jsFileUrl === "") {
                        // protocol plus rest of main url
                        sValue2 = sValue[0] + ":" + sValue[1];
                        
                        if (sValue.length-2 > 2) {
                            sValue2 = sValue2 + ":" + sValue[2]; // handle port if there
                        } // end if
                        
                        stackEntry.jsFileUrl = sValue2;
                    } // end if
                    
                    stackEntry.path = "";
                    stackEntry.fileName = ""

                    if (stackEntry.jsFileUrl !== "") {
                        const result = breakUpFileUrl(stackEntry.jsFileUrl)
                        stackEntry.path = result.path
                        stackEntry.fileName = result.fileName
                    } // end if
                    
                    stackEntry.column = sValue[sValue.length-1]-0;
                    stackEntry.lineNum = sValue[sValue.length-2]-0;
                    stack[stack.length] = stackEntry;
                } catch(err) {
                    console.log("processStackLine()")
                    console.dir(err)
                    debugger
                } // end of try/catch                

            } // end of processStackLine()


            
            return stack.reverse(); // ****
        } catch(err) {
            console.dir(err)
            debugger;
        } // end of try/catch
        
    } // end of parseStackString()

// https://codepen.io/orvilleChomer/pen/227fa29a4ccbc84cdf8392f56398ab12?editors=0010
    function propObjMarkup(obj) {
        let s = [];
        let objProps = [];
        let objPropsByKey = [];
        let proto
        
        try {
            proto = Object.getPrototypeOf(obj)
            for (const propName in proto) {
                const propInfo = {}
                propInfo.sortKey = propName.toLowerCase()
                propInfo.propName = propName
                propInfo.propValue = obj[propName]
                propInfo.prototypeStatus = "prototype"
                objProps.push(propInfo)
                objPropsByKey[propInfo.sortKey] = propInfo
            } // next propName
    
            for (const propName in obj) {
                const propInfo = {}
                propInfo.sortKey = propName.toLowerCase()
                propInfo.propName = propName
                propInfo.propValue = obj[propName]
    
                if (typeof objPropsByKey[propInfo.sortKey] === "undefined") {
                    propInfo.prototypeStatus = "none"
                    objProps.push(propInfo)
                } else {
                    propInfo.prototypeStatus = "overidden"
                    objPropsByKey[propInfo.sortKey] = propInfo
                } // end if/else
                
            } // next propName
    
            objProps = sortArrayOfObjects(objProps, "sortKey") 
            const nMax = objProps.length
    
            s.push("<ul class='jsonVw'>")
            let bProcALineItm = false;
    
            for (let n=0;n<nMax;n++) {
                let bTypeFound = false;
                let bIsFunction = false;
    
                propInfo = objProps[n]
                const val = propInfo.propValue;
                let sType = typeof val;
                let sIconLetter = "?"
                let sIconClass = "debugIconGray"
    
                if (bProcALineItm) {
                    s.push(",</li>")
                } // end if
    
                if (sType === "function") {
                    sIconLetter = "<i>f</i>"
                    sIconClass = "debugIconGreen"
                    bIsFunction = true;
                    
                } // end if
    
                  if (sType === "string") {
                    sIconLetter = "S"
                    sIconClass = "debugIconRed"
                  } // end if
    
                  if (sType === "number") {
                    sIconLetter = "N"
                    sIconClass = "debugIconBlue"
                  } // end if
    
                  if (sType === "boolean") {
                    sIconLetter = "B"
                    sIconClass = "debugIconPurple"
                  } // end if
    
                  if (sType === "object") {
                    sIconLetter = "O"
                    sIconClass = "debugIconTan"
    
                  } // end if
    
                  if (val === null) {
                    sIconLetter = "N"
                    sIconClass = "debugIconGray"
                  } // end if
    
                  s.push("<li>")
                  s.push(debugIconMarkup(sIconLetter, sIconClass))
                  s.push("<span class='propName'>")
                  s.push(propInfo.propName+"</span>")
    
                  if (bIsFunction) {
                    s.push("()")
                  } else {
                    s.push(":  ")
                  } // end if
    
                  bProcALineItm = true
    
                  if (sType==="string" && !bTypeFound) {
                    s.push("<span class='stringValue'>")
                    s.push(Q+val+Q+"</span>")
                    bTypeFound = true
                  } // end if
            
                  if (sType==="number" && !bTypeFound) {
                    s.push("<span class='numberValue'>")
                    s.push(val+"</span>")
                    bTypeFound = true
                  } // end if
            
                  if (sType==="boolean" && !bTypeFound) {
                    let sBoolVal = "false"
                    if (val===true) {
                      sBoolVal = "true"
                    } // end if
            
                    s.push("<span class='booleanValue'>")
                    s.push(sBoolVal+"</span>")
                    bTypeFound = true
                  } // end if
    
            } // next propName
    
            s.push("</li>"); // for Last item!
            s.push("</ul>"); // close of class: jsonVw
    
            return s.join("")
        } catch(err) {
            console.dir(err)
            debugger
        } // end of try/catch

        
    } // end of propObjMarkup()



    function safeMarkup(sInput) {
        try {
            if (sInput.indexOf("<") < 0) return sInput; // absolutely zero markup in it
            if (sInput.toLowerCase().indexOf("<script") < 0) return sInput; // absolutely no script tag in it
    
            // at least one script tag in it, so strip out any script tags!
            const nd = document.createElement("DIV")
            nd.innerHTML = sInput
            const scriptNodes = nd.getElementsByTagName("SCRIPT")
            const nMax = scriptNodes.length
    
            for (let n=0;n<nMax;n++) {
                scriptNodes[n].remove()
            } // next n
    
            return nd.innerHTML
        } catch(err) {
            console.dir(err)
            debugger
        } // end of try/catch block

        
    } // end of safeMarkup()


    function SaveObjData(params) {
        let objData

        try {
            objData = this;

            const transaction = db.transaction(["appData"], "readwrite");
            const objectStore = transaction.objectStore("appData");
        } catch(err) {
            orvCore.displayErrMsg(err,{},function(err) {
              debugger;
            }) 
        } // end of try/catch
    } // end of saveObjData()


    function setupOrvCoreDomSpace() {
        try {
            orvCoreDomSpace = document.getElementsByClassName(sOrvCoreLibClassName)[0];

            if (typeof orvCoreDomSpace === "undefined" || orvCoreDomSpace === null) {
                addOrvCoreStyles()
                orvCoreDomSpace = document.createElement("DIV")
                orvCoreDomSpace.className = sOrvCoreLibClassName
                document.body.append(orvCoreDomSpace)
            } // end if
    
            return orvCoreDomSpace;
        } catch(err) {
            console.dir(err)
            debugger
        } // end of try/catch
        
    } // end of setupOrvCoreDomSpace()



    function sortArrayOfObjects(arr, sOrderBy) {
        try {
            let sProps = sOrderBy.split(",")
            let orderBy = [];
            let nMax = sProps.length;
    
            for (let n=0;n<nMax;n++) {
                let propInfo = sProps[n].split(" ")
                let prop = {};
                prop.propName = propInfo[0];
                prop.order = "asc";
                if (propInfo.length===2) {
                prop.order = propInfo[1].toLowerCase();
                
                } // end if
                
                orderBy.push(prop)
            } // next n
            
            let dta = arr.slice();
            dta.sort(compare)
            return dta;
            
            function compare(obj1, obj2) {
                let value1 = "";
                let value2 = "";
    
                try {
                    let nMax2 = orderBy.length                
                    
                    for (let n=0;n<nMax2;n++) {
                    let prop = orderBy[n]
                    let check1 = obj1[prop.propName]
                    let check2 = obj2[prop.propName]
                    
                    if (check1 !== check2) {
                        //console.log("check1="+check1)
                        //console.log("check2="+check2)
                    } // end if
                    
                    
                    if (typeof check1 === "string") {
                        check1 = check1.toLowerCase();
                    } // end if
                    
                    if (typeof check2 === "string") {
                        check2 = check2.toLowerCase();
                    } // end if
                    
                    if (check1 instanceof Date) {
                        check1 = check1.getDate();
                    } // end if
                    
                    if (check2 instanceof Date) {
                        check2 = check2.getDate();
                    } // end if
                    
                    if (check1 > check2) {
                        if (prop.order.indexOf("desc")>-1) {
                        value1 = value1 + "0"
                        value2 = value2 + "2"
                        } else {
                        value1 = value1 + "2"
                        value2 = value2 + "0"
                        } // end if/else
                        
                    } else if (check1 < check2) {
                        if (prop.order.indexOf("desc")>-1) {
                        value1 = value1 + "2"
                        value2 = value2 + "0"
                        } else {
                        value1 = value1 + "0"
                        value2 = value2 + "2"
                        } // end if/else
                        
                    } else {
                        // values equal each other...
                        value1 = value1 + "1"
                        value2 = value2 + "1"
                    } // end if/else if/else
                    
                    } // next n
        
                    
                    let comparison = 0
                    if (value1 > value2) {
                    comparison = 1
                    } else if (value1 < value2) {
                    comparison = -1
                    } // end if /else if
                                    
                    return comparison;
                } catch(err2) {
                    console.log("function: compare()")
                    console.dir(err2)
                    debugger
                } // end of try/catch
    
            } // end of compare()
    
        } catch(err) {
            console.log("function: sortArrayOfObjects()")
            console.dir(err)
            debugger
        }// end of try/catch
        
    } // end of sortArrayOfObjects()


    function toggleVarListItm(evt) {
        const el = evt.srcElement || evt.originalTarget;
        let summary,span;

        try {            
            summary = el.getElementsByTagName("summary")[0]
            span = summary.getElementsByTagName("span")[0]
            
            if (span !== null && typeof span !== "undefined") {
                if (span.innerText.substr(0,3)=== "...") {
                    if (el.open) {
                        span.style.display = "none"
                    } else {
                        span.style.display = ""
                    } // end if/else
                } // end if
            } // end if
        } catch(err) {
            console.dir(err)
            debugger
        } // end of try/catch
        
    } // end of toggleVarListItm()

} // end of OrvCore Constructor

const orvCore = new OrvCore()

