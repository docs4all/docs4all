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

    var documentPath = window.location.hash.substring(1);
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

    var document = await apiClient.findDocumentByPath(documentPath);
    if (typeof document === 'undefined' || document.length === 0 || typeof document[0].text === 'undefined') {
      return;
    }
    var html = markdownConverter.render(document[0].text);
    $("#rigthPreview").html(html);
    //add the fragment
    if(documentPath!="/root.md"){
      window.location.hash = documentPath;
    }
    
  }  

}

if (typeof window._context === 'undefined') {
  window._context = {};
}
window._context["FragmentController"] = new FragmentController();
