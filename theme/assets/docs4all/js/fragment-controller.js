function FragmentController() {

  var apiClient;
  var markdownConverter;

  this.init = () => {

    markdownConverter = window._context["MarkdownConverter"];
    apiClient = window._context["ApiClient"];

    this.addListener();
    this.renderAtheStartup();
  }

  this.renderAtheStartup = () =>{
    if(window.location.hash==""){
      this.renderPageFromPath("/root.md")
      return;
    }

    var documentPath = window.location.hash.substring(1).replace(/%20/g, " ");
    console.log(`Go to ${documentPath}`);
    
    // Create the event
    var event = new CustomEvent("render-page", {
      "detail": documentPath
    });

    // Dispatch/Trigger/Fire the event
    document.dispatchEvent(event);
  }

  this.addListener = () => {
    document.addEventListener("render-page", this.renderPageFromEvent);
  };

  this.renderPageFromEvent = (event) => {
    console.log("rendering page:"+event.detail);
    this.renderPageFromPath(event.detail);
  }

  this.renderPageFromPath = async (documentPath) => {
    if (typeof documentPath === "undefined") {
      console.log(`document path is undefined.`);
      return;
    }

    var documentPathParts = documentPath.split("?");
    var pagePath = documentPathParts[0];
    var section = documentPathParts[1];

    var document = await apiClient.findDocumentByPath(pagePath);
    if (typeof document === 'undefined' || document.length === 0 || typeof document[0].text === 'undefined') {
      return;
    }
    var html = markdownConverter.render(document[0].text);
    $("#rigthPreview").html(html);

    if(section!=null){
      var sectionReference = $("h2:contains('"+section+"')");
      console.log(sectionReference)
      if(sectionReference!=null){
        console.log("focus!!")
        sectionReference.get(0).scrollIntoView({behavior: 'smooth', block: 'center',
        inline: 'center'})
      }
    }

    
    $('h2').click(function(event){
      console.log(event.target.innerText)
      window.location.hash = window.location.hash.substring(1).split("?")[0]+"?"+event.target.innerText
    });

    //add the fragment
    if(pagePath!="/root.md"){
      if(section!=null){
        window.location.hash = pagePath.replace(/%20/g, " ")+"?"+section;
      }else{
        window.location.hash = pagePath.replace(/%20/g, " ");
      }
    }
    
  }  

}

if (typeof window._context === 'undefined') {
  window._context = {};
}
window._context["FragmentController"] = new FragmentController();
