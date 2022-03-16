function BrandingController(){

  this.apiClient = window._context["ApiClient"];

  this.init = () => {
    console.log("Customizing...");
    var settings = this.apiClient.getSettings();
    if(typeof settings === 'undefined'){
      $('#sidebar-header').prepend('<img src="assets/img/bootstraper-logo.png" alt="bootraper logo" class="app-logo">')
      return;
    }

    if(typeof settings.logoImageUrl !== 'undefined'){
      $('#sidebar-header').prepend('<img src="'+settings.logoImageUrl+'" alt="bootraper logo" class="app-logo">')
    }else if(typeof settings.logoText !== 'undefined'){
      $('#sidebar-header').prepend('<h1>'+settings.logoText+'</h1>')
    }else{
      $('#sidebar-header').prepend('<img src="assets/img/bootstraper-logo.png" alt="bootraper logo" class="app-logo">')
    }

    if(typeof settings.title !== 'undefined'){
      document.title = settings.logoText;
    }
  }

}

if(typeof window._context === 'undefined'){
   window._context = {};
}
window._context["BrandingController"] =  new BrandingController();
